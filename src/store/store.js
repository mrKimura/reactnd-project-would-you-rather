import { createStore, compose } from 'redux'
import reducer from '../reducers'
import middleware from '../middleware'

export const store = createStore(
  reducer,
  compose(
    middleware,
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
  ),
)
