import React, { Component } from 'react'
import _ from 'lodash'
import WorkoutDay from './WorkoutDay';

class WorkoutWeek extends Component {
    constructor(props) {
        super(props);
        this.state = {
            days : ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        }
    }

    render() {
        let firstDayId = this.props.week.firstDayId;
        let lastDayId = this.props.week.lastDayId;
        let currDate = this.props.week.firstDay;
        let days = this.props.workoutDays;
        let workoutDays = [];
        for (let day = 0; day<=6; day++) {
            if (day >= firstDayId && day <= lastDayId) {
                workoutDays.push(<WorkoutDay date ={currDate} />)
                currDate++; 
            } else {
                workoutDays.push(<WorkoutDay/>)
            }

        }
        
        return (
            <tr>
                {workoutDays}
            </tr>
        )
    }


    
}

export default WorkoutWeek;

