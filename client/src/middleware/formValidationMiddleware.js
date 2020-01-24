import { LOGIN_FORM_VALIDATION, handleFormValidationFinish, LOGIN_FORM_SUBMIT_BEGIN, handleRequestBuilder } from "../actions/loginAction"
import {validate} from "../utilities/fieldValidations"

const validateForm = ({dispatch, getState}) => next => action => {
    if (action.type === LOGIN_FORM_SUBMIT_BEGIN) {
        next(action)
    }
    if (action.type === LOGIN_FORM_VALIDATION || action.type === LOGIN_FORM_SUBMIT_BEGIN) {
        console.log("Have a nice day", action.type);
        let {loginForm} = getState();
        
        let currentFields = action.payload.fields

        let sectionFields = Object.keys(currentFields).map(function(key){
            return currentFields[key];
        })
    
        let errors = {};
        let isError = false;
        let promises = [];
        console.log(sectionFields);
        sectionFields.forEach(sectionField => {
            promises.push(new Promise(function(resolve){
                let validations = loginForm.page.validations.filter(v => v.parentId === sectionField.id);
                let valid = validate(sectionField, validations);
                valid.then(function(validationErrors){
                    if (validationErrors.length > 0) {
                        isError = true;
                    }
                    errors = {...errors, [sectionField.id]: validationErrors }
                    resolve();
                })
                
            }))
        })

        Promise.all(promises).then(function(){
            if (isError || action.type === LOGIN_FORM_VALIDATION) {
                console.log("Login form validation returen")
                next(handleFormValidationFinish(errors, isError))
            } else {
                dispatch(handleRequestBuilder(currentFields, action.payload.page_url))
            }


        })

    } else {
        next(action);
    }

}

export default validateForm;