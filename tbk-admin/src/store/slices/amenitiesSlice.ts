import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    listOfAmenities: []
}

const amenitiesSlice = createSlice({
    name : 'amenities',
    initialState,
    reducers : {
        setAmenities : (state , action) => {
            state.listOfAmenities = action.payload;
        },
    }
})

export const { 
    setAmenities
 } = amenitiesSlice.actions;
export default amenitiesSlice.reducer;