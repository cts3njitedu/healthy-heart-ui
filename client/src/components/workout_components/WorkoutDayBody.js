import React, { Component } from 'react'
import Select from '../forms/Select';
import Location from './Location';
class WorkoutDayBody extends Component {
    constructor(props){
        super(props);
        let isDisableNext = 0 === (props.locationSections.length - 1);
        this.state = {
            currLocation : 0,
            location : "",
            disabledPrev : true,
            disableNext : isDisableNext
        };
        this.handleChangeLocation = this.handleChangeLocation.bind(this)
    }

    handleChangeLocation(event) {
        const {name, value,options, selectedIndex} = event.target;
        let option = options[selectedIndex];
        let currLocation = (option.id === 0 || !option.id) ? 0 : option.id - 1;
        let disabledPrev = (currLocation - 1) < 0;
        let disabledNext = (currLocation + 1) === this.props.locationSections.length;
       
        this.setState(() => {
            return {
                [name] : value,
                currLocation: currLocation,
                disabledPrev : disabledPrev,
                disableNext : disabledNext
            }
        })
    }

    render() {
        let locationSection = this.props.locationSections[this.state.currLocation];
        console.log("Location:", locationSection)
        let select = {
            name : "location",
            value : this.state.location,
            label : "Pick A Location",
            items : this.props.locationSections.map(function(loc){
                return {
                    id : loc.metaDataId,
                    value : "".concat(loc.fields.name.value, " - ", loc.fields.location.value)
                }
            })
        }
        console.log("Select:", select)
        return (
            <div className="workoutBody">
                <div>
                    <button className="addLocation">Add Location</button>
                    <div>
                       <Select select={select} handleChangeLocation={this.handleChangeLocation}/>
                    </div>
                    <button className="addLocation">View Workouts</button>
                </div>
                <div className="locationBody">
                    <div className="locationDirection">
                        <button value="left" disabled={this.state.disabledPrev}>Previous Location</button>
                    </div>
                    <Location location={locationSection}/>
                    <div className="locationDirection">
                        <button value="right" disabled={this.state.disableNext}>Next Location</button>
                    </div>
                </div>
            </div>
        )
        
    }
}


export default WorkoutDayBody