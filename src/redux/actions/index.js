export const ADD_NEW_USER = 'ADD_NEW_USER';

export const addNewUser = (userId) => ({
  type: ADD_NEW_USER,
  payload: userId,
});
