import React from 'react'
import { connect } from 'react-redux'
import { Component } from 'react'
import {getWorkoutDay} from '../../actions/workoutAction'
import { Redirect } from 'react-router-dom'
import Loading from '../Loading'



class WorkoutDayPage extends Component {
    constructor (props) {
        super(props)
    }

    componentDidMount() {
        console.log(this.props.match.url)
        this.props.getWorkoutDay(this.props.match.url);
    }

    render() {
        const { error, loading, isAccessTokenEnabled, sections, newSections} = this.props;
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
        } else {
            return (
                <div className="dateContainer">
                    <div className="dateView">

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