import { combineReducers } from 'redux'
import auth from './auth'
import general from './general'

export default combineReducers({
  auth,
  general,
})
