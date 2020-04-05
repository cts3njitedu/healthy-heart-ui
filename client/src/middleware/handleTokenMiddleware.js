import { API_POST_LOGIN_PAGE_SUCCESS, API_POST_LOGOUT_PAGE_SUCCESS } from "../actions/loginAction"
import { storeUserInfo, removeUserInfo } from "../actions/userAction"
import { API_GET_ABOUT_PAGE_SUCCESS, API_GET_ABOUT_PAGE_FAILURE } from "../actions/aboutAction"
import { API_GET_CALENDAR_SUCCESS, API_GET_CALENDAR_FAILURE } from "../actions/calendarAction"


export const handleToken = ({dispatch, getState}) => next => action => {
    if (action.type === API_POST_LOGIN_PAGE_SUCCESS 
        || action.type === API_GET_ABOUT_PAGE_SUCCESS || action.type === API_GET_CALENDAR_SUCCESS) {
        // console.log("Handle Token: ", action)
        dispatch(storeUserInfo({
            accessToken: action.payload.header.token
        }))
        next(action)
    } else if (action.type === API_POST_LOGOUT_PAGE_SUCCESS 
        || action.type === API_GET_ABOUT_PAGE_FAILURE
        || action.type === API_GET_CALENDAR_FAILURE) {
        dispatch(removeUserInfo())
        next(action)

    } else {
        next(action)
    }
}