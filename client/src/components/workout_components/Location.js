import React, { Component } from 'react'


class Location extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location : props.location,
            headers: props.header
        }
    }
    render() {
        console.log("Location:", this.state)
        let location = this.state.location;
        const headers = this.state.headers;
        let fields = location.fields;
        console.log("Location:", fields)
        return (
            <tr id={location.metaDataId}>
                {
                    headers.map((value, index) => {
                        if (value !== "_") {
                            let fieldName = value.charAt(0).toLowerCase() + value.slice(1)
                            let field = fields[fieldName];
                            return <td key={value}>{field.value}</td>
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