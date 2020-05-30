import { API_GET_WORKOUTS_FAILURE } from "../actions/workoutAction";
import { API_GET_WORKOUTDAY_FAILURE } from "../actions/workoutDayAction";

const workoutActions = [
    API_GET_WORKOUTDAY_FAILURE,
    API_GET_WORKOUTS_FAILURE
];

const errorPageMiddleware = ({ dispatch, getState }) => (next) => (action) => {
    if (workoutActions.includes(action.type)) {
        
    }
}