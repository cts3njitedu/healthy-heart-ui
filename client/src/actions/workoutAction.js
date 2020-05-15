import apiAction from "./apiAction"

export const API_GET_WORKOUTS_HEADER_BUILD = "API_GET_WORKOUTS_HEADER_BUILD"
export const API_GET_WORKOUTS_BUILD = "API_GET_WORKOUTS_BUILD"
export const API_GET_WORKOUT_DETAILS_BUILD = "API_GET_WORKOUT_DETAILS_BUILD"
export const API_GET_WORKOUT_DETAILS_META_INFO_BUILD = "API_GET_WORKOUT_DETAILS_META_INFO_BUILD"
export const API_GET_WORKOUTS = "API_GET_WORKOUTS"
export const API_GET_WORKOUTS_START = "API_GET_WORKOUTS_START"
export const API_GET_WORKOUTS_SUCCESS = "API_GET_WORKOUTS_SUCCESS"
export const API_RESTRUCTURE_WORKOUTS = "API_RESTRUCTURE_WORKOUTS"
export const API_RESTRUCTURE_WORKOUT_DETAILS = "API_RESTRUCTURE_WORKOUT_DETAILS"
export const API_RESTRUCTURE_WORKOUT_DETAILS_META_INFO = "API_RESTRUCTURE_WORKOUT_DETAILS_META_INFO"
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
export const ACTION_VIEW_WORKOUT_START = "ACTION_VIEW_WORKOUT_START"
export const ACTION_ADD_EDIT_WORKOUT_GROUP_START = "ACTION_ADD_EDIT_WORKOUT_GROUP_START"
export const ACTION_CANCEL_WORKOUT_GROUP = "ACTION_CANCEL_WORKOUT_GROUP"
export const ACTION_CANCEL_WORKOUT_GROUP_CONFIRMATION_YES = "ACTION_CANCEL_WORKOUT_GROUP_CONFIRMATION_YES"
export const ACTION_CANCEL_WORKOUT_GROUP_CONFIRMATION_NO = "ACTION_CANCEL_WORKOUT_GROUP_CONFIRMATION_NO"
export const ACTION_HANDLE_CHANGE_GROUP = "ACTION_HANDLE_CHANGE_GROUP"
export const ACTION_HANDLE_BLUR_GROUP = "ACTION_HANDLE_BLUR_GROUP"
export const ACTION_HANDLE_SAVE_GROUP = "ACTION_HANDLE_SAVE_GROUP"
export const ACTION_GROUP_FORM_VALIIDATION_FINISH = "ACTION_GROUP_FORM_VALIIDATION_FINISH"
export const ACTION_KEEP_STAGE_UNCHANGED = "ACTION_KEEP_STAGE_UNCHANGED"
export const ACTION_ADD_EDIT_WORKOUT_GROUP_SAVE = "ACTION_ADD_EDIT_WORKOUT_GROUP_SAVE"
export const ACTION_ADD_WORKOUT_GROUP_SAVE = "ACTION_ADD_WORKOUT_GROUP_SAVE"
export const ACTION_EDIT_WORKOUT_GROUP_SAVE = "ACTION_EDIT_WORKOUT_GROUP_SAVE"
export const ACTION_DELETE_WORKOUT_GROUP = "ACTION_DELETE_WORKOUT_GROUP"
export const ACTION_WORKOUT_CANCEL_CHANGES = "ACTION_WORKOUT_CANCEL_CHANGES"
export const ACTION_WORKOUT_CANCEL_CHANGES_CONFIRMATION_YES = "ACTION_WORKOUT_CANCEL_CHANGES_CONFIRMATION_YES"
export const ACTION_WORKOUT_CANCEL_CHANGES_CONFIRMATION_NO = "ACTION_WORKOUT_CANCEL_CHANGES_CONFIRMATION_NO"
export const ACTION_WORKOUT_CLOSE = "ACTION_WORKOUT_CLOSE";
export const ACTION_WORKOUT_CLOSE_CONFIRMATION_YES = "ACTION_WORKOUT_CLOSE_CONFIRMATION_YES"
export const ACTION_WORKOUT_CLOSE_CONFIRMATION_NO = "ACTION_WORKOUT_CLOSE_CONFIRMATION_NO"
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

export const restructureWorkoutDetailsMetaInfo = (page, metaData) => ({
    type: API_RESTRUCTURE_WORKOUT_DETAILS_META_INFO,
    payload: {page, metaData}
})

export const restructureWorkoutDetails = (page, metaData) => ({
    type: API_RESTRUCTURE_WORKOUT_DETAILS,
    payload: {page, metaData}
})

export const addOREditWorkoutGroupStart = (isAddGroup, editGroup, data) => ({
    type: ACTION_ADD_EDIT_WORKOUT_GROUP_START,
    payload: {isAddGroup, editGroup, data}
})

export const addOREditWorkoutGroupSave = (type, editGroup, data) => ({
    type: type,
    payload: {editGroup, data}
})

export const deleteWorkoutGroup = (editGroup, data) => ({
    type: ACTION_DELETE_WORKOUT_GROUP,
    payload: {editGroup, data}
})

export const cancelChanges = (data) => ({
    type: ACTION_WORKOUT_CANCEL_CHANGES,
    payload: {data}
})

export const handleChangeGroup = (field) => ({
    type: ACTION_HANDLE_CHANGE_GROUP,
    payload: {field}
})

export const handleBlurGroup = (field) => ({
    type: ACTION_HANDLE_BLUR_GROUP,
    payload: {field}
})

export const handleSaveGroup = (field) => ({
    type: ACTION_HANDLE_SAVE_GROUP,
    payload: {field}
})

export const formValidationFinish = (field, errors, isError) => ({
    type: ACTION_GROUP_FORM_VALIIDATION_FINISH,
    payload: {field, errors, isError}
})

export const keepWorkoutDetailsUnchanged = () => ({
    type: ACTION_KEEP_STAGE_UNCHANGED
})

export const cancelGroupFrom = (data) => ({
    type: ACTION_CANCEL_WORKOUT_GROUP,
    payload: {data}
}) 

export const cancelWorkoutChanges = (data) => ({
    type: ACTION_WORKOUT_CANCEL_CHANGES,
    payload: {data}
})

export const closeWorkoutDetails = (data) => ({
    type: ACTION_WORKOUT_CLOSE,
    payload: {data}
})