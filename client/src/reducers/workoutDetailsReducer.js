import { ACTION_ADD_WORKOUT_START, ACTION_ADD_WORKOUT, ACTION_CHANGE_CATEGORY_NAME, ACTION_CHANGE_CATEGORY_CONFIRMATION_YES, ACTION_CHANGE_CATEGORY_CONFIRMATION_NO, ACTION_CHANGE_WORKOUT_TYPE, ACTION_CHANGE_WORKOUT_TYPE_CONFIRMATION_YES, ACTION_CHANGE_WORKOUT_TYPE_CONFIRMATION_NO, API_RESTRUCTURE_WORKOUT_DETAILS_META_INFO, API_RESTRUCTURE_WORKOUT_DETAILS, ACTION_ADD_EDIT_WORKOUT_GROUP_START, ACTION_HANDLE_CHANGE_GROUP, ACTION_GROUP_FORM_VALIIDATION_FINISH, ACTION_KEEP_STAGE_UNCHANGED, ACTION_CANCEL_WORKOUT_GROUP, ACTION_CANCEL_WORKOUT_GROUP_CONFIRMATION_YES, ACTION_CANCEL_WORKOUT_GROUP_CONFIRMATION_NO, ACTION_ADD_WORKOUT_GROUP_SAVE, ACTION_ADD_EDIT_WORKOUT_GROUP_SAVE, ACTION_EDIT_WORKOUT_GROUP_SAVE, ACTION_DELETE_WORKOUT_GROUP, ACTION_WORKOUT_CANCEL_CHANGES_CONFIRMATION_YES, ACTION_WORKOUT_CANCEL_CHANGES, ACTION_WORKOUT_CANCEL_CHANGES_CONFIRMATION_NO, ACTION_WORKOUT_CLOSE, ACTION_WORKOUT_CLOSE_CONFIRMATION_YES, ACTION_WORKOUT_CLOSE_CONFIRMATION_NO, ACTION_WORKOUT_SUBMIT_CONFIRMATION_YES, ACTION_WORKOUT_SUBMIT_CONFIRMATION_NO, ACTION_WORKOUT_SUBMIT, ACTION_WORKOUT_SUBMITTED } from "../actions/workoutAction";
import { SECTION , PAGE, ACTION_WORKOUT_SUBMIT_CONFIRMATION_MESSAGE} from "../constants/page_constants";

