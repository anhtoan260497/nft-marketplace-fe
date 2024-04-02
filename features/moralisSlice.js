const { createSlice } = require("@reduxjs/toolkit");

const moralisSlice = createSlice({
    name : 'moralisSlice',
    initialState : {
        isStarted : false,
    },
    reducers : {
        setStart(state, action) {
            state.isStarted = action.payload
        }
    }
})


export const {setStart} =  moralisSlice.actions
export default moralisSlice.reducer