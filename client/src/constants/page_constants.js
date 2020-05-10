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

    },
    WORKOUT_DETAILS_PAGE: {
        WORKOUT_SECTION: "WORKOUT_DETAILS_PAGE.WORKOUT_SECTION",
        ACTIVITY_SECTION: "WORKOUT_DETAILS_PAGE.ACTIVITY_SECTION",
        GROUP_SECTION: "WORKOUT_DETAILS_PAGE.GROUP_SECTION"
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

        },
        ACTIVITY_SECTION: {
            GO_BACK: "goBackToLocations",
            ADD_WORKOUT: "addWorkout"
        }
    },
    WORKOUT_DETAILS_PAGE: {
        WORKOUT_SECTION: {
            CATEGORY_NAME: "categoryName",
            WORKOUT_TYPE_DESC: "workoutTypeDesc",
            VIEW_WORKOUT_DETAILS: "viewWorkoutDetails",
            DELETE_WORKOUT: "deleteWorkout"

        },
        ACTIVITY_SECTION: {
            ADD_GROUP: "addGroup",
            CANCEL_CHANGES: "cancelChanges",
            CLOSE: "close",
            SUBMIT_CLOSE: "submitAndClose",
            SUBMIT_CONTINUE: "submitAndContinue"
        },
        GROUP_SECTION: {
            SETS: "sets",
            CLOSE: "close",
            DELETE: "delete",
            DURATION: "duration",
            EDIT: "edit",
            REPETITIONS: "repetitions",
            SAVE: "save",
            VARIATION: "variation",
            WEIGHT: "weight"
        }
    }
}

export const ACTION = {
    VIEW_WORKOUTDATE_LOCATIONS : "VIEW_WORKOUTDATE_LOCATIONS",
    VIEW_NON_WORKOUTDATE_LOCATIONS: "VIEW_NON_WORKOUTDATE_LOCATIONS",
    ADD_WORKOUTDATE_LOCATION: "ADD_WORKOUTDATE_LOCATION",
    VIEW_WORKOUTS_HEADER : "VIEW_WORKOUTS_HEADER",
    VIEW_WORKOUTS : "VIEW_WORKOUTS",
    VIEW_WORKOUT_DETAILS_META_INFO: "VIEW_WORKOUT_DETAILS_META_INFO",
    VIEW_WORKOUT_DETAILS: "VIEW_WORKOUT_DETAILS"

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