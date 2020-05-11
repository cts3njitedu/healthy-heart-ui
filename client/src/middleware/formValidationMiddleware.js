import { LOGIN_FORM_VALIDATION, handleFormValidationFinish, LOGIN_FORM_SUBMIT_BEGIN, handleRequestBuilder } from "../actions/loginAction"
import {validate} from "../utilities/fieldValidations"
import { ACTION_HANDLE_BLUR_GROUP, formValidationFinish, keepWorkoutDetailsUnchanged, handleChangeGroup } from "../actions/workoutAction";
import {isEmpty} from 'lodash'
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

    } else if (action.type === ACTION_HANDLE_BLUR_GROUP) {
        let state = getState();
        let blurField = action.payload.field;
        let currentFields = state.workoutDetails.editGroup.fields;
        let promise = [];
        console.log("Handle Blur Middleware:", currentFields)
        let errors = Object.keys(currentFields).filter(f => currentFields[f].isDirty).map((f, key) => {
                // let field = groupSectionFields[f];
                // field.value = currentFields[f].value;
                let valid = validate(currentFields[f], currentFields[f].validations)
                return valid.then(function(validationErrors){
                    return {
                        id: currentFields[f].id,
                        errors : validationErrors
                    }
                })
        }, {})
        Promise.all(errors).then(function(vErrors){
            let resultMap = vErrors.filter(vError => vError.errors.length !== 0).reduce((result, vError, key) => {
                result[vError.id] = vError.errors;
                return result;
            }, {})
            console.log(resultMap, vErrors)
            
            next(formValidationFinish(null, resultMap, !isEmpty(resultMap)))

            if (isEmpty(resultMap)) {
                dispatch(handleChangeGroup(blurField))
            }
        })

    } else {
        next(action);
    }

}

export default validateForm;