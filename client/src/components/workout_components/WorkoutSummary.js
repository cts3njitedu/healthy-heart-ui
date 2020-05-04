import React, { Component } from 'react'
import { SECTION } from '../../constants/page_constants';
import WorkoutButton from '../forms/WorkoutButton'
function WorkoutSummary(props){

    let workout = props.workout;
    console.log("Workout Summary:",workout)
    let fields = workout.fields;
    let categoryNameField = fields[SECTION.WORKOUTS_PAGE.WORKOUT_SECTION.CATEGORY_NAME];
    let categoryValues = categoryNameField.items.filter((item, id) => {
        return item.id = categoryNameField.value; 
    })
    let categoryValue = categoryValues ? categoryValues[0].item : categoryNameField.value;

    let workoutTypeDescField = fields[SECTION.WORKOUTS_PAGE.WORKOUT_SECTION.WORKOUT_TYPE_DESC];
    let workoutTypeValues = workoutTypeDescField.items.filter((item, id) => {
        return item.id = workoutTypeDescField.value;
    })
    let workoutTypeValue = workoutTypeValues ? workoutTypeValues[0].item : workoutTypeDescField.value;

    let viewButton = fields[SECTION.WORKOUTS_PAGE.WORKOUT_SECTION.VIEW_WORKOUT_DETAILS];
    let deleteButton = fields[SECTION.WORKOUTS_PAGE.WORKOUT_SECTION.DELETE_WORKOUT]
    return (
        <div className="workoutSummary">
            <div>{categoryValue}</div>
            <div>Image</div>
            <div>{workoutTypeValue}</div>
            <div>
                <WorkoutButton field={viewButton}/>
                <WorkoutButton field={deleteButton}/>
            </div>
        </div>
    )

}


export default WorkoutSummary;