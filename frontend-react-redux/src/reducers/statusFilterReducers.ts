import { statusFilterTypes } from '../actions/types';

const initialState: any = {
    activeTabClassName: "tab0",
    filterBy: 0
}

export const statusFilterReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case statusFilterTypes.GET_ACTIVE_TAB:
        return {
            ...state,
            activeTabClassName: action.payload.activeTabClassName,
            filterBy: action.payload.filterBy
        } 
      default:
        return state;
    }
  }