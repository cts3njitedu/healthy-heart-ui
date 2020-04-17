import React, { Component } from 'react'
import Select from '../forms/Select';
import LocationActivityButtons from './LocationActivityButtons';
import Locations from './Locations';
class WorkoutDayBody extends Component {
    constructor(props){
        super(props);
        let isDisableNext = true;
        
        this.state = {
            currLocation : 0,
            location : "",
            disabledPrev : true,
            disableNext : isDisableNext
        };
        this.handleChangeLocation = this.handleChangeLocation.bind(this)
    }

    handleChangeLocation(event) {
        
    }

    render() {
        
        console.log("Body Work Sections:", this.props.bodySections)
        return (
            <div className="workoutBody">
                <div>
                    <LocationActivityButtons activitySections={this.props.bodySections.activitySections}/>
                </div>
                {/* <div>
                    <Locations locationSections= {this.props}
                </div> */}
            </div>
        )
        
    }
}


export default WorkoutDayBody