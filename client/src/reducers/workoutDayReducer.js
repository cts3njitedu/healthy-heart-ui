import { API_GET_WORKOUTDAY, API_RESTRUCTURE_WORKOUTDAY, API_GET_WORKOUTDAY_FAILURE, ACTION_CHANGE_WORKOUT_DATE, ACTION_SUBMIT_WORKOUT_DATE, ACTION_CANCEL_CHANGE_WORKOUT_DATE, ACTION_GO_BACK_TO_CALENDER, ACTION_SELECT_LOCATION, ACTION_SELECT_LOCATION_START, ACTION_SORT_LOCATION_TABLE_START, ACTION_SORT_LOCATION_TABLE, API_GET_WORKOUTDAY_BUILD, ACTION_FILTER_LOCATION_TABLE, API_ADD_WORKOUTDAY_LOCATION_BUILD, API_ADD_WORKOUTDAY_LOCATION_SUCCESS, API_ADD_WORKOUTDAY_LOCATION_FAILURE } from "../actions/workoutAction";
import {PAGE, SECTION} from '../constants/page_constants'
const initialState = {
    sections : {},
    newSections: {},
    loading: false,
    error: false,
    isLocationSelected: false,
    selectedLocation : {},
    selectedDate : "",
    tempSelectedDate: "",
    isSubmitDate: false,
    isGoBackToCalendar: false,
    heartSort : {},
    actionType: ""
    
};

