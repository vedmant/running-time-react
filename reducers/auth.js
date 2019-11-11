import Immutable from 'seamless-immutable'
import axios from 'axios'

const initialState = Immutable({
  me: null, // Logged in user
  accessToken: null,
  authChecked: false,
})

const authReducer = function (state = initialState, action) {
  switch (action.type) {

    case 'CHECK_LOGIN_OK':
      return Immutable.merge(state, {
        me: action.user,
        authChecked: true
      })

    case 'CHECK_LOGIN_FAIL':
      setToken(null)
      return Immutable.merge(state, {
        accessToken: null,
        authChecked: true,
      })

    case 'LOGIN_OK':
      setToken(action.accessToken)
      return Immutable.merge(state, {
        me: action.data.user,
        accessToken: action.data.access_token,
      })

    case 'LOGOUT_OK':
      setToken(null)
      return Immutable.merge(state, {
        me: null,
        accessToken: null,
      })

    case 'REGISTER_OK':
      setToken(action.accessToken)
      return Immutable.merge(state, {
        me: action.data.user,
        accessToken: action.data.access_token,
      })

    case 'UPDATE_PROFILE_OK':
      return Immutable.merge(state, {
        me: action.data.user,
      })

    default:
      return state;
  }
}

function setToken(token) {
  // Authorization header
  axios.interceptors.request.use(function (config) {
    config['headers'] = {
      Authorization: 'Bearer ' + token,
      Accept: 'application/json',
    }
    return config
  }, error => Promise.reject(error))
}

export default authReducer
