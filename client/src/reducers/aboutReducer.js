import { API_GET_ABOUT_PAGE_SUCCESS, API_GET_ABOUT_PAGE_FAILURE, API_GET_ABOUT_PAGE_START } from "../actions/aboutAction";

const initialState = {

    loading: false,
    error: false
  };

export default function aboutReducer(state = initialState, action) {
    console.log(action);
    switch (action.type) {
        case API_GET_ABOUT_PAGE_FAILURE:
            return {
                ...state,
                loading: false
            }
        case API_GET_ABOUT_PAGE_SUCCESS: 
            return {
                ...state,
                loading: false
            }
        case API_GET_ABOUT_PAGE_START: 
            return {
                ...state, 
                loading: true
            }
      default:
        // ALWAYS have a default case in a reducer
        return {
     
              loading: false,
              error: false
      
        }
    }
  }