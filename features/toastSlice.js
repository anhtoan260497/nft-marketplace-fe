const { createSlice } = require("@reduxjs/toolkit");

const toastSlice = createSlice({
    name : 'toastSlice',
    initialState : {
        isActive : false,
        message : '',
        type : ''
    },
    reducers : {
        setToast : (state, {payload}) => {
            console.log(payload)
            state.isActive = payload.isActive
            state.message  =  payload.message
            state.type =  payload.type
        }
    }
})

export const {setToast} = toastSlice.actions
export default toastSlice.reducer