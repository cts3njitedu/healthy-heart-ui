import React from 'react';
import { Route } from 'react-router-dom';
import WorkoutDayPage from './WorkoutDayPage';
import '../../styles/workout.css'

function WorkoutDaysPage(props) {
    return (
            <div>

                <Route path={`${props.match.path}/:dateId`} component={WorkoutDayPage}/>
            </div>

    )
}


export default WorkoutDaysPage