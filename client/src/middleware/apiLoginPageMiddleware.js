import { API_GET_LOGIN_PAGE, API_POST_LOGIN_PAGE, API_POST_LOGOUT_PAGE } from "../actions/loginAction";
import Axios from "axios";
import { API_GET_ABOUT_PAGE } from "../actions/aboutAction";

const apiMiddleware = ({dispatch}) => next => action => {

    if (action.type === API_GET_LOGIN_PAGE || action.type === API_POST_LOGIN_PAGE || 
        action.type === API_GET_ABOUT_PAGE || action.type === API_POST_LOGOUT_PAGE) {
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
      
        if (action.type === API_GET_ABOUT_PAGE) {
            accessToken = localStorage.getItem("accessToken");
        }
        

        // console.log("This is the: ", accessToken)
        const dataOrParams = ["GET", "DELETE"].includes(method) ? "params" : "data";
    
        Axios.defaults.headers.common["Content-Type"] = "application/json";
        Axios.defaults.withCredentials = true
        Axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        next(onStart());
    
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
            console.log("What action is here: ", response)
            dispatch(onFailure(response, response.data.page))
        });
    } else {
        next(action);
    }
    

}
export default apiMiddleware

