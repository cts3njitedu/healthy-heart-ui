import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Loading from '../Loading';
import {getWorkoutsByCategory} from '../../actions/workoutAction';
import WorkoutSummary from './WorkoutSummary';

class WorkoutsMain extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }
    render() {
        const { loading, error, categorySections } = this.props;
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
            console.log("Workouts Main:", categorySections, this.props.match.params)
            if (categorySections) {
                let workouts = categorySections[this.props.match.params.category];
                console.log("Workouts:", workouts)
                if (workouts) {
                    return (
                        <div className="workoutsMain">
                            {
                                workouts.map((workout) => {
                                    let metaDataId = workout.metaDataId;
                                   return <div key={metaDataId} className="workoutSummaryDiv"><WorkoutSummary workout={workout}/></div>
                                })
                                
                            }
                        </div>
                        
                    )
                }
                
            }

            return (
                <div className="noWorkouts">Currently No Workouts for Category</div>
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
        categorySections: state.workout.categorySections,
        workoutDayUrl: state.workout.workoutDayUrl,
        params: state.workout.params
    }

}

const mapDispatchToProps = {
    getWorkoutsByCategory
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WorkoutsMain));