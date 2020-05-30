import { PAGE, ACTION, SECTION } from "../constants/page_constants";

export function convertLocationActivityFields(sections, isLocationSelected, actionType, metaData) {
    let activityId = PAGE.WORKOUT_DAY_LOCATIONS_PAGE.ACTIVITY_SECTION;
    if (sections[activityId]) {
        let isWorkoutLocation = (actionType === ACTION.VIEW_WORKOUTDATE_LOCATIONS);
        let cancel = SECTION.WORKOUT_DAY_LOCATIONS_PAGE.ACTIVITY_SECTION.CANCEL
        let deleteLocation = SECTION.WORKOUT_DAY_LOCATIONS_PAGE.ACTIVITY_SECTION.DELETE_LOCATION
        let viewOtherLocations = SECTION.WORKOUT_DAY_LOCATIONS_PAGE.ACTIVITY_SECTION.VIEW_OTHER_LOCATIONS
        let viewLocations = SECTION.WORKOUT_DAY_LOCATIONS_PAGE.ACTIVITY_SECTION.VIEW_WORKOUTDAY_LOCATIONS
        let viewWorkouts = SECTION.WORKOUT_DAY_LOCATIONS_PAGE.ACTIVITY_SECTION.VIEW_WORKOUTS
        let addWorkoutLocation = SECTION.WORKOUT_DAY_LOCATIONS_PAGE.ACTIVITY_SECTION.ADD_WORKOUTDATE_LOCATION;
        let isDeleting = metaData.isDeleting;
        let isDateChange = (metaData.tempSelectedDate.length !== 0);
        console.log("Activity Location Section Select:", sections[activityId], isLocationSelected,actionType, isDeleting, isDateChange)
        return {
            ...sections,
            [activityId]: sections[activityId].map((item, index) => {
                if (index === 0) {
                    return {
                        ...item,
                        fields: Object.keys(item.fields).reduce((result, key) => {
                            if (key === deleteLocation || key === viewWorkouts) {
                                result[key] = {
                                    ...item.fields[key],
                                    isDisabled: !isLocationSelected || isDeleting || isDateChange,
                                    isHidden: !isWorkoutLocation
                                }
                                return result;
                            } else if (key === viewOtherLocations) {
                                result[key] = {
                                    ...item.fields[key],
                                    isDisabled: !isWorkoutLocation || isDeleting,
                                    isHidden: !isWorkoutLocation
                                }
                                return result;
                            } else if (key === addWorkoutLocation) {
                                result[key] = {
                                    ...item.fields[key],
                                    isDisabled: !isLocationSelected || isDeleting,
                                    isHidden: isWorkoutLocation
                                }
                                return result
                            } else if (key === viewLocations) {
                                result[key] = {
                                    ...item.fields[key],
                                    isDisabled: isWorkoutLocation || isDeleting,
                                    isHidden: isWorkoutLocation
                                }
                                return result;
                            } else {
                                result[key] = {
                                    ...item.fields[key],
                                    isDisabled: false || isDeleting,
                                    isHidden: false
                                }
                                return result
                            }

                        }, {})
                    }

                } else {
                    return item;
                }
            })
        }
    }
}