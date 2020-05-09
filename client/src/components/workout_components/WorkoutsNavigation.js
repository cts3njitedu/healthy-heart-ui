import React, { Component } from 'react'
import { connect } from 'react-redux';
import { PAGE } from '../../constants/page_constants';
import Loading from '../Loading';
import { Link, withRouter, NavLink } from 'react-router-dom';
import { Navbar, NavItem, Nav } from 'react-bootstrap'
import queryString from 'query-string'

class WorkoutsNavigation extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { sections, loading, error, newSections } = this.props;
        const values = queryString.parse(this.props.location.search)
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
        } 
        if (values.action) {
            return <div className="workoutsNavigation"> </div>;
        } else {
            let navigationSections = sections[PAGE.WORKOUTS_PAGE.NAVIGATION_SECTION];
            console.log("Navigation Workout:", newSections)
            
            console.log("Query Params:", values)
            if (navigationSections) {
                let navigationSection = navigationSections[0]
                let fields = navigationSection.fields;
                console.log("Navigation Sections:", navigationSection)
                return (
    
                        <div className="workoutsNavigation">
                           {!values.action && <ul>
                                {
                                    fields && Object.keys(fields).map((f, index) => {
                                        let field = fields[f];
                                        let value = field.value;
                                        let url = "category/" + value[0].toLowerCase() + value.substr(1);
                                        console.log("Field", url, this.props.match.url)
                                        return <li key={value}><NavLink activeClassName="workoutTypeActiveLink" to={`${this.props.match.url}/${url}`}>{value}</NavLink></li>
                                                    
                                               
                                    })
                                }
                            </ul>}
                            
                        </div>
                       

                )
            }
            return null;
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WorkoutsNavigation));