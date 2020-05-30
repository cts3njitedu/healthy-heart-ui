import { ACTION_REROUTE_PAGE } from "../actions/commonAction";
import { ACTION_CHANGE_CATEGORY_NAME, ACTION_CHANGE_CATEGORY_CONFIRMATION_YES, ACTION_CHANGE_CATEGORY_CONFIRMATION_NO, ACTION_WORKOUT_CLOSE, ACTION_WORKOUT_CLOSE_CONFIRMATION_YES, ACTION_WORKOUT_CLOSE_CONFIRMATION_NO, ACTION_CHANGE_WORKOUT_TYPE, ACTION_CHANGE_WORKOUT_TYPE_CONFIRMATION_YES, ACTION_CHANGE_WORKOUT_TYPE_CONFIRMATION_NO, ACTION_CANCEL_WORKOUT_GROUP, ACTION_CANCEL_WORKOUT_GROUP_CONFIRMATION_YES, ACTION_CANCEL_WORKOUT_GROUP_CONFIRMATION_NO, ACTION_WORKOUT_CANCEL_CHANGES, ACTION_WORKOUT_CANCEL_CHANGES_CONFIRMATION_YES, ACTION_WORKOUT_CANCEL_CHANGES_CONFIRMATION_NO, ACTION_WORKOUT_SUBMIT_CONFIRMATION_YES, ACTION_WORKOUT_SUBMIT_CONFIRMATION_NO, ACTION_WORKOUT_SUBMIT, ACTION_WORKOUT_DELETE, ACTION_WORKOUT_DELETE_CONFIRMATION_YES, ACTION_WORKOUT_DELETE_CONFIRMATION_NO } from "../actions/workoutAction";
import { ACTION_WORKOUT_SUBMIT_CONFIRMATION_MESSAGE, ACTION_WORKOUT_DELETE_CONFIRMATION_MESSAGE, ACTION_WORKOUTDAY_DELETE_CONFIRMATION_MESSAGE } from "../constants/page_constants";
import { API_DELETE_WORKOUTDAY_LOCATION, API_DELETE_WORKOUTDAY_LOCATION_CONFIRMATION_YES, API_DELETE_WORKOUTDAY_LOCATION_CONFIRMATION_NO } from "../actions/workoutDayAction";

const initialState = {

    routeMetaData: {
        routeUrl: "",
        routeType: ""
    },
    confirmationData: {}
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
            
        case ACTION_CHANGE_CATEGORY_NAME: {
            return {
                ...state,
                confirmationData: {
                    ...state.confirmationData,
                    confirmYes: ACTION_CHANGE_CATEGORY_CONFIRMATION_YES,
                    confirmNo: ACTION_CHANGE_CATEGORY_CONFIRMATION_NO,
                    data: {
                        ...action.payload.data
                    }
                }
            }
        }
        case ACTION_CHANGE_CATEGORY_CONFIRMATION_YES: {
            return {
                ...state,
                confirmationData: {},
            }
        }
        case ACTION_CHANGE_CATEGORY_CONFIRMATION_NO: {
            return {
                ...state,
                confirmationData: {}
            }
        }
        case ACTION_CHANGE_WORKOUT_TYPE: {
            return {
                ...state,
                confirmationData: {
                    ...state.confirmationData,
                    confirmYes: ACTION_CHANGE_WORKOUT_TYPE_CONFIRMATION_YES,
                    confirmNo: ACTION_CHANGE_WORKOUT_TYPE_CONFIRMATION_NO,
                    data : {
                        ...action.payload.data
                    }
                }
            }
        }

        case ACTION_CHANGE_WORKOUT_TYPE_CONFIRMATION_YES: {
            return {
                ...state,
                confirmationData: {}
            }
        }

        case ACTION_CHANGE_WORKOUT_TYPE_CONFIRMATION_NO: {
            return {
                ...state,
                confirmationData: {}
            }
        }
        
        case ACTION_WORKOUT_CLOSE: {
            return {
                ...state,
                confirmationData: {
                    ...state.confirmationData,
                    confirmYes: ACTION_WORKOUT_CLOSE_CONFIRMATION_YES,
                    confirmNo: ACTION_WORKOUT_CLOSE_CONFIRMATION_NO,
                    data : {
                        ...action.payload.data
                    }
                }
            }
        }
        case ACTION_WORKOUT_CLOSE_CONFIRMATION_YES: {
            return {
                ...state,
                confirmationData:{}
            }
        }
        case ACTION_WORKOUT_CLOSE_CONFIRMATION_NO: {
            return {
                ...state,
                confirmationData:{}
            }
        }
        case ACTION_CANCEL_WORKOUT_GROUP: {
            return {
                ...state,
                confirmationData: {
                    ...state.confirmationData,
                    confirmYes: ACTION_CANCEL_WORKOUT_GROUP_CONFIRMATION_YES,
                    confirmNo: ACTION_CANCEL_WORKOUT_GROUP_CONFIRMATION_NO,
                    data : {
                        ...action.payload.data
                    }
                }
            }
        }

        case ACTION_CANCEL_WORKOUT_GROUP_CONFIRMATION_YES: {
            return {
                ...state,
                confirmationData:{}
            }
        }
        case ACTION_CANCEL_WORKOUT_GROUP_CONFIRMATION_NO: {
            return {
                ...state,
                confirmationData:{}
            }
        }

        case ACTION_WORKOUT_CANCEL_CHANGES: {
            return {
                ...state,
                confirmationData: {
                    ...state.confirmationData,
                    confirmYes: ACTION_WORKOUT_CANCEL_CHANGES_CONFIRMATION_YES,
                    confirmNo: ACTION_WORKOUT_CANCEL_CHANGES_CONFIRMATION_NO,
                    data : {
                        ...action.payload.data
                    }
                }
            }
        }

        case ACTION_WORKOUT_CANCEL_CHANGES_CONFIRMATION_YES: {
            return {
                ...state,
                confirmationData:{}
            }
        }

        case ACTION_WORKOUT_CANCEL_CHANGES_CONFIRMATION_NO: {
            return {
                ...state,
                confirmationData:{}
            }
        }

        case ACTION_WORKOUT_SUBMIT: {
            return {
                ...state,
                confirmationData: {
                    ...state.confirmationData,
                    confirmYes: ACTION_WORKOUT_SUBMIT_CONFIRMATION_YES,
                    confirmNo: ACTION_WORKOUT_SUBMIT_CONFIRMATION_NO,
                    confirmMessage: ACTION_WORKOUT_SUBMIT_CONFIRMATION_MESSAGE,
                    data : {
                        ...action.payload.data
                    }
                }
            }
        }
        case ACTION_WORKOUT_SUBMIT_CONFIRMATION_YES: {
            return {
                ...state,
                confirmationData: {}

            }
        }
        case ACTION_WORKOUT_SUBMIT_CONFIRMATION_NO: {
            return {
                ...state,
                confirmationData: {}

            }
        }
        case ACTION_WORKOUT_DELETE: {
            return {
                ...state,
                confirmationData: {
                    ...state.confirmationData,
                    confirmYes: ACTION_WORKOUT_DELETE_CONFIRMATION_YES,
                    confirmNo: ACTION_WORKOUT_DELETE_CONFIRMATION_NO,
                    confirmMessage: ACTION_WORKOUT_DELETE_CONFIRMATION_MESSAGE,
                    data : {
                        ...action.payload.data
                    }
                }
            }
        }

        case ACTION_WORKOUT_DELETE_CONFIRMATION_YES: {
            return {
                ...state,
                confirmationData: {}

            }
        }
        case ACTION_WORKOUT_DELETE_CONFIRMATION_NO: {
            return {
                ...state,
                confirmationData: {}

            }
        }
        case API_DELETE_WORKOUTDAY_LOCATION: {
            return {
                ...state,
                confirmationData: {
                    ...state.confirmationData,
                    confirmYes: API_DELETE_WORKOUTDAY_LOCATION_CONFIRMATION_YES,
                    confirmNo: API_DELETE_WORKOUTDAY_LOCATION_CONFIRMATION_NO,
                    confirmMessage: ACTION_WORKOUTDAY_DELETE_CONFIRMATION_MESSAGE,
                    data : {
                        ...action.payload.data
                    }
                }
            }
        }
        case API_DELETE_WORKOUTDAY_LOCATION_CONFIRMATION_YES: {
            return {
                ...state,
                confirmationData: {}

            }
        }
        case API_DELETE_WORKOUTDAY_LOCATION_CONFIRMATION_NO: {
            return {
                ...state,
                confirmationData: {}

            }
        }
        default:
            return {
                routeMetaData: {
                    routeUrl: "",
                    routeType: ""
                },
                confirmationData: {}
            }
    }
}