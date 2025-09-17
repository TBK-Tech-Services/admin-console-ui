import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    listOfVilla: []
}

const villasSlice = createSlice({
    name : 'villas',
    initialState,
    reducers : {
        setVillas : (state , action) => {
            state.listOfVilla = action.payload;
        },
    }
})

export const { 
    setVillas
 } = villasSlice.actions;
export default villasSlice.reducer;