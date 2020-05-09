import { ACTION_ADD_WORKOUT_START, ACTION_ADD_WORKOUT, ACTION_CHANGE_CATEGORY_NAME, ACTION_CHANGE_CATEGORY_CONFIRMATION_YES, ACTION_CHANGE_CATEGORY_CONFIRMATION_NO, ACTION_CHANGE_WORKOUT_TYPE, ACTION_CHANGE_WORKOUT_TYPE_CONFIRMATION_YES, ACTION_CHANGE_WORKOUT_TYPE_CONFIRMATION_NO } from "../actions/workoutAction";
import { SECTION } from "../constants/page_constants";

const initialState = {
    sections : { 
    },
    loading: false,
    error: false,
    isViewWorkout: false,
    workoutViews: {},
    selectedWorkout : {
        workoutSection: {},
        groupSections: {}
    },
    sourceSelectedWorkout: {
        workoutSection: {},
        groupSections: {}
    },
    confirmationData: {}
};

export default function workoutDetailsReducer(state = initialState, action) {
    console.log(action);
    switch (action.type) {
        case ACTION_ADD_WORKOUT_START: {
            return {
                ...state,
                loading: true,
                error: false
            }
            
        }
        case ACTION_ADD_WORKOUT: {
            return {
                ...state,
                loading: false,
                error: false,
                selectedWorkout: {
           
                    ...state.selectedWorkout,
                    workoutSection : {
                        ...action.payload.workoutSection
                    },
                    groupSections: []
                    
                    
                },
                sourceSelectedWorkout: {
                    ...state.sourceSelectedWorkout,
                    workoutSection : {
                        ...action.payload.workoutSection
                    },
                    groupSections: []
                }
            }
        }
        case ACTION_CHANGE_CATEGORY_NAME : {
            return {
                ...state,
                confirmationData: {
                    ...state.confirmationData,
                    confirmYes: ACTION_CHANGE_CATEGORY_CONFIRMATION_YES,
                    confirmNo: ACTION_CHANGE_CATEGORY_CONFIRMATION_NO,
                    data : {
                        ...action.payload.data
                    }
                }
            }
        }
        case ACTION_CHANGE_CATEGORY_CONFIRMATION_YES: {
            let categoryName = SECTION.WORKOUTS_PAGE.WORKOUT_SECTION.CATEGORY_NAME;
            let category = action.payload.data.category
            let workoutType = SECTION.WORKOUTS_PAGE.WORKOUT_SECTION.WORKOUT_TYPE_DESC;
            let workoutTypeItems = action.payload.data.workoutTypeItems;
            return {
                ...state,
                confirmationData: {},
                selectedWorkout: {
                    ...state.selectedWorkout,
                    workoutSection: {
                        ...state.selectedWorkout.workoutSection,
                        fields: {
                            ...state.selectedWorkout.workoutSection.fields,
                            [categoryName] : {
                                ...state.selectedWorkout.workoutSection.fields[categoryName],
                                value: category.code,
                            },
                            [workoutType] : {
                                ...state.selectedWorkout.workoutSection.fields[workoutType],
                                items: [...workoutTypeItems],
                                value: ""
                            }
                        }
                    }
                }
            }
        }
        case ACTION_CHANGE_CATEGORY_CONFIRMATION_NO: {
            return {
                ...state,
                confirmationData: {}
            }
        }
        case ACTION_CHANGE_WORKOUT_TYPE: {
            return {
                ...state,
                confirmationData: {
                    ...state.confirmationData,
                    confirmYes: ACTION_CHANGE_WORKOUT_TYPE_CONFIRMATION_YES,
                    confirmNo: ACTION_CHANGE_WORKOUT_TYPE_CONFIRMATION_NO,
                    data : {
                        ...action.payload.data
                    }
                }
            }
        }
        case ACTION_CHANGE_WORKOUT_TYPE_CONFIRMATION_YES : {
            let workoutType = SECTION.WORKOUTS_PAGE.WORKOUT_SECTION.WORKOUT_TYPE_DESC;
            let workoutTypeDesc = action.payload.data.workoutTypeDesc;
            return {
                ...state,
                confirmationData: {},
                selectedWorkout: {
                    ...state.selectedWorkout,
                    workoutSection: {
                        ...state.selectedWorkout.workoutSection,
                        fields: {
                            ...state.selectedWorkout.workoutSection.fields,
                            [workoutType] : {
                                ...state.selectedWorkout.workoutSection.fields[workoutType],
                                value: workoutTypeDesc.code
                            }
                        }
                    }
                }
            }
        }
        case ACTION_CHANGE_WORKOUT_TYPE_CONFIRMATION_NO: {
            return {
                ...state,
                confirmationData: {}
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}