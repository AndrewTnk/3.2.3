import { render, screen } from '../../test/setupTest';
import { LaunchList } from './List';
import { useLaunchContext } from '../../context/LaunchContext';
import type { Launch } from '../../types/types';
import { vi } from 'vitest';

const mockLaunch: Launch = {
  flight_number: 1,
  mission_name: 'Starlink-1',
  launch_year: '2020',
  rocket: { rocket_name: 'Falcon 9' },
  details: 'Test mission details',
  links: {
    mission_patch_small: 'https://example.com/patch1.jpg',
    mission_patch: null
  }
};

vi.mock('../../context/LaunchContext', () => ({
  useLaunchContext: vi.fn()
}));

const mockUseLaunchContext = useLaunchContext as jest.MockedFunction<typeof useLaunchContext>;

describe('LaunchList', () => {
  it('displays launches correctly', () => {
    mockUseLaunchContext.mockReturnValue({
      state: {
        launches: [mockLaunch],
        isLoading: false,
        error: null,
        selectedLaunch: null
      },
      dispatch: vi.fn()
    });

    render(<LaunchList />);
    
    expect(screen.getByText('Starlink-1')).toBeInTheDocument();
    expect(screen.getByText('Falcon 9')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', mockLaunch.links.mission_patch_small);
  });

  it('shows loading state', () => {
    mockUseLaunchContext.mockReturnValue({
      state: {
        launches: [],
        isLoading: true,
        error: null,
        selectedLaunch: null
      },
      dispatch: vi.fn()
    });

    render(<LaunchList />);
    expect(screen.getByText('Загрузка...')).toBeInTheDocument();
  });
});