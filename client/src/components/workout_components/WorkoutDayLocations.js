import React from 'react'
import WorkoutDayLocation from './WorkoutDayLocation';
import { Route } from 'react-router-dom';

import '../../styles/workoutDay.css'


function WorkoutDayLocations(props) {

    return (
        <div>
            <Route path={`${props.match.path}/:locationId`} component={(props) =><WorkoutDayLocation {...props}/>} exact/>
            {/* <Route path={`${props.match.path}/:locationId`} component={WorkoutDayLocation} exact/> */}
        </div>
    )
}

export default WorkoutDayLocations;