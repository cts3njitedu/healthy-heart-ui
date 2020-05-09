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
export const ACTION_GO_BACK_TO_WORKOUTDAY_LOCATIONS = "ACTION_GO_BACK_TO_WORKOUTDAY_LOCATIONS"
export const ACTION_ADD_WORKOUT_START = "ACTION_ADD_WORKOUT_START";
export const ACTION_ADD_WORKOUT = "ACTION_ADD_WORKOUT";
export const ACTION_CHANGE_CATEGORY_NAME = "ACTION_CHANGE_CATEGORY_NAME"
export const ACTION_CHANGE_CATEGORY_CONFIRMATION_YES = "ACTION_CHANGE_CATEGORY_CONFIRMATION_YES"
export const ACTION_CHANGE_CATEGORY_CONFIRMATION_NO = "ACTION_CHANGE_CATEGORY_CONFIRMATION_NO"
export const ACTION_CHANGE_WORKOUT_TYPE = "ACTION_CHANGE_WORKOUT_TYPE"
export const ACTION_CHANGE_WORKOUT_TYPE_CONFIRMATION_YES = "ACTION_CHANGE_WORKOUT_TYPE_CONFIRMATION_YES"
export const ACTION_CHANGE_WORKOUT_TYPE_CONFIRMATION_NO = "ACTION_CHANGE_WORKOUT_TYPE_CONFIRMATION_NO"
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

export const keepWorkoutState = (data) => ({
    type: API_KEEP_WORKOUTS_STATE,
    payload: {data}
})

export const getWorkoutsByCategory = (category) => ({
    type: ACTION_GET_WORKOUTS_BY_CATEGORY,
    payload: {category}
})

export const addNewWorkoutStart = () => ({
    type: ACTION_ADD_WORKOUT_START
})

export const addNewWorkout = (workoutSection) => ({
    type: ACTION_ADD_WORKOUT,
    payload: {workoutSection}
})

export const changeCategoryName = (data) => ({
    type: ACTION_CHANGE_CATEGORY_NAME,
    payload: {data}
})

export const changeWorkoutType = (data) => ({
    type: ACTION_CHANGE_WORKOUT_TYPE,
    payload: {data}
})

export const confirmationAction = (actionType, data) => ({
    type : actionType,
    payload: {data}
})