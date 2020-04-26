import { API_GET_LOGIN_PAGE, API_POST_LOGIN_PAGE, API_POST_LOGOUT_PAGE } from "../actions/loginAction";
import Axios from "axios";
import { API_GET_ABOUT_PAGE } from "../actions/aboutAction";
import { API_GET_CALENDAR } from "../actions/calendarAction";
import { API_GET_WORKOUTDAY, API_ADD_WORKOUTDAY_LOCATION } from "../actions/workoutAction";

const accessTokenActions = [ 
    API_GET_ABOUT_PAGE, 
    API_GET_CALENDAR, 
    API_GET_WORKOUTDAY,
    API_ADD_WORKOUTDAY_LOCATION
];

const middleWareActions = [
    API_GET_LOGIN_PAGE,
    API_POST_LOGIN_PAGE,
    API_GET_ABOUT_PAGE,
    API_POST_LOGOUT_PAGE,
    API_GET_CALENDAR,
    API_GET_WORKOUTDAY,
    API_ADD_WORKOUTDAY_LOCATION
]
const apiMiddleware = ({dispatch}) => next => action => {

    if (middleWareActions.includes(action.type)) {
        const {
            url,
            method,
            data,
            onStart,
            onSuccess,
            onFailure,
            headers
        } = action.payload;
    
        let accessToken = null;
      
        if (accessTokenActions.includes(action.type)) {
            accessToken = localStorage.getItem("accessToken");
        }
        

        // console.log("This is the: ", accessToken)
        const dataOrParams = ["GET", "DELETE"].includes(method) ? "params" : "data";
    
        Axios.defaults.headers.common["Content-Type"] = "application/json";
        Axios.defaults.withCredentials = true
        Axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        next(onStart());
        console.log("Action Payload", action.payload)
        Axios.request({
            url,
            method,
            [dataOrParams]: data,
            headers
        }).then(res => {
            // console.log("Succesfully completed", res)
            next(onSuccess(res.data, res.headers));
        }).catch(error => {
            let response = error.response
            console.log("What action is here: ", error)
            dispatch(onFailure(response, response.data.page))
        });
    } else {
        next(action);
    }
    

}
export default apiMiddleware

