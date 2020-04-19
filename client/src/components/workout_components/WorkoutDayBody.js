import React, { Component } from 'react'
import Select from '../forms/Select';
import LocationActivityButtons from './LocationActivityButtons';
import Locations from './Locations';
import { connect } from 'react-redux';
class WorkoutDayBody extends Component {
    constructor(props){
        super(props);
    }

    render() {
    
        return (
            <div className="workoutBody">
                <div>
                    <LocationActivityButtons />
                </div>
                <div className="workoutBodyLocations">
                    <Locations />
                </div>
            </div>
        )
        
    }
}

function mapStateToProps(state) {
    return {
        isAccessTokenEnabled: state.user.isAccessTokenEnabled,
        sections: state.workoutDay.sections, 
        newSections: state.workoutDay.newSections,
        error: state.workoutDay.error,
        loading: state.workoutDay.loading
    }
        
}

export default connect(mapStateToProps,null)(WorkoutDayBody);