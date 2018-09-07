import { ersUserTypes } from './types';

export const getUsersAndReimbs = () => (dispatch :any) => {
    fetch('http://localhost:9001/users')
    .then(resp => resp.json())
    .then(users => dispatch({
        payload: users,
        type: ersUserTypes.GET_USER_AND_REIMB
    }))
    .catch(err => {
        console.log(err);
    }) 
}

export const getCurrentUserAndReimb = (user: any) => (dispatch: any) => {
    dispatch({
        payload: user,
        type: ersUserTypes.GET_CURRENT_USER
    });
}

export const updateReimbStatus = (user: any, i: number, newStatusId: number) => (dispatch: any) => {
    fetch('http://localhost:9001/reimbursements/changestatus', {
        body: JSON.stringify(user),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST'
      })
      .then(resp => resp.json())
      .then(u => dispatch({
          payload: {i, u, newStatusId},
          type: ersUserTypes.UPDATE_REIMB_STATUS
      }))
      .catch(err => {
        console.log(err);
      });
}