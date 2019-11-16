import Immutable from 'seamless-immutable'

const initialState = Immutable({
  entries: {
    current_page: 1,
    data: [],
  },
  entry: {},
})

const entriesReducer = function (state = initialState, action) {
  switch (action.type) {

    case 'LOAD_MORE_ENTRIES_OK':
      const { data, ...rest } = action.data.entries
      return Immutable.merge(state, {
        entries: {
          data: state.entries.data.concat(data),
          ...rest,
        },
      })

    case 'LOAD_ENTRIES_OK':
      return Immutable.merge(state, {
        entries: action.data.entries
      })

    case 'LOAD_ENTRY_OK':
      return Immutable.merge(state, {
        entry: action.data.entry,
      })

    case 'LOGOUT_OK':
      return initialState

    default:
      return state;
  }
}

export default entriesReducer
