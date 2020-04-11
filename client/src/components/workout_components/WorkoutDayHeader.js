import React, { Component } from 'react'
import { SECTION } from '../../constants/page_constants';

class WorkoutDayHeader extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        let workoutDate = this.props.section[0].fields[SECTION.WORKOUT_DAY_PAGE.HEADER_SECTION.WORKOUT_DATE];
        console.log(workoutDate)
        return (
            <div className="workoutHeader">
                <div className="workoutDate">
                    {workoutDate.title} : {workoutDate.value}
                </div>
                
            </div>

        )
    }
}



export default WorkoutDayHeader;