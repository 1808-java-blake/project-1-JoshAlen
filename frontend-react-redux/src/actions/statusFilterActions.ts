import { statusFilterTypes } from './types';

export const getActiveTab = (tab: string) => (dispatch: any) => {
    const num = Number(tab.slice(-1));
    dispatch({
        payload: {activeTabClassName: tab, filterBy: num},
        type: statusFilterTypes.GET_ACTIVE_TAB
    });
}
