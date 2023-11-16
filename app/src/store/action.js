export const SET_BOARD = 'board/setBoard'
export const SET_STATUS = 'status/setStatus'
export const SET_LOADING = 'loading/setLoading'
export const SET_INITIAL = 'initialBoard/setInitialBoard'
export const RESET_STATE = 'reset/setReset'
export const SET_LEADERBOARD = 'leaderBoard/setLeaderBoard'

export function setBoard(payload) {
  return { type: SET_BOARD, payload }
}

export function setStatus(payload) {
  return { type: SET_STATUS, payload }
}

export function setLoading(payload) {
  return { type: SET_LOADING, payload }
}

export function setInitialBoard(payload) {
  return { type: SET_INITIAL, payload }
}

export function setLeaderBoard(payload) {
  return { type: SET_LEADERBOARD, payload }
}

export function resetState() {
  return { type: RESET_STATE }
}

export function addLeaderBoard(payload) {
  return (dispatch) => {
    dispatch(setLeaderBoard(payload))
  }
}

export function fetchBoard(level = 'easy') {
  return (dispatch) => {
    console.log('masuk action');
    dispatch(setLoading(true))
    fetch(`https://sugoku.herokuapp.com/board?difficulty=${level}`)
      .then(res => res.json())
      .then(result => {
        console.log(result);
        dispatch(setBoard(result.board))
        dispatch(setInitialBoard(result.board))
        dispatch(setStatus('unsolved'))
      })
      .catch(err => console.log(err))
      .finally(() => dispatch(setLoading(false)))
  }
}

export function validate(data) {
  return (dispatch) => {
    dispatch(setLoading(true))
    return fetch('https://sugoku.herokuapp.com/validate', {
      method: 'POST',
      body: encodeParams(data),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }
}

export function solve(data) {
  return (dispatch) => {
    fetch('https://sugoku.herokuapp.com/solve', {
      method: 'POST',
      body: encodeParams(data),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => res.json())
      .then(result => {
        console.log(result);
        dispatch(setBoard(result.solution))
        dispatch(setStatus(result.status))
      })
      .catch(err => console.log(err))
  }
}

const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length - 1 ? '' : '%2C'}`, '')

const encodeParams = (params) =>
  Object
    .keys(params)
    .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
    .join('&');