import React from 'react'
import fromStyles from '../../styles/form.module.css'
import {isEmpty} from 'lodash'
function Textbox(props) {
    console.log("Textbox:", props.field)

    let style = {};
    if (!isEmpty(props.field.errors)) {
        style = {
            borderColor: "red",
            border: "3px solid red"
        }
    }
    let required = !props.field.isDisabled && props.field.isMandatory
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
                size={props.field.maxLength}
                style={style}/>  
                }
            {required && <div style={{color: "white", fontWeight: "bold", fontSize: "large"}}>*Required</div>}     
            {props.field.isDisabled && <div id={props.field.id} name={props.field.name}>{props.field.value}</div>}
            {Array.isArray(props.field.errors) && props.field.errors.map((error) => <p style = {{backgroundColor:"white", width:"50%"}} key={error.message}>{error.message}</p>)}
        </div>
    )
}





export default Textbox;