export const FORM_CHANGE = "FORM_CHANGE"



export const handleFormChange = field => ({
    type: FORM_CHANGE,
    payload: { field }
});
