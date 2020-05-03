import apiAction from "./apiAction"

export const API_GET_WORKOUTS_HEADER_BUILD = "API_GET_WORKOUTS_HEADER_BUILD"
export const API_GET_WORKOUTS_BUILD = "API_GET_WORKOUTS_BUILD"
export const API_GET_WORKOUTS = "API_GET_WORKOUTS"
export const API_GET_WORKOUTS_START = "API_GET_WORKOUTS_START"
export const API_GET_WORKOUTS_SUCCESS = "API_GET_WORKOUTS_SUCCESS"
export const API_RESTRUCTURE_WORKOUTS = "API_RESTRUCTURE_WORKOUTS"
export const API_GET_WORKOUTS_FAILURE = "API_GET_WORKOUTS_FAILURE"
export const API_GET_RESTRUCTURE_WORKOUTS = "API_GET_RESTRUCTURE_WORKOUTS"
export const API_KEEP_WORKOUTS_STATE = "API_KEEP_WORKOUTS_STATE"
export const ACTION_GET_WORKOUTS_BY_CATEGORY = "ACTION_GET_WORKOUTS_BY_CATEGORY";
export function getWorkouts(page_url, data) {
    return apiAction({
        type: API_GET_WORKOUTS,
        url: "/api" + page_url,
        method: "POST",
        data: data,
        onStart: getWorkoutsStart,
        onSuccess: getWorkoutsSuccess,
        onFailure: getWorkoutsFailure
    });
}

export const getWorkoutsStart = () => ({
    type: API_GET_WORKOUTS_START
})
export const getWorkoutsSuccess = (page, header) => ({
    type: API_GET_WORKOUTS_SUCCESS,
    payload: { page, header }
});

export const getWorkoutsFailure = error => ({
    type: API_GET_WORKOUTS_FAILURE,
    payload: { error }
});

export const buildWorkoutsRequest = (url, type, data) => ({
    type,
    payload: {url, data}
})
export const restructureWorkoutDay = (page, metaData) => ({
    type: API_RESTRUCTURE_WORKOUTS,
    payload: {page, metaData}
})

export const keepWorkoutState = () => ({
    type: API_KEEP_WORKOUTS_STATE
})

export const getWorkoutsByCategory = (category) => ({
    type: ACTION_GET_WORKOUTS_BY_CATEGORY,
    payload: {category}
})