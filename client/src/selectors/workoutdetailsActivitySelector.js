import { SECTION, PAGE } from "../constants/page_constants";

export function convertWorkoutDetailsActivityFields(state) {
    let sections = state.workoutDetails.sections;
    let selectedWorkout = state.workoutDetails.selectedWorkout;
    let activitySectionId = PAGE.WORKOUT_DETAILS_PAGE.ACTIVITY_SECTION;
    let addGroup = SECTION.WORKOUT_DETAILS_PAGE.ACTIVITY_SECTION.ADD_GROUP;
    let submitAndContinue = SECTION.WORKOUT_DETAILS_PAGE.ACTIVITY_SECTION.SUBMIT_CONTINUE;
    let submitAndClose = SECTION.WORKOUT_DETAILS_PAGE.ACTIVITY_SECTION.SUBMIT_CLOSE;
    let cancelChanges = SECTION.WORKOUT_DETAILS_PAGE.ACTIVITY_SECTION.CANCEL_CHANGES
    let workoutSection = selectedWorkout.workoutSection;
    console.log("Select:", workoutSection, sections[activitySectionId])
    if (sections[activitySectionId] && workoutSection.fields) {
        console.log("Workout select");
        let categoryName = workoutSection.fields[SECTION.WORKOUT_DETAILS_PAGE.WORKOUT_SECTION.CATEGORY_NAME];
        let workoutType = workoutSection.fields[SECTION.WORKOUT_DETAILS_PAGE.WORKOUT_SECTION.WORKOUT_TYPE_DESC]; 
        let isDisabled = categoryName.value.length === 0 || workoutType.value.length === 0;
        console.log("Workout Detail Activity Selector:", categoryName, workoutType, isDisabled, state.workoutDetails.isDirty)
        return {
            ...sections,
            [activitySectionId] : sections[activitySectionId].map((item, index) => {
                if (index === 0) {
                    return {
                        ...item,
                        fields: Object.keys(item.fields).reduce((result, key) => {
                            if (key === addGroup) {
                                result[key] = {
                                    ...item.fields[key],
                                    isDisabled: state.workoutDetails.isSubmitting || isDisabled
                                }
                                return result;
                            } else if (key === submitAndContinue || key === submitAndClose) {
                                result[key] = {
                                    ...item.fields[key],
                                    isDisabled: state.workoutDetails.isSubmitting || isDisabled || !state.workoutDetails.isDirty
                                }
                                return result;
                            } else if (key === cancelChanges) {
                                result[key] ={
                                    ...item.fields[key],
                                    isDisabled: !state.workoutDetails.isDirty || state.workoutDetails.isSubmitting
                                }
                                return result;
                            } else {
                                result[key] = {
                                    ...item.fields[key],
                                    isDisabled : state.workoutDetails.isSubmitting
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
    return {};
}