import React, { Component } from 'react'
import Location from './Location';
import { PAGE } from '../../constants/page_constants';
import { connect } from 'react-redux';
import {selectLocation, sortLocationTableStart, buildWorkoutDayRequest, filterLocationTable} from '../../actions/workoutAction'
import TableHeader from '../forms/TableHeader';
import _ from 'lodash'
import { withRouter } from 'react-router-dom';

class Locations extends Component {

    constructor(props) {
        super(props)
        this.handleLocationSelection = this.handleLocationSelection.bind(this)
        this.handleSort = this.handleSort.bind(this)
        this.handleFilter = this.handleFilter.bind(this)
        this.handleFilterCall = this.handleFilterCall.bind(this)
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

    handleFilter(event) {
        const {name, value} = event.target
        console.log("Handle Filter:", name, value)
        console.log("Handle Filter Event:",event.target)
        this.props.filterLocationTable(name, value)
    }

    handleFilterCall() {
        this.props.buildWorkoutDayRequest(this.props.match.url)
    }

    componentDidUpdate(prevProps) {
        let headerId = PAGE.WORKOUT_DAY_LOCATIONS_PAGE.LOCATION_HEADER_SECTION;
        let sortRequest = !_.isEqual(prevProps.sections[headerId][0], this.props.sections[headerId][0])
        let filterId = PAGE.WORKOUT_DAY_LOCATIONS_PAGE.FILTER_SECTION;
        let filterRequest = !_.isEqual(prevProps.sections[filterId][0], this.props.sections[filterId][0])
        console.log("Filter Request", filterRequest)
        if (sortRequest) {
            this.props.buildWorkoutDayRequest(this.props.match.url)
        }
    }
    
    render() {
        const {sections, actionType} = this.props;
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
                        <TableHeader tableClass={tableClass} headerSection={locationHeaderSection} filterSections={filterSections} handleSort={this.handleSort} handleFilter={this.handleFilter} handleFilterCall={this.handleFilterCall}/>
                        <tbody>
                            {
                                locationSections.map((value) => {
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
    buildWorkoutDayRequest,
    filterLocationTable


}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Locations));