import { API_GET_LOGIN_PAGE_SUCCESS, handleRestructurePage, API_POST_LOGIN_PAGE_FAILURE } from "../actions/loginAction";

const restructurePageMiddleware = () => (next) => (action) => {
    if (action.type === API_GET_LOGIN_PAGE_SUCCESS || action.type === API_POST_LOGIN_PAGE_FAILURE ) {
        restructurePage(action.payload.page).then(function(newPage){
            next(handleRestructurePage(newPage, action.payload.page))
        }) 
    } else{
        next(action)
    }
}


export function restructurePage(page) {
    return new Promise(function(resolve){
        let newPage = {
            errors: page.errors
        }
        restructureSections(page.sections, newPage,"sections").then(function(np){
            console.log("This is new section:",np);
            resolve(np);
        });
    })
    
}

function restructureSections(sections, newPage, parentName) {
    return new Promise(function(resolve) {
        let promises = [];
        sections.forEach(section => {
            promises.push(restructureSection(section, newPage, parentName));
        });
    
        Promise.all(promises).then(function () {
            resolve(newPage);
        })
    })
    
}

function restructureSection(section, newPage, parentName) {
    return new Promise(function (resolve) {
        let sectionPromises = [];
        let newSection = {};
        let fieldArrays = [];
        Object.keys(section).forEach(function (key) {
            sectionPromises.push(new Promise(function (resolve) {
                if (Array.isArray(section[key])) {
                    if (section[key].length > 0 && key !== "errors"){
                        fieldArrays.push(key);
                    }
                    if (key === "errors") {
                        newSection = { ...newSection, [key]: section[key] }
                    }
                    
                } else {
                    
                    newSection = { ...newSection, [key]: section[key] }
                }
                resolve();
            }))
        })
        Promise.all(sectionPromises).then(function () {

            if (!Array.isArray(newPage[parentName])) {
                newPage[parentName] = []
            }
            newPage[parentName].push(newSection)
            let arrayPromises = []
            fieldArrays.forEach(key => {
                arrayPromises.push(restructureSections(section[key],newPage,key))
            })
            Promise.all(arrayPromises).then(function(){
                resolve(newPage);
            })
            
            
        })
    })
}

export default restructurePageMiddleware