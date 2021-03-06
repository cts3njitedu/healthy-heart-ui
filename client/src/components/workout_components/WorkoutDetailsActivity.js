import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Loading from '../Loading';
import { PAGE, SECTION, ACTION } from '../../constants/page_constants';
import WorkoutButton from '../forms/WorkoutButton';
import { addOREditWorkoutGroupStart, cancelGroupFrom, handleSaveGroup, cancelWorkoutChanges, closeWorkoutDetails, submitAndContinueWorkout, submitWorkout} from '../../actions/workoutAction'
import {convertWorkoutDetailsActivityFields} from '../../selectors/workoutdetailsActivitySelector'
class WorkoutDetailsActivity extends Component {
    constructor(props) {
        super(props)
        this.handleActivity = this.handleActivity.bind(this)
        this.state = {
            isClosing: false,
            workoutDayUrl: ""
        }
    }

    handleActivity(event) {
        if (SECTION.WORKOUT_DETAILS_PAGE.ACTIVITY_SECTION.CLOSE === event.target.name) {
            console.log("Close Clicked")
            this.setState({
                isClosing: true
            })
            this.props.closeWorkoutDetails()
        } else if (SECTION.WORKOUT_DETAILS_PAGE.ACTIVITY_SECTION.ADD_GROUP === event.target.name) {
            let newGroup = this.props.newSections[PAGE.WORKOUT_DETAILS_PAGE.GROUP_SECTION][0];
            console.log("Add Group Clicked", newGroup);
            this.props.addOREditWorkoutGroupStart(true, newGroup)
        } else if (SECTION.WORKOUT_DETAILS_PAGE.ACTIVITY_SECTION.CANCEL === event.target.name) {
            console.log("Cancel Clicked")
            this.props.cancelGroupFrom();
        } else if (SECTION.WORKOUT_DETAILS_PAGE.ACTIVITY_SECTION.SAVE_GROUP === event.target.name) {
            console.log("Save Group Clicked")
            this.props.handleSaveGroup();
        } else if (SECTION.WORKOUT_DETAILS_PAGE.ACTIVITY_SECTION.CANCEL_CHANGES === event.target.name) {
            console.log("Cancel Changes Clicked")
            this.props.cancelWorkoutChanges();
        } else if (SECTION.WORKOUT_DETAILS_PAGE.ACTIVITY_SECTION.SUBMIT_CONTINUE === event.target.name) {
            console.log("Submit And Continue Changes", this.props.viewType)
            let action = this.props.viewType.action;
            this.props.submitWorkout(false, {
                subActionType: action === "add" ? ACTION.ADD_WORKOUT : ACTION.MODIFY_WORKOUT,
                viewType: action
            });
        } else if (SECTION.WORKOUT_DETAILS_PAGE.ACTIVITY_SECTION.SUBMIT_CLOSE === event.target.name) {
            console.log("Submit And Close Changes")
            let action = this.props.viewType.action;
            this.setState({
                workoutDayUrl: this.props.workoutDayUrl
            })
            this.props.submitWorkout(true, {
                subActionType: action === "add" ? ACTION.ADD_WORKOUT : ACTION.MODIFY_WORKOUT,
                viewType: action
            });
        }
    }

    render() {
        const { error, loading, sections} = this.props;
        if (loading) {
            return (
                <div>
                    <Loading />
                </div>

            )
        }
        else if (error) {
            return (
                <div>Error getting page...</div>
            )
        } else {
            let activitySections = sections[PAGE.WORKOUT_DETAILS_PAGE.ACTIVITY_SECTION];
            console.log("Workout Details Activities:", activitySections);
            if (activitySections) {
                let activitySection = activitySections[0];
                return (
                    <div>
                        <WorkoutButton field={activitySection.fields[SECTION.WORKOUT_DETAILS_PAGE.ACTIVITY_SECTION.ADD_GROUP]} handleActivity={this.handleActivity}/>
                        <WorkoutButton field={activitySection.fields[SECTION.WORKOUT_DETAILS_PAGE.ACTIVITY_SECTION.CLOSE]} handleActivity={this.handleActivity}/>
                        <WorkoutButton field={activitySection.fields[SECTION.WORKOUT_DETAILS_PAGE.ACTIVITY_SECTION.CANCEL_CHANGES]} handleActivity={this.handleActivity}/>
                        <WorkoutButton field={activitySection.fields[SECTION.WORKOUT_DETAILS_PAGE.ACTIVITY_SECTION.SUBMIT_CONTINUE]} handleActivity={this.handleActivity}/>
                        <WorkoutButton field={activitySection.fields[SECTION.WORKOUT_DETAILS_PAGE.ACTIVITY_SECTION.SUBMIT_CLOSE]} handleActivity={this.handleActivity}/>
                        <WorkoutButton field={activitySection.fields[SECTION.WORKOUT_DETAILS_PAGE.ACTIVITY_SECTION.SAVE_GROUP]} handleActivity={this.handleActivity}/>
                        <WorkoutButton field={activitySection.fields[SECTION.WORKOUT_DETAILS_PAGE.ACTIVITY_SECTION.CANCEL]} handleActivity={this.handleActivity}/>
                    </div>
                )

            } else {
               return  <div>Progressing....</div>
            }
        }
    }
}

function mapStateToProps(state) {
    return {
        isAccessTokenEnabled: state.user.isAccessTokenEnabled,
        sections: convertWorkoutDetailsActivityFields(state),
        newSections: state.workoutDetails.newSections,
        loading: state.workoutDetails.isMetaInfoLoading,
        error: state.workoutDetails.isMetaInfoError,
        selectedWorkout : state.workoutDetails.selectedWorkout,
        confirmationData: state.workoutDetails.confirmationData,
        isClosing: state.workoutDetails.isClosing,
        viewType: state.workout.queryParams,
        isAddWorkout: state.workout.isAddWorkout,
        isSubmitted: state.workoutDetails.isSubmitted,
        isSubmitting: state.workoutDetails.isSubmitting,
        exactUrl: state.workout.exactUrl,
        workoutDayUrl: state.workout.workoutDayUrl
    }

}

const mapDispatchToProps = {
    addOREditWorkoutGroupStart,
    cancelGroupFrom,
    handleSaveGroup,
    cancelWorkoutChanges,
    closeWorkoutDetails,
    submitAndContinueWorkout,
    submitWorkout
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WorkoutDetailsActivity));