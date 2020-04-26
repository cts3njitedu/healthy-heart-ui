import React, { Component } from 'react'
import { SECTION, PAGE } from '../../constants/page_constants';
import DatePicker from 'react-datepicker'
import {format, parse, getYear, getMonth, getDate} from 'date-fns'
import 'react-datepicker/dist/react-datepicker.css'
import 'react-datepicker/dist/react-datepicker-cssmodules.css'
import { connect } from 'react-redux';
import {changeWorkoutDate, submitWorkoutDate, cancelWorkoutDateChange} from '../../actions/workoutAction'
import { withRouter } from 'react-router-dom';
import WorkoutButton from '../forms/WorkoutButton';
class WorkoutDayHeader extends Component {

    constructor(props) {
        super(props);
        // let workoutDate = props.section[0].fields[SECTION.WORKOUT_DAY_LOCATIONS_PAGE.HEADER_SECTION.WORKOUT_DATE]
        // console.log(workoutDate.value)
        // let dateView = parse(workoutDate.value,'yyyy-MM-dd', new Date();
        this.handleDateChange = this.handleDateChange.bind(this)
        this.handleSubmitDate = this.handleSubmitDate.bind(this)
        this.handleCancelDateChange = this.handleCancelDateChange.bind(this)
    }

    handleDateChange(value) {
        console.log("Date change: ",value)
        this.props.changeWorkoutDate(value)
    }

    handleSubmitDate(event){
        event.preventDefault()
        console.log("Submitting...")
        this.props.submitWorkoutDate()
    }

    handleCancelDateChange(event) {
        event.preventDefault()
        console.log("Cancelling...")
        this.props.cancelWorkoutDateChange()
    }
    componentDidUpdate(prevProps){
        if (prevProps.isSubmitDate !== this.props.isSubmitDate) {
            let dateIdFormatted = parse(prevProps.tempSelectedDate, "yyyy-MM-dd", new Date())
            let year = getYear(dateIdFormatted);
            let month = getMonth(dateIdFormatted)
            let day = getDate(dateIdFormatted)
            let newDate = format(new Date(year, month, day),'yyyyMMdd')
            this.props.history.push('/workoutDays/' + newDate) 
        }
    }

    render() {
        const {sections, tempSelectedDate} = this.props;
        let workoutHeader = sections[PAGE.WORKOUT_DAY_LOCATIONS_PAGE.HEADER_SECTION][0];
        let workoutDate = workoutHeader.fields[SECTION.WORKOUT_DAY_LOCATIONS_PAGE.HEADER_SECTION.WORKOUT_DATE];
        let cancelButton = workoutHeader.fields[SECTION.WORKOUT_DAY_LOCATIONS_PAGE.HEADER_SECTION.CANCEL];
        let changeDate = workoutHeader.fields[SECTION.WORKOUT_DAY_LOCATIONS_PAGE.HEADER_SECTION.CHANGE_DATE];
        let dateString = (tempSelectedDate.length !== 0) ? tempSelectedDate : workoutDate.value
        let date = parse(dateString,'yyyy-MM-dd', new Date());
        return (
            <div className="workoutHeader">
                <div className="workoutDate">
                    <div>{workoutDate.title}:</div>
                    <div>{!workoutDate.isHidden ? <DatePicker className="datePicker" selected={date} 
                        dateFormat="yyyy-MM-dd" onChange={this.handleDateChange}/> : dateString}</div>
                    <WorkoutButton field={cancelButton} handleActivity={this.handleCancelDateChange} />
                    <WorkoutButton field={changeDate} handleActivity={this.handleSubmitDate} />
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
        loading: state.workoutDay.loading,
        tempSelectedDate: state.workoutDay.tempSelectedDate,
        isSubmitDate: state.workoutDay.isSubmitDate
    }
        
}

const mapDispatchToProps = {

    changeWorkoutDate,
    submitWorkoutDate,
    cancelWorkoutDateChange


}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WorkoutDayHeader));