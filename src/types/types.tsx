export interface Launch {
    flight_number: number;
    mission_name: string;
    launch_year: string;
    rocket: {
        rocket_name: string;
    };
    details: string | null;
    links: {
        mission_patch_small: string | null;
        mission_patch: string | null;
  };
}

export interface LaunchState {
    launches: Launch[];
    selectedLaunch: Launch | null;
    isLoading: boolean;
    error: string | null;
}

export type LaunchAction =
  | { type: 'FETCH_LAUNCHES_REQUEST' }
  | { type: 'FETCH_LAUNCHES_SUCCESS'; payload: Launch[] }
  | { type: 'FETCH_LAUNCHES_FAILURE'; payload: string }
  | { type: 'SELECT_LAUNCH'; payload: Launch }
  | { type: 'CLOSE_MODAL' };