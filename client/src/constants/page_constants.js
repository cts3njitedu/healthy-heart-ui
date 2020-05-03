export const PAGE = {
    WORKOUT_DAY_LOCATIONS_PAGE : {
        HEADER_SECTION : "WORKOUT_DAY_LOCATIONS_PAGE.HEADER_SECTION",
        LOCATION_SECTION: "WORKOUT_DAY_LOCATIONS_PAGE.LOCATION_SECTION",
        ACTIVITY_SECTION: "WORKOUT_DAY_LOCATIONS_PAGE.ACTIVITY_SECTION",
        FILTER_SECTION: "WORKOUT_DAY_LOCATIONS_PAGE.FILTER_SECTION",
        LOCATION_HEADER_SECTION: "WORKOUT_DAY_LOCATIONS_PAGE.LOCATION_HEADER_SECTION"
    },
    WORKOUTS_PAGE: {
        HEADER_SECTION: "WORKOUTS_PAGE.HEADER_SECTION",
        NAVIGATION_SECTION: "WORKOUTS_PAGE.NAVIGATION_SECTION",
        ACTIVITY_SECTION: "WORKOUTS_PAGE.ACTIVITY_SECTION",
        WORKOUT_SECTION: "WORKOUTS_PAGE.WORKOUT_SECTION"

    }
};

export const SECTION = {
    WORKOUT_DAY_LOCATIONS_PAGE : {
        HEADER_SECTION : {
            WORKOUT_DATE : "workoutDate",
            LOCATIONS : "locations",
            CANCEL: "cancel",
            CHANGE_DATE: "changeDate"
        },
        LOCATION_SECTION: {
            
        },
        ACTIVITY_SECTION: {
            ADD_WORKOUTDATE_LOCATION : "addNewWorkoutDateLocation",
            CANCEL : "cancel",
            DELETE_LOCATION: "deleteLocation",
            VIEW_OTHER_LOCATIONS: "viewOtherLocations",
            VIEW_WORKOUTS : "viewWorkouts",
            VIEW_WORKOUTDAY_LOCATIONS: "viewWorkoutDayLocations"
        },
        LOCATION_HEADER_SECTION: {
            SELECT_LOCATION: "selectLocation"
        }

    },
    WORKOUTS_PAGE: {
        HEADER_SECTION : {
            WORKOUT_DATE : "workoutDate",
            LOCATION : "location"
        },
        WORKOUT_SECTION: {
            CATEGORY_NAME: "categoryName",
            WORKOUT_TYPE_DESC: "workoutTypeDesc",
            VIEW_WORKOUT_DETAILS: "viewWorkoutDetails",
            DELETE_WORKOUT: "deleteWorkout"

        }
    }
}

export const ACTION = {
    VIEW_WORKOUTDATE_LOCATIONS : "VIEW_WORKOUTDATE_LOCATIONS",
    VIEW_NON_WORKOUTDATE_LOCATIONS: "VIEW_NON_WORKOUTDATE_LOCATIONS",
    ADD_WORKOUTDATE_LOCATION: "ADD_WORKOUTDATE_LOCATION",
    VIEW_WORKOUTS_HEADER : "VIEW_WORKOUTS_HEADER",
    VIEW_WORKOUTS : "VIEW_WORKOUTS"
}

export const ACTIVITY = {
    DEFAULT: "DEFAULT_ACTIVITY",
    LOCATION_SELECTED: "LOCATION_SELECTED",
    SORT : {
        FLAT : "FLAT",
        ASCEND: "ASC",
        DESCEND : "DESC",
        TOTAL_OPTIONS: 3
    }
}