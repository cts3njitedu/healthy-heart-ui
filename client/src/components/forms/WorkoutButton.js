import React from 'react'

function WorkoutButton(props) {
    let field = props.field;
    return (
        <button type="button" value={field.value} disabled={field.isDisabled} hidden={field.isHidden}>
            {field.value}
        </button>
    )
}


export default WorkoutButton