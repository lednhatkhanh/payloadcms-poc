import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Button } from './button'

describe('Button', () => {
  it('normalizes keyboard presses through onPress', async () => {
    const user = userEvent.setup()
    const onPress = vi.fn()
    render(<Button onPress={onPress}>Send</Button>)

    await user.tab()
    await user.keyboard('{Enter}')

    expect(screen.getByRole('button', { name: 'Send' })).toHaveFocus()
    expect(onPress).toHaveBeenCalledOnce()
  })

  it('keeps pending buttons accessible', () => {
    render(<Button isPending>Send</Button>)
    expect(screen.getByRole('button', { name: /Send/ })).toHaveAttribute('data-pending')
  })
})
