/* eslint-disable*/

import axios from 'axios'

//ACTIONS TYPE:
const SET_CANDIES = 'SET_CANDIES'

//ACTION CREATOR:
export const setCandies = candies => ({
  type: SET_CANDIES,
  candies
})

//THUNK
export const fetchCandies = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/candies')
      dispatch(setCandies(data))
    } catch (err) {
      console.log(err)
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
    default:
      return state
  }
}
