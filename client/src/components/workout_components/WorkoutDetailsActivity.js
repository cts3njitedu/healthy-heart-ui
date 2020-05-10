import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Loading from '../Loading';
import { PAGE, SECTION } from '../../constants/page_constants';
import WorkoutButton from '../forms/WorkoutButton';


class WorkoutDetailsActivity extends Component {
    constructor(props) {
        super(props)
        this.handleActivity = this.handleActivity.bind(this)
    }

    handleActivity(event) {
        if (SECTION.WORKOUT_DETAILS_PAGE.ACTIVITY_SECTION.CLOSE === event.target.name) {
            this.props.history.goBack();
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
            if (activitySections) {
                let activitySection = activitySections[0];
                return (
                    <div>
                        <WorkoutButton field={activitySection.fields[SECTION.WORKOUT_DETAILS_PAGE.ACTIVITY_SECTION.ADD_GROUP]} />
                        <WorkoutButton field={activitySection.fields[SECTION.WORKOUT_DETAILS_PAGE.ACTIVITY_SECTION.CLOSE]} handleActivity={this.handleActivity}/>
                        <WorkoutButton field={activitySection.fields[SECTION.WORKOUT_DETAILS_PAGE.ACTIVITY_SECTION.CANCEL_CHANGES]} />
                        <WorkoutButton field={activitySection.fields[SECTION.WORKOUT_DETAILS_PAGE.ACTIVITY_SECTION.SUBMIT_CONTINUE]} />
                        <WorkoutButton field={activitySection.fields[SECTION.WORKOUT_DETAILS_PAGE.ACTIVITY_SECTION.SUBMIT_CLOSE]} />
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
        sections: state.workoutDetails.sections,
        newSections: state.workoutDetails.newSections,
        loading: state.workoutDetails.isMetaInfoLoading,
        error: state.workoutDetails.isMetaInfoError,
        selectedWorkout : state.workoutDetails.selectedWorkout,
        confirmationData: state.workoutDetails.confirmationData
    }

}

const mapDispatchToProps = {
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WorkoutDetailsActivity));