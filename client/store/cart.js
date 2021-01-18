import axios from 'axios'

//all
const CLEAR_CART = `CLEAR_CART`

//for guest
const GUEST_ADD_CART_CANDY = `GUEST_ADD_CART_CANDY`
const GUEST_UPDATE_CART_CANDY_QTY = `GUEST_UPDATE_CART_CANDY_QTY`
const GUEST_DELETE_CART_CANDY = `GUEST_DELETE_CART_CANDY`

//for user
const GET_CART = 'GET_CART'
const USER_ADD_CART_CANDY = `USER_ADD_CART_CANDY`
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

//no thunk, so we need to export it
export const guestUpdateCartCandyQty = (candyId, quantity) => {
  return {
    type: GUEST_UPDATE_CART_CANDY_QTY,
    candyId,
    quantity,
  }
}

export const guestDeleteCartCandy = (candyId) => {
  return {
    type: GUEST_DELETE_CART_CANDY,
    candyId,
  }
}

const getCart = (cart) => {
  return {
    type: GET_CART,
    cart,
  }
}

const userAddCartCandy = (cart) => {
  return {
    type: USER_ADD_CART_CANDY,
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

export const userAddCartCandyThunk = (userId, candyId, quantity) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.post(
        `/api/users/${userId}/cart/candy/${candyId}`,
        {
          quantity,
        }
      )
      dispatch(userAddCartCandy(data))
    } catch (err) {
      console.log(err)
      throw err
    }
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
    case USER_ADD_CART_CANDY:
      return action.cart
    case USER_UPDATE_CART_CANDY_QTY:
      return action.cart
    case USER_DELETE_CART_CANDY:
      return action.cart
    case GUEST_ADD_CART_CANDY:
      return addOrderCandy(state, action.orderCandy)
    case GUEST_UPDATE_CART_CANDY_QTY:
      return updateOrderCandiesQty(state, action.candyId, action.quantity)
    case GUEST_DELETE_CART_CANDY:
      return removeOrderCandy(state, action.candyId)
    default:
      return state
  }
}

// helper function for reducer: GUEST_ADD_CART_CANDY
function addOrderCandy(state, orderCandy) {
  const updatedOrderCandies = []
  // add existing candies to array
  for (let i = 0; i < state.order_candies.length; i++) {
    updatedOrderCandies.push({
      ...state.order_candies[i],
      candy: {...state.order_candies[i].candy},
    })
  }
  // add new candy to array
  updatedOrderCandies.push(orderCandy)
  return {
    ...state,
    order_candies: updatedOrderCandies,
  }
}

// helper  method for reducer: GUEST_ADD_CART_CANDY
function updateOrderCandiesQty(state, candyId, quantity) {
  const updatedOrderCandies = []
  for (let i = 0; i < state.order_candies.length; i++) {
    let currentCandyId = state.order_candies[i].candy.candyId
    if (currentCandyId === candyId) {
      updatedOrderCandies.push({
        ...state.order_candies[i],
        quantity,
        candy: {...state.order_candies[i].candy},
      })
    } else {
      updatedOrderCandies.push({
        ...state.order_candies[i],
        candy: {...state.order_candies[i].candy},
      })
    }
  }
  return {
    ...state,
    order_candies: updatedOrderCandies,
  }
}

// helper  method for reducer: GUEST_DELETE_CART_CANDY
function removeOrderCandy(state, candyId) {
  const updatedOrderCandies = []
  // add existing candies to array, don't add the one with action.candyId
  for (let i = 0; i < state.order_candies.length; i++) {
    let currentCandyId = state.order_candies[i].candy.candyId
    if (currentCandyId !== candyId) {
      updatedOrderCandies.push({
        ...state.order_candies[i],
        candy: {...state.order_candies[i].candy},
      })
    }
  }
  return {
    ...state,
    order_candies: updatedOrderCandies,
  }
}
