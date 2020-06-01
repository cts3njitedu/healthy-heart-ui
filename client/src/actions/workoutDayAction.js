import apiAction from "./apiAction"

export const API_GET_WORKOUTDAY_BUILD = "API_GET_WORKOUTDAY_BUILD"
export const API_GET_WORKOUTDAY = "API_GET_WORKOUTDAY"
export const API_GET_WORKOUTDAY_START = "API_GET_WORKOUTDAY_START"
export const API_GET_WORKOUTDAY_SUCCESS = "API_GET_WORKOUTDAY_SUCCESS"
export const API_RESTRUCTURE_WORKOUTDAY = "API_RESTRUCTURE_WORKOUTDAY"
export const API_GET_WORKOUTDAY_FAILURE = "API_GET_WORKOUTDAY_FAILURE"
export const ACTION_SELECT_WORKOUTDAY_LOCATION = "ACTION_SELECT_WORKOUTDAY_LOCATION"
export const ACTION_CHANGE_WORKOUT_DATE = "ACTION_CHANGE_WORKOUT_DATE"
export const ACTION_SUBMIT_WORKOUT_DATE = "ACTION_SUBMIT_WORKOUT_DATE"
export const ACTION_CANCEL_CHANGE_WORKOUT_DATE = "ACTION_CANCEL_CHANGE_WORKOUT_DATE"
export const ACTION_GO_BACK_TO_CALENDER = "ACTION_GO_BACK_TO_CALENDER"
export const ACTION_SELECT_LOCATION_START = "ACTION_SELECT_LOCATION_START"
export const ACTION_SELECT_LOCATION = "ACTION_SELECT_LOCATION"
export const API_GET_OTHER_WORKOUTDAY_LOCATIONS = "API_GET_OTHER_WORKOUTDAY_LOCATIONS"
export const API_GET_OTHER_WORKOUTDAY_LOCATIONS_START = "API_GET_OTHER_WORKOUTDAY_LOCATIONS_START"
export const API_GET_OTHER_WORKOUTDAY_LOCATIONS_SUCCESS = "API_GET_OTHER_WORKOUTDAY_LOCATIONS_SUCCESS"
export const ACTION_SORT_LOCATION_TABLE_START = "ACTION_SORT_LOCATION_TABLE_START"
export const ACTION_SORT_LOCATION_TABLE = "ACTION_SORT_LOCATION_TABLE"
export const ACTION_FILTER_LOCATION_TABLE_START = "ACTION_FILTER_LOCATION_TABLE_START"
export const ACTION_FILTER_LOCATION_TABLE = "ACTION_FILTER_LOCATION_TABLE"
export const ACTION_RESET_FILTER_LOCATION = "ACTION_RESET_FILTER_LOCATION"
export const API_ADD_WORKOUTDAY_LOCATION_START = "API_ADD_WORKOUTDAY_LOCATION_START"
export const API_ADD_WORKOUTDAY_LOCATION_BUILD = "API_ADD_WORKOUTDAY_LOCATION_BUILD"
export const API_ADD_WORKOUTDAY_LOCATION = "API_ADD_WORKOUTDAY_LOCATION"
export const API_ADD_WORKOUTDAY_LOCATION_SUCCESS = "API_ADD_WORKOUTDAY_LOCATION_SUCCESS"
export const API_ADD_WORKOUTDAY_LOCATION_FAILURE = "API_ADD_WORKOUTDAY_LOCATION_FAILURE"
export const API_DELETE_WORKOUTDAY_LOCATION = "API_DELETE_WORKOUTDAY_LOCATION"
export const API_DELETE_WORKOUTDAY_LOCATION_CONFIRMATION_YES = "API_DELETE_WORKOUTDAY_LOCATION_CONFIRMATION_YES"
export const API_DELETE_WORKOUTDAY_LOCATION_CONFIRMATION_NO = "API_DELETE_WORKOUTDAY_LOCATION_CONFIRMATION_NO"
export const API_DELETE_WORKOUTDAY_LOCATION_BUILD = "API_DELETE_WORKOUTDAY_LOCATION_BUILD"
export const API_WORKOUTDAY_LOCATION_DELETED = "API_WORKOUTDAY_LOCATION_DELETED"
export const ACTION_VIEW_WORKOUTS = "ACTION_VIEW_WORKOUTS"

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

export function addWorkoutLocation(page_url, data) {
    return apiAction({
        type: API_ADD_WORKOUTDAY_LOCATION,
        url: "/api" + page_url,
        method: "POST",
        data: data,
        onStart: addWorkoutDayLocationStart,
        onSuccess: addWorkoutDayLocationSuccess,
        onFailure: addWorkoutDayLocationFailure
    })
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

export const addWorkoutDayLocationStart = () => ({
    type: API_ADD_WORKOUTDAY_LOCATION_START
})

export const addWorkoutDayLocationSuccess = (data, header) => ({
    type: API_ADD_WORKOUTDAY_LOCATION_SUCCESS,
    payload: {data, header}
})

export const addWorkoutDayLocationFailure = error => ({
    type: API_ADD_WORKOUTDAY_LOCATION_FAILURE,
    payload: {error}
})

export const restructureWorkout = (page) => ({
    type: API_RESTRUCTURE_WORKOUTDAY,
    payload: {page}
})

export const selectWorkoutDayLocation = (location) => ({
    type: ACTION_SELECT_WORKOUTDAY_LOCATION,
    payload : {location}
})

export const changeWorkoutDate = (date) => ({
    type : ACTION_CHANGE_WORKOUT_DATE,
    payload : {date}
})

export const submitWorkoutDate = () => ({
    type: ACTION_SUBMIT_WORKOUT_DATE
})

export const cancelWorkoutDateChange = () => ({
    type: ACTION_CANCEL_CHANGE_WORKOUT_DATE
})

export const goBackToCalendar = (cancelField) => ({
    type: ACTION_GO_BACK_TO_CALENDER,
    payload: {cancelField}
})

export const selectLocation = (newLocation, metaData) => ({
    type: ACTION_SELECT_LOCATION_START,
    payload: {newLocation, metaData}
})

export const selectLocationEnd = (newLocation, activityId, activityFields) => ({
    type: ACTION_SELECT_LOCATION,
    payload: {newLocation, activityId, activityFields}
})

export const sortLocationTableStart = (fieldName) => ({
    type: ACTION_SORT_LOCATION_TABLE_START,
    payload: {fieldName}
})

export const sortLocationTable = (fieldName, sortOrder) => ({
    type: ACTION_SORT_LOCATION_TABLE,
    payload: {fieldName, sortOrder}
})

export const filterLocationTableStart = (fieldName, value) => ({
    type: ACTION_FILTER_LOCATION_TABLE_START,
    payload: {fieldName, value}
})

export const filterLocationTable = (fieldName, value) => ({
    type: ACTION_FILTER_LOCATION_TABLE,
    payload: {fieldName, value}
})
export const buildWorkoutDayRequest = (url, isResetFilter) => ({
    type: API_GET_WORKOUTDAY_BUILD,
    payload : {url, isResetFilter}
})

export const addWorkoutDayLocationBuild = (url, actionType) => ({
    type: API_ADD_WORKOUTDAY_LOCATION_BUILD,
    payload: {url, actionType}
})

export const actionViewWorkouts = (viewWorkoutField) => ({
    type: ACTION_VIEW_WORKOUTS,
    payload: {viewWorkoutField}
})

export const deleteWorkoutDayLocation = (data) => ({
    type: API_DELETE_WORKOUTDAY_LOCATION,
    payload: {data}
})

export const workoutDayLocationDeleteFinish = (data) => ({
    type: API_WORKOUTDAY_LOCATION_DELETED,
    payload: {data}
})

export const resetWorkoutDayLocationFilter = (data) => ({
    type: ACTION_RESET_FILTER_LOCATION,
    payload: {data}
})