import { useEffect } from "react"
import { useLaunchContext } from "../context/LaunchContext"
import axios from "axios"

export const useLaunch = () => {
    const { dispatch } =useLaunchContext()

    useEffect(() => {
        const fetchLaunch = async () => {
            dispatch({ type: 'FETCH_LAUNCHES_REQUEST' })
            try {
                const response = await axios.get('/api/v3/launches', {
                    params: { launch_year: "2020" }
                })
                dispatch({type: 'FETCH_LAUNCHES_SUCCESS', payload: response.data})
            } catch (error) {
                let errorMessage = 'Неизвестная ошибка';
                if (error instanceof Error) {
                errorMessage = error.message;
                } else if (typeof error === 'string') {
                errorMessage = error;
        }
                dispatch({ type: 'FETCH_LAUNCHES_FAILURE', payload: errorMessage })
            }
        }

        fetchLaunch()
    }, [dispatch])
};