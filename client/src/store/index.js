import { createStore, applyMiddleware } from 'redux'
import apiMiddleWare from '../middleware/apiLoginPageMiddleware';
import rootReducer from '../reducers/rootReducer'
import restructurePageMiddleware from '../middleware/restructurePageMiddleware';
import validateForm from '../middleware/formValidationMiddleware';
import {buildRequest} from '../middleware/requestBuilderMiddleware';
import { handleToken } from '../middleware/handleTokenMiddleware';
import calendarMiddleWare from '../middleware/calendarMiddleware'
import workoutMiddleware from '../middleware/workoutMiddleware'

const store = createStore(rootReducer, 
    applyMiddleware(
        validateForm,
        workoutMiddleware,
        buildRequest,
        apiMiddleWare, 
        handleToken,
        calendarMiddleWare,
    restructurePageMiddleware
    ));

export default store;