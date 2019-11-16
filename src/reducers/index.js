import { combineReducers } from 'redux'
import auth from './auth'
import entries from './entries'
import general from './general'

export default combineReducers({
  auth,
  general,
  entries,
})
