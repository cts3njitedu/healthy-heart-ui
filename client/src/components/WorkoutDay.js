import React, { Component } from 'react'


class WorkoutDay extends Component {
    constructor(props){
        super(props)
    }

    render() {
        
        return (
            <td>
                <div className="monthDay">
                   <div>{this.props.date}</div> 
                   {this.props.workout &&
                        <div className="monthMeta">{this.props.workout.location.zipCode} - {this.props.workout.location.gymName}</div>
                    }
                </div>
            </td>
        )
    }
}

export default WorkoutDay;