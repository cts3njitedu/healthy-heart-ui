import React, { Component } from 'react'

class Location extends Component {

    constructor(props){
        super(props);
    }
    render(){
        let location = this.props.location;
        console.log("Location Block:",location)
        let fields = location.fields;
        let locationBlocks = [];
        Object.keys(fields).forEach(function(f){
            locationBlocks.push(<p key={f}>{fields[f].title}: {fields[f].value} </p>)
        })
        return (
            <div className="locationBlocks">
                {locationBlocks}
            </div>
        )
    }
    
}
export default Location