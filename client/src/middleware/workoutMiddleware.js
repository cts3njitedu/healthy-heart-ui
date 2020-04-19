import { ACTION_CHANGE_WORKOUT_DATE, changeWorkoutDate, ACTION_SUBMIT_WORKOUT_DATE, ACTION_GO_BACK_TO_CALENDER, ACTION_SELECT_LOCATION, ACTION_SELECT_LOCATION_START, selectLocationEnd, ACTION_CANCEL_CHANGE_WORKOUT_DATE } from "../actions/workoutAction";
import {format} from 'date-fns'
import { PAGE, ACTIVITY } from "../constants/page_constants";
import _ from 'lodash'
const workoutAction = ({dispatch, getState}) => next => action => {

    if (action.type === ACTION_CHANGE_WORKOUT_DATE) {

        let date = format(action.payload.date, 'yyyy-MM-dd')
        next(changeWorkoutDate(date))

    } else if(action.type === ACTION_SELECT_LOCATION_START) {
        let state = getState();
        let location = action.payload.newLocation;
        let activityId = action.payload.metaData;
        let newActivitySections = state.workoutDay.newSections[PAGE.WORKOUT_DAY_LOCATIONS_PAGE.ACTIVITY_SECTION];
        console.log("New Sections Here:", newActivitySections)
        let activitySectionId = location.isChecked ? ACTIVITY.LOCATION_SELECTED : ACTIVITY.DEFAULT;
        let newActivitySection = newActivitySections.filter((item, index) => {
            if (item.sectionId === activitySectionId) {
                return true;
            } else {
                return false
            }
        })
        console.log("New Section:", newActivitySection)
        next(selectLocationEnd(location, activityId, newActivitySection[0].fields))
    } else {
        next(action)
    }
}


export default workoutAction