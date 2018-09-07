import { ersUserTypes } from './types';

export const getUserAndReimb = () => (dispatch :any) => {
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
