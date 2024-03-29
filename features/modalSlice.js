const { createSlice } = require("@reduxjs/toolkit");

const modalSlice = createSlice({
    name : "modalSlice",
    initialState : {
        isOpenModal : false,
        selectedNft : {
            nftAddress : '',
            tokenId : 0,
        }
    },
    reducers : {
        setIsOpenModal : (state, action) => {
            state.isOpenModal = action.payload
        },
        setSelectedNft (state,action ){
            state.selectedNft = action.payload
        }
    }
})


export const {setIsOpenModal, setSelectedNft} = modalSlice.actions
export default modalSlice.reducer