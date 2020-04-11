import React, { Component } from 'react'

class WorkoutDay extends Component {
    constructor(props) {
        super(props)
        this.handleChildClick = this.handleChildClick.bind(this)
    }

    handleChildClick(e) {
        e.stopPropagation()
        console.log("child click")
    }

    render() {
        return (

            <td>
                <a href="# ">
                    <div className="monthDay" onClick={this.props.handlePickDay}>

                        <div onClick={this.handleChildClick}>{this.props.date}</div>
                        {this.props.workout &&
                            <div className="monthMeta" onClick={this.handleChildClick}>{this.props.workout.location.zipCode} - {this.props.workout.location.gymName}</div>
                        }

                    </div>
                </a>

            </td>



        )
    }
}

export default WorkoutDay;