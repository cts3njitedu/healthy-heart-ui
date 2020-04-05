import React, { Component } from 'react'
import moment from 'moment'
import WorkoutWeek from './WorkoutWeek';
import _ from 'lodash';
import '../styles/calendar.css'

class WorkoutMonth extends Component {
    constructor(props) {
        super(props);
        console.log("Month:", props);
        let date = new Date();
        this.state = {
            month : date.getMonth() + 1,
            monthName: date.toLocaleString('default', {month: 'long'}),
            year : date.getFullYear()
        };
        this.handleChangeMonth = this.handleChangeMonth.bind(this)
    }

    handleChangeMonth(event) {
        event.preventDefault();
        let direction = event.target.name;
        this.setState((state, props) => {
            let month = state.month - 1;
            month = (direction === "prev") ? month - 1 : month + 1;
            let year = state.year;
            if (month < 0) {
                year = year - 1;
                month = 11;
            } else if (month > 11) {
                year = year + 1;
                month = 0;
            }
            console.log("New Day", year, month);
            let newDate = new Date(year, month);
            return {
                month : newDate.getMonth() + 1,
                monthName : newDate.toLocaleString('default', {month: 'long'}),
                year : newDate.getFullYear()
            }

        });

    }
    render() {
        let months = this.props.calendar[this.state.year];
        let days = []
        console.log("Months:", months)
        if (months) {
            days = months[this.state.month]
        }
        
        let weeks = [];
        let workoutDays = _.keyBy(days, (d) => {
            return d.day;
        })
        
    
        let currDate = "".concat(this.state.year,"-",this.state.month,"-",1);
        console.log("CurrDate:", currDate)
        let lastDay = moment(currDate, "YYYY-M-D").endOf('month').date();

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
            weeks.push(<WorkoutWeek key= {firstDayOfWeek} week={week} days={workoutDays}/>)
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
                        <div><button name="prev" onClick={this.handleChangeMonth}>Previous</button> <button name="next" onClick={this.handleChangeMonth}>Next</button></div>
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
                            <tbody>
                            {weeks}  
                            </tbody>  
                        </table>
                    </div>
                </div>
            </div>
        )
    }

}

export default WorkoutMonth;