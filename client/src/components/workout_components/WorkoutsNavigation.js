import React, { Component } from 'react'
import { connect } from 'react-redux';
import { PAGE } from '../../constants/page_constants';
import Loading from '../Loading';
import { Link, withRouter } from 'react-router-dom';
import { Navbar, NavItem, Nav } from 'react-bootstrap'

class WorkoutsNavigation extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { sections, loading, error, newSections } = this.props;
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
            let navigationSections = sections[PAGE.WORKOUTS_PAGE.NAVIGATION_SECTION];
            console.log("Navigation Workout:", newSections)
            if (navigationSections) {
                let navigationSection = navigationSections[0]
                let fields = navigationSection.fields;
                console.log("Navigation Sections:", navigationSection)
                return (
    
                        <div className="workoutsNavigation">
                            <ul>
                                {
                                    fields && Object.keys(fields).map((f, index) => {
                                        let field = fields[f];
                                        let value = field.value;
                                        let url = value[0].toLowerCase() + value.substr(1);
                                        console.log("Field", url, this.props.match.url)
                                        return <li key={value}><Link to={`${this.props.match.url}/${url}`}>{value}</Link></li>
                                                    
                                               
                                    })
                                }
                            </ul>
                            
                        </div>
                       

                )
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WorkoutsNavigation));