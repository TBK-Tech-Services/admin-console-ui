import { AuthState } from "@/types/auth/authState.ts";
import { createSlice } from "@reduxjs/toolkit"

const initialState : AuthState = {
    user : null,
    token : null,
    isAuthenticated : false
}

const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        setCredentials : (state , action) => {
            
        },
        logout : (state , action) => {

        }
    }
})

export const { 
    setCredentials,
    logout
 } = authSlice.actions;
export default authSlice.reducer;