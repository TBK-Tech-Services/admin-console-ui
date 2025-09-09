import { User } from "../global/user.ts";

export interface AuthState {
    user : User | null,
    token : string | null,
    isAuthenticated : boolean
};