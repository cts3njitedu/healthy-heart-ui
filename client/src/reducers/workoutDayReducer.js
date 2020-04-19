import { API_GET_WORKOUTDAY, API_RESTRUCTURE_WORKOUTDAY, API_GET_WORKOUTDAY_FAILURE, ACTION_CHANGE_WORKOUT_DATE, ACTION_SUBMIT_WORKOUT_DATE, ACTION_CANCEL_CHANGE_WORKOUT_DATE, ACTION_GO_BACK_TO_CALENDER, ACTION_SELECT_LOCATION } from "../actions/workoutAction";

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
    isGoBackToCalendar: false
    
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
                newSections: action.payload.page.newSections

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
            return {
                ...state,
                tempSelectedDate: action.payload.date

            }
        }
        case ACTION_SUBMIT_WORKOUT_DATE: {
            return {
                ...state,
                isSubmitDate: true
            }
        }
        case ACTION_CANCEL_CHANGE_WORKOUT_DATE: {
            return {
                ...state,
                isSubmitDate: false,
                tempSelectedDate: ""
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
                        if (index == 0) {
                          let section = item;
                          section.fields[name].isDisabled = disabled
                          return section

                        }
                        return item;
                    })
                }

            }
        }
        case ACTION_SELECT_LOCATION: {
            let isChecked = action.payload.newLocation.isChecked;
            let location = action.payload.newLocation;
            let activityId = action.payload.metaData;
            return {
                ...state,
                isLocationSelected: isChecked,
                selectedLocations : location,
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
                            if (index==0) {
                                return{
                                    ...item,
                                    fields: Object.keys(item.fields).reduce(function(result,key){
                            
                                            result[key] = {
                                                ...item.fields[key],
                                                isDisabled: !isChecked
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
        default : {
            return {
                ...state,
                error: false,
                loading: true,
                isLocationSelected: false,
                selectedLocation : {},
                selectedDate : "",
                tempSelectedDate: "",
                isSubmitDate: false,
                isGoBackToCalendar: false

            }
        }
    }

}

