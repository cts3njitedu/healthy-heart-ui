import React, { Component } from 'react'
import { connect } from 'react-redux';
import Loading from '../Loading';
import {buildWorkoutsRequest, API_GET_WORKOUTS_HEADER_BUILD} from '../../actions/workoutAction'
import { Redirect, withRouter } from 'react-router-dom';
import { ACTION, PAGE, SECTION } from '../../constants/page_constants';

class WorkoutDayLocationHeader extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        
    }
    render() {
        const { error, loading, sections, isAccessTokenEnabled} = this.props;
        if (!isAccessTokenEnabled) {
            return <Redirect to="/login" />
        }
        if (loading) {
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
            console.log(PAGE.WORKOUTS_PAGE.HEADER_SECTION==="WORKOUTS_PAGE.HEADER_SECTION")
            console.log("Workout Day Header Sections:", sections)

            let headerSection =  sections[PAGE.WORKOUTS_PAGE.HEADER_SECTION];
            if (headerSection) {
                console.log("Hi,", headerSection[0].fields)
                let fields = headerSection[0].fields;
                return (
                    <div className="workoutDayLocationHeader">
                        {
                           fields && Object.keys(fields).map((f, index) => {
                                let field = fields[f];
                                return <div key={field.name}>{field.title}: {field.value}</div>
                           }) 
                        }
                    </div>
                    
                )
            }

            return (
                <div>
                     <Loading />
                </div>
               
            )
            
            
            // let workoutDate = header[SECTION.WORKOUTS_PAGE.HEADER_SECTION.WORKOUT_DATE];
            
        }
    }
}

function mapStateToProps(state) {
    return {
        isAccessTokenEnabled: state.user.isAccessTokenEnabled,
        sections: state.workout.sections, 
        newSections: state.workout.newSections,
        loading: state.workout.metaLoadingState.isHeaderLoading,
        error: state.workout.metaLoadingState.isHeaderError
    }
        
}

const mapDispatchToProps = {
    buildWorkoutsRequest
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(WorkoutDayLocationHeader));