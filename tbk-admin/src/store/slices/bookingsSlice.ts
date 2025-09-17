import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    listOfBookings: []
}

const bookingsSlice = createSlice({
    name : 'bookings',
    initialState,
    reducers : {
        setBookings : (state , action) => {
            state.listOfBookings = action.payload;
        },
    }
})

export const { 
    setBookings
 } = bookingsSlice.actions;
export default bookingsSlice.reducer;