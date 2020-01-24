export default function apiAction({
    type = "",
    url = "",
    method = "GET",
    data = null,
    accessToken = null,
    onSuccess = () => { },
    onFailure = () => { },
    onStart = () => { },
    label = "",
    headersOverride = null
}) {
    return {
        type: type,
        payload: {
            url,
            method,
            data,
            accessToken,
            onSuccess,
            onFailure,
            label,
            headersOverride,
            onStart

        }
    };
}