import apiAction from "./apiAction";

export const API_GET_ABOUT_PAGE = "API_GET_ABOUT_PAGE"
export const API_GET_ABOUT_PAGE_START = "API_GET_ABOUT_PAGE_START"
export const API_GET_ABOUT_PAGE_SUCCESS = "API_GET_ABOUT_PAGE_SUCCESS"
export const API_GET_ABOUT_PAGE_FAILURE = "API_GET_ABOUT_PAGE_FAILURE"

export function getAboutPage() {
    return apiAction({
        type: API_GET_ABOUT_PAGE,
        url: "/api/about",
        method: "GET",
        onStart: getAboutPageStart,
        onSuccess: getAboutPageSuccess,
        onFailure: getAboutPageFailure
    });
}

export const getAboutPageStart = () => ({
    type: API_GET_ABOUT_PAGE_START
})
export const getAboutPageSuccess = (page, header) => ({
    type: API_GET_ABOUT_PAGE_SUCCESS,
    payload: { page, header}
});

export const getAboutPageFailure = error => ({
    type: API_GET_ABOUT_PAGE_FAILURE,
    payload: { error }
});

