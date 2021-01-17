import axios from 'axios'

//all
const CLEAR_CART = `CLEAR_CART`

//for guest
const GUEST_ADD_CART_CANDY = `GUEST_ADD_CART_CANDY`

//for user
const GET_CART = 'GET_CART'
const USER_UPDATE_CART_CANDY_QTY = 'USER_UPDATE_CART_CANDY_QTY'
const USER_DELETE_CART_CANDY = 'USER_DELETE_CART_CANDY'

//no thunk, so we need to export it
export const clearCart = () => {
  return {
    type: CLEAR_CART,
  }
}

const guestAddCartCandy = (orderCandy) => {
  return {
    type: GUEST_ADD_CART_CANDY,
    orderCandy,
  }
}

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

export const guestAddCartCandyThunk = (
  quantity,
  candyId,
  candyName,
  candyPrice,
  imageUrl
) => {
  return async (dispatch) => {
    const orderCandy = {
      quantity,
      candy: {
        candyId,
        name: candyName,
        price: candyPrice,
        imageUrl,
      },
    }
    dispatch(guestAddCartCandy(orderCandy))
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
    case CLEAR_CART:
      return initialState
    case GET_CART:
      return action.cart
    case USER_UPDATE_CART_CANDY_QTY:
      return action.cart
    case USER_DELETE_CART_CANDY:
      return action.cart
    case GUEST_ADD_CART_CANDY:
      return {
        ...state,
        order_candies: [...state.order_candies, action.orderCandy],
      }
    default:
      return state
  }
}
