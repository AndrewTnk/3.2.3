import { render, screen } from '../../test/setupTest'
import userEvent from '@testing-library/user-event'
import { LaunchCard } from './Card'
import type { Launch } from '../../types/types'
import { vi } from 'vitest'

const mockLaunch: Launch = {
  flight_number: 1,
  mission_name: 'Test Mission',
  launch_year: '2020',
  rocket: { rocket_name: 'Falcon 9' },
  details: 'Test details',
  links: {
    mission_patch_small: 'https://example.com/patch.png',
    mission_patch: 'https://example.com/patch.png'
  }
}

describe('LaunchCard', () => {
  it('renders mission info correctly', () => {
    render(<LaunchCard launch={mockLaunch} onSeeMore={vi.fn()} />)
    
    expect(screen.getByText('Test Mission')).toBeInTheDocument()
    expect(screen.getByText('Falcon 9')).toBeInTheDocument()
    expect(screen.getByRole('img')).toHaveAttribute('src', mockLaunch.links.mission_patch_small)
  })

  it('calls onSeeMore when button clicked', async () => {
    const mockFn = vi.fn()
    const user = userEvent.setup()
    render(<LaunchCard launch={mockLaunch} onSeeMore={mockFn} />)
    
    await user.click(screen.getByRole('button', { name: /see more/i }))
    expect(mockFn).toHaveBeenCalledWith(mockLaunch)
  })
})