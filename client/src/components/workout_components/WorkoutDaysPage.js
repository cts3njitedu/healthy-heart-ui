import React from 'react';
import { Route } from 'react-router-dom';
import WorkoutDayPage from './WorkoutDayPage';
import '../../styles/workout.css'
import WorkoutDayLocations from './WorkoutDayLocations';


function WorkoutDaysPage(props) {
    return (
            <div>
                <Route path={`${props.match.path}/:dateId`} component={(props) =><WorkoutDayPage {...props}/>} exact/>
                <Route path={`${props.match.path}/:dateId/locations`} component={(props) =><WorkoutDayLocations {...props}/>}/>
            </div>

    )
}


export default WorkoutDaysPage