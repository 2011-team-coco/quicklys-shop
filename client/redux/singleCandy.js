import axios from 'axios'

const SET_SINGLE_CANDY = 'SET_SINGLE_CANDY'
const EDIT_CANDY = 'EDIT_CANDY'

const setSingleCandy = candy => {
  return {
    type: SET_SINGLE_CANDY,
    candy
  }
}
const editCandy = candy => {
  return {
    type: EDIT_CANDY,
    candy
  }
}

export const fetchSingleCandy = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/candies/${id}`)
      dispatch(setSingleCandy(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const modifyCandy = (previousCandyId, modifiedCandy) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(
        `/api/candies/${previousCandyId}`,
        modifiedCandy
      )
      dispatch(editCandy(data))
    } catch (error) {
      console.log(error)
    }
  }
}

const initialState = {}

export default function singleCandyReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_CANDY:
      return action.candy
    case EDIT_CANDY:
      return action.candy
    default:
      return state
  }
}
