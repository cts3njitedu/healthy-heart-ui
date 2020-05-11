import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import queryString from 'query-string'
import { PAGE } from '../../constants/page_constants'
import Loading from '../Loading'
import {addNewWorkoutStart} from '../../actions/workoutAction'
import WorkoutDetailsHeader from './WorkoutDetailsHeader'
import WorkoutDetailsActivity from './WorkoutDetailsActivity'
import WorkoutDetailsGroups from './WorkoutDetailsGroups'

class WorkoutDetails extends Component {
    constructor(props) {
        super(props)
        console.log("Details:", props)
    }

    componentDidMount() {
        // this.props.addNewWorkoutStart()
    }

    // shouldComponentUpdate(nextProps, nextState) {

    // }
    render() {
        const { sections, loading, error, newSections, selectedWorkout,isAccessTokenEnabled } = this.props;
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
    addNewWorkoutStart
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WorkoutDetails));