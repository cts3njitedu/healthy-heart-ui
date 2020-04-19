import React, { Component } from 'react'
import { getCalendar } from '../actions/calendarAction'
import { connect } from 'react-redux'
import Loading from './Loading';
import { Redirect } from 'react-router-dom';
import WorkoutMonth from './WorkoutMonth';
import {format, parse, getYear, getMonth, getDate} from 'date-fns'
import { PAGE, SECTION } from '../constants/page_constants';

class Calendar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            monthNames : [
                "January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
            ]
        }
    }
    componentDidMount() {
        this.props.getCalendar(this.props.match.url);
    }

    render() {
        const { error, loading, isAccessTokenEnabled, calendar, workouDaySections} = this.props;
        if (!isAccessTokenEnabled) {
            return <Redirect to="/login" />
        }
        if (loading) {
            return (
                <Loading />
            )
        }
        else if (error) {
            return (
                <div>Error getting page...</div>
            )
        } else{
            console.log("Calendar: ", calendar)
            console.log("Sections Calendar:", workouDaySections)
            let date = {};
            if (workouDaySections[PAGE.WORKOUT_DAY_LOCATIONS_PAGE.HEADER_SECTION]) {
                let header = workouDaySections[PAGE.WORKOUT_DAY_LOCATIONS_PAGE.HEADER_SECTION][0];
                let workoutDateField = header.fields[SECTION.WORKOUT_DAY_LOCATIONS_PAGE.HEADER_SECTION.WORKOUT_DATE]
                let workoutDate = workoutDateField.value;
                if (workoutDate) {
                    let dateIdFormatted = parse(workoutDate, "yyyy-MM-dd", new Date())
                    let year = getYear(dateIdFormatted);
                    let month = getMonth(dateIdFormatted)
                    let day = getDate(dateIdFormatted)
                    date = {
                        month: month+1,
                        monthName: this.state.monthNames[month],
                        year: year,
                        day: day
                    }
                } 
            } else {
                let newDate = new Date();

                date = {
                    month: newDate.getMonth() + 1,
                    monthName: this.state.monthNames[newDate.getMonth()],
                    year: newDate.getFullYear(),
                    day: newDate.getDate()
                }
            }
            console.log("Next Date:", date);
            return (
                <WorkoutMonth calendar={this.props.calendar} date={date}/>
            )
        }
    }
    

}

function mapStateToProps(state) {
    return {
        isAccessTokenEnabled: state.user.isAccessTokenEnabled,
        calendar: state.calendar.calendar, 
        loading: state.calendar.loading,
        error: state.calendar.error,
        workouDaySections: state.workoutDay.sections
    }
        
}

const mapDispatchToProps = {

    getCalendar

}

export default connect(mapStateToProps,mapDispatchToProps)(Calendar);