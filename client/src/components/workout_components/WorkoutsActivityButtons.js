import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { PAGE, SECTION } from '../../constants/page_constants';
import WorkoutButton from '../forms/WorkoutButton';
import Loading from '../Loading';
import queryString from 'query-string'
import {addNewWorkoutStart, keepWorkoutState} from '../../actions/workoutAction'

class WorkoutsActivityButtons extends Component {
    constructor(props) {
        super(props)
        this.handleActivity = this.handleActivity.bind(this)
        this.state = {
            addButtonClick: false
        }
    }


    handleActivity(event) {
        event.preventDefault();
        console.log("Workout Activity Button:",event.target.name)
        if (SECTION.WORKOUTS_PAGE.ACTIVITY_SECTION.GO_BACK === event.target.name) {
            this.props.history.push("/workoutDays/" + this.props.match.params.dateId);
        } else if (SECTION.WORKOUTS_PAGE.ACTIVITY_SECTION.ADD_WORKOUT === event.target.name) {
            console.log("Add New Workout:",this.props.workoutDayUrl);
            this.props.history.push(this.props.match.url+"?action=add");
        }
    }
    render() {
        const { sections, loading, error } = this.props;
        const values = queryString.parse(this.props.location.search)
        if (values.action) {
            return null;
        }

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
                        !values.action && Object.keys(fields).map((f,index) => {
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
    addNewWorkoutStart,
    keepWorkoutState
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WorkoutsActivityButtons));