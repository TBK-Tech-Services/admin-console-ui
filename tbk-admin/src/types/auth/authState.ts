import { User } from "../global/user.ts";

export interface AuthState {
    user : User | null,
    isAuthenticated : boolean
};