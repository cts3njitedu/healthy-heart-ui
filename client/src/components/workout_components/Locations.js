import React, { Component } from 'react'
import Location from './Location';
import { PAGE } from '../../constants/page_constants';
import { connect } from 'react-redux';
import {selectLocation, sortLocationTableStart, buildWorkoutDayRequest} from '../../actions/workoutAction'
import TableHeader from '../forms/TableHeader';
import _ from 'lodash'
import { withRouter } from 'react-router-dom';

class Locations extends Component {

    constructor(props) {
        super(props)
        this.handleLocationSelection = this.handleLocationSelection.bind(this)
        this.handleSort = this.handleSort.bind(this)
    }

    handleLocationSelection(location, event) {
        console.log("Checking:", location.metaDataId, event.target.checked)
        let newLocation = {
            ...location,
            isChecked: event.target.checked
        }

        
        this.props.selectLocation(newLocation, PAGE.WORKOUT_DAY_LOCATIONS_PAGE.ACTIVITY_SECTION)
    }

    handleSort(fieldName) {
        console.log("Handle Sort:", fieldName, this.props)
        this.props.sortLocationTableStart(fieldName)
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps.heartSort, this.props.heartSort)) {
            this.props.buildWorkoutDayRequest(this.props.match.url)
        }
    }
    
    render() {
        const {sections, heartSort, actionType} = this.props;
        console.log("Action Type:", actionType)
        let locationSections = sections[PAGE.WORKOUT_DAY_LOCATIONS_PAGE.LOCATION_SECTION]||[];
        let filterSections = sections[PAGE.WORKOUT_DAY_LOCATIONS_PAGE.FILTER_SECTION][0]
        let locationHeaderSection = sections[PAGE.WORKOUT_DAY_LOCATIONS_PAGE.LOCATION_HEADER_SECTION][0]
        let headers = [...filterSections.tableHeaders]
        headers.unshift("_")
        console.log("Table columns: ",locationHeaderSection)
        let tableClass = {
            columnClass : "locationHeaderSection",
            filterClass : "filterSection"
        }
        return (
            <div className="locationsView">
                <div className="locationTable">
                    <table>
                        <TableHeader tableClass={tableClass} headerSection={locationHeaderSection} filterSections={filterSections} heartSort={heartSort} handleSort={this.handleSort}/>
                        <tbody>
                            {
                                locationSections.map((value, index) => {
                                    return <Location key={value.metaDataId} headerSection={locationHeaderSection} location={value} header={headers} handleLocationSelection={this.handleLocationSelection} />
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            
            
        )
         
    }
    
    
}

function mapStateToProps(state) {
    return {
        isAccessTokenEnabled: state.user.isAccessTokenEnabled,
        sections: state.workoutDay.sections, 
        newSections: state.workoutDay.newSections,
        error: state.workoutDay.error,
        loading: state.workoutDay.loading,
        tempSelectedDate: state.workoutDay.tempSelectedDate,
        isSubmitDate: state.workoutDay.isSubmitDate,
        selectedLocation: state.workoutDay.selectedLocation,
        isLocationSelected: state.workoutDay.isLocationSelected,
        heartSort : state.workoutDay.heartSort,
        actionType: state.workoutDay.actionType
    }
        
}

const mapDispatchToProps = {

    selectLocation,
    sortLocationTableStart,
    buildWorkoutDayRequest


}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Locations));