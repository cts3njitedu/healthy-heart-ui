import React from 'react'
import fromStyles from '../../styles/form.module.css'
function Textbox(props) {
    console.log("Textbox:", props.field)
    return (
        <div hidden={props.field.isHidden}>
            <label className={fromStyles.loginText} htmlFor={props.field.name}>{props.field.title}: </label> <span></span>
            {!props.field.isDisabled && <input type={props.field.type}
                id={props.field.id} 
                name={props.field.name} 
                value={props.field.value || ''} 
                placeholder={props.field.placeholder}
                onChange={props.handleChange} 
                onBlur={props.handleBlur}
                minLength={props.field.minLength}
                maxLength={props.field.maxLength}
                disabled={props.field.isDisabled}
                pattern={props.field.regexValue}
                required={props.field.isMandatory}
                hidden={props.field.isHidden}
                size={props.field.maxLength}/>}
            {props.field.isDisabled && <div id={props.field.id} name={props.field.name}>{props.field.value}</div>}
            {Array.isArray(props.field.errors) && props.field.errors.map((error) => <p key={error.message}>{error.message}</p>)}
        </div>
    )
}





export default Textbox;