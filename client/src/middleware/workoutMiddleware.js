import { ACTION_CHANGE_WORKOUT_DATE, changeWorkoutDate, ACTION_SUBMIT_WORKOUT_DATE, ACTION_GO_BACK_TO_CALENDER, ACTION_SELECT_LOCATION } from "../actions/workoutAction";
import {format} from 'date-fns'
import { PAGE } from "../constants/page_constants";
const workoutAction = ({dispatch, getState}) => next => action => {

    if (action.type === ACTION_CHANGE_WORKOUT_DATE) {

        let date = format(action.payload.date, 'yyyy-MM-dd')
        next(changeWorkoutDate(date))
    } else {
        next(action)
    }
}


export default workoutAction