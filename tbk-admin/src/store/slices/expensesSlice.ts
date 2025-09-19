import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    listOfExpenses: []
}

const expenseSlice = createSlice({
    name : 'expenses',
    initialState,
    reducers : {
        setExpensesList : (state , action) => {
            state.listOfExpenses = action.payload;
        },
    }
})

export const { 
    setExpensesList
 } = expenseSlice.actions;
export default expenseSlice.reducer;