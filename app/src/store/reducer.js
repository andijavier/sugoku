import {
  SET_LEADERBOARD,
  SET_LOADING,
  SET_STATUS,
  SET_BOARD,
  SET_INITIAL,
  RESET_STATE,
} from './action'

const initialState = {
  board: [],
  initialBoard: [],
  status: 'unsolved',
  loading: false,
  leaderBoard: [],
}

function reducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case SET_BOARD:
      return { ...state, board: payload }
    case SET_INITIAL:
      return { ...state, initialBoard: payload }
    case SET_STATUS:
      return { ...state, status: payload }
    case SET_LOADING:
      return { ...state, loading: payload }
    case SET_LEADERBOARD:
      return { ...state, leaderBoard: [...state.leaderBoard, payload] }
    case RESET_STATE:
      return { ...initialState, leaderBoard: state.leaderBoard }
    default:
      return state
  }
}

export default reducer