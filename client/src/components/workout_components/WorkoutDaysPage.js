import React from 'react';
import { Route } from 'react-router-dom';
import WorkoutDayPage from './WorkoutDayPage';
import '../../styles/workout.css'
import WorkoutDayForm from '../forms/WorkoutDayForm';

function WorkoutDaysPage(props) {
    return (
            <div>

                <Route path={`${props.match.path}/:dateId`} component={(props) =><WorkoutDayPage {...props}/>}/>
                <Route path={`${props.match.path}/:dateId/locations`} component={WorkoutDayForm} />
            </div>

    )
}


export default WorkoutDaysPage