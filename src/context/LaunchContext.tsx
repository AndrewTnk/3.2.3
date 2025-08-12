import { createContext, useContext, useReducer } from "react";
import type { LaunchAction, LaunchState } from "../types/types";

const initialState: LaunchState = {
    launches: [],
    selectedLaunch: null,
    isLoading: false,
    error: null,
}

const reducer = (state: LaunchState, action: LaunchAction): LaunchState => {
    switch (action.type) {
        case 'FETCH_LAUNCHES_REQUEST':
            return { ...state, isLoading: true, error: null};
        case 'FETCH_LAUNCHES_SUCCESS':
            return {...state, isLoading: false, launches: action.payload};
        case 'FETCH_LAUNCHES_FAILURE':
            return {...state, isLoading: false, error: action.payload};
        case 'SELECT_LAUNCH':
            return {...state, selectedLaunch: action.payload};
        case 'CLOSE_MODAL':
            return {...state, selectedLaunch: null};
        default:
            return state;
    }
};

const LaunchContext = createContext<{
    state: LaunchState;
    dispatch: React.Dispatch<LaunchAction>;
}>({state: initialState, dispatch: () => null});


export const LaunchProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <LaunchContext.Provider value={{state, dispatch}}>
            {children}
        </LaunchContext.Provider>
    )
}

export const useLaunchContext = () => useContext(LaunchContext)

