import { ACTION_ADD_WORKOUT_START, ACTION_ADD_WORKOUT, ACTION_CHANGE_CATEGORY_NAME, ACTION_CHANGE_CATEGORY_CONFIRMATION_YES, ACTION_CHANGE_CATEGORY_CONFIRMATION_NO, ACTION_CHANGE_WORKOUT_TYPE, ACTION_CHANGE_WORKOUT_TYPE_CONFIRMATION_YES, ACTION_CHANGE_WORKOUT_TYPE_CONFIRMATION_NO, API_RESTRUCTURE_WORKOUT_DETAILS_META_INFO, API_GET_WORKOUT_DETAILS_META_INFO_BUILD, API_RESTRUCTURE_WORKOUT_DETAILS, ACTION_ADD_EDIT_WORKOUT_GROUP_START, ACTION_HANDLE_CHANGE_GROUP, ACTION_GROUP_FORM_VALIIDATION_FINISH, ACTION_KEEP_STAGE_UNCHANGED, ACTION_CANCEL_WORKOUT_GROUP, ACTION_CANCEL_WORKOUT_GROUP_CONFIRMATION_YES, ACTION_CANCEL_WORKOUT_GROUP_CONFIRMATION_NO } from "../actions/workoutAction";
import { SECTION , PAGE} from "../constants/page_constants";

const initialState = {
    sections : {},
    newSections: {},
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
        groupSections: []
    },
    confirmationData: {},
    isWorkoutDetailsLoading: false,
    isWorkoutDetailsError: false,
    isMetaInfoLoading: false,
    isMetaInfoError: false,
    isAddGroup: false,
    isEditGroup: false,
    editGroup: {},
    sourceEditGroup: {},
    isValidationErrors: false,
    previousActivityButtons: {}
};

export default function workoutDetailsReducer(state = initialState, action) {
    console.log(action);
    switch (action.type) {
        case ACTION_ADD_WORKOUT_START: {
            return {
                ...state,
                loading: true,
                error: false,
                isMetaInfoLoading: true,
                isMetaInfoError: false,
                isWorkoutDetailsLoading: true,
                isWorkoutDetailsError: false
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
                },
                isWorkoutDetailsLoading: false,
                isWorkoutDetailsError: false
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
                },
                groupSections: []
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
                },
                groupSections: []
            }
        }
        case ACTION_CHANGE_WORKOUT_TYPE_CONFIRMATION_NO: {
            return {
                ...state,
                confirmationData: {}
            }
        }
        case API_RESTRUCTURE_WORKOUT_DETAILS_META_INFO: {
            let pageSections = action.payload.page.sections;
            let pageNewSections = action.payload.page.newSections;
            return {
                ...state,
                sections: {
                    ...pageSections
                },
                newSections: {
                    ...pageNewSections
                },
                isMetaInfoLoading: false,
                isMetaInfoError: false
            }
        }
        case API_RESTRUCTURE_WORKOUT_DETAILS : {
            let workoutSection = action.payload.page.sections[PAGE.WORKOUT_DETAILS_PAGE.WORKOUT_SECTION][0];
            let newGroupSections = action.payload.page.sections[PAGE.WORKOUT_DETAILS_PAGE.GROUP_SECTION];
            return {
                ...state,
                selectedWorkout: {
                    ...state.selectedWorkout,
                    workoutSection: {
                        ...workoutSection
                    },
                    groupSections: [...newGroupSections]
                },
                isWorkoutDetailsLoading: false,
                isWorkoutDetailsError: false
            }
        }
        case ACTION_ADD_EDIT_WORKOUT_GROUP_START : {
            let activitySectionId = PAGE.WORKOUT_DETAILS_PAGE.ACTIVITY_SECTION;
            let saveGroup = SECTION.WORKOUT_DETAILS_PAGE.ACTIVITY_SECTION.SAVE_GROUP;
            let cancel = SECTION.WORKOUT_DETAILS_PAGE.ACTIVITY_SECTION.CANCEL;
            let group = action.payload.editGroup;
            let edit = SECTION.WORKOUT_DETAILS_PAGE.GROUP_SECTION.EDIT;
            let deleteField = SECTION.WORKOUT_DETAILS_PAGE.GROUP_SECTION.DELETE;
            let currentActivities = action.payload.data.currentActivityFields;
            return {
                ...state,
                isAddGroup: action.payload.isAddGroup,
                isEditGroup: !action.payload.isAddGroup,
                previousActivityButtons: {
                    ...currentActivities
                },
                editGroup : {
                    ...group,
                    fields: Object.keys(group.fields).reduce((result, key) => {
                        if (key === edit || key === deleteField) {
                            result[key] = {
                                ...group.fields[key],
                                isDisabled: true,
                                isHidden: true
                            }
                            return result;
                        } else {
                            result[key] = {
                                ...group.fields[key],
                                isDisabled: false,
                                isHidden: false
                            }
                            return result;
                        }
                    }, {})
                },
                sourceEditGroup: {
                    ...group
                },
                sections: {
                    ...state.sections,
                    [activitySectionId]: state.sections[activitySectionId].map((item, index) => {
                        if (index === 0) {
                            return {
                                ...item,
                                fields: Object.keys(item.fields).reduce((result, key) => {
                                    if (key === saveGroup) {
                                        result[key] = {
                                            ...item.fields[key],
                                            isDisabled: true,
                                            isHidden: false
                                        }
                                        return result;
                                    } else if (key === cancel) {
                                        result[key] = {
                                            ...item.fields[key],
                                            isDisabled: false,
                                            isHidden: false
                                        }
                                        return result;
                                    } else {
                                        result[key] = {
                                            ...item.fields[key],
                                            isDisabled: true,
                                            isHidden: true

                                        }
                                        return result;
                                    }
                                    
                                }, {})
                            }
                        }
                        return item;
                    })
                }
            }
        }
        case ACTION_HANDLE_CHANGE_GROUP: {
            let activitySectionId = PAGE.WORKOUT_DETAILS_PAGE.ACTIVITY_SECTION;
            let saveGroup = SECTION.WORKOUT_DETAILS_PAGE.ACTIVITY_SECTION.SAVE_GROUP;
            let changeName = action.payload.field.name;
            let changeValue = action.payload.field.value;
            let isDirty = action.payload.field.isDirty;
            return {
                ...state,
                editGroup: {
                    ...state.editGroup,
                    fields: {
                        ...state.editGroup.fields,
                        [changeName] : {
                            ...state.editGroup.fields[changeName],
                            value: changeValue,
                            isDirty: true
                        }
                    }
                },
                sections: {
                    ...state.sections,
                    [activitySectionId]: state.sections[activitySectionId].map((item, index) => {
                        if (index === 0) {
                            return {
                                ...item,
                                fields: {
                                    ...item.fields,
                                    [saveGroup]: {
                                        ...item.fields[saveGroup],
                                        isDisabled: !isDirty
                                    }
                                }
                            }
                        }
                        return item;
                    })
                }
            }
        }
        case ACTION_GROUP_FORM_VALIIDATION_FINISH: {
            let errors = action.payload.errors;
            let activitySectionId = PAGE.WORKOUT_DETAILS_PAGE.ACTIVITY_SECTION;
            let saveGroup = SECTION.WORKOUT_DETAILS_PAGE.ACTIVITY_SECTION.SAVE_GROUP;
            return {
                ...state,
                isValidationErrors: action.payload.isError,
                editGroup: {
                    ...state.editGroup,
                    fields: Object.keys(state.editGroup.fields).reduce((result, key) => {
                        let field = state.editGroup.fields[key];
                        console.log("Field Hi:", state.editGroup.fields[key])
                        result[key] = {
                            ...field,
                            errors: errors[field.id]
                        }
                        return result;
                    },{})
                },
                sections: {
                    ...state.sections,
                    [activitySectionId]: state.sections[activitySectionId].map((item, index) => {
                        if (index === 0) {
                            return {
                                ...item,
                                fields: {
                                    ...item.fields,
                                    [saveGroup]: {
                                        ...item.fields[saveGroup],
                                        isDisabled: action.payload.isError
                                    }
                                }
                            }
                        }
                        return item;
                    })
                }
            }
        }
        case ACTION_CANCEL_WORKOUT_GROUP: {
            return {
                ...state,
                confirmationData: {
                    ...state.confirmationData,
                    confirmYes: ACTION_CANCEL_WORKOUT_GROUP_CONFIRMATION_YES,
                    confirmNo: ACTION_CANCEL_WORKOUT_GROUP_CONFIRMATION_NO,
                    data : {
                        ...action.payload.data
                    }
                }
            }
        }
        case ACTION_CANCEL_WORKOUT_GROUP_CONFIRMATION_YES: {
            let activitySectionId = PAGE.WORKOUT_DETAILS_PAGE.ACTIVITY_SECTION;
            let saveGroup = SECTION.WORKOUT_DETAILS_PAGE.ACTIVITY_SECTION.SAVE_GROUP;
            let cancel = SECTION.WORKOUT_DETAILS_PAGE.ACTIVITY_SECTION.CANCEL;
            let previousActivities = action.payload.data.previousActivities;
            return {
                ...state,
                isAddGroup: false,
                isEditGroup: false,
                editGroup : {},
                sourceEditGroup: {},
                previousActivityButtons: {},
                confirmationData: {},
                isValidationErrors: false,
                sections: {
                    ...state.sections,
                    [activitySectionId]: state.sections[activitySectionId].map((item, index) => {
                        if (index === 0) {
                            return {
                                ...item,
                                fields: Object.keys(item.fields).reduce((result, key) => {
                                    if (key === saveGroup) {
                                        result[key] = {
                                            ...item.fields[key],
                                            isDisabled: true,
                                            isHidden: true
                                        }
                                        return result;
                                    } else if (key === cancel) {
                                        result[key] = {
                                            ...item.fields[key],
                                            isDisabled: true,
                                            isHidden: true
                                        }
                                        return result;
                                    } else {
                                        result[key] = {
                                            ...item.fields[key],
                                            isDisabled: previousActivities[key].isDisabled,
                                            isHidden: previousActivities[key].isHidden

                                        }
                                        return result;
                                    }
                                    
                                }, {})
                            }
                        }
                        return item;
                    })
                }
            }
        }
        case ACTION_CANCEL_WORKOUT_GROUP_CONFIRMATION_NO: {
            return {
                ...state,
                confirmationData: {}
            }
        }
        case ACTION_KEEP_STAGE_UNCHANGED: {
            return {
                ...state
            }
        }
        default: {
            return {
                ...state,
                isAddGroup: false,
                isEditGroup: false,
                editGroup: {},
                sourceEditGroup: {},
                isValidationErrors: false,
                previousActivityButtons: {}
            }
        }
    }
}