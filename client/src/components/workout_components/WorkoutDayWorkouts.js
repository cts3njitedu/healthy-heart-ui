import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import WorkoutsNavigation from './WorkoutsNavigation'
import WorkoutsMain from './WorkoutsMain'
import WorkoutsActivityButtons from './WorkoutsActivityButtons'
import WorkoutsView from './WorkoutsView'
import WorkoutDetails from './WorkoutDetails'


function WorkoutDayWorkouts(props) {
    return (
        <div className="workoutDayLocationBody">
            <WorkoutsNavigation />
            <WorkoutsView />

            <WorkoutsActivityButtons /> 
        </div>
    )

}

export default WorkoutDayWorkouts