import React, { Component } from 'react'
import { SECTION } from '../../constants/page_constants';
import WorkoutButton from '../forms/WorkoutButton'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
class WorkoutSummary extends Component {

    constructor(props) {
        super(props)
        this.handleActivity = this.handleActivity.bind(this)
    }

    handleActivity(event) {
        console.log("Button Clicked", event.target)
        if (SECTION.WORKOUTS_PAGE.WORKOUT_SECTION.VIEW_WORKOUT_DETAILS === event.target.name) {
            console.log("View Workout Details Button Clicked", this.props.params, this.props.workoutDayUrl, this.props.workout.metaDataId)
            this.props.history.push(this.props.workoutDayUrl+ "/workouts/" + this.props.workout.metaDataId + "?action=view");
        }
    }
    render() {
        let workout = this.props.workout;
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
                    <WorkoutButton field={viewButton} handleActivity={this.handleActivity}/>
                    <WorkoutButton field={deleteButton}/>
                </div>
            </div>
        )
    
    }
    
}


function mapStateToProps(state) {
    return {
        isAccessTokenEnabled: state.user.isAccessTokenEnabled,
        sections: state.workout.sections,
        newSections: state.workout.newSections,
        loading: state.workout.metaLoadingState.isWorkoutsLoading,
        error: state.workout.metaLoadingState.isWorkoutsError,
        categorySections: state.workout.categorySections,
        workoutDayUrl: state.workout.workoutDayUrl,
        params: state.workout.params
    }

}

const mapDispatchToProps = {
    
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WorkoutSummary));