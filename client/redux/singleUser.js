import axios from 'axios'

const SET_SINGLE_USER = 'SET_SINGLE_USER'
const EDIT_USER = 'EDIT_USER'

const setSingleUser = (user) => {
  return {
    type: SET_SINGLE_USER,
    user,
  }
}
const editUser = (user) => {
  return {
    type: EDIT_USER,
    user,
  }
}

export const fetchSingleUser = (id) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`/api/users/${id}`)
      dispatch(setSingleUser(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const modifyUser = (previousUserId, modifiedUser) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.put(
        `/api/users/${previousUserId}`,
        modifiedUser
      )
      dispatch(editUser(data))
    } catch (error) {
      console.log(error)
    }
  }
}

const initialState = {}

export default function singleUserReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_USER:
      return action.user
    case EDIT_USER:
      return action.user
    default:
      return state
  }
}