const initialState = {
    sections : {},
    newSections: {},
    loading: false,
    error: false,
    isViewWorkout: false,
    workoutViews: {},
    selectedWorkout : {
        workoutSection: {},
        groupSections: []

    },
    sourceSelectedWorkout: {
        workoutSection: {},
        groupSections: []
    },
    sourceSections: {},
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
    previousActivityButtons: {},
    newGroupMetaDataId : 0,
    deletedGroups: [],
    isDirty: false,
    isSubmitting: false,
    isSubmitted: {
        isSubmitAndClose: false,
        isSubmitAndContinue: false,
        workoutId: 0
    }
    
    
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
                isDirty: true,
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
                    },
                    groupSections: []
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
                isDirty: true,
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
                    },
                    groupSections: []
                }
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
                isMetaInfoError: false,
                isDirty: false,
                isClosing: false,
                isSubmitting: false,
                isSubmitted: {}
            }
        }
        case API_RESTRUCTURE_WORKOUT_DETAILS : {
            let workoutSection = action.payload.page.sections[PAGE.WORKOUT_DETAILS_PAGE.WORKOUT_SECTION][0];
            let newGroupSections = action.payload.page.sections[PAGE.WORKOUT_DETAILS_PAGE.GROUP_SECTION] || [];
            return {
                ...state,
                selectedWorkout: {
                    ...state.selectedWorkout,
                    workoutSection: {
                        ...workoutSection
                    },
                    groupSections: [...newGroupSections]
                },
                sourceSelectedWorkout: {
                    ...state.selectedWorkout,
                    workoutSection: {
                        ...workoutSection
                    },
                    groupSections: [...newGroupSections]
                },
                isWorkoutDetailsLoading: false,
                isWorkoutDetailsError: false,
                newGroupMetaDataId: 0,
                isDirty: false,
                isClosing: false,
                isSubmitting: false,
                isSubmitted: {}
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
                isDirty: true,
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
                isDirty: true,
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
        case ACTION_ADD_EDIT_WORKOUT_GROUP_SAVE: {
            let previousActivities = action.payload.data.previousActivities;
            let activitySectionId = PAGE.WORKOUT_DETAILS_PAGE.ACTIVITY_SECTION;
            let saveGroup = SECTION.WORKOUT_DETAILS_PAGE.ACTIVITY_SECTION.SAVE_GROUP;
            let cancel = SECTION.WORKOUT_DETAILS_PAGE.ACTIVITY_SECTION.CANCEL;
            let cancelChanges = SECTION.WORKOUT_DETAILS_PAGE.ACTIVITY_SECTION.CANCEL_CHANGES;
            let submitAndContinue = SECTION.WORKOUT_DETAILS_PAGE.ACTIVITY_SECTION.SUBMIT_CONTINUE;
            let submitAndClose = SECTION.WORKOUT_DETAILS_PAGE.ACTIVITY_SECTION.SUBMIT_CLOSE
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
                                    } else if (key === cancelChanges || key === submitAndContinue || key === submitAndClose) {
                                        result[key] = {
                                            ...item.fields[key],
                                            isDisabled: false,
                                            isHidden: false
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
        case ACTION_ADD_WORKOUT_GROUP_SAVE: {
            let newGroup = action.payload.editGroup;
            let deleteField = SECTION.WORKOUT_DETAILS_PAGE.GROUP_SECTION.DELETE;
            let edit = SECTION.WORKOUT_DETAILS_PAGE.GROUP_SECTION.EDIT
            return {
                ...state,
                newGroupMetaDataId: state.newGroupMetaDataId - 1,
                selectedWorkout: {
                    ...state.selectedWorkout,
                    groupSections: [...state.selectedWorkout.groupSections, 
                        {
                            ...newGroup,
                            fields: Object.keys(newGroup.fields).reduce((result, key) => {
                                if (key === deleteField || key === edit) {
                                    result[key] = {
                                        ...newGroup.fields[key],
                                        isDisabled: false,
                                        isHidden: false
                                    }
                                    return result;
                                } else {
                                    result[key] = {
                                        ...newGroup.fields[key],
                                        isDisabled: true,
                                        isHidden: false
                                    }
                                    return result;
                                }

                            },{})
                        }
                    ]
                }

            }
        }
        case ACTION_EDIT_WORKOUT_GROUP_SAVE: {
            let newGroup = action.payload.editGroup;
            let deleteField = SECTION.WORKOUT_DETAILS_PAGE.GROUP_SECTION.DELETE;
            let edit = SECTION.WORKOUT_DETAILS_PAGE.GROUP_SECTION.EDIT
            return {
                ...state,
                selectedWorkout: {
                    ...state.selectedWorkout,
                    groupSections: state.selectedWorkout.groupSections.map((item) => {
                        if (item.metaDataId === newGroup.metaDataId) {
                            return {
                                ...newGroup,
                                fields: Object.keys(newGroup.fields).reduce((result, key) => {
                                    if (key === deleteField || key === edit) {
                                        result[key] = {
                                            ...newGroup.fields[key],
                                            isDisabled: false,
                                            isHidden: false
                                        }
                                        return result;
                                    } else {
                                        result[key] = {
                                            ...newGroup.fields[key],
                                            isDisabled: true,
                                            isHidden: false
                                        }
                                        return result;
                                    }
    
                                },{})
                            }
                        }
                        return item;
                    })
                }
            }
        }
        case ACTION_DELETE_WORKOUT_GROUP: {
            let deleteGroup = action.payload.editGroup;
            return {
                ...state,
                isDirty: true,
                selectedWorkout: {
                    ...state.selectedWorkout,
                    groupSections: state.selectedWorkout.groupSections.filter((item) => {
                        if (item.metaDataId === deleteGroup.metaDataId) {
                            return false;
                        }
                        return true;
                    })
                },
                deletedGroups: [...state.deletedGroups, deleteGroup]
            }
        }
        case ACTION_WORKOUT_CANCEL_CHANGES: {
            return {
                ...state,
                confirmationData: {
                    ...state.confirmationData,
                    confirmYes: ACTION_WORKOUT_CANCEL_CHANGES_CONFIRMATION_YES,
                    confirmNo: ACTION_WORKOUT_CANCEL_CHANGES_CONFIRMATION_NO,
                    data : {
                        ...action.payload.data
                    }
                }
            }
        }
        case ACTION_WORKOUT_CANCEL_CHANGES_CONFIRMATION_YES: {
            let newSections = state.newSections;
            let activitySectionId = PAGE.WORKOUT_DETAILS_PAGE.ACTIVITY_SECTION;
            let sourceSelectedWorkout = state.sourceSelectedWorkout;
            return {
                ...state,
                isAddGroup: false,
                isEditGroup: false,
                editGroup : {},
                sourceEditGroup: {},
                previousActivityButtons: {},
                confirmationData: {},
                isValidationErrors: false,
                isDirty: false,
                selectedWorkout: {
                    ...sourceSelectedWorkout
                },
                sections: {
                    ...state.sections,
                    [activitySectionId] : [...newSections[activitySectionId]]
                }
            }
        }
        case ACTION_WORKOUT_CANCEL_CHANGES_CONFIRMATION_NO: {
            return {
                ...state,
                confirmationData: {}
            }
        }
        case ACTION_WORKOUT_CLOSE: {
            return {
                ...state,
                confirmationData: {
                    ...state.confirmationData,
                    confirmYes: ACTION_WORKOUT_CLOSE_CONFIRMATION_YES,
                    confirmNo: ACTION_WORKOUT_CLOSE_CONFIRMATION_NO,
                    data : {
                        ...action.payload.data
                    }
                }
            }
        }
        case ACTION_WORKOUT_CLOSE_CONFIRMATION_YES: {
            return {
                ...state,
                isClosing: true,
                isDirty: false,
                confirmationData: {}
            }
        }
        case ACTION_WORKOUT_CLOSE_CONFIRMATION_NO: {
            return {
                ...state,
                confirmationData: {}
            }
        }
        case ACTION_WORKOUT_SUBMIT: {
            let deleteField = SECTION.WORKOUT_DETAILS_PAGE.GROUP_SECTION.DELETE;
            let edit = SECTION.WORKOUT_DETAILS_PAGE.GROUP_SECTION.EDIT
            return {
                ...state,
                confirmationData: {
                    ...state.confirmationData,
                    confirmYes: ACTION_WORKOUT_SUBMIT_CONFIRMATION_YES,
                    confirmNo: ACTION_WORKOUT_SUBMIT_CONFIRMATION_NO,
                    confirmMessage: ACTION_WORKOUT_SUBMIT_CONFIRMATION_MESSAGE,
                    data : {
                        ...action.payload.data
                    }
                },
                isSubmitting: true,
                isSubmitted : {
                    isSubmitAndContinue: !action.payload.data.isSubmitAndClose,
                    isSubmitAndClose: action.payload.data.isSubmitAndClose
                },
                selectedWorkout: {
                    ...state.selectedWorkout,
                    groupSections: state.selectedWorkout.groupSections.map((item) => {
                   
                            return {
                                ...item,
                                fields: Object.keys(item.fields).reduce((result, key) => {
                                    if (key === deleteField || key === edit) {
                                        result[key] = {
                                            ...item.fields[key],
                                            isDisabled: true,
                                            isHidden: false
                                        }
                                        return result;
                                    } else {
                                        result[key] = {
                                            ...item.fields[key]
                            
                                        }
                                        return result;
                                    }
    
                                },{})
                            
                        }
                    })
                }
            }
        }
        case ACTION_WORKOUT_SUBMIT_CONFIRMATION_YES: {
            return {
                ...state,
                confirmationData: {},

            }
        }
        case ACTION_WORKOUT_SUBMIT_CONFIRMATION_NO: {
            let deleteField = SECTION.WORKOUT_DETAILS_PAGE.GROUP_SECTION.DELETE;
            let edit = SECTION.WORKOUT_DETAILS_PAGE.GROUP_SECTION.EDIT
            return {
                ...state,
                confirmationData: {},
                isSubmitting: false,
                isSubmitted: {},
                selectedWorkout: {
                    ...state.selectedWorkout,
                    groupSections: state.selectedWorkout.groupSections.map((item) => {
                   
                            return {
                                ...item,
                                fields: Object.keys(item.fields).reduce((result, key) => {
                                    if (key === deleteField || key === edit) {
                                        result[key] = {
                                            ...item.fields[key],
                                            isDisabled: false,
                                            isHidden: false
                                        }
                                        return result;
                                    } else {
                                        result[key] = {
                                            ...item.fields[key]
                            
                                        }
                                        return result;
                                    }
    
                                },{})
                            
                        }
                    })
                }
            }
        }
        case ACTION_WORKOUT_SUBMITTED: {
            return {
                ...state,
                isSubmitting: false,
                isSubmitted: {
                    ...state.isSubmitted,
                    workoutId: action.payload.data.workoutId
                }
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
                previousActivityButtons: {},
                isDirty: false,
                isClosing: false
            }
        }
    }
}