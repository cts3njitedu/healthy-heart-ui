import React, { Component } from 'react'
import { withRouter, Route, Switch, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import WorkoutsMain from './WorkoutsMain';
import WorkoutDetails from './WorkoutDetails';
import queryString from 'query-string'
class WorkoutsView extends Component {
    constructor(props) {
        super(props)
        console.log("Workouts View", props.match.url)
    }

    render() {
        // let query = this.useQuery();
        const values = queryString.parse(this.props.location.search)
        return (
        <div>
            {values.action && <div>View Workout Details</div>}
            {!values.action && <div>View Workouts</div>}
            <div>
                {values.action && <WorkoutDetails />}
                <Switch>
                    {!values.action && <Route path={`${this.props.match.path}/category/:category`} component={WorkoutsMain} exact/>}
                </Switch>
                {/* <Route path={`${props.match.path}/:category`} component={(props) => <WorkoutsMain {...props} />} /> */}
            </div>
        </div>
        )
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WorkoutsView));