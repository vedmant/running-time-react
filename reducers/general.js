import Immutable from 'seamless-immutable'

const initialState = Immutable({
  loading: true,
})

const generalReducer = function (state = initialState, action) {
  switch (action.type) {

    case 'CHECK_LOGIN':
    case 'LOGIN':
    case 'REGISTER':
      return Immutable.merge(state, {
        loading: true,
      })

    case 'CHECK_LOGIN_OK':
    case 'CHECK_LOGIN_FAIL':
    case 'LOGIN_OK':
    case 'LOGIN_FAIL':
    case 'REGISTER_OK':
    case 'REGISTER_FAIL':
      return Immutable.merge(state, {
        loading: false,
      })

    default:
      return state;
  }
}

export default generalReducer
