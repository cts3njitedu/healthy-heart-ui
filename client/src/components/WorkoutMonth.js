import React, { Component } from 'react'
import moment from 'moment'
import WorkoutWeek from './WorkoutWeek';
import _ from 'lodash';
import '../styles/calendar.css'

class WorkoutMonth extends Component {
    constructor(props) {
        super(props);
        let date = new Date();
        this.state = {
            month : date.getMonth() + 1,
            monthName: date.toLocaleString('default', {month: 'long'}),
            year : date.getFullYear()
        }
    }

    render() {
        let months = this.props.calendar[this.state.year];
        let days = []
        if (months) {
            days = months[this.month]
        }

        let weeks = [];
        let workoutDays = _.keyBy(days, (d) => {
            return d.day;
        })
        let lastDay = moment().endOf('month').date();

        let firstDayOfWeek = 1;
        while (firstDayOfWeek <= lastDay) {
            let firstDate = new Date(this.state.year, this.state.month - 1, firstDayOfWeek);
            let lastDayOfWeek = firstDayOfWeek + (6 - firstDate.getDay());
            lastDayOfWeek = (lastDayOfWeek <= lastDay) ? lastDayOfWeek : lastDay
            let week = {
                firstDay : firstDayOfWeek,
                firstDayId : firstDate.getDay(),
                lastDay : lastDayOfWeek,
                lastDayId : firstDate.getDay() + (lastDayOfWeek-firstDayOfWeek)
            }
            weeks.push(<WorkoutWeek week={week} days={workoutDays}/>)
            firstDayOfWeek = lastDayOfWeek + 1;
        }
        console.log("Weeks:",weeks)
        return (
            <div className="calendarContainer">
                <div className="calendarItem">
                    Filter
                </div>
                <div className="calendarItem">
                    <div className="monthHeader">
                        <div>{this.state.year}</div>
                        <div>{this.state.monthName}</div>
                        <div>Buttons</div>
                    </div>
                    <div className="monthBody">
                        <table>
                            <thead>
                            <tr>
                                <th>Sunday</th>
                                <th>Monday</th>
                                <th>Tuesday</th>
                                <th>Wednesday</th>
                                <th>Thursday</th>
                                <th>Friday</th>
                                <th>Saturday</th>
                            </tr>
                            </thead>
                            {weeks}    
                        </table>
                    </div>
                </div>
            </div>
        )
    }

}

export default WorkoutMonth;