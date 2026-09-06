'use client'

import {
  isContactRequestType,
  type ContactRequestType,
  type FormResult,
} from '@repo/contracts/forms'
import { Button } from '@repo/ui/button'
import {
  CheckboxField,
  Form,
  FormActionRow,
  HoneypotField,
  SelectField,
  TextAreaField,
  TextField,
} from '@repo/ui/form'
import { Icon, Send } from '@repo/ui/icon'
import { Stack } from '@repo/ui/layout'
import { Text } from '@repo/ui/text'
import ky from 'ky'
import { useState, useTransition, type Key, type SyntheticEvent } from 'react'

import { mutableFieldErrors } from '@/lib/forms'

type FormState = {
  readonly fieldErrors?: Record<string, string[]>
  readonly message?: string
  readonly status: 'idle' | 'error' | 'success'
}

const initialState: FormState = { status: 'idle' }

async function submitForm(endpoint: string, form: HTMLFormElement): Promise<FormResult> {
  const data = new FormData(form)
  const body = Object.fromEntries(data)
  return ky
    .post(endpoint, {
      json: { ...body, consent: data.get('consent') === 'on' },
      throwHttpErrors: false,
    })
    .json<FormResult>()
}

function usePublicForm(endpoint: string) {
  const [state, setState] = useState<FormState>(initialState)
  const [isPending, startTransition] = useTransition()

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    startTransition(async () => {
      try {
        const result = await submitForm(endpoint, form)
        if (result.ok) {
          form.reset()
          setState({ message: result.message, status: 'success' })
        } else {
          setState({
            fieldErrors: mutableFieldErrors(result.fieldErrors),
            message: result.message,
            status: 'error',
          })
        }
      } catch {
        setState({
          message: 'We could not send that just now. Please try again.',
          status: 'error',
        })
      }
    })
  }

  return { handleSubmit, isPending, state }
}

const requestTypeOptions = [
  { label: 'General contact', value: 'general' },
  { label: 'Request a quote', value: 'quote' },
  { label: 'Shipment question', value: 'shipment' },
] as const

const serviceOptions = [
  { label: 'Ocean freight', value: 'ocean-freight' },
  { label: 'Logistics solutions', value: 'logistics-solutions' },
] as const

export function ContactForm() {
  const [requestType, setRequestType] = useState<ContactRequestType>('general')
  const { handleSubmit, isPending, state } = usePublicForm('/api/contact')

  function selectRequestType(key: Key | null) {
    if (isContactRequestType(key)) setRequestType(key)
  }

  return (
    <Form
      onSubmit={handleSubmit}
      {...(state.fieldErrors ? { validationErrors: state.fieldErrors } : {})}
    >
      <SelectField
        label="What can we help with?"
        name="requestType"
        onChange={selectRequestType}
        options={requestTypeOptions}
        value={requestType}
      />
      <TextField isRequired label="Name" maxLength={100} name="name" />
      <TextField isRequired label="Email" maxLength={200} name="email" type="email" />
      <TextField label="Organization" maxLength={150} name="organization" />
      {requestType === 'quote' ? (
        <>
          <SelectField label="Service" name="service" options={serviceOptions} />
          <TextField isRequired label="Origin" maxLength={120} name="origin" />
          <TextField isRequired label="Destination" maxLength={120} name="destination" />
        </>
      ) : null}
      {requestType === 'shipment' ? (
        <TextField
          description="This demo records a question only; it does not provide real-time tracking."
          isRequired
          label="Shipment or booking reference"
          maxLength={80}
          minLength={4}
          name="shipmentReference"
        />
      ) : null}
      <TextAreaField
        description={
          requestType === 'quote'
            ? 'Share the shipment context you would like priced.'
            : 'Please include enough context for a useful reply.'
        }
        isRequired
        label="Message"
        maxLength={2000}
        minLength={20}
        name="message"
      />
      <CheckboxField
        isRequired
        label="I agree that The Dispatch may store this message to reply."
        name="consent"
      />
      <HoneypotField />
      <Button isPending={isPending} type="submit">
        <Icon source={Send} size="sm" /> Send message
      </Button>
      <FormStatus state={state} />
    </Form>
  )
}

export function NewsletterForm() {
  const { handleSubmit, isPending, state } = usePublicForm('/api/newsletter')

  return (
    <Form
      onSubmit={handleSubmit}
      {...(state.fieldErrors ? { validationErrors: state.fieldErrors } : {})}
    >
      <FormActionRow>
        <TextField
          isRequired
          label="Email address"
          maxLength={200}
          name="email"
          placeholder="you@example.com"
          tone="inverse"
          type="email"
        />
        <Button isPending={isPending} size="newsletter" type="submit" variant="secondary">
          Subscribe
        </Button>
      </FormActionRow>
      <CheckboxField
        isRequired
        label="I want occasional editorial updates from The Dispatch."
        name="consent"
        tone="inverse"
      />
      <HoneypotField />
      <FormStatus state={state} />
    </Form>
  )
}

function FormStatus({ state }: { readonly state: FormState }) {
  if (!state.message) return null
  return (
    <Stack gap="xs">
      <Text color={state.status === 'success' ? 'success' : 'danger'} variant="small">
        <span aria-live="polite">{state.message}</span>
      </Text>
    </Stack>
  )
}
