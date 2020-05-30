import { LOGIN_FORM_BUILD_REQUEST, postLoginPage } from "../actions/loginAction";
import { API_GET_WORKOUTDAY_BUILD, getWorkoutDay, API_ADD_WORKOUTDAY_LOCATION_BUILD, addWorkoutLocation, API_DELETE_WORKOUTDAY_LOCATION, API_DELETE_WORKOUTDAY_LOCATION_BUILD } from "../actions/workoutDayAction";
import { PAGE, ACTION, SECTION } from "../constants/page_constants";
import { API_GET_WORKOUTS_HEADER_BUILD,getWorkouts, API_GET_WORKOUTS_BUILD, keepWorkoutState, addNewWorkoutStart, API_GET_WORKOUT_DETAILS_META_INFO_BUILD, API_GET_WORKOUT_DETAILS_BUILD, buildWorkoutsRequest, API_ACTION_WORKOUT_DETAILS_SUBMIT_BUILD, API_ACTION_WORKOUT_DELETE_BUILD } from "../actions/workoutAction";

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
        
        
        if (!headerSection || action.payload.url !== workoutDayUrl || action.payload.data.isHeader) {
            next(action)
            let request = {
                actionType: action.payload.data.actionType,
                date: action.payload.data.date,
                locationId: action.payload.data.location
            }
            console.log("View Workouts Header Request:", request)
            console.log("Url:", action.payload.url)
            next(getWorkouts(action.payload.url, request))
        } 
        
        else {
            console.log("Keeping....", state.workout.exactUrl, action.payload.data)
            next(keepWorkoutState({
                exactUrl: action.payload.data.exactUrl,
                queryParams: action.payload.data.values
            }))
            if (action.payload.data.values.action === "add") {
                console.log("Let us get the bowl rolling")
                dispatch(addNewWorkoutStart({
                    exactUrl: action.payload.data.exactUrl,
                    queryParams: action.payload.data.values
                }))
            } 
        
            dispatch(buildWorkoutsRequest(workoutDayUrl, API_GET_WORKOUT_DETAILS_META_INFO_BUILD, {
                actionType: ACTION.VIEW_WORKOUT_DETAILS_META_INFO,
                queryParams: action.payload.data.values
            }))
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
    } else if (action.type === API_GET_WORKOUT_DETAILS_META_INFO_BUILD) {
        let state = getState();
        let url = state.workout.workoutDayUrl;
        console.log("Meta Info....", state.workout.exactUrl, action.payload.data.queryParams)
        let queryParams = action.payload.data.queryParams
        let exactUrl = state.workout.exactUrl;
        let parseUrl = exactUrl.split("/");
        console.log("Parsed Url:", parseUrl)
        let request = {
            actionType: action.payload.data.actionType,
            workoutId: ""
        }
        console.log("View Workout Details Meta Info Request:", request)
        console.log("Url:", url)
        next(getWorkouts(url, request))
        if (queryParams.action === "view") {
            console.log("View Workout Details")
            dispatch(buildWorkoutsRequest("/workoutDays", API_GET_WORKOUT_DETAILS_BUILD, {
                actionType: ACTION.VIEW_WORKOUT_DETAILS,
                workoutId: parseUrl[6]
            }))
        }
    } else if (action.type === API_GET_WORKOUT_DETAILS_BUILD) {
        let state = getState()
        let url = state.workout.workoutDayUrl;
        let workoutId = action.payload.data.workoutId
        let request = {
            actionType: action.payload.data.actionType,
            workoutId: workoutId
        }
        console.log("View Workout Details Request:", request, state.workout.queryParams)
        console.log("Url:", url)
        next(getWorkouts(url, request))
    } else if (action.type === API_ACTION_WORKOUT_DETAILS_SUBMIT_BUILD) {
        let state = getState()
        let selectedWorkout = state.workoutDetails.selectedWorkout; 
        let sections = state.workout.sections;
        let headerSection = sections[PAGE.WORKOUTS_PAGE.HEADER_SECTION][0];
        let workoutSection = selectedWorkout.workoutSection;
        let groupSections = selectedWorkout.groupSections;
        let categoryName = SECTION.WORKOUT_DETAILS_PAGE.WORKOUT_SECTION.CATEGORY_NAME;
        let workoutType = SECTION.WORKOUT_DETAILS_PAGE.WORKOUT_SECTION.WORKOUT_TYPE_DESC;
        let workoutDate = SECTION.WORKOUTS_PAGE.HEADER_SECTION.WORKOUT_DATE;
        let location = SECTION.WORKOUTS_PAGE.HEADER_SECTION.LOCATION;
        let delGroups = state.workoutDetails.deletedGroups;
        let url = state.workout.workoutDayUrl;
        let parseUrl = url.split("/");
        let addedOrModifedGroups = groupSections.map((item) => {
            let group = {
                groupId : item.metaDataId > 0 ? item.metaDataId.toString() : "0",
                versionNb: item.metaDataId > 0 ? item.versionNb.toString() : "0",
                fields: Object.keys(item.fields).filter(f => item.fields[f].type !== "button").map((key) => {
                    return  {
                        name: item.fields[key].name,
                        value: item.fields[key].value
                    }
                })

            }
            return group;
        })

        let deletedGroups = delGroups.filter(group => group.metaDataId > 0).map((item) => {
            let group = {
                groupId: item.metaDataId,
                versionNb: item.versionNb.toString(),
                isDeleted: true
            }
            return group;
        })

        let workout = {
            workoutId : workoutSection.metaDataId > 0 ? workoutSection.metaDataId.toString() : "0",
            versionNb : workoutSection.metaDataId > 0  ? workoutSection.versionNb.toString() : "0",
            fields : Object.keys(workoutSection.fields).filter(f => (workoutSection.fields[f].name === categoryName 
                || workoutSection.fields[f].name === workoutType)).map((key) => {
                    return {
                        name: workoutSection.fields[key].name,
                        value: workoutSection.fields[key].value
                    }
            }),
            groups: [...addedOrModifedGroups, ...deletedGroups]
        }

        let workoutDay = {
            workoutDayId : headerSection.metaDataId > 0 ? headerSection.metaDataId.toString() : "0",
            versionNb: headerSection.metaDataId > 0 ? headerSection.versionNb.toString() : "0",
            workouts: [workout], 
            fields: [
                {
                    name: workoutDate,
                    value: parseUrl[2]
                },
                {
                    name: location,
                    value: parseUrl[4]
                }
            ]
        }

        let request = {
            actionType: ACTION.WORKOUTS_ACTION,
            subActionType: action.payload.data.subActionType,
            workoutDays: [workoutDay]
        }
        console.log("Selected Workout Submit:", request, url, state.workoutDay)
        dispatch(getWorkouts("/workoutDays", request))
    } else if (action.type === API_ACTION_WORKOUT_DELETE_BUILD) {
        let state = getState()
        let sections = state.workout.sections;
        let headerSection = sections[PAGE.WORKOUTS_PAGE.HEADER_SECTION][0];
        let workoutDate = SECTION.WORKOUTS_PAGE.HEADER_SECTION.WORKOUT_DATE;
        let location = SECTION.WORKOUTS_PAGE.HEADER_SECTION.LOCATION;
        let workout = {
            workoutId: action.payload.data.workoutId.toString(),
            versionNb: action.payload.data.versionNb.toString(),
            isDeleted: true
        }
        let url = state.workout.workoutDayUrl;
        let parseUrl = url.split("/");
        let workoutDay = {
            workoutDayId : headerSection.metaDataId > 0 ? headerSection.metaDataId.toString() : "0",
            versionNb: headerSection.metaDataId > 0 ? headerSection.versionNb.toString() : "0",
            workouts: [workout], 
            fields: [
                {
                    name: workoutDate,
                    value: parseUrl[2]
                },
                {
                    name: location,
                    value: parseUrl[4]
                }
            ]
        }

        let request = {
            actionType: ACTION.WORKOUTS_ACTION,
            subActionType: action.payload.data.subActionType,
            workoutDays: [workoutDay]
        }
        console.log("Selected Workout Delete:", request, url, state.workoutDay)
        dispatch(getWorkouts("/workoutDays", request))


    } else if (action.type === API_DELETE_WORKOUTDAY_LOCATION_BUILD) {
        console.log("Delete Building", action.payload.data)
        let workoutDay = {
            workoutDayId: action.payload.data.selectedLocation.associatedIds.workoutDayId.toString(),
            versionNb: action.payload.data.selectedLocation.versionNb.toString(),
            isDeleted: true
        }
        let request = {
            actionType: ACTION.WORKOUTS_ACTION,
            subActionType: ACTION.DELETE_WORKOUTDAY_LOCATION,
            workoutDays: [workoutDay]
        }
        console.log("Selected Workout Day Delete:", request)
        dispatch(getWorkouts("/workoutDays", request))
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