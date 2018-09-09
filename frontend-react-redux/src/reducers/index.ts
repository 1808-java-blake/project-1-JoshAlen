import { combineReducers } from "redux";
import { signInReducer } from "./sign-in.reducer";
import { ersUserReducer } from "./ersUserReducer";
import { statusFilterReducer } from "./statusFilterReducers";

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
  filter: statusFilterReducer,
  signIn: signInReducer,
  user: ersUserReducer
})