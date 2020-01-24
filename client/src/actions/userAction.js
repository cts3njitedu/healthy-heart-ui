export const STORE_USER_INFO = "STORE_USER_INFO"
export const REMOVE_USER_INFO = "REMOVE_USER_INFO"


export const storeUserInfo = user => ({
    type: STORE_USER_INFO,
    payload: { user }
});

export const removeUserInfo = user => ({
    type: REMOVE_USER_INFO
})