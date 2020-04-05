import { API_GET_CALENDAR, API_GET_CALENDAR_START, API_RESTRUCTURE_CALENDAR } from "../actions/calendarAction";

const initialState = {

    loading: false,
    error: false,
    calendar : {}
};



export default function calendarReducer(state = initialState, action) {
    console.log(action);
    switch (action.type) {
        case API_GET_CALENDAR:
            return {
                ...state,
                loading: false
            }
        case API_RESTRUCTURE_CALENDAR: 
            return {
                ...state,
                loading: false,
                calendar: action.payload.calendar

            }
        case API_GET_CALENDAR_START: 
            return {
                ...state, 
                loading: true
            }
        default:
        // ALWAYS have a default case in a reducer
        return {
            loading: false,
            error: false,
            calendar: {}
        }
    }
}