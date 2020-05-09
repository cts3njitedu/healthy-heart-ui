import React, { Component } from 'react'
import { SECTION } from '../../constants/page_constants';
import Select from '../forms/Select';
import { changeCategoryName, changeWorkoutType} from '../../actions/workoutAction'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ConfirmationModal from '../forms/ConfirmationModal';
import {isEmpty} from 'lodash'
class WorkoutDetailsHeader extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        let option = event.target.options[event.target.selectedIndex]
        console.log("Change:", option.id, option.value, event.target.name)
        if (SECTION.WORKOUTS_PAGE.WORKOUT_SECTION.CATEGORY_NAME === event.target.name) {
            this.props.changeCategoryName({
                code: option.id,
                value: option.value
            })
        } else if (SECTION.WORKOUTS_PAGE.WORKOUT_SECTION.WORKOUT_TYPE_DESC === event.target.name) {
            this.props.changeWorkoutType({
                code: option.id,
                value: option.value
            })
        }
        
    }
    render() {
        let {confirmationData} = this.props;
        console.log("Confirmation Data:", confirmationData)
        let workoutSection = this.props.workoutSection;
        if (workoutSection.fields) {
            console.log("Header:", workoutSection.fields)
            let categoryNameField = workoutSection.fields[SECTION.WORKOUTS_PAGE.WORKOUT_SECTION.CATEGORY_NAME];
            let select = {
                name: categoryNameField.name,
                value: categoryNameField.value,
                label: categoryNameField.title,
                items: categoryNameField.items.map(item => {
                    return {
                        id: item.id,
                        value: item.item
                    }
                })
            }
            let workoutTypeField = workoutSection.fields[SECTION.WORKOUTS_PAGE.WORKOUT_SECTION.WORKOUT_TYPE_DESC];
            let workoutTypeSelect = {
                name: workoutTypeField.name,
                value: workoutTypeField.value,
                label: workoutTypeField.title,
                items: workoutTypeField.items.map(item => {
                    return {
                        id: item.id,
                        value: item.item
                    }
                })
            }
            console.log("Select Header:", select)
            return (
                <div>
                    <Select select={select} handleChange={this.handleChange} />
                    <Select select={workoutTypeSelect} handleChange={this.handleChange} />
                     <ConfirmationModal />
                </div>

            )
        }
        return (
            <div>Progressing....</div>
        )
    }


}


function mapStateToProps(state) {
    return {
        confirmationData: state.workoutDetails.confirmationData
    }

}

const mapDispatchToProps = {
    changeCategoryName,
    changeWorkoutType
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WorkoutDetailsHeader));