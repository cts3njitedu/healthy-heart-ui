import React, { Component } from 'react'


class WorkoutDay extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <td>
                <div className="monthDay">
                   <p>{this.props.date}</p> 
                </div>
            </td>
        )
    }
}

export default WorkoutDay;