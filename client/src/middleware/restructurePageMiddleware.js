import { API_GET_LOGIN_PAGE_SUCCESS, handleRestructurePage, API_POST_LOGIN_PAGE_FAILURE } from "../actions/loginAction";
import { API_GET_WORKOUTDAY_SUCCESS, restructureWorkout, API_ADD_WORKOUTDAY_LOCATION_SUCCESS, getWorkoutDay } from "../actions/workoutDayAction";
import _ from 'lodash'
import { ACTION, PAGE, SECTION } from "../constants/page_constants";
import {format} from 'date-fns'
import { API_GET_WORKOUTS_SUCCESS, restructureWorkoutDay, buildWorkoutsRequest, API_GET_WORKOUTS_BUILD, addNewWorkoutStart } from "../actions/workoutAction";
const workoutActions = [
    API_GET_WORKOUTDAY_SUCCESS,
    API_GET_WORKOUTS_SUCCESS
];
const restructurePageMiddleware = ({dispatch, getState}) => (next) => (action) => {
    if (action.type === API_GET_LOGIN_PAGE_SUCCESS || action.type === API_POST_LOGIN_PAGE_FAILURE ) {
        restructurePage(action.payload.page).then(function(newPage){
            next(handleRestructurePage(newPage, action.payload.page))
        }) 
    } else if (workoutActions.includes(action.type)){
        restructureWorkoutPage(action.payload.page).then(function(newPage){
            if (action.type === API_GET_WORKOUTDAY_SUCCESS) {
                console.log("blue green no")
                next(restructureWorkout(newPage))
            } else if (action.type === API_GET_WORKOUTS_SUCCESS) {
                console.log("purple pink yeah", newPage)
                let state = getState();
                let {exactUrl, queryParams} = state.workout;
                console.log("Exact Url:", exactUrl, queryParams)
                if (newPage.actionType === ACTION.VIEW_WORKOUTS_HEADER) {
                    next(restructureWorkoutDay(newPage, {
                        metaLoading: "isHeaderLoading",
                        metaError: "isHeaderError"
                    }))
                    let headerSection = newPage.sections[PAGE.WORKOUTS_PAGE.HEADER_SECTION][0];
                    console.log("Routing:", headerSection)
                    dispatch(buildWorkoutsRequest("/workoutDays", API_GET_WORKOUTS_BUILD, {
                        actionType: ACTION.VIEW_WORKOUTS
                    }))
                } else {
                    console.log("View Workouts Restructure")
                    next(restructureWorkoutDay(newPage, {
                        metaLoading: "isWorkoutsLoading",
                        metaError: "isWorkoutsError"
                    }))
                    if (queryParams.action === "add") {
                        console.log("Adding New Workout Action Call")
                        dispatch(addNewWorkoutStart())
                    }
                }
            } else {
                next(action)
            }
        })
    } else if (action.type === API_ADD_WORKOUTDAY_LOCATION_SUCCESS) {
        next(action)
        let resp = action.payload.data;
        let year = resp.data.year;
        let month = resp.data.monthId - 1;
        let day = resp.data.day;
        let dateIdFormatted = format(new Date(year, month, day), 'yyyyMMdd')
        console.log("Get Date:", dateIdFormatted)
        let url = "/workoutDays/" + dateIdFormatted
        dispatch(getWorkoutDay(url, {
            actionType: ACTION.VIEW_WORKOUTDATE_LOCATIONS
        }))
    } else {
        next(action)
    }
}

export function restructureWorkoutPage(page) {
    return new Promise(function(resolve){
        let sectionInfos = page.sectionInfos;
        let newSections = page.newSections;
        let sections = sectionInfos.map(function(si){
            return {
                metaDataId: si.sectionMetaData.id,
                isChecked: false,
                isDisabled: false,
                id : si.section.id,
                pageNumber : si.sectionMetaData.page,
                tableHeaders: si.sectionMetaData.tableHeaders,
                parentId : si.section.parentId,
                sectionId : si.section.sectionId,
                fields : _.keyBy(si.section.fields, function(f){
                    return f.name
                })
            }
        });
        sections = _.groupBy(sections, function(s){
            return s.id
        })
        newSections = newSections.map(function(si){
            return {
                id : si.id,
                parentId : si.parentId,
                sectionId : si.sectionId,
                fields : _.keyBy(si.fields, function(f){
                    return f.name
                })
            }
        })

        newSections = _.groupBy(newSections, function(s){
            return s.id;
        })
        console.log("Restructure:", sections)
        let categorySections = sections[PAGE.WORKOUTS_PAGE.WORKOUT_SECTION];
        if (page.actionType === ACTION.VIEW_WORKOUTS) {
            if (categorySections) {
                categorySections = _.groupBy(categorySections, function(c){
                    let group = c.fields[SECTION.WORKOUTS_PAGE.WORKOUT_SECTION.CATEGORY_NAME];
                    // console.log("Before:",group)
                    let value = group.items.filter((item) => {
                        return group.value = item.id;
                    })
                    // console.log("After:",value)
                    return value[0].item.toLowerCase();
                })
            }
            console.log("Category Sections:", categorySections)
        }
        
        resolve({
            newSections,
            sections,
            actionType: page.actionType,
            categorySections

        })
    })
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