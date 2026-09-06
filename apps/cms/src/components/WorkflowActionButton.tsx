'use client'

import {
  FormSubmit,
  Select,
  useAuth,
  useConfig,
  useDocumentInfo,
  useForm,
  useFormFields,
  useLocale,
} from '@payloadcms/ui'
import { isFuture, parseISO } from 'date-fns'
import { formatAdminURL } from 'payload/shared'

import { useCallback, useState } from 'react'

type WorkflowState =
  | 'approved'
  | 'changes-requested'
  | 'draft'
  | 'in-review'
  | 'translation-requested'

type WorkflowAction = {
  readonly key:
    | 'approve'
    | 'publish'
    | 'request-changes'
    | 'request-review'
    | 'request-translation'
    | 'save-draft'
    | 'submit-translation'
  readonly label: string
  readonly publish?: boolean
  readonly state: WorkflowState
}

function workflowStateFrom(value: unknown): WorkflowState {
  if (
    value === 'approved' ||
    value === 'changes-requested' ||
    value === 'in-review' ||
    value === 'translation-requested'
  ) {
    return value
  }
  return 'draft'
}

function rolesFrom(value: unknown): readonly string[] {
  if (!value || typeof value !== 'object' || !('roles' in value)) return []
  const { roles } = value
  return Array.isArray(roles)
    ? roles.filter((role): role is string => typeof role === 'string')
    : []
}

function includesRole(roles: readonly string[], role: string): boolean {
  return roles.includes('admin') || roles.includes(role)
}

function isFutureDate(value: unknown): boolean {
  return typeof value === 'string' && isFuture(parseISO(value))
}

function isWorkflowActionKey(value: unknown): value is WorkflowAction['key'] {
  return (
    value === 'approve' ||
    value === 'publish' ||
    value === 'request-changes' ||
    value === 'request-review' ||
    value === 'request-translation' ||
    value === 'save-draft' ||
    value === 'submit-translation'
  )
}

function actionPath(
  collectionSlug: string,
  id: number | string | undefined,
  locale: string,
  publish: boolean | undefined,
): `/${string}` {
  const localeQuery = `locale=${encodeURIComponent(locale)}&fallback-locale=false`

  if (id) {
    return publish
      ? `/${collectionSlug}/${id}?depth=0&${localeQuery}`
      : `/${collectionSlug}/${id}?depth=0&${localeQuery}&draft=true`
  }

  return publish
    ? `/${collectionSlug}?depth=0&${localeQuery}`
    : `/${collectionSlug}?depth=0&${localeQuery}&draft=true`
}

export function WorkflowActionButton() {
  const { config } = useConfig()
  const { user } = useAuth()
  const { code: locale } = useLocale()
  const { collectionSlug, id } = useDocumentInfo()
  const { submit } = useForm()
  const workflowState = useFormFields(([fields]) => workflowStateFrom(fields.workflowState?.value))
  const scheduledFor = useFormFields(([fields]) => fields.scheduledFor?.value)
  const roles = rolesFrom(user)
  const [selectedActionKey, setSelectedActionKey] = useState<WorkflowAction['key']>()

  const submitAction = useCallback(
    async (action: WorkflowAction) => {
      if (!collectionSlug) return

      await submit({
        action: formatAdminURL({
          apiRoute: config.routes.api,
          path: actionPath(collectionSlug, id, locale, action.publish),
        }),
        method: id ? 'PATCH' : 'POST',
        overrides: {
          ['_status']: action.publish ? 'published' : 'draft',
          workflowState: action.state,
        },
      })
    },
    [collectionSlug, config.routes.api, id, locale, submit],
  )

  const actions: readonly WorkflowAction[] = (() => {
    if (
      (workflowState === 'draft' || workflowState === 'changes-requested') &&
      includesRole(roles, 'editor')
    ) {
      return id
        ? [
            {
              key: 'request-translation',
              label: 'Request translation',
              state: 'translation-requested',
            },
            { key: 'request-review', label: 'Request review', state: 'in-review' },
          ]
        : [{ key: 'save-draft', label: 'Save draft', state: 'draft' }]
    }

    if (workflowState === 'translation-requested' && includesRole(roles, 'translator')) {
      return [
        { key: 'submit-translation', label: 'Submit translations for review', state: 'in-review' },
      ]
    }

    if (workflowState === 'in-review' && includesRole(roles, 'reviewer')) {
      return [
        { key: 'approve', label: 'Approve', state: 'approved' },
        { key: 'request-changes', label: 'Request changes', state: 'changes-requested' },
      ]
    }

    if (workflowState === 'approved' && includesRole(roles, 'publisher')) {
      return isFutureDate(scheduledFor)
        ? [
            { key: 'publish', label: 'Publish now', publish: true, state: 'approved' },
            { key: 'save-draft', label: 'Schedule publication', state: 'approved' },
          ]
        : [{ key: 'publish', label: 'Publish changes', publish: true, state: 'approved' }]
    }

    return []
  })()
  const selectedAction = actions.find(({ key }) => key === selectedActionKey) ?? actions[0]

  if (!selectedAction) return null

  return (
    <>
      <Select
        customProps={{ valueContainerLabel: 'Workflow action' }}
        isClearable={false}
        isSearchable={false}
        onChange={(value) => {
          if (!Array.isArray(value) && isWorkflowActionKey(value.value)) {
            setSelectedActionKey(value.value)
          }
        }}
        options={actions.map((action) => ({ label: action.label, value: action.key }))}
        value={{ label: selectedAction.label, value: selectedAction.key }}
      />
      <FormSubmit
        buttonId="action-workflow"
        onClick={() => void submitAction(selectedAction)}
        size="medium"
        type="button"
      >
        {selectedAction.label}
      </FormSubmit>
    </>
  )
}
