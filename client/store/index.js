import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import candiesReducer from '../redux/candies'
import singleCandyReducer from '../redux/singleCandy'

const reducer = combineReducers({
  user,
  candies: candiesReducer,
  singleCandy: singleCandyReducer
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
