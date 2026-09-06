import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Skeleton, SkeletonStatus } from './skeleton'

describe('SkeletonStatus', () => {
  it('announces loading while keeping decorative shapes out of the accessibility tree', () => {
    render(
      <SkeletonStatus label="Loading stories">
        <Skeleton />
      </SkeletonStatus>,
    )

    const status = screen.getByRole('status', { name: 'Loading stories' })
    expect(status.parentElement).toHaveAttribute('aria-busy', 'true')
    expect(status.parentElement?.querySelector('[aria-hidden="true"]')).toBeInTheDocument()
  })
})
