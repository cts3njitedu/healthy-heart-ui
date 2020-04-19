import React from 'react'

function WorkoutButton(props) {
    let field = props.field;
    let style = {};
    if (field.isDisabled) {
        style = {
            backgroundColor: "gray",
            color: "white"
        }
    }
    return (
        <button style={style} type="button" 
                value={field.value} 
                disabled={field.isDisabled} 
                hidden={field.isHidden}
                name= {field.name}
                onClick={props.handleActivity}>
            {field.value}
        </button>
    )
}


export default WorkoutButton