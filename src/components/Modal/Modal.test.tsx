import { render, screen } from '../../test/setupTest';
import { LaunchModal } from './Modal';
import type { Launch } from '../../types/types';
import { vi } from 'vitest';


const mockLaunch: Launch = {
  flight_number: 1,
  mission_name: 'Test Mission',
  launch_year: '2020',
  rocket: { rocket_name: 'Falcon 9' },
  details: 'Test details',
  links: {
    mission_patch: 'https://example.com/patch.png',
    mission_patch_small: null
  }
};

describe('LaunchModal', () => {
  it('renders modal content correctly', () => {
    render(
      <LaunchModal 
        launch={mockLaunch} 
        onClose={vi.fn()} 
      />
    );

    expect(screen.getByText('Falcon 9')).toBeInTheDocument();
    expect(screen.getByText('Test details')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', mockLaunch.links.mission_patch);
  });

  it('shows default message when details is null', () => {
    const launchWithoutDetails: Launch = {
      ...mockLaunch,
      details: null
    };

    render(
      <LaunchModal 
        launch={launchWithoutDetails} 
        onClose={vi.fn()} 
      />
    );

    expect(screen.getByText('Нет дополнительной информации')).toBeInTheDocument();
  });
});