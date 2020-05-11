import { ACTION_CHANGE_WORKOUT_DATE, changeWorkoutDate, ACTION_SELECT_LOCATION_START, selectLocationEnd, ACTION_SORT_LOCATION_TABLE_START, sortLocationTable } from "../actions/workoutDayAction";
import { format } from 'date-fns'
import { PAGE, ACTIVITY, SECTION } from "../constants/page_constants";
import { ACTION_GET_WORKOUTS_BY_CATEGORY, addNewWorkout, ACTION_ADD_WORKOUT_START, ACTION_CHANGE_CATEGORY_CONFIRMATION_YES, ACTION_CHANGE_CATEGORY_NAME, confirmationAction, changeCategoryName, ACTION_CHANGE_WORKOUT_TYPE, ACTION_CHANGE_WORKOUT_TYPE_CONFIRMATION_YES, changeWorkoutType, keepWorkoutState, ACTION_HANDLE_CHANGE_GROUP, handleChangeGroup, ACTION_CANCEL_WORKOUT_GROUP, ACTION_ADD_EDIT_WORKOUT_GROUP_START, addOREditWorkoutGroupStart, cancelGroupFrom, ACTION_CANCEL_WORKOUT_GROUP_CONFIRMATION_YES } from "../actions/workoutAction";
import { isEmpty } from 'lodash'
const workoutAction = ({ getState }) => next => action => {

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
        let selectedWorkout = state.workoutDetails.selectedWorkout

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
        if (categoryField.value === "") {
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
        if (workoutTypeField.value === "") {
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
            isDirty: isDirtyFields.length !== 0 || (changeField.value != sourceField.value)
        }
        console.log("Dirty:", mergedField)
        next(handleChangeGroup(mergedField))
    } else if (action.type === ACTION_ADD_EDIT_WORKOUT_GROUP_START) {
        let state = getState();
        let activitySection = state.workoutDetails.sections[PAGE.WORKOUT_DETAILS_PAGE.ACTIVITY_SECTION][0];
        let fields = activitySection.fields;
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
    } else {
        next(action)
    }
}


export default workoutAction