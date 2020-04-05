import apiAction from "./apiAction"

export const API_GET_CALENDAR = "API_GET_CALENDAR"
export const API_GET_CALENDAR_START = "API_GET_CALENDAR_START"
export const API_GET_CALENDAR_SUCCESS = "API_GET_CALENDAR_SUCCESS"
export const API_RESTRUCTURE_CALENDAR = "API_RESTRUCTURE_CALENDAR"
export const API_GET_CALENDAR_FAILURE = "API_GET_CALENDAR_FAILURE"



export function getCalendar(page_url) {
    return apiAction({
        type: API_GET_CALENDAR,
        url: "/api" + page_url,
        method: "GET",
        onStart: getCalendarStart,
        onSuccess: getCalendarSuccess,
        onFailure: getCalendarFailure
    });
}



export const getCalendarStart = () => ({
    type: API_GET_CALENDAR_START
})
export const getCalendarSuccess = (calendar, header) => ({
    type: API_GET_CALENDAR_SUCCESS,
    payload: { calendar, header }
});

export const getCalendarFailure = error => ({
    type: API_GET_CALENDAR_FAILURE,
    payload: { error }
});

export const restructureCalendar = (calendar) => ({
    type: API_RESTRUCTURE_CALENDAR,
    payload: {calendar}
})