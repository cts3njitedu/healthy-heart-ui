import React, { Component } from 'react'
import { SECTION } from '../../constants/page_constants';
import DatePicker from 'react-datepicker'
import {format, parse} from 'date-fns'
import 'react-datepicker/dist/react-datepicker.css'
import 'react-datepicker/dist/react-datepicker-cssmodules.css'

class WorkoutDayHeader extends Component {

    constructor(props) {
        super(props);
        let workoutDate = props.section[0].fields[SECTION.WORKOUT_DAY_LOCATIONS_PAGE.HEADER_SECTION.WORKOUT_DATE]
        console.log(workoutDate.value)
        let dateView = parse(workoutDate.value,'yyyy-MM-dd', new Date())
    
        this.state = {
            workoutDate: workoutDate,
            dateView: dateView
        }
    }


    render() {
        console.log("sugar:",this.state.dateView)
        return (
            <div className="workoutHeader">
                <div className="workoutDate">
                    <div>{this.state.workoutDate.title}:</div> 
                    <div><DatePicker className="datePicker" selected={this.state.dateView} dateFormat="yyyy-MM-dd" onChange={this.props.handleDateChange}/></div>
                </div>
            </div>

        )
    }
}



export default WorkoutDayHeader;