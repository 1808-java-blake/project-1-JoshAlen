import { ersUserTypes } from '../actions/types';

const initialState: any = {
    currentReimb: [],
    currentUser: {},
    filterBy: 0,
    users: []
}

export const ersUserReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ersUserTypes.GET_USER_AND_REIMB:
      return{
          ...state,
          users: action.payload
      }
    default:
    return state;
  }
}