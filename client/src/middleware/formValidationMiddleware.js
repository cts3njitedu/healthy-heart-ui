import { LOGIN_FORM_VALIDATION, handleFormValidationFinish, LOGIN_FORM_SUBMIT_BEGIN, handleRequestBuilder } from "../actions/loginAction"
import {validate} from "../utilities/fieldValidations"
import { ACTION_HANDLE_BLUR_GROUP, formValidationFinish, keepWorkoutDetailsUnchanged, handleChangeGroup, ACTION_HANDLE_SAVE_GROUP, addOREditWorkoutGroupSave, ACTION_ADD_EDIT_WORKOUT_GROUP_SAVE } from "../actions/workoutAction";
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

    } else if (action.type === ACTION_HANDLE_BLUR_GROUP || action.type === ACTION_HANDLE_SAVE_GROUP) {
        let state = getState();
        let blurField = action.payload.field;
        let currentFields = state.workoutDetails.editGroup.fields;
    
        console.log("Handle Blur Middleware:", currentFields, blurField)
        
        let errors = Object.keys(currentFields).filter(f => 
            (action.type === ACTION_HANDLE_BLUR_GROUP ? 
                (currentFields[f].isDirty 
                || (blurField.name === f && blurField.value !== currentFields[f].value)): true)).map((f) => {
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
            let resultMap = vErrors.filter(vError => vError.errors.length !== 0).reduce((result, vError) => {
                result[vError.id] = vError.errors;
                return result;
            }, {})
            console.log(resultMap, vErrors)
            
            next(formValidationFinish(null, resultMap, !isEmpty(resultMap)))

            if (isEmpty(resultMap)) {
                if (action.type === ACTION_HANDLE_BLUR_GROUP) {
                    dispatch(handleChangeGroup(blurField))
                } else {
                    dispatch(addOREditWorkoutGroupSave(ACTION_ADD_EDIT_WORKOUT_GROUP_SAVE))
                }
                
            } else {
                next(keepWorkoutDetailsUnchanged())
            }
        })

    } else {
        next(action);
    }

}

export default validateForm;