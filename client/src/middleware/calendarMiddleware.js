import { API_GET_CALENDAR_SUCCESS, restructureCalendar } from "../actions/calendarAction";
import _ from 'lodash'
const getCalendar = ({dispatch, getState}) => next => action => {
    if (action.type === API_GET_CALENDAR_SUCCESS) {
        let yearToDay = _.groupBy(action.payload.calendar, function(workoutDay){
            return workoutDay.year;
        })
        let yearToMonthToDay = _.forEach(yearToDay, function(value, key) {
            yearToDay[key] = _.groupBy(yearToDay[key], function(workoutDay) {
                return workoutDay.monthId
            })
        })
        next(restructureCalendar(yearToMonthToDay))
    } else {
        next(action)
    }


}

export default getCalendar;