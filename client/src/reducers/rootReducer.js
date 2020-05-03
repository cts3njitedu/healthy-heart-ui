import { combineReducers } from 'redux'
import {reducer as formReducer} from 'redux-form'
import loginForm from './loginReducer'
import user from './userReducer'
import about from './aboutReducer'
import calendar from './calendarReducer'
import workoutDay from './workoutDayReducer'
import workout from './workoutReducer'


export default combineReducers(
    {
        loginForm,
        form: formReducer,
        user,
        about,
        calendar,
        workoutDay,
        workout  
    }
)

