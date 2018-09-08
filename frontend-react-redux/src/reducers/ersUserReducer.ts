import { ersUserTypes } from '../actions/types';

const initialState: any = {
    currentReimb: [],
    currentUser: {},
    filterBy: 0,
    users: []
}

export const ersUserReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ersUserTypes.CREATE_REIMB:
      return state;
      
    case ersUserTypes.GET_USER_AND_REIMB:
      return{
          ...state,
          users: action.payload
      }
    case ersUserTypes.GET_CURRENT_USER:
      return{
          ...state,
          currentReimb: action.payload.Reimbursement,
          currentUser: action.payload
      }
    case ersUserTypes.UPDATE_REIMB_STATUS:
      const oldReimb = state.currentReimb[action.payload.i];
      oldReimb.reimbStatusId = action.payload.newStatusId;
      return{
          ...state,
          currentReimb: state.currentReimb.slice(0, action.payload.i)
          .concat([oldReimb])
          .concat(state.currentReimb.slice(action.payload.i + 1))
      }
    default:
      return state;
  }
}

