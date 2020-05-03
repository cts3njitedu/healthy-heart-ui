import { API_GET_WORKOUTS_HEADER_BUILD, API_GET_WORKOUTS_START, API_RESTRUCTURE_WORKOUTS } from "../actions/workoutAction";
import { ACTION } from "../constants/page_constants";

const initialState = {
    sections : { 
    },
    newSections: {},
    loading: false,
    error: false,
    isViewWorkout: false,
    workoutViews: {},
    selectedWorkout : {},
    editedWorkout : {},
    isEditWorkout: false,
    workoutDayUrl: "",
    metaLoadingState: {
        isHeaderLoading: false,
        isHeaderError: false
    } 
    
};


export default function workoutReducer(state = initialState, action) {
    console.log(action);
    switch (action.type) {
        case API_GET_WORKOUTS_START: {
            return {
                ...state,
                loading: true,
                error: false,
                metaLoadingState: {
                    ...state.metaLoadingState,
                    isHeaderLoading: true,
                    isHeaderError: false
                }
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
                }
                  

            }
        }
        case API_GET_WORKOUTS_HEADER_BUILD: {
            return {
                ...state,
                workoutDayUrl: action.payload.url
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
            }
        }
    }
}