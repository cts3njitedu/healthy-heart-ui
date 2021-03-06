import { API_GET_WORKOUTS_HEADER_BUILD, API_GET_WORKOUTS_START, API_RESTRUCTURE_WORKOUTS, API_GET_WORKOUTS_BUILD, API_KEEP_WORKOUTS_STATE, ACTION_ADD_WORKOUT_START, ACTION_WORKOUT_SUBMITTED, ACTION_WORKOUT_DELETE, ACTION_WORKOUT_DELETE_CONFIRMATION_YES, ACTION_WORKOUT_DELETE_CONFIRMATION_NO, ACTION_WORKOUT_DELETED } from "../actions/workoutAction";

const initialState = {
    sections : { 
    },
    newSections: {},
    loading: false,
    error: false,
    isViewWorkout: false,
    isAddWorkout: true,
    workoutViews: {},
    selectedWorkout : {},
    editedWorkout : {},
    isEditWorkout: false,
    workoutDayUrl: "",
    metaLoadingState: {
        isHeaderLoading: false,
        isHeaderError: false,
        isWorkoutsLoading: false,
        isWorkoutsError: false
    },
    categorySections: {},
    exactUrl: "",
    queryParams: {},
    params: {},
    tempParams: {},
    isDeleting: false,
    isDeleted: false
    
};


export default function workoutReducer(state = initialState, action) {
    console.log(action);
    switch (action.type) {
        case API_GET_WORKOUTS_START: {
            return {
                ...state,
                loading: true,
                error: false
            }
        }
        case API_RESTRUCTURE_WORKOUTS : {
            let pageSections = action.payload.page.sections;
            let pageNewSections = action.payload.page.newSections;
            let loading = action.payload.metaData.metaLoading
            let error = action.payload.metaData.metaError
            return {
                ...state,
                loading: false,
                sections: {
                    ...state.sections,
                    ...pageSections
                },
                newSections: {
                    ...state.newSections,
                    ...pageNewSections
                },
                metaLoadingState: {
                    ...state.metaLoadingState,
                    [loading]: false,
                    [error]: false
                },
                categorySections: action.payload.page.categorySections,
                isDeleting: false,
                isDeleted: false
                  

            }
        }
        case API_GET_WORKOUTS_HEADER_BUILD: {
            return {
                ...state,
                workoutDayUrl: action.payload.url,
                exactUrl: action.payload.data.exactUrl,
                params: action.payload.data.params,
                queryParams: {
                   ...action.payload.data.values
                },
                metaLoadingState: {
                    ...state.metaLoadingState,
                    isHeaderLoading: true,
                    isHeaderError: false,
                }
            }
        }
        case API_GET_WORKOUTS_BUILD: {
            return {
                ...state,
                metaLoadingState: {
                    ...state.metaLoadingState,
                    isWorkoutsLoading: true,
                    isWorkoutsError: false
                }
            }
        }
        case API_KEEP_WORKOUTS_STATE: {
            return {
                ...state,
                exactUrl: action.payload.data.exactUrl,
                queryParams: {
                   ...action.payload.data.queryParams
                }
            }
        }
        case ACTION_ADD_WORKOUT_START: {
            return {
                ...state,
                isAddWorkout: true,
                exactUrl: action.payload.data.exactUrl,
                queryParams: {
                   ...action.payload.data.queryParams
                }
            }
        }
        case ACTION_WORKOUT_SUBMITTED: {
            return {
                ...state,
                workoutDayUrl: ""
            }
        }
        case ACTION_WORKOUT_DELETE: {
            return {
                ...state,
                isDeleting: true
            }
        }
        case ACTION_WORKOUT_DELETE_CONFIRMATION_YES: {
            return {
                ...state,
                isDeleted: true
            }
        }
        case ACTION_WORKOUT_DELETE_CONFIRMATION_NO: {
            return {
                ...state,
                isDeleting: false
            }
        }
        case ACTION_WORKOUT_DELETED: {
            return {
                ...state,
                isDeleting: false,
                isDeleted: false,
                workoutDayUrl: ""
            }
        }
        default: {
            return {
                ...state,
                loading: true,
                error: false,
                isViewWorkout: false,
                workoutViews: {},
                selectedWorkout : {},
                editedWorkout : {},
                isEditWorkout: false,
                isAddWorkout: true
            }
        }
    }
}