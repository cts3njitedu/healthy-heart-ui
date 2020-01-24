import { MANDATORY, LENGTH, REGEX } from "../constants/validations_constants";

export function tester() {
    console.log("In tester");
}
export function validate(field, validations) {
    let errorFields = [];
    let promises = [];
    let newValue = field.value;
    validations.forEach(validation => {
        promises.push(new Promise(function (resolve) {
            if (validation.validationName === MANDATORY && validation.isEnabled) {
                if (newValue === null || newValue === undefined || newValue.trim().length === 0) {
                    const error = {
                        message: validation.message,
                        parentId: validation.parentId
                    }
                    errorFields = errorFields.concat(error);
                }
            }
            if (validation.validationName === LENGTH && validation.isEnabled) {
                if (newValue === null || newValue === undefined || newValue.length < field.minLength || newValue.length > field.maxLength) {
                    const error = {
                        message: validation.message,
                        parentId: validation.parentId
                    }
                    errorFields = errorFields.concat(error);
                    
                }
            }
            if (validation.validationName === REGEX && validation.isEnabled) {
                let pattern = new RegExp(field.regexValue);
                if (!pattern.test(newValue)) {
                    const error = {
                        message: validation.message,
                        parentId: validation.parentId
                    }
                    errorFields = errorFields.concat(error);
                   
                }
            }
            resolve()
        }))
    })

    return Promise.all(promises).then(function(){
        console.log("Inside validate", errorFields);
        return errorFields
    })
}