import React from 'react'
import WorkoutsNavigation from './WorkoutsNavigation'
import WorkoutsActivityButtons from './WorkoutsActivityButtons'
import WorkoutsView from './WorkoutsView'


function WorkoutDayWorkouts() {
    return (
        <div className="workoutDayLocationBody">
            <WorkoutsNavigation />
            <WorkoutsView />

            <WorkoutsActivityButtons /> 
        </div>
    )

}

export default WorkoutDayWorkouts