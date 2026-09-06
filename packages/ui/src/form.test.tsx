import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { CheckboxField } from './form'

describe('CheckboxField', () => {
  it('uses the checkbox field and button composition', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(<CheckboxField label="Receive updates" name="updates" onChange={onChange} />)

    const checkbox = screen.getByRole('checkbox', { name: 'Receive updates' })
    expect(checkbox).not.toBeChecked()

    await user.click(checkbox)

    expect(checkbox).toBeChecked()
    expect(onChange).toHaveBeenCalledWith(true)
  })
})
