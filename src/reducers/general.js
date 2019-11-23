import Immutable from 'seamless-immutable'

const initialState = Immutable({
  loading: true,
  dashboard: {},
})

const generalReducer = function (state = initialState, action) {
  switch (action.type) {
    case 'CHECK_LOGIN':
    case 'LOGIN':
    case 'REGISTER':
    case 'UPDATE_PROFILE':
    case 'LOAD_DASHBOARD':
    case 'LOAD_ENTRIES':
    case 'LOAD_ENTRY':
    case 'STORE_ENTRY':
    case 'UPDATE_ENTRY':
    case 'DELETE_ENTRY':
    case 'LOAD_WEEKLY_REPORT':
      return Immutable.merge(state, {
        loading: true,
      })

    case 'STOP_LOADING':
    case 'CHECK_LOGIN_OK':
    case 'CHECK_LOGIN_FAIL':
    case 'LOGIN_OK':
    case 'LOGIN_FAIL':
    case 'REGISTER_OK':
    case 'REGISTER_FAIL':
    case 'UPDATE_PROFILE_OK':
    case 'UPDATE_PROFILE_FAIL':
    case 'LOAD_DASHBOARD_FAIL':
    case 'LOAD_ENTRIES_OK':
    case 'LOAD_ENTRIES_FAIL':
    case 'LOAD_ENTRY_OK':
    case 'LOAD_ENTRY_FAIL':
    case 'STORE_ENTRY_OK':
    case 'STORE_ENTRY_FAIL':
    case 'UPDATE_ENTRY_OK':
    case 'UPDATE_ENTRY_FAIL':
    case 'DELETE_ENTRY_OK':
    case 'DELETE_ENTRY_FAIL':
    case 'LOAD_WEEKLY_REPORT_OK':
    case 'LOAD_WEEKLY_REPORT_FAIL':
      return Immutable.merge(state, {
        loading: false,
      })

    case 'LOAD_DASHBOARD_OK':
      return Immutable.merge(state, {
        dashboard: action.data,
        loading: false,
      })

    case 'LOGOUT_OK':
      return Immutable.merge(state, {
        dashboard: {},
      })

    default:
      return state
  }
}

export default generalReducer
