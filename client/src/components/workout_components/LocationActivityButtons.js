import React, { Component } from 'react'
import WorkoutButton from '../forms/WorkoutButton';
import { PAGE, SECTION, ACTION } from '../../constants/page_constants';
import { connect } from 'react-redux';
import Loading from '../Loading';
import {goBackToCalendar, getWorkoutDay} from '../../actions/workoutAction'
import { withRouter } from 'react-router-dom';

class LocationActivityButtons extends Component {
    constructor(props) {
        super(props)
        this.handleActivity = this.handleActivity.bind(this)
    }

    handleActivity(event) {
        event.preventDefault()
        if (SECTION.WORKOUT_DAY_LOCATIONS_PAGE.ACTIVITY_SECTION.CANCEL === event.target.name) {
            let cancelField = {
                disabled: true,
                name: event.target.name,
                sectionId: PAGE.WORKOUT_DAY_LOCATIONS_PAGE.ACTIVITY_SECTION
            }
            this.props.goBackToCalendar(cancelField)
        } else if (SECTION.WORKOUT_DAY_LOCATIONS_PAGE.ACTIVITY_SECTION.VIEW_OTHER_LOCATIONS === event.target.name) {
            console.log("View Other Locations", this.props.match)
            this.props.getWorkoutDay(this.props.match.url, {
                actionType: ACTION.VIEW_NON_WORKOUTDATE_LOCATIONS
            })
        } else if (SECTION.WORKOUT_DAY_LOCATIONS_PAGE.ACTIVITY_SECTION.VIEW_WORKOUTDAY_LOCATIONS === event.target.name) {
            console.log("View Workout Locations", this.props.match)
            this.props.getWorkoutDay(this.props.match.url, {
                actionType: ACTION.VIEW_WORKOUTDATE_LOCATIONS
            })
        }
        

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
                    <WorkoutButton field={activitySections.fields[SECTION.WORKOUT_DAY_LOCATIONS_PAGE.ACTIVITY_SECTION.VIEW_WORKOUTDAY_LOCATIONS]} handleActivity={this.handleActivity} />
                    <WorkoutButton field={activitySections.fields[SECTION.WORKOUT_DAY_LOCATIONS_PAGE.ACTIVITY_SECTION.ADD_WORKOUTDATE_LOCATION]} handleActivity={this.handleActivity} />
                    <WorkoutButton field={activitySections.fields[SECTION.WORKOUT_DAY_LOCATIONS_PAGE.ACTIVITY_SECTION.VIEW_OTHER_LOCATIONS]} handleActivity={this.handleActivity} />
                    <WorkoutButton field={activitySections.fields[SECTION.WORKOUT_DAY_LOCATIONS_PAGE.ACTIVITY_SECTION.VIEW_WORKOUTS]} />
                    <WorkoutButton field={activitySections.fields[SECTION.WORKOUT_DAY_LOCATIONS_PAGE.ACTIVITY_SECTION.DELETE_LOCATION]} />
                    <WorkoutButton field={activitySections.fields[SECTION.WORKOUT_DAY_LOCATIONS_PAGE.ACTIVITY_SECTION.CANCEL]} handleActivity={this.handleActivity}/>
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

    goBackToCalendar,
    getWorkoutDay

}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(LocationActivityButtons));