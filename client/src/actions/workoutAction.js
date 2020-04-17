import apiAction from "./apiAction"

export const API_GET_WORKOUTDAY = "API_GET_WORKOUTDAY"
export const API_GET_WORKOUTDAY_START = "API_GET_WORKOUTDAY_START"
export const API_GET_WORKOUTDAY_SUCCESS = "API_GET_WORKOUTDAY_SUCCESS"
export const API_RESTRUCTURE_WORKOUTDAY = "API_RESTRUCTURE_WORKOUTDAY"
export const API_GET_WORKOUTDAY_FAILURE = "API_GET_WORKOUTDAY_FAILURE"

export function getWorkoutDay(page_url, data) {
    return apiAction({
        type: API_GET_WORKOUTDAY,
        url: "/api" + page_url,
        method: "POST",
        data: data,
        onStart: getWorkoutDayStart,
        onSuccess: getWorkoutDaySuccess,
        onFailure: getWorkoutDayFailure
    });
}



export const getWorkoutDayStart = () => ({
    type: API_GET_WORKOUTDAY_START
})
export const getWorkoutDaySuccess = (page, header) => ({
    type: API_GET_WORKOUTDAY_SUCCESS,
    payload: { page, header }
});

export const getWorkoutDayFailure = error => ({
    type: API_GET_WORKOUTDAY_FAILURE,
    payload: { error }
});

export const restructureWorkout = (page) => ({
    type: API_RESTRUCTURE_WORKOUTDAY,
    payload: {page}
})