import { isFuture, isValid, parseISO } from 'date-fns'
import type { CollectionAfterChangeHook, CollectionBeforeChangeHook, Field } from 'payload'

import { hasEditorialRole, isAdministrator } from './access'
import { contentLocaleLabels } from './locales'

export const editorialRoles = ['admin', 'editor', 'translator', 'reviewer', 'publisher'] as const

export type EditorialRole = (typeof editorialRoles)[number]

export const workflowStates = [
  'draft',
  'translation-requested',
  'in-review',
  'changes-requested',
  'approved',
] as const

export type WorkflowState = (typeof workflowStates)[number]

type EditorialCollection = 'news' | 'pages'
type EditorialActivityAction =
  | 'approved'
  | 'changes-requested'
  | 'created'
  | 'published'
  | 'review-requested'
  | 'scheduled'
  | 'translation-requested'
  | 'translations-submitted'

const workflowStateLabels: Record<WorkflowState, string> = {
  approved: 'Approved for publishing',
  'changes-requested': 'Changes requested',
  draft: 'Draft',
  'in-review': 'In review',
  'translation-requested': 'Translation requested',
}

function asWorkflowState(value: unknown): WorkflowState | undefined {
  if (typeof value !== 'string') return undefined
  return workflowStates.find((state) => state === value)
}

function originalWorkflowState(value: unknown): WorkflowState {
  return asWorkflowState(value) ?? 'draft'
}

function scheduledForValue(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined
  return isValid(parseISO(value)) ? value : undefined
}

function actionForStateChange(
  currentState: WorkflowState,
  nextState: WorkflowState,
): EditorialActivityAction | undefined {
  if (nextState === 'translation-requested') return 'translation-requested'
  if (nextState === 'in-review') {
    return currentState === 'translation-requested' ? 'translations-submitted' : 'review-requested'
  }
  if (nextState === 'changes-requested') return 'changes-requested'
  if (nextState === 'approved') return 'approved'
  return undefined
}

function stringValue(value: unknown): string {
  return typeof value === 'string' ? value : ''
}

function documentId(value: unknown): number | undefined {
  return typeof value === 'number' && Number.isSafeInteger(value) ? value : undefined
}

function optionalUserId(value: unknown): number | undefined {
  return typeof value === 'number' && Number.isSafeInteger(value) ? value : undefined
}

function recordValue(value: unknown): Record<string, unknown> | undefined {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : undefined
}

function hasScheduledPublishingContext(context: unknown): boolean {
  return (
    typeof context === 'object' &&
    context !== null &&
    'scheduledPublishing' in context &&
    context.scheduledPublishing === true
  )
}

function activityForChange(
  doc: Record<string, unknown>,
  previousDoc: Record<string, unknown> | undefined,
  operation: 'create' | 'update',
): { readonly action: EditorialActivityAction; readonly scheduledFor?: string } | undefined {
  const nextState = originalWorkflowState(doc.workflowState)
  const currentState = originalWorkflowState(previousDoc?.workflowState)
  const nextStatus = stringValue(doc['_status'])
  const currentStatus = stringValue(previousDoc?.['_status'])
  const nextScheduledFor = scheduledForValue(doc.scheduledFor)
  const currentScheduledFor = scheduledForValue(previousDoc?.scheduledFor)

  if (operation === 'create') return { action: 'created' }
  if (nextStatus === 'published' && currentStatus !== 'published') {
    return {
      action: 'published',
      ...(currentScheduledFor ? { scheduledFor: currentScheduledFor } : {}),
    }
  }
  if (nextScheduledFor !== currentScheduledFor && nextScheduledFor) {
    return { action: 'scheduled', scheduledFor: nextScheduledFor }
  }
  const action = actionForStateChange(currentState, nextState)
  return action ? { action } : undefined
}

export function logEditorialActivity(collection: EditorialCollection): CollectionAfterChangeHook {
  return async ({ doc, operation, previousDoc, req }) => {
    const current = recordValue(doc)
    if (!current) return doc
    const previous = recordValue(previousDoc)
    const activity = activityForChange(current, previous, operation)
    const id = documentId(current.id)
    if (!activity || id === undefined) return doc

    const actor = hasScheduledPublishingContext(req.context)
      ? undefined
      : optionalUserId(req.user?.id)
    await req.payload.create({
      collection: 'editorial-activities',
      data: {
        action: activity.action,
        ...(actor === undefined ? {} : { actor }),
        collection,
        documentId: id,
        ...(activity.scheduledFor ? { scheduledFor: activity.scheduledFor } : {}),
        title: stringValue(current.title),
        workflowState: originalWorkflowState(current.workflowState),
      },
      overrideAccess: true,
      req,
    })
    return doc
  }
}

export const editorialWorkflowFields: Field[] = [
  {
    name: 'workflowState',
    type: 'select',
    required: true,
    defaultValue: 'draft',
    index: true,
    options: workflowStates.map((value) => ({ label: workflowStateLabels[value], value })),
    admin: {
      description:
        'Read-only. Use the role-specific action control in the document toolbar to change workflow state.',
      position: 'sidebar',
      readOnly: true,
    },
  },
  {
    name: 'reviewNote',
    type: 'textarea',
    maxLength: 320,
    admin: {
      description: 'Optional context from the reviewer for the editor or publisher.',
    },
  },
  {
    name: 'scheduledFor',
    type: 'date',
    admin: {
      date: { pickerAppearance: 'dayAndTime' },
      description:
        'Publish at this future date and time. Only a publisher can schedule or clear a release.',
      position: 'sidebar',
    },
  },
  {
    name: 'reviewRequestedBy',
    type: 'relationship',
    relationTo: 'users',
    admin: {
      description: 'Set automatically when an editor requests review.',
      position: 'sidebar',
      readOnly: true,
    },
  },
  {
    name: 'translationLocales',
    type: 'select',
    hasMany: true,
    options: [
      { label: contentLocaleLabels.ja, value: 'ja' },
      { label: contentLocaleLabels.es, value: 'es' },
    ],
    admin: {
      description:
        'Choose the language versions that a translator should prepare before requesting translation.',
      position: 'sidebar',
    },
  },
  {
    name: 'translationRequestedBy',
    type: 'relationship',
    relationTo: 'users',
    admin: {
      description: 'Set automatically when an editor requests translation.',
      position: 'sidebar',
      readOnly: true,
    },
  },
  {
    name: 'translatedBy',
    type: 'relationship',
    relationTo: 'users',
    admin: {
      description: 'Set automatically when a translator submits completed translations for review.',
      position: 'sidebar',
      readOnly: true,
    },
  },
  {
    name: 'reviewedBy',
    type: 'relationship',
    relationTo: 'users',
    admin: {
      description: 'Set automatically when a reviewer responds.',
      position: 'sidebar',
      readOnly: true,
    },
  },
]

export const enforceEditorialWorkflow: CollectionBeforeChangeHook = ({
  data,
  operation,
  originalDoc,
  req,
}) => {
  if (!req.user || isAdministrator(req.user)) return data

  const currentState = originalWorkflowState(originalDoc?.workflowState)
  const nextState = originalWorkflowState(data.workflowState ?? currentState)
  const currentStatus = originalDoc?.['_status']
  const nextStatus = data['_status'] ?? currentStatus
  const currentScheduledFor = scheduledForValue(originalDoc?.scheduledFor)
  const nextScheduledFor = scheduledForValue(
    Object.hasOwn(data, 'scheduledFor') ? data.scheduledFor : originalDoc?.scheduledFor,
  )
  const isPublishing = currentStatus !== 'published' && nextStatus === 'published'
  const isScheduledPublishing = hasScheduledPublishingContext(req.context)
  const requestedLocales = Array.isArray(data.translationLocales)
    ? data.translationLocales
    : Array.isArray(originalDoc?.translationLocales)
      ? originalDoc.translationLocales
      : []

  if (operation === 'create') {
    if (!hasEditorialRole(req.user, 'editor')) {
      throw new Error('Only editors can create editorial content.')
    }

    if (data['_status'] === 'published') {
      throw new Error('Only a publisher can publish editorial content after review.')
    }

    data.workflowState = 'draft'
    data.reviewRequestedBy = undefined
    data.reviewedBy = undefined
    data.reviewNote = undefined
    data.translationLocales = undefined
    data.translationRequestedBy = undefined
    data.translatedBy = undefined
    return data
  }

  if (isPublishing) {
    if (!isScheduledPublishing && !hasEditorialRole(req.user, 'publisher')) {
      throw new Error('Only publishers can publish editorial content.')
    }

    if (nextState !== 'approved') {
      throw new Error('Content must be approved before it can be published.')
    }
  }

  if (nextScheduledFor !== currentScheduledFor && !isScheduledPublishing) {
    if (!hasEditorialRole(req.user, 'publisher')) {
      throw new Error('Only publishers can schedule or clear a publication date.')
    }
    if (nextScheduledFor && nextState !== 'approved') {
      throw new Error('Content must be approved before it can be scheduled.')
    }
    if (nextScheduledFor && nextStatus === 'published') {
      throw new Error('Use the scheduled publication action instead of publishing immediately.')
    }
    if (nextScheduledFor && !isFuture(parseISO(nextScheduledFor))) {
      throw new Error('Choose a future date and time for scheduled publication.')
    }
  }

  if (nextState === currentState) {
    data.reviewRequestedBy = originalDoc?.reviewRequestedBy
    data.reviewedBy = originalDoc?.reviewedBy
    data.reviewNote = originalDoc?.reviewNote
    data.translationRequestedBy = originalDoc?.translationRequestedBy
    data.translatedBy = originalDoc?.translatedBy
    return data
  }

  if (
    nextState === 'translation-requested' &&
    (currentState === 'draft' || currentState === 'changes-requested') &&
    hasEditorialRole(req.user, 'editor')
  ) {
    if (requestedLocales.length === 0) {
      throw new Error('Choose Japanese and/or Spanish before requesting translation.')
    }

    data.translationRequestedBy = req.user.id
    data.translatedBy = undefined
    data.reviewRequestedBy = undefined
    data.reviewedBy = undefined
    data.reviewNote = undefined
    return data
  }

  if (
    currentState === 'translation-requested' &&
    nextState === 'in-review' &&
    hasEditorialRole(req.user, 'translator')
  ) {
    data.translationRequestedBy = originalDoc?.translationRequestedBy
    data.translatedBy = req.user.id
    data.reviewRequestedBy = originalDoc?.translationRequestedBy
    data.reviewedBy = undefined
    data.reviewNote = undefined
    return data
  }

  if (
    nextState === 'in-review' &&
    (currentState === 'draft' || currentState === 'changes-requested') &&
    hasEditorialRole(req.user, 'editor')
  ) {
    data.reviewRequestedBy = req.user.id
    data.reviewedBy = undefined
    data.reviewNote = undefined
    data.translationRequestedBy = originalDoc?.translationRequestedBy
    data.translatedBy = originalDoc?.translatedBy
    return data
  }

  if (
    currentState === 'in-review' &&
    (nextState === 'approved' || nextState === 'changes-requested') &&
    hasEditorialRole(req.user, 'reviewer')
  ) {
    data.reviewRequestedBy = originalDoc?.reviewRequestedBy
    data.reviewedBy = req.user.id
    data.translationRequestedBy = originalDoc?.translationRequestedBy
    data.translatedBy = originalDoc?.translatedBy
    return data
  }

  throw new Error(
    'Editors can request translation or review, translators submit translations for review, reviewers can approve or request changes, and publishers can publish approved content.',
  )
}
