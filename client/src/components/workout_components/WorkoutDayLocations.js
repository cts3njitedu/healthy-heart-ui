import React from 'react'
import WorkoutDayLocation from './WorkoutDayLocation';
import { Route } from 'react-router-dom';

import '../../styles/workoutDay.css'
import WorkoutDayWorkouts from './WorkoutDayWorkouts';


function WorkoutDayLocations(props) {

    return (
        <div className="workoutDayLocations">
            <Route path={`${props.match.path}/:locationId`} component={(props) =><WorkoutDayLocation {...props}/>}/>
            <Route path={`${props.match.path}/:locationId/workouts`} component={(props) =><WorkoutDayWorkouts {...props}/>}/>
            {/* <Route path={`${props.match.path}/:locationId`} component={WorkoutDayLocation} exact/> */}
        </div>
    )
}

export default WorkoutDayLocations;