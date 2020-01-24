import { LOGIN_FORM_BUILD_REQUEST, postLoginPage } from "../actions/loginAction";

export const buildRequest = ({dispatch, getState}) => next => action => {
    console.log("Did you come here")
    if (action.type === LOGIN_FORM_BUILD_REQUEST) {
        console.log("In request builder")
        let {loginForm} = getState();
        let allFields = action.payload.fields;
        let pageTemplate = loginForm.pageTemplate
        let sectionPromises = []
        pageTemplate.sections.forEach(section => {
            sectionPromises.push(new Promise(function(resolve){
                buildSection(section, allFields).then(function(){
                    resolve()
                })
            }))
            
        })

        Promise.all(sectionPromises).then(function(){
            dispatch(postLoginPage(pageTemplate, action.payload.page_url))
        })
    } else {
        next(action)
    }

}


function buildSection (section, fields) {
    let fieldPromises = [];
    section.fields.forEach(f => {
        fieldPromises.push(new Promise(function(resolve){
            if (f.name in fields) {
                f.value = fields[f.name].value
            }
            resolve()
        }))
    });
    return Promise.all(fieldPromises).then(function(){
        if ("sections" in section && section.sections.length > 0) {
            let sectionPromises = []
            section.sections.forEach(s => {
                sectionPromises.push(new Promise(function(resolve){
                    buildSection(s, fields).then(function(){
                        resolve()
                    })
                }))
            })
            Promise.all(sectionPromises).then(function(){
                return
            })
        }
        return
    })
}