import { ACTION_CHANGE_WORKOUT_DATE, changeWorkoutDate, ACTION_SELECT_LOCATION_START, selectLocationEnd, ACTION_SORT_LOCATION_TABLE_START, sortLocationTable } from "../actions/workoutAction";
import {format} from 'date-fns'
import { PAGE, ACTIVITY } from "../constants/page_constants";
const workoutAction = ({getState}) => next => action => {

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

    } else {
        next(action)
    }
}


export default workoutAction