import { ACTION_REROUTE_PAGE } from "../actions/commonAction";

const initialState = {

    routeMetaData: {
        routeUrl: "",
        routeType: ""
    }
  };

  export default function userReducer(state = initialState, action) {
      console.log(action)
      switch (action.type) {
        case ACTION_REROUTE_PAGE:
            return {
                ...state,
                routeMetaData: {
                    routeUrl: action.payload.data.url,
                    routeType: action.payload.data.routeType
                }
            }
        default:
            return {
                routeMetaData: {
                    routeUrl: "",
                    routeType: ""
                }
            }
      }
  }