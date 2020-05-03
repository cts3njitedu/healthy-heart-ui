import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Loading from '../Loading';
import {getWorkoutsByCategory} from '../../actions/workoutAction';

class WorkoutsMain extends Component {
    
    constructor(props) {
        super(props)
    }
    render() {
        const { sections, loading, error, categorySections } = this.props;
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
            console.log("Workouts Main:", categorySections, this.props.match.url)
            return (
                <div>Workouts...</div>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        isAccessTokenEnabled: state.user.isAccessTokenEnabled,
        sections: state.workout.sections,
        newSections: state.workout.newSections,
        loading: state.workout.metaLoadingState.isWorkoutsLoading,
        error: state.workout.metaLoadingState.isWorkoutsError,
        categorySections: state.workout.categorySections
    }

}

const mapDispatchToProps = {
    getWorkoutsByCategory
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WorkoutsMain));