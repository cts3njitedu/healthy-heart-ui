import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Loading from '../Loading'
import {addNewWorkoutStart, keepWorkoutState} from '../../actions/workoutAction'
import WorkoutDetailsHeader from './WorkoutDetailsHeader'
import WorkoutDetailsActivity from './WorkoutDetailsActivity'
import WorkoutDetailsGroups from './WorkoutDetailsGroups'

class WorkoutDetails extends Component {
    constructor(props) {
        super(props)
        console.log("Details:", props)
    }

    // componentDidMount() {
    //     const values = queryString.parse(this.props.location.search)
    //     this.props.keepWorkoutState({
    //         exactUrl: this.props.location.pathname,
    //         queryParams: values
    //     })
    // }

    // shouldComponentUpdate(nextProps, nextState) {

    // }
    render() {
        const { loading, error, selectedWorkout,isAccessTokenEnabled } = this.props;
        if (!isAccessTokenEnabled) {
            return <Redirect to="/login" />
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
            console.log("Selected Workout Details:", selectedWorkout)
            if (selectedWorkout) {
                let workoutSection = selectedWorkout.workoutSection;
                console.log("Workout Section Is:", workoutSection)
                if (workoutSection) {
                    return (
                        <div className="workoutDetails">
                            <WorkoutDetailsHeader workoutSection={workoutSection}/>
                            <WorkoutDetailsActivity />
                            <WorkoutDetailsGroups />
                        </div>
                    )
                }
                
            }

            return <div>Progressing....</div>
            
        }
    }
}

function mapStateToProps(state) {
    return {
        isAccessTokenEnabled: state.user.isAccessTokenEnabled,
        sections: state.workout.sections,
        newSections: state.workout.newSections,
        loading: state.workoutDetails.loading,
        error: state.workoutDetails.error,
        selectedWorkout : state.workoutDetails.selectedWorkout,
        confirmationData: state.workoutDetails.confirmationData
    }

}

const mapDispatchToProps = {
    addNewWorkoutStart,
    keepWorkoutState
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WorkoutDetails));