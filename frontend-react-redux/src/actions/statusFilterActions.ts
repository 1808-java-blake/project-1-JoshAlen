import { statusFilterTypes } from './types';

export const getActiveTab = (tab: string) => (dispatch: any) => {
    dispatch({
        payload: tab,
        type: statusFilterTypes.GET_ACTIVE_TAB
    });
}
