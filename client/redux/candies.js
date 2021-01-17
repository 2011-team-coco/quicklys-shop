/* eslint-disable*/

import axios from 'axios'

//ACTIONS TYPE:
const SET_CANDIES = 'SET_CANDIES'
const ADD_CANDY = 'ADD_CANDY'
const DELETE_CANDY = 'DELETE_CANDY'

//ACTION CREATOR:
export const setCandies = (candies) => ({
  type: SET_CANDIES,
  candies,
})
export const addCandy = (candy) => {
  return {
    type: ADD_CANDY,
    candy,
  }
}

export const deleteCandy = (candy) => {
  return {
    type: DELETE_CANDY,
    candy,
  }
}

//THUNK
export const fetchCandies = () => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get('/api/candies')
      dispatch(setCandies(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const createCandy = (candy) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.post('/api/candies', candy)
      dispatch(addCandy(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const destroyCandy = (candyId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/candies/${candyId}`)
      dispatch(deleteCandy(candyId))
    } catch (error) {
      console.log(error)
    }
  }
}

// Take a look at app/redux/index.js to see where this reducer is
// added to the Redux store with combineReducers

//REDUCER

const initialState = []

export default function candiesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CANDIES:
      return action.candies
    case ADD_CANDY:
      return [...state, action.candy]
    case DELETE_CANDY:
      return state.filter((candy) => candy.id !== action.candyId)
    default:
      return state
  }
}
