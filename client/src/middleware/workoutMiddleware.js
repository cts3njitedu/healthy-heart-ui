import { ACTION_CHANGE_WORKOUT_DATE, changeWorkoutDate, ACTION_SELECT_LOCATION_START, selectLocationEnd, ACTION_SORT_LOCATION_TABLE_START, sortLocationTable, API_DELETE_WORKOUTDAY_LOCATION, API_DELETE_WORKOUTDAY_LOCATION_CONFIRMATION_YES, deleteWorkoutDayLocation, API_DELETE_WORKOUTDAY_LOCATION_BUILD } from "../actions/workoutDayAction";
import { format } from 'date-fns'
import { PAGE, ACTIVITY, SECTION, ROUTETYPE } from "../constants/page_constants";
import { ACTION_GET_WORKOUTS_BY_CATEGORY, addNewWorkout, ACTION_ADD_WORKOUT_START, ACTION_CHANGE_CATEGORY_CONFIRMATION_YES, ACTION_CHANGE_CATEGORY_NAME, confirmationAction, changeCategoryName, ACTION_CHANGE_WORKOUT_TYPE, ACTION_CHANGE_WORKOUT_TYPE_CONFIRMATION_YES, changeWorkoutType, ACTION_HANDLE_CHANGE_GROUP, handleChangeGroup, ACTION_CANCEL_WORKOUT_GROUP, ACTION_ADD_EDIT_WORKOUT_GROUP_START, addOREditWorkoutGroupStart, cancelGroupFrom, ACTION_CANCEL_WORKOUT_GROUP_CONFIRMATION_YES, ACTION_ADD_EDIT_WORKOUT_GROUP_SAVE, addOREditWorkoutGroupSave, ACTION_ADD_WORKOUT_GROUP_SAVE, ACTION_EDIT_WORKOUT_GROUP_SAVE, ACTION_WORKOUT_CANCEL_CHANGES, cancelWorkoutChanges, ACTION_WORKOUT_CLOSE, closeWorkoutDetails, ACTION_WORKOUT_CLOSE_CONFIRMATION_YES, buildWorkoutsRequest, ACTION_WORKOUT_SUBMIT_CONFIRMATION_YES, API_ACTION_WORKOUT_DETAILS_SUBMIT_BUILD, ACTION_WORKOUT_SUBMIT, submitWorkout, ACTION_WORKOUT_DELETE_CONFIRMATION_YES, API_ACTION_WORKOUT_DELETE_BUILD } from "../actions/workoutAction";
import { isStringEmpty } from "../utilities/stringUtility";
import { reRoutePage } from "../actions/commonAction";
const workoutAction = ({ dispatch, getState }) => next => action => {

    if (action.type === ACTION_CHANGE_WORKOUT_DATE) {

        let date = format(action.payload.date, 'yyyy-MM-dd')
        next(changeWorkoutDate(date))

    } else if (action.type === ACTION_SELECT_LOCATION_START) {
        let state = getState();
        let location = action.payload.newLocation;
        let activityId = action.payload.metaData;
        let newActivitySections = state.workoutDay.newSections[PAGE.WORKOUT_DAY_LOCATIONS_PAGE.ACTIVITY_SECTION];
        console.log("New Sections Here:", newActivitySections)
        let activitySectionId = location.isChecked ? ACTIVITY.LOCATION_SELECTED : ACTIVITY.DEFAULT;
        let newActivitySection = newActivitySections.filter((item) => {
            if (item.sectionId === activitySectionId) {
                return true;
            } else {
                return false
            }
        })
        console.log("New Section:", newActivitySection)
        next(selectLocationEnd(location, activityId, newActivitySection[0].fields))
    } else if (action.type === ACTION_SORT_LOCATION_TABLE_START) {
        let state = getState()
        let fieldName = action.payload.fieldName
        let locationHeaderSection = state.workoutDay.sections[PAGE.WORKOUT_DAY_LOCATIONS_PAGE.LOCATION_HEADER_SECTION][0]
        let currSortOrder = locationHeaderSection.fields[fieldName].sortOrder;
        let sortOrder = null;
        if (currSortOrder === null) {
            sortOrder = ACTIVITY.SORT.ASCEND;
        } else if (currSortOrder.toUpperCase() === ACTIVITY.SORT.ASCEND) {
            sortOrder = ACTIVITY.SORT.DESCEND
        }
        console.log("Sorting", fieldName, sortOrder)
        next(sortLocationTable(fieldName, sortOrder))

    } else if (action.type === ACTION_GET_WORKOUTS_BY_CATEGORY) {
        let state = getState();
        let workoutSections = state.workout.sections[PAGE.WORKOUTS_PAGE.WORKOUT_SECTION];
        console.log("Workout Sections Middleware:", workoutSections)
    } else if (action.type === ACTION_ADD_WORKOUT_START) {

        let state = getState();

        next(action);
        let workoutSections = state.workout.newSections[PAGE.WORKOUTS_PAGE.WORKOUT_SECTION];
        console.log("New Workout Section:", workoutSections)
        next(addNewWorkout(workoutSections[0]))



    } else if (action.type === ACTION_CHANGE_CATEGORY_NAME) {
        let state = getState();
        let selectedWorkout = state.workoutDetails.selectedWorkout;
        let workoutSection = selectedWorkout.workoutSection;
        let categoryField = workoutSection.fields[SECTION.WORKOUTS_PAGE.WORKOUT_SECTION.CATEGORY_NAME]
        let code = action.payload.data.code;
        let value = action.payload.data.value;
        let values = categoryField.items.filter(item => item.id === code)[0].values;
        let data = {
            workoutTypeItems: Object.keys(values).map(key => {
                return {
                    id: key,
                    item: values[key].item
                }
            }),
            category: {
                code: code,
                value: value
            }

        }
        console.log("Data:", data)
        if (isStringEmpty(categoryField.value)) {
            next(confirmationAction(ACTION_CHANGE_CATEGORY_CONFIRMATION_YES, data))
        } else {
            next(changeCategoryName(data))
        }
    } else if (action.type === ACTION_CHANGE_CATEGORY_CONFIRMATION_YES) {
        console.log("Confirmation of Change:", action.payload.data)
        next(action)
    } else if (action.type === ACTION_CHANGE_WORKOUT_TYPE) {
        let state = getState();
        let selectedWorkout = state.workoutDetails.selectedWorkout;
        let workoutSection = selectedWorkout.workoutSection;
        let workoutTypeField = workoutSection.fields[SECTION.WORKOUTS_PAGE.WORKOUT_SECTION.WORKOUT_TYPE_DESC];
        let code = action.payload.data.code;
        let value = action.payload.data.value;
        let data = {
            workoutTypeDesc: {
                code: code,
                value: value
            }

        }
        console.log("Data:", data)
        if (isStringEmpty(workoutTypeField.value)) {
            next(confirmationAction(ACTION_CHANGE_WORKOUT_TYPE_CONFIRMATION_YES, data))
        } else {
            next(changeWorkoutType(data))
        }

    } else if (action.type === ACTION_HANDLE_CHANGE_GROUP) {
        let state = getState();
        let changeField = action.payload.field;
        let sourceEditGroup = state.workoutDetails.sourceEditGroup;
        let sourceField = sourceEditGroup.fields[changeField.name];
        let editGroup = state.workoutDetails.editGroup;
        let fields = editGroup.fields;
        let isDirtyFields = Object.keys(fields)
                            .filter(f => (f !== changeField.name) && (sourceEditGroup.fields[f].value !== fields[f].value));

        console.log("Handle:", sourceField, changeField, isDirtyFields)
        let mergedField = {
            name: changeField.name,
            value: changeField.value,
            isDirty: isDirtyFields.length !== 0 || (changeField.value !== sourceField.value)
        }
        console.log("Dirty:", mergedField)
        next(handleChangeGroup(mergedField))
    } else if (action.type === ACTION_ADD_EDIT_WORKOUT_GROUP_START) {
        let state = getState();
        let activitySection = state.workoutDetails.sections[PAGE.WORKOUT_DETAILS_PAGE.ACTIVITY_SECTION][0];
        let fields = activitySection.fields;
        console.log("Edit Group Fields: ", fields)
        let currentActivityFields = Object.keys(fields).reduce((result, key) => {
            result[key] = {
              ...fields[key]  
            }
            return result;
        }, {})
        let data = {
            currentActivityFields: currentActivityFields
        }
        next(addOREditWorkoutGroupStart(action.payload.isAddGroup, action.payload.editGroup, data))

    } else if (action.type === ACTION_CANCEL_WORKOUT_GROUP) {
        let state = getState();
        let previousActivities = state.workoutDetails.previousActivityButtons;
        let data = {
            previousActivities
        }
        let editGroup = state.workoutDetails.editGroup;
        let fields = editGroup.fields;
        let hasDirty = Object.keys(fields).filter(f => fields[f].isDirty).length !== 0;
        console.log("Previous Activities:", data, fields, hasDirty)
        if (hasDirty) {
            console.log("There are dirty fields")
            next(cancelGroupFrom(data))
        } else {
            console.log("There are none")
            next(confirmationAction(ACTION_CANCEL_WORKOUT_GROUP_CONFIRMATION_YES, data))
        }
        

    } else if (action.type === ACTION_CANCEL_WORKOUT_GROUP_CONFIRMATION_YES) {
        console.log("Confirm Cancel:", action.payload.data)
        next(action)
    } else if (action.type === ACTION_ADD_EDIT_WORKOUT_GROUP_SAVE) {

        let state = getState();
    
        let newMetaDataId = state.workoutDetails.newGroupMetaDataId;
        let editGroup = { ...state.workoutDetails.editGroup};
        let isAddGroup = !editGroup.hasOwnProperty("metaDataId");
        console.log("Save Group Before:",editGroup)
        if (isAddGroup) {
            editGroup.metaDataId = newMetaDataId;
        }
      

        let previousActivities = state.workoutDetails.previousActivityButtons;
        let data = {
            previousActivities
        }
        
      

        console.log("Save Group After:", editGroup, data);
        next(addOREditWorkoutGroupSave(ACTION_ADD_EDIT_WORKOUT_GROUP_SAVE, editGroup, data));
        if (isAddGroup) {   
            next(addOREditWorkoutGroupSave(ACTION_ADD_WORKOUT_GROUP_SAVE, editGroup, data))
        } else {
            next(addOREditWorkoutGroupSave(ACTION_EDIT_WORKOUT_GROUP_SAVE, editGroup, data))
        }

    } else if (action.type === ACTION_WORKOUT_CANCEL_CHANGES) {
        console.log("Canceling Workout Changes")
        next(cancelWorkoutChanges())
    } else if (action.type === ACTION_WORKOUT_CLOSE) {
        let state = getState();
        console.log("Closing is Dirty:", state.workoutDetails.isDirty)
        if (state.workoutDetails.isDirty) {
            console.log("Confirmation Screen Close")
            next(closeWorkoutDetails())
        } else {
            console.log("No Confirmation Screen")
            dispatch(confirmationAction(ACTION_WORKOUT_CLOSE_CONFIRMATION_YES))
        }

    } else if (action.type === ACTION_WORKOUT_CLOSE_CONFIRMATION_YES) {
        let state = getState();
        console.log("Close confirmation", state.workout.workoutDayUrl)
        let url = state.workout.workoutDayUrl + "/workouts"
        let workoutSection = state.workoutDetails.selectedWorkout.workoutSection;
        let categoryName = workoutSection.fields[SECTION.WORKOUT_DETAILS_PAGE.WORKOUT_SECTION.CATEGORY_NAME]
        let items = categoryName.items;
        console.log("Category Field:", categoryName)
        let catValue = (categoryName.value !== null && categoryName.value.length !== 0) ?
                        items.filter(i => i.id === categoryName.value) : [];
        if (catValue.length > 0) {
            catValue = catValue[0].item;
        } else {
            catValue = "";
        }
        if (catValue.length !== 0) {
            url = url + "/category/" + catValue.toLowerCase()
        }
        next(action)
        next(reRoutePage({
            url: url,
            routeType: ROUTETYPE.PUSH
        }))

    } else if (action.type === ACTION_WORKOUT_SUBMIT) {
        let isSubmitAndClose = action.payload.isSubmitAndClose
        let data = {
            isSubmitAndClose,
            ...action.payload.data
        }
        next(submitWorkout(isSubmitAndClose, data))
    } else if (action.type === ACTION_WORKOUT_SUBMIT_CONFIRMATION_YES) {
        next(action)
        console.log("Confirmation is Great")
        dispatch(buildWorkoutsRequest("/workoutDays", API_ACTION_WORKOUT_DETAILS_SUBMIT_BUILD, action.payload.data))
    } else if (action.type === ACTION_WORKOUT_DELETE_CONFIRMATION_YES) {
        console.log("Delete Confirmation:", action.payload.data)
        next(action)
        dispatch(buildWorkoutsRequest("", API_ACTION_WORKOUT_DELETE_BUILD, action.payload.data))
    } else if (action.type === API_DELETE_WORKOUTDAY_LOCATION) {
        let state = getState()
        let selectedLocation = state.workoutDay.selectedLocation;
        let data = {
            selectedLocation: selectedLocation
        }
        console.log("Deleted Location Here", data)
        next(deleteWorkoutDayLocation(data))
    } else if (action.type === API_DELETE_WORKOUTDAY_LOCATION_CONFIRMATION_YES) {
        console.log("Confirmation Location Delete:", action.payload.data.selectedLocation)
        next(action)
        dispatch(buildWorkoutsRequest("", API_DELETE_WORKOUTDAY_LOCATION_BUILD, action.payload.data))
    }
    else {
        next(action)
    }
}


export default workoutAction