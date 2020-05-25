import { API_POST_LOGIN_PAGE_SUCCESS, API_POST_LOGOUT_PAGE_SUCCESS } from "../actions/loginAction"
import { storeUserInfo, removeUserInfo } from "../actions/userAction"
import { API_GET_ABOUT_PAGE_SUCCESS, API_GET_ABOUT_PAGE_FAILURE } from "../actions/aboutAction"
import { API_GET_CALENDAR_SUCCESS, API_GET_CALENDAR_FAILURE } from "../actions/calendarAction"
import { API_GET_WORKOUTDAY_SUCCESS, API_GET_WORKOUTDAY_FAILURE, API_ADD_WORKOUTDAY_LOCATION_SUCCESS, API_ADD_WORKOUTDAY_LOCATION_FAILURE } from "../actions/workoutDayAction"
import { API_GET_WORKOUTS_FAILURE, API_GET_WORKOUTS_SUCCESS } from "../actions/workoutAction"


const middleWareActions = [
    API_POST_LOGIN_PAGE_SUCCESS,
    API_GET_ABOUT_PAGE_SUCCESS,
    API_GET_CALENDAR_SUCCESS,
    API_GET_WORKOUTDAY_SUCCESS,
    API_ADD_WORKOUTDAY_LOCATION_SUCCESS,
    API_GET_WORKOUTS_SUCCESS

]
const failureActions = [
    API_POST_LOGOUT_PAGE_SUCCESS,
    API_GET_ABOUT_PAGE_FAILURE,
    API_GET_CALENDAR_FAILURE,
    API_GET_WORKOUTDAY_FAILURE,
    API_ADD_WORKOUTDAY_LOCATION_FAILURE,
    API_GET_WORKOUTS_FAILURE
]
export const handleToken = ({dispatch}) => next => action => {
    if (middleWareActions.includes(action.type)) {
        // console.log("Handle Token: ", action)
        dispatch(storeUserInfo({
            accessToken: action.payload.header.token
        }))
        next(action)
    } else if (failureActions.includes(action.type)) {
        dispatch(removeUserInfo())
        next(action)

    } else {
        next(action)
    }
}