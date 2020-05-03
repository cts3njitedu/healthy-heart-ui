import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { PAGE } from '../../constants/page_constants';
import WorkoutButton from '../forms/WorkoutButton';
import Loading from '../Loading';


class WorkoutsActivityButtons extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { sections, loading, error } = this.props;
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
            let activitySections = sections[PAGE.WORKOUTS_PAGE.ACTIVITY_SECTION];
            if (activitySections) {
                let activitySection = activitySections[0]
                let fields = activitySection.fields;
                return <div>
                    {
                        Object.keys(fields).map((f,index) => {
                            let field = fields[f];
                           return  <WorkoutButton key={f} field={field} />
                        })
                    }
                </div>
            }
            return (
                <div>
                    <Loading />
                </div>

            )
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
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WorkoutsActivityButtons));