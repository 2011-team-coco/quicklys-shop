import axios from 'axios'

const GET_CART = 'GET_CART'

const getCart = (cart) => {
  return {
    type: GET_CART,
    cart,
  }
}

export const getCartThunk = (userId) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`/api/users/${userId}/cart`)
      dispatch(getCart(data))
    } catch (err) {
      console.log(err)
      throw err
    }
  }
}

const initialState = {
  order_candies: [],
}

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart
    default:
      return state
  }
}
