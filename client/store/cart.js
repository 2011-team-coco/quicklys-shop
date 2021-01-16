import axios from 'axios'

const GET_CART = 'GET_CART'
const USER_UPDATE_CART_CANDY_QTY = 'USER_UPDATE_CART_CANDY_QTY'
const USER_DELETE_CART_CANDY = 'USER_DELETE_CART_CANDY'

const getCart = (cart) => {
  return {
    type: GET_CART,
    cart,
  }
}

const userUpdateCartCandyQty = (cart) => {
  return {
    type: USER_UPDATE_CART_CANDY_QTY,
    cart,
  }
}

const userDeleteCartCandy = (cart) => {
  return {
    type: USER_DELETE_CART_CANDY,
    cart,
  }
}

export const userDeleteCartCandyThunk = (userId, candyId) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.delete(
        `/api/users/${userId}/cart/candy/${candyId}`
      )
      dispatch(userDeleteCartCandy(data))
    } catch (err) {
      console.log(err)
      throw err
    }
  }
}

export const userUpdateCartCandyQtyThunk = (userId, candyId, quantity) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.put(
        `/api/users/${userId}/cart/candy/${candyId}`,
        {
          quantity,
        }
      )
      dispatch(userUpdateCartCandyQty(data))
    } catch (err) {
      console.log(err)
      throw err
    }
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
    case USER_UPDATE_CART_CANDY_QTY:
      return action.cart
    case USER_DELETE_CART_CANDY:
      return action.cart
    default:
      return state
  }
}
