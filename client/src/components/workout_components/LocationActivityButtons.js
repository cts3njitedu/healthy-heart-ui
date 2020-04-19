import React, { Component } from 'react'
import WorkoutButton from '../forms/WorkoutButton';
import { PAGE, SECTION } from '../../constants/page_constants';
import { connect } from 'react-redux';
import Loading from '../Loading';
import {goBackToCalendar} from '../../actions/workoutAction'
import { withRouter } from 'react-router-dom';

class LocationActivityButtons extends Component {
    constructor(props) {
        super(props)
        this.handleGoBackToCalendar = this.handleGoBackToCalendar.bind(this)
    }

    handleGoBackToCalendar(event) {
        event.preventDefault()
        let cancelField = {
            disabled: true,
            name: event.target.name,
            sectionId: PAGE.WORKOUT_DAY_LOCATIONS_PAGE.ACTIVITY_SECTION
        }
        this.props.goBackToCalendar(cancelField)

    }

    componentDidUpdate(prevProps) {
        if (prevProps.isGoBackToCalendar != this.props.isGoBackToCalendar) {
            this.props.history.push('/calendar') 
        }
    }
    render() {
        const { error, loading, sections} = this.props;
        let activitySections = sections[PAGE.WORKOUT_DAY_LOCATIONS_PAGE.ACTIVITY_SECTION][0];
        if (loading) {
            return (
                <Loading />
            )
        }
        else if (error) {
            return (
                <div>Error getting page...</div>
            )
        } else {
            console.log("Location Activity:", activitySections)
            return (
                <div className="locationActivity">
                    <WorkoutButton field={activitySections.fields[SECTION.WORKOUT_DAY_LOCATIONS_PAGE.ACTIVITY_SECTION.ADD_WORKOUTDATE_LOCATION]} handleGoBackToCalendar={this.handleGoBackToCalendar} />
                    <WorkoutButton field={activitySections.fields[SECTION.WORKOUT_DAY_LOCATIONS_PAGE.ACTIVITY_SECTION.VIEW_OTHER_LOCATIONS]} />
                    <WorkoutButton field={activitySections.fields[SECTION.WORKOUT_DAY_LOCATIONS_PAGE.ACTIVITY_SECTION.VIEW_WORKOUTS]} />
                    <WorkoutButton field={activitySections.fields[SECTION.WORKOUT_DAY_LOCATIONS_PAGE.ACTIVITY_SECTION.DELETE_LOCATION]} />
                    <WorkoutButton field={activitySections.fields[SECTION.WORKOUT_DAY_LOCATIONS_PAGE.ACTIVITY_SECTION.CANCEL]} handleGoBackToCalendar={this.handleGoBackToCalendar}/>
                </div>
            )
        }
        
    }

    
}

function mapStateToProps(state) {
    return {
        isAccessTokenEnabled: state.user.isAccessTokenEnabled,
        sections: state.workoutDay.sections, 
        newSections: state.workoutDay.newSections,
        error: state.workoutDay.error,
        loading: state.workoutDay.loading,
        isGoBackToCalendar: state.workoutDay.isGoBackToCalendar
    }
        
}

const mapDispatchToProps = {

    goBackToCalendar

}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(LocationActivityButtons));