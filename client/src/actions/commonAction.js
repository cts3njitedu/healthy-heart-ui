export const ACTION_REROUTE_PAGE = "ACTION_REROUTE_PAGE"
export const ACTION_ERROR = "ACTION_ERROR"
export const ACTION_ERROR_OK = "ACTION_ERROR_OK"

export const reRoutePage = (data) => ({
    type: ACTION_REROUTE_PAGE,
    payload: {data}
})

export const errorDisplay = (data) => ({
    type: ACTION_ERROR,
    payload: {data}
})

export const errorDisplayRemove = (data) => ({
    type: ACTION_ERROR_OK,
    payload: {data}
})