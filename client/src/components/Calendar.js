import React, { Component } from 'react'
import { getCalendar } from '../actions/calendarAction'
import { connect } from 'react-redux'
import Loading from './Loading';
import { Redirect } from 'react-router-dom';
import WorkoutMonth from './WorkoutMonth';

class Calendar extends Component {

    componentDidMount() {
        this.props.getCalendar(this.props.match.url);
    }

    render() {
        const { error, loading, isAccessTokenEnabled, calendar} = this.props;
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
            return (
                <WorkoutMonth calendar={this.props.calendar}/>
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
    }
        
}

const mapDispatchToProps = {

    getCalendar

}

export default connect(mapStateToProps,mapDispatchToProps)(Calendar);