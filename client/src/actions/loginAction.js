import apiAction from "./apiAction"

export const LOGIN_FORM_SUBMIT_BEGIN = "LOGIN_FORM_SUBMIT_BEGIN"
export const LOGIN_FORM_SUBMIT_SUCCESS = "LOGIN_FORM_SUBMIT_SUCCESS"
export const LOGIN_FORM_SUBMIT_FAIL = "LOGIN_FORM_SUBMIT_FAIL"
export const LOGIN_PAGE_BEGIN = "LOGIN_PAGE_BEGIN"
export const LOGIN_PAGE_SUCCESS = "LOGIN_PAGE_SUCCESS"
export const LOGIN_PAGE_FAILURE = "LOGIN_PAGE_FAILURE"
export const RESTRUCTURE_PAGE = "RESTRUCTURE_PAGE"
export const LOGIN_FORM_CHANGE = "LOGIN_FORM_CHANGE"
export const LOGIN_FORM_VALIDATION = "LOGIN_FORM_VALIDATION"
export const LOGIN_FORM_VALIDATION_FINISH = "LOGIN_FORM_VALIDATION_FINISH"
export const LOGIN_FORM_BUILD_REQUEST = "LOGIN_FORM_BUILD_REQUEST"
export const API_GET_LOGIN_PAGE = "API_GET_LOGIN_PAGE"
export const API_GET_LOGIN_PAGE_START = "API_GET_LOGIN_PAGE_START"
export const API_GET_LOGIN_PAGE_SUCCESS = "API_GET_LOGIN_PAGE_SUCCESS"
export const API_GET_LOGIN_PAGE_FAILURE = "API_GET_LOGIN_PAGE_FAILURE"
export const API_POST_LOGIN_PAGE = "API_POST_LOGIN_PAGE"
export const API_POST_LOGIN_PAGE_START = "API_POST_LOGIN_PAGE_START"
export const API_POST_LOGIN_PAGE_SUCCESS = "API_POST_LOGIN_PAGE_SUCCESS"
export const API_POST_LOGIN_PAGE_FAILURE = "API_POST_LOGIN_PAGE_FAILURE"
export const API_POST_LOGOUT_PAGE = "API_POST_LOGOUT_PAGE"
export const API_POST_LOGOUT_PAGE_START = "API_POST_LOGOUT_PAGE_START"
export const API_POST_LOGOUT_PAGE_SUCCESS = "API_POST_LOGOUT_PAGE_SUCCESS"
export const API_POST_LOGOUT_PAGE_FAILURE = "API_POST_LOGOUT_PAGE_FAILURE"
export function submit() {
    console.log("has submitted")
}

export function handleChange() {


}
export const handleSubmit = (fields, page_url) => ({
    type: LOGIN_FORM_SUBMIT_BEGIN,
    payload: {fields, page_url}

})

export function getLoginPage(page_url) {
    return apiAction({
        type: API_GET_LOGIN_PAGE,
        url: "/api" + page_url,
        method: "GET",
        onStart: getLoginPageStart,
        onSuccess: getLoginPageSuccess,
        onFailure: getLoginPageFailure
    });
}

export function postLogoutPage() {
    return {
        type: API_POST_LOGOUT_PAGE
    }
    
}
export const getLoginPageStart = () => ({
    type: API_GET_LOGIN_PAGE_START
})
export const getLoginPageSuccess = page => ({
    type: API_GET_LOGIN_PAGE_SUCCESS,
    payload: { page }
});

export const getLoginPageFailure = error => ({
    type: API_GET_LOGIN_PAGE_FAILURE,
    payload: { error }
});

export const postLoginPageStart = () => ({
    type: API_POST_LOGIN_PAGE_START
})
export const postLoginPageSuccess = (page, header) => ({
    type: API_POST_LOGIN_PAGE_SUCCESS,
    payload: { page , header}
});

export const postLoginPageFailure = (error, page) => ({
    type: API_POST_LOGIN_PAGE_FAILURE,
    payload: { error,page}
});

export const postLogoutPageStart = () => ({
    type: API_POST_LOGOUT_PAGE_START
})
export const postLogoutPageSuccess = () => ({
    type: API_POST_LOGOUT_PAGE_SUCCESS
});

export const postLogoutPageFailure = () => ({
    type: API_POST_LOGOUT_PAGE_FAILURE
});
export const handleFormChange = field => ({
    type: LOGIN_FORM_CHANGE,
    payload: { field }
});

export function postLoginPage (page, page_url) {
    return apiAction({
        type: API_POST_LOGIN_PAGE,
        url: "/api" + page_url,
        method: "POST",
        onStart: postLoginPageStart,
        onSuccess: postLoginPageSuccess,
        onFailure: postLoginPageFailure,
        data: page
    });
    
} 
    
export const handleRestructurePage = (page, pageTemplate) => ({
    type: RESTRUCTURE_PAGE,
    payload: { page, pageTemplate }
});

export const handleFormBlur = fields => ({
    type: LOGIN_FORM_VALIDATION,
    payload: { fields }
})

export const handleRequestBuilder = (fields, page_url) => ({
    type: LOGIN_FORM_BUILD_REQUEST,
    payload: {fields, page_url}
})
export const handleFormValidationFinish = (errorFields, isError) => ({
    type: LOGIN_FORM_VALIDATION_FINISH,
    payload: { errorFields, isError: isError }
});