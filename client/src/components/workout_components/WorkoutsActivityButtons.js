import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { PAGE, SECTION } from '../../constants/page_constants';
import WorkoutButton from '../forms/WorkoutButton';
import Loading from '../Loading';


class WorkoutsActivityButtons extends Component {
    constructor(props) {
        super(props)
        this.handleActivity = this.handleActivity.bind(this)
    }

    handleActivity(event) {
        event.preventDefault();
        console.log("Workout Activity Button:",event.target.name)
        if (SECTION.WORKOUTS_PAGE.ACTIVITY_SECTION.GO_BACK === event.target.name) {
            this.props.history.push("/workoutDays/" + this.props.match.params.dateId);
        }
    }
    render() {
        const { sections, loading, error } = this.props;
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
            let activitySections = sections[PAGE.WORKOUTS_PAGE.ACTIVITY_SECTION];
            if (activitySections) {
                let activitySection = activitySections[0]
                let fields = activitySection.fields;
                return <div>
                    {
                        Object.keys(fields).map((f,index) => {
                            let field = fields[f];
                           return  <WorkoutButton key={f} field={field} handleActivity={this.handleActivity}/>
                        })
                    }
                </div>
            }
            return (
                <div>
                    <Loading />
                </div>

            )
        }
    }

}


function mapStateToProps(state) {
    return {
        isAccessTokenEnabled: state.user.isAccessTokenEnabled,
        sections: state.workout.sections,
        newSections: state.workout.newSections,
        loading: state.workout.metaLoadingState.isHeaderLoading,
        error: state.workout.metaLoadingState.isHeaderError,
        workoutDayUrl: state.workout.workoutDayUrl
    }

}

const mapDispatchToProps = {
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WorkoutsActivityButtons));