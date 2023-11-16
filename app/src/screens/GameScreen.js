import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Board from '../components/Board'
import { fetchBoard } from '../store/action'

function GameScreen(props) {
  const { route } = props
  const { time, username, level } = route.params
  const dispatch = useDispatch()
  const board = useSelector(state => state.board)

  useEffect(() => {
    dispatch(fetchBoard(level))
  }, [])
  
  console.log(board, 'boaarrddd')
  console.log(time, 'tiiiiiiime');

  return (
    <View style={{ flex: 1, flexDirection: 'column' }}>
      <Board username={username} level={level} time={time}/>
    </View>
  )
}

export default GameScreen