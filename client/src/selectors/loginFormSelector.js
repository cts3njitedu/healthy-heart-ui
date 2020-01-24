export function convertLoginFields(state) {
    let page = state.loginForm.page
    if (page.fields) {
    
        return Object.assign({},...page.fields.map(s => ({[s.name]: s})));
    }
    return null
}