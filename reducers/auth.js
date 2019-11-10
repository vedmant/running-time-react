import Immutable from 'seamless-immutable'

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
      return Immutable.merge(state, {
        accessToken: null,
        authChecked: true,
      })

    case 'LOGIN_OK':
      return Immutable.merge(state, {
        me: action.user,
        accessToken: action.accessToken,
      })

    case 'LOGOUT_OK':
      return Immutable.merge(state, {
        me: null,
        accessToken: null,
      })

    case 'REGISTER_OK':
      return Immutable.merge(state, {
        me: action.user,
        accessToken: action.accessToken,
      })

    case 'UPDATE_PROFILE_OK':
      return Immutable.merge(state, {
        me: action.user,
      })

    default:
      return state;
  }
}

export default authReducer
