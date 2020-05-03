import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import WorkoutsNavigation from './WorkoutsNavigation'
import WorkoutsMain from './WorkoutsMain'
import WorkoutsActivityButtons from './WorkoutsActivityButtons'


function WorkoutDayWorkouts(props) {
    return (
        <div className="workoutDayLocationBody">
            <WorkoutsNavigation />
            <div>
                <div>View Workouts</div>
                <div>
                    <Route path={`${props.match.path}/:category`} component={WorkoutsMain} />
                    {/* <Route path={`${props.match.path}/:category`} component={(props) => <WorkoutsMain {...props} />} /> */}
                </div>
            </div>
            <WorkoutsActivityButtons />
        
            
        </div>
    )

}

export default WorkoutDayWorkouts