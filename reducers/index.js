import { combineReducers } from 'redux'
import auth from './auth'
import general from './general'
import entries from './entries'

export default combineReducers({
  auth,
  general,
  entries,
})