export default function workoutDayReducer(state = initialState, action) {

    console.log(action);
    switch (action.type) {
        case API_GET_WORKOUTDAY: {
            return {
                ...state,
                loading: true,
                error: false,
            }

        }
        case API_RESTRUCTURE_WORKOUTDAY : {
            return {
                ...state,
                loading: false,
                sections: action.payload.page.sections,
                newSections: action.payload.page.newSections,
                actionType: action.payload.page.actionType,
                heartSort: action.payload.page.heartSort

            }
        }
        case API_GET_WORKOUTDAY_FAILURE : {
            return {
                ...state,
                error: true,
                loading: false
            }
        }
        case ACTION_CHANGE_WORKOUT_DATE: {
            let headerSectionId = PAGE.WORKOUT_DAY_LOCATIONS_PAGE.HEADER_SECTION;
            let cancel = SECTION.WORKOUT_DAY_LOCATIONS_PAGE.HEADER_SECTION.CANCEL;
            let change = SECTION.WORKOUT_DAY_LOCATIONS_PAGE.HEADER_SECTION.CHANGE_DATE;
            let workout = SECTION.WORKOUT_DAY_LOCATIONS_PAGE.HEADER_SECTION.WORKOUT_DATE;
            return {
                ...state,
                tempSelectedDate: action.payload.date,
                sections: {
                    ...state.sections,
                    [headerSectionId] : state.sections[headerSectionId].map((item, index) => {
                        if (index === 0) {
                            let section = {
                                ...item,
                                fields: {
                                    ...item.fields,
                                    [cancel] : {
                                        ...item.fields[cancel],
                                        isDisabled: (action.payload.date.length === 0) || (action.payload.date===item.fields[workout].value)
                                    },
                                    [change] : {
                                        ...item.fields[change],
                                        isDisabled: (action.payload.date.length === 0) || (action.payload.date===item.fields[workout].value)
                                    }

                                }
                            }
                            return section;
                        }
                        return item
                    })
                }

            }
        }
        case ACTION_SUBMIT_WORKOUT_DATE: {
            return {
                ...state,
                isSubmitDate: true
            }
        }
        case ACTION_CANCEL_CHANGE_WORKOUT_DATE: {
            let headerSectionId = PAGE.WORKOUT_DAY_LOCATIONS_PAGE.HEADER_SECTION;
            let cancel = SECTION.WORKOUT_DAY_LOCATIONS_PAGE.HEADER_SECTION.CANCEL;
            let change = SECTION.WORKOUT_DAY_LOCATIONS_PAGE.HEADER_SECTION.CHANGE_DATE;
            return {
                ...state,
                isSubmitDate: false,
                tempSelectedDate: "",
                sections: {
                    ...state.sections,
                    [headerSectionId] : state.sections[headerSectionId].map((item, index) => {
                        if (index === 0) {
                            let section = {
                                ...item,
                                fields: {
                                    ...item.fields,
                                    [cancel] : {
                                        ...item.fields[cancel],
                                        isDisabled: true
                                    },
                                    [change] : {
                                        ...item.fields[change],
                                        isDisabled: true
                                    }

                                }
                            }
                            return section;
                        }
                        return item
                    })
                }

            }
        }
        case ACTION_GO_BACK_TO_CALENDER: {
            let sectionId = action.payload.cancelField.sectionId;
            let name = action.payload.cancelField.name;
            let disabled = action.payload.cancelField.disabled;
            return {
                ...state,
                isGoBackToCalendar: true,
                sections: {
                    ...state.sections,
                    [sectionId] : state.sections[sectionId].map((item, index) => {
                        if (index === 0) {
                          let section = item;
                          section.fields[name].isDisabled = disabled
                          return section

                        }
                        return item;
                    })
                }

            }
        }
        case ACTION_SELECT_LOCATION_START : {
            return {
                ...state
            }
        }
        case ACTION_SELECT_LOCATION: {
            let isChecked = action.payload.newLocation.isChecked;
            let location = action.payload.newLocation;
            let activityId = action.payload.activityId;
            let activityFields = action.payload.activityFields
            return {
                ...state,
                isLocationSelected: isChecked,
                selectedLocation : location,
                sections: {
                    ...state.sections,
                    [location.id] : state.sections[location.id].map((item, index) => {
                        let modLocation = item;
                        if (item.metaDataId === location.metaDataId) {
                            modLocation.isChecked = isChecked;
                            modLocation.isDisabled = false;
                            return modLocation;
                        } else {
                            modLocation.isChecked = false;
                            modLocation.isDisabled = isChecked
                            return modLocation
                        }
                    }),
                    [activityId] : state.sections[activityId].map((item, index) => {
                            if (index === 0) {
                                return{
                                    ...item,
                                    fields: activityFields
                                }
    
                            } else {
                                return item;
                            }
                    })
    
                }
            }
        }
        case ACTION_SORT_LOCATION_TABLE_START : {
            return {
                ...state
            }
        }
        case ACTION_SORT_LOCATION_TABLE : {
            let locationHeaderSectionId = PAGE.WORKOUT_DAY_LOCATIONS_PAGE.LOCATION_HEADER_SECTION;
            let fieldName = action.payload.fieldName;
            let sortOrder = action.payload.sortOrder;
            return {
                ...state,
                sections : {
                    ...state.sections,
                    [locationHeaderSectionId] : state.sections[locationHeaderSectionId].map((item,index) => {
                        if (index === 0) {
                            return {
                                ...item,
                                fields : {
                                    ...item.fields,
                                    [fieldName] : {
                                        ...item.fields[fieldName],
                                        sortOrder: sortOrder
                                    }
                                }
                            }
                        }
                        return item;
                    })
                }
            }
        }
        case ACTION_FILTER_LOCATION_TABLE : {
            let filterSection = PAGE.WORKOUT_DAY_LOCATIONS_PAGE.FILTER_SECTION;
            let fieldName = action.payload.fieldName
            let value = action.payload.value
            return {
                ...state,
                sections: {
                    ...state.sections,
                    [filterSection] : state.sections[filterSection].map((item, index) => {
                        if (index === 0) {
                            return {
                                ...item,
                                fields: {
                                    ...item.fields,
                                    [fieldName] : {
                                        ...item.fields[fieldName],
                                        value: value
                                    }
                                }
                            }
                        }
                        return item;
                    })
                }
            }
        }
        case API_GET_WORKOUTDAY_BUILD : {
            return {
                ...state
            }
        }
        case API_ADD_WORKOUTDAY_LOCATION_BUILD: {
            let activityId = PAGE.WORKOUT_DAY_LOCATIONS_PAGE.ACTIVITY_SECTION;
            let locationId = PAGE.WORKOUT_DAY_LOCATIONS_PAGE.LOCATION_SECTION
            return {
                ...state,
                sections: {
                    ...state.sections,
                    [locationId] : state.sections[locationId].map((item, index) => {
                        let modLocation = {
                            ...item,
                            isDisabled: true
                        }
                        return modLocation;
                    
                    }),
                    [activityId] : state.sections[activityId].map((item, index) => {
                            if (index === 0) {
                                return{
                                    ...item,
                                    fields: Object.keys(item.fields).reduce((result, key) => {
                                        result[key] = {
                                            ...item.fields[key],
                                            isDisabled: true
                                        }
                                        return result
                                    }, {})
                                }
    
                            } else {
                                return item;
                            }
                    })
    
                }
            }
        }
        case API_ADD_WORKOUTDAY_LOCATION_SUCCESS: {
            return {
                ...state
            }
        }
        case API_ADD_WORKOUTDAY_LOCATION_FAILURE: {
            return {
                error: true
            }
        }
        default: {
            return {
                ...state,
                error: false,
                loading: true,
                isLocationSelected: false,
                selectedLocation : {},
                selectedDate : "",
                tempSelectedDate: "",
                isSubmitDate: false,
                isGoBackToCalendar: false,
                actionType: ""

            }
        }
    }

}

