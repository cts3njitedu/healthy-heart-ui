import React, { Component } from 'react'
import { connect } from 'react-redux';
import { ACTION } from '../../constants/page_constants';
import WorkoutDayLocationHeader from './WorkoutDayLocationHeader';
import { buildWorkoutsRequest, API_GET_WORKOUTS_HEADER_BUILD } from '../../actions/workoutAction';

class WorkoutDayLocation extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount() {
        console.log("Hi how are dkdk:", this.props)
        this.props.buildWorkoutsRequest(this.props.match.url, API_GET_WORKOUTS_HEADER_BUILD, {
            actionType: ACTION.VIEW_WORKOUTS_HEADER,
            date: this.props.match.params.dateId,
            location: this.props.match.params.locationId
        })
    }
        
    render(){
        const { error, loading, sections, isAccessTokenEnabled} = this.props;
       
        console.log("Workout Day Location:", sections)
        return (
            <div className="workoutDayLocations">
               <WorkoutDayLocationHeader />
               <div>Body</div>
            </div>
        )
        
        
    }
}

function mapStateToProps(state) {
    return {
        isAccessTokenEnabled: state.user.isAccessTokenEnabled,
        sections: state.workout.sections, 
        newSections: state.workout.newSections,
        error: state.workout.error,
        loading: state.workout.loading,
        isGoBackToCalendar: state.workout.isGoBackToCalendar
    }
        
}

const mapDispatchToProps = {
    buildWorkoutsRequest
}

export default connect(mapStateToProps,mapDispatchToProps)(WorkoutDayLocation);