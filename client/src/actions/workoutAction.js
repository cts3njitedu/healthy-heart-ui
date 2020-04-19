import apiAction from "./apiAction"

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