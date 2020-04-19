import React, { Component } from 'react'
import Location from './Location';
import { PAGE } from '../../constants/page_constants';
import { connect } from 'react-redux';
import {selectLocation} from '../../actions/workoutAction'

class Locations extends Component {

    constructor(props) {
        super(props)
        this.handleLocationSelection = this.handleLocationSelection.bind(this)
    }

    handleLocationSelection(location, event) {
        console.log("Checking:", location.metaDataId, event.target.checked)
        let newLocation = {
            ...location,
            isChecked: event.target.checked
        }

        
        this.props.selectLocation(newLocation, PAGE.WORKOUT_DAY_LOCATIONS_PAGE.ACTIVITY_SECTION)
    }
    
    render() {
        const {sections,selectedLocation } = this.props;
        let locationSections = sections[PAGE.WORKOUT_DAY_LOCATIONS_PAGE.LOCATION_SECTION]||[];
        let filterSections = sections[PAGE.WORKOUT_DAY_LOCATIONS_PAGE.FILTER_SECTION][0]
        let headers = [...filterSections.tableHeaders]
        headers.unshift("_")
        console.log("Table columns: ",filterSections)
        return (
            <div className="locationsView">
                <div className="locationTable">
                    <table>
                        <thead>
                            <tr className="locationHeaderSection">
                            <th></th>    
                            {
                                filterSections.tableHeaders.map((value,index) => {
                                    return <th key={value}>{value}</th>
                                })
                            }
                            </tr>
                            <tr className="filterSection">
                                <th></th>
                                {
                                    filterSections.tableHeaders.map((value, index) => {
                                        let fieldName = value.charAt(0).toLowerCase() + value.slice(1)
                                        let field = filterSections.fields[fieldName];
                                        console.log("Field is", field.name)
                                        return <th key={value}><input type="text" value={field.name} /></th>
                                    })
                                    
                                }
                            </tr>
                            
                        </thead>
                        <tbody>
                            {
                                locationSections.map((value, index) => {
                                    return <Location key={value.metaDataId} location={value} header={headers} handleLocationSelection={this.handleLocationSelection} />
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
        isLocationSelected: state.workoutDay.isLocationSelected
    }
        
}

const mapDispatchToProps = {

    selectLocation


}

export default connect(mapStateToProps, mapDispatchToProps)(Locations);