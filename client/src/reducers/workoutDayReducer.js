import { API_GET_WORKOUTDAY, API_GET_WORKOUTDAY_SUCCESS, API_RESTRUCTURE_WORKOUTDAY, API_GET_WORKOUTDAY_FAILURE } from "../actions/workoutAction";

const initialState = {
    sections : {},
    newSections: {},
    loading: false,
    error: false
};

export default function workoutDayReducer(state = initialState, action) {

    console.log(action);
    switch (action.type) {
        case API_GET_WORKOUTDAY: {
            return {
                ...state,
                loading: true,
                error: false
            }

        }
        case API_RESTRUCTURE_WORKOUTDAY : {
            return {
                ...state,
                loading: false,
                sections: action.payload.page.sections,
                newSections: action.payload.page.defaultSections

            }
        }
        case API_GET_WORKOUTDAY_FAILURE : {
            return {
                ...state,
                error: true,
                loading: false
            }
        }
        default : {
            return {
                ...state,
                error: false,
                loading: true

            }
        }
    }

}

