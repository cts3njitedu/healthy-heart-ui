import React, { Component } from 'react'
import WorkoutButton from '../forms/WorkoutButton';
import { PAGE, SECTION } from '../../constants/page_constants';


function LocationActivityButtons(props){

    console.log("Locaiton Activity:",props.activitySections)
    let activitySections = props.activitySections[0];
    return (
        <div className="locationActivity">
            <WorkoutButton field={activitySections.fields[SECTION.WORKOUT_DAY_LOCATIONS_PAGE.ACTIVITY_SECTION.ADD_WORKOUTDATE_LOCATION]} />
            <WorkoutButton field={activitySections.fields[SECTION.WORKOUT_DAY_LOCATIONS_PAGE.ACTIVITY_SECTION.VIEW_OTHER_LOCATIONS]} />
            <WorkoutButton field={activitySections.fields[SECTION.WORKOUT_DAY_LOCATIONS_PAGE.ACTIVITY_SECTION.VIEW_WORKOUTS]} />
            <WorkoutButton field={activitySections.fields[SECTION.WORKOUT_DAY_LOCATIONS_PAGE.ACTIVITY_SECTION.DELETE_LOCATION]} />
            <WorkoutButton field={activitySections.fields[SECTION.WORKOUT_DAY_LOCATIONS_PAGE.ACTIVITY_SECTION.CANCEL]} />
        </div>
    )
}



export default LocationActivityButtons;