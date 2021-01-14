import axios from 'axios'

const SET_SINGLE_CANDY = 'SET_SINGLE_CANDY'

const setSingleCandy = (candy) => {
  return {
    type: SET_SINGLE_CANDY,
    candy,
  }
}

export const fetchSingleCandy = (id) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`/api/candies/${id}`)
      dispatch(setSingleCandy(data))
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
    default:
      return state
  }
}
