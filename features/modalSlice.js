const { createSlice } = require("@reduxjs/toolkit");

const modalSlice = createSlice({
    name : "modalSlice",
    initialState : {
        isOpenModal : false ,
        type : '',
        selectedNft : {
            nftAddress : '',
            tokenId : 0,
            metaData : {},
            price : 0,
            owner : '',
        }
    },
    reducers : {
        setIsOpenModal : (state, action) => {
            state.isOpenModal = action.payload.isActive
            state.type = action.payload.type
         console.log(state.type)
        },
        setSelectedNft (state,action ){
            state.selectedNft = action.payload
        }
    }
})


export const {setIsOpenModal, setSelectedNft} = modalSlice.actions
export default modalSlice.reducer