import React from 'react'
import Textbox from '../forms/Textbox';
import WorkoutButton from '../forms/WorkoutButton'
import { SECTION } from '../../constants/page_constants';
import {isEmpty} from 'lodash'

function WorkoutDetailsGroup(props) {
    let groupSection = props.groupSection;
    console.log("Workout Group:", groupSection)
    let fields = groupSection.fields;

    if (!isEmpty(fields)) {
        let sets = fields[SECTION.WORKOUT_DETAILS_PAGE.GROUP_SECTION.SETS];
        let repetitions = fields[SECTION.WORKOUT_DETAILS_PAGE.GROUP_SECTION.REPETITIONS];
        let weight = fields[SECTION.WORKOUT_DETAILS_PAGE.GROUP_SECTION.WEIGHT];
        let duration = fields[SECTION.WORKOUT_DETAILS_PAGE.GROUP_SECTION.DURATION];
        let variation = fields[SECTION.WORKOUT_DETAILS_PAGE.GROUP_SECTION.VARIATION]
        let edit = fields[SECTION.WORKOUT_DETAILS_PAGE.GROUP_SECTION.EDIT];
        let del = fields[SECTION.WORKOUT_DETAILS_PAGE.GROUP_SECTION.DELETE]
        return (
            <div>
                <div>
                    {sets && <Textbox field={sets} handleChange={props.handleChange} handleBlur={props.handleBlur}/>}
                    {repetitions && <Textbox field={repetitions} handleChange={props.handleChange} handleBlur={props.handleBlur}/>}
                    {weight && <Textbox field={weight} handleChange={props.handleChange} handleBlur={props.handleBlur}/>}
                    {duration && <Textbox field={duration} handleChange={props.handleChange} handleBlur={props.handleBlur}/>}
                    {variation && <Textbox field={variation} handleChange={props.handleChange} handleBlur={props.handleBlur}/>}
                </div>
                <div>
                    <WorkoutButton field={edit} handleActivity={(evt) => props.handleEdit(evt, groupSection)}/>
                    <WorkoutButton field={del} handleActivity={(evt) => props.handleDelete(evt, groupSection)}/>
                </div>
            </div>
        )
    }
    return (
        <div>No Groups Added Yet</div>
    )

}


export default WorkoutDetailsGroup;