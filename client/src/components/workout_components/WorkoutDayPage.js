import React from 'react'
import { connect } from 'react-redux'
import { Component } from 'react'
import {getWorkoutDay} from '../../actions/workoutDayAction'
import { Redirect } from 'react-router-dom'
import Loading from '../Loading'
import WorkoutDayHeader from './WorkoutDayHeader'
import { ACTION } from '../../constants/page_constants'
import WorkoutDayBody from './WorkoutDayBody'
import {format} from 'date-fns'



class WorkoutDayPage extends Component {
    constructor (props) {
        super(props);
        this.handleDateChange = this.handleDateChange.bind(this)
        this.handleAddLocation = this.handleAddLocation.bind(this)
        console.log("I am here:", props.sections)
        this.state = {
            isDateChange: false,
            newDate : ""
        }
    }

    componentDidMount() {
        console.log("Match:",this.props.match)
        this.props.getWorkoutDay(this.props.match.url, {
            actionType: ACTION.VIEW_WORKOUTDATE_LOCATIONS
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.isDateChange !== prevState.isDateChange) {
            console.log("Hi what is up:", this.state.newDate)
            this.props.history.push('/workoutDays/' + this.state.newDate)
        }
    }
    handleDateChange(value) {
        
        let newDate = format(value, 'yyyyMMdd')
        
        this.setState(() => {
            return {
                isDateChange: true,
                newDate : newDate
            }
        })
    }

    handleAddLocation() {
        console.log("Adding location:",this.props.match.url);
        
    }
    render() {
        const { error, loading, isAccessTokenEnabled} = this.props;
        if (!isAccessTokenEnabled) {
            return <Redirect to="/login" />
        }
        if (loading) {
            console.log("Loading Here you know")
            return (
                <div>
                     <Loading />
                </div>
               
            )
        }
        else if (error) {
            return (
                <div>Error getting page...</div>
            )
        } else {
            return (
                <div className="dateContainer">
                    <div className="dateView">
                        <WorkoutDayHeader />
                        <WorkoutDayBody />
                    </div>
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
        loading: state.workoutDay.loading
    }
        
}

const mapDispatchToProps = {

    getWorkoutDay

}
export default connect(mapStateToProps,mapDispatchToProps)(WorkoutDayPage);