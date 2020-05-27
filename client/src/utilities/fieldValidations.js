import { MANDATORY, LENGTH, REGEX } from "../constants/validations_constants";
import { isStringEmpty } from "./stringUtility";

export function tester() {
    console.log("In tester");
}
export function validate(field, validations) {
    let errorFields = [];
    console.log("Validation Field:", field, validations)
    let promises = [];
    let newValue = field.value || "";
    validations.forEach(validation => {
        promises.push(new Promise(function (resolve) {
            if (validation.validationName === MANDATORY && validation.isEnabled) {
                if (isStringEmpty(newValue)) {
                    const error = {
                        message: validation.message,
                        parentId: validation.parentId
                    }
                    errorFields = errorFields.concat(error);
                }
            }
            if (validation.validationName === LENGTH && validation.isEnabled) {
                if ((field.minLength !== 0 && isStringEmpty(newValue)) || newValue.length < field.minLength || newValue.length > field.maxLength) {
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