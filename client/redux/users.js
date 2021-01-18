/* eslint-disable*/

import axios from 'axios'

//ACTIONS TYPE:
const SET_USERS = 'SET_USERS'
const ADD_USER = 'ADD_USER'
const DELETE_USER = 'DELETE_USER'

//ACTION CREATOR:
export const setUsers = (users) => ({
  type: SET_USERS,
  users,
})

export const addUser = (user) => {
  return {
    type: ADD_USER,
    user,
  }
}

export const deleteUser = (user) => {
  return {
    type: DELETE_USER,
    user,
  }
}

//THUNK
export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get('/api/users')
      dispatch(setUsers(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const createUser = (user) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.post('/api/users', user)
      dispatch(addUser(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const destroyUser = (userId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/users/${userId}`)
      dispatch(deleteUser(userId))
    } catch (error) {
      console.log(error)
    }
  }
}

//REDUCER

const initialState = []

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USERS:
      return action.users
    case ADD_USER:
      return [...state, action.user]
    case DELETE_USER:
      return state.filter((user) => user.id !== action.userId)
    default:
      return state
  }
}
