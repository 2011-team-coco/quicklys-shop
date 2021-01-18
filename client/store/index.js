import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import candiesReducer from '../redux/candies'
import singleCandyReducer from '../redux/singleCandy'
import cartReducer from './cart'

const reducer = combineReducers({
  user,
  candies: candiesReducer,
  singleCandy: singleCandyReducer,
  cart: cartReducer,
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)

const persistedState = localStorage.getItem('reduxState')
  ? JSON.parse(localStorage.getItem('reduxState'))
  : {}

const store = createStore(reducer, persistedState, middleware)

store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})

export default store
export * from './user'
