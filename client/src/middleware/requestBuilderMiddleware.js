import { LOGIN_FORM_BUILD_REQUEST, postLoginPage } from "../actions/loginAction";
import { API_GET_WORKOUTDAY_BUILD, getWorkoutDay, API_ADD_WORKOUTDAY_LOCATION_BUILD, addWorkoutLocation, actionViewWorkouts } from "../actions/workoutDayAction";
import { PAGE } from "../constants/page_constants";
import { API_GET_WORKOUTS_HEADER_BUILD,getWorkouts, API_GET_WORKOUTS_BUILD, keepWorkoutState, addNewWorkoutStart } from "../actions/workoutAction";

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
    } else if (action.type === API_GET_WORKOUTDAY_BUILD) {
        let state = getState()
        let locationHeader = state.workoutDay.sections[PAGE.WORKOUT_DAY_LOCATIONS_PAGE.LOCATION_HEADER_SECTION][0]
        let fields = locationHeader.fields;
        let filter = state.workoutDay.sections[PAGE.WORKOUT_DAY_LOCATIONS_PAGE.FILTER_SECTION][0]
        let filterfields = filter.fields;
        // console.log("What is happening", filterfields)
        let request = {
            actionType: state.workoutDay.actionType,
            heartSort : Object.keys(fields).filter(key => fields[key].sortOrder != null).reduce(function(result, key) {
                result[key] = {
                    sortOrder: fields[key].sortOrder
                }
                return result;
            }, {}),
            heartFilter: Object.keys(filterfields).filter(key => filterfields[key].value && (0 !== filterfields[key].value.length)).reduce((result, key) => {
                result[key] = filterfields[key].value
                return result;
            },{})
        }
        console.log("Url", action.payload.url, request)
        next(getWorkoutDay(action.payload.url, request))
    } else if (action.type === API_ADD_WORKOUTDAY_LOCATION_BUILD) {
        next(action)
        let state = getState();
        let selectedLocation = state.workoutDay.selectedLocation;
        let request = {
            actionType: action.payload.actionType,
            sectionInfo: {
                sectionMetaData: {
                    id: selectedLocation.metaDataId,
                    page: selectedLocation.pageNumber
                },
                section: {
                    id: selectedLocation.id,
                    parentId: selectedLocation.parentId,
                    sectionId: selectedLocation.sectionId,
                    fields: Object.keys(selectedLocation.fields).map((key) => {
                        return selectedLocation.fields[key]
                    }),
                    isHidden: false
                }
            }
        }
        console.log("Selected Location Request:", request)
        next(addWorkoutLocation(action.payload.url, request))
    } else if (action.type === API_GET_WORKOUTS_HEADER_BUILD) {
        let state = getState();
        console.log("Sections Builder:", state.workout.sections, action.payload.data.exactUrl, action.payload.data.values)
        let headerSection = state.workout.sections[PAGE.WORKOUTS_PAGE.HEADER_SECTION];
        let workoutDayUrl = state.workout.workoutDayUrl;
        if (!headerSection || action.payload.url !== workoutDayUrl) {
            next(action)
            let request = {
                actionType: action.payload.data.actionType,
                date: action.payload.data.date,
                locationId: action.payload.data.location
            }
            console.log("View Workouts Request:", request)
            console.log("Url:", action.payload.url)
            next(getWorkouts(action.payload.url, request))
        } 
        
        else {
            console.log("Keeping....", state.workout.exactUrl, state.workout.queryParams)
            next(keepWorkoutState({
                exactUrl: action.payload.data.exactUrl,
                queryParams: action.payload.data.values
            }))
            if (action.payload.data.values.action === "add") {
                console.log("Let us get the bowl rolling")
                dispatch(addNewWorkoutStart())
            }
        }
        
    } else if(action.type === API_GET_WORKOUTS_BUILD){
        next(action)
        let state = getState();
        let headerSection = state.workout.sections[PAGE.WORKOUTS_PAGE.HEADER_SECTION][0];
        let url = state.workout.workoutDayUrl;
        console.log("View Workous Data:",headerSection, url)
        let request = {
            actionType: action.payload.data.actionType,
            workoutDayId: headerSection.metaDataId
        }
        console.log("View Workouts Request:", request)
        console.log("Url:", url)
        next(getWorkouts(url, request))
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