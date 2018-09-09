import { combineReducers } from "redux";
import { signInReducer } from "./sign-in.reducer";
import { ersUserReducer } from "./ersUserReducer";

export interface ISignInState {
  credentials: {
    password: string,
    username: string
  },
  errorMessage: string,
  signinUser: object
}

export interface IState {
  signIn: ISignInState,
}

export const state = combineReducers<IState>({
  signIn: signInReducer,
  user: ersUserReducer
})