import { STORE_USER_INFO, REMOVE_USER_INFO } from "../actions/userAction";

const initialState = {

    isAccessTokenEnabled: false
  };

export default function userReducer(state = initialState, action) {
    console.log(action);

    switch (action.type) {
      case STORE_USER_INFO: 
      localStorage.setItem('accessToken', action.payload.user.accessToken)
       return {
           ...state,
    
            isAccessTokenEnabled: localStorage.getItem('accessToken') || false
            

       }
       case REMOVE_USER_INFO:
        localStorage.removeItem('accessToken')
       return {
         ...state,
         isAccessTokenEnabled: false
       }
          
      default:
        // ALWAYS have a default case in a reducer
        return {
     
              isAccessTokenEnabled: localStorage.getItem('accessToken') || false
      
        }
    }
  }