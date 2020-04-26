import React, { Component } from 'react'
import { SECTION } from '../../constants/page_constants';


class Location extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location : props.location,
            headers: props.header,
            headerSection: props.headerSection
        }
    }
    render() {
        console.log("Location:", this.state)
        let location = this.state.location;
        const headerSection = this.state.headerSection
        let fields = location.fields;
        console.log("Location:", fields)
        let tableHeadersFields = Object.keys(headerSection.fields).map(function(key){
            return headerSection.fields[key]
        })
        console.log("Table Location:", tableHeadersFields)
        return (
            <tr id={location.metaDataId}>
                {
                    tableHeadersFields.map((field, index) => {
                        if (field.name !== SECTION.WORKOUT_DAY_LOCATIONS_PAGE.LOCATION_HEADER_SECTION.SELECT_LOCATION) {
                            return <td key={field.name}>{location.fields[field.name].value}</td>
                        } else{
                            return <td key={index}><input type="checkbox" 
                            checked={location.isChecked}
                            disabled = {location.isDisabled}
                            onChange={(evt) => this.props.handleLocationSelection(this.state.location, evt)}/></td>
                        }
                    })
                }
            </tr>
        )
    } 


}

export default Location;