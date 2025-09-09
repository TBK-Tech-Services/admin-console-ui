import { AuthState } from "@/types/auth/authState.ts";
import { User } from "@/types/global/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState : AuthState = {
    user : null,
    isAuthenticated : false
}

const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        setIsAuthenticated : (state) => {
            state.isAuthenticated = true;
        },
        setUser : (state , action: PayloadAction<User | null>) => {
            state.user = action.payload;
        },
    }
})

export const { 
    setIsAuthenticated,
    setUser
 } = authSlice.actions;
export default authSlice.reducer;