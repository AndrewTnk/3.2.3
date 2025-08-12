import { renderHook, act } from '@testing-library/react';
import { LaunchProvider, useLaunchContext } from './LaunchContext';
import type { Launch } from '../types/types';

const completeMockLaunch: Launch = {
  flight_number: 1,
  mission_name: 'Starlink',
  launch_year: '2020',
  rocket: { rocket_name: 'Falcon 9' },
  details: 'Test launch',
  links: {
    mission_patch_small: 'patch.jpg',
    mission_patch: null
  }
};

describe('LaunchContext', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <LaunchProvider>{children}</LaunchProvider>
  );

  it('handles FETCH_LAUNCHES_SUCCESS', () => {
    const { result } = renderHook(() => useLaunchContext(), { wrapper });
    
    act(() => {
      result.current.dispatch({
        type: 'FETCH_LAUNCHES_SUCCESS',
        payload: [completeMockLaunch]
      });
    });

    expect(result.current.state.launches).toEqual([completeMockLaunch]);
    expect(result.current.state.isLoading).toBe(false);
  });
});