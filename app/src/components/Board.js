import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import AwesomeAlert from 'react-native-awesome-alerts';
import { useNavigation } from '@react-navigation/native'
import {
Text,
View,
StyleSheet,
ActivityIndicator,
TextInput,
TouchableOpacity
} from 'react-native';
import { fetchBoard, validate, setLoading, setStatus, setBoard, solve } from '../store/action'

export default function Board(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const { username, level, time } = props
  const [countdown, setCountdown] = useState(+time)
  const [cell, setCell] = useState([null, null])
  const { status, loading } = useSelector(state => state)
  const { board } = useSelector(state => state)
  const [alert, setAlert] = useState({type:'',show:false})
  const [surrender, setSurrender] = useState(false)
  const { initialBoard } = useSelector(state => state)
  
  useEffect(() => {
    setCountdown(+time)
  }, [board])

  useEffect(() => {
    let timerId;
    if (!loading) {
      if (status === 'solved') {
        timerId = setTimeout(() => setCountdown(countdown - 0), 1000)
      } else {
        timerId = setTimeout(() => setCountdown(countdown - 1), 1000);
        if (countdown === 0) {
          navigation.replace('Finish', { username, level, time: countdown, surrender })
        }
        return () => {
          clearTimeout(timerId)
        }
      }
    }
  }, [countdown, status]);

  function selectCell ({ y, x }) {
    if (initialBoard[y][x] === 0) {
      setCell([y, x])
      console.log('masuk');
    } else {
      console.log("can't change this one", y, x);
    }
  }

  function changeCell (value) {
    const y = cell[0]
    const x = cell[1]
    if (x !== null && y !== null) {
      console.log("change to", y, x, "==>", value);
      let newBoard = [...board]
      newBoard[y] = [...board[y]]
      newBoard[y][x] = +value
      dispatch(setBoard(newBoard))
    }
  }

  function confirmSolve() {
    setAlert({ type: 'solve', show:true })
  }

  function confirmReset() {
    setAlert({ type: 'reset', show:true })
  }

  function solveBoard() {
    setAlert({type:'',show:false})
    setSurrender(true)
    dispatch(solve({ board }))
  }

  function resetBoard() {
    setAlert({type:'',show:false})
    dispatch(fetchBoard())
  }

  function validateBoard() {
    dispatch(validate({ board }))
      .then(res => res.json())
      .then(result => {
        dispatch(setStatus(result.status))
        if (result.status === 'solved') {
          navigation.replace('Finish', { username, level, time: countdown, surrender })
        }
      })
      .catch(err => console.log(err))
      .finally(() => dispatch(setLoading(false)))
  }

  return (
    <>
      <AwesomeAlert
        show={alert.show}
        showProgress={false}
        title={alert.type==='solve'?'You still have time':'Reset board ?'}
        message={alert.type==='solve'?'Giving up already?':'Lets try a new board'}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText={alert.type==='solve'?`I'll keep trying`:'Nevermind'}
        confirmText={alert.type==='solve'?`I Give Up`:'New Board'}
        confirmButtonColor="#DD6B55"
        onCancelPressed={() => {
          setAlert({type:'',show:false})
        }}
        onConfirmPressed={() => {
          setAlert({type:'',show:false})
          alert.type==='solve'?
            solveBoard() : resetBoard() 
            
        }}
      />
      <View style={styles.header}>
        <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 50 }}>SUGOKU</Text>
            <Text style={{ fontSize: 20 }}>{status}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 20, color:'red', fontWeight:'bold' }}>{Math.floor(countdown / 60)} : {(countdown % 60) < 10 ? `0${countdown % 60}` : countdown % 60} </Text>
        </View>
      </View>
      <View style={styles.boardContainer}>
        {loading? 
          <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator size='large' color='#0000ff'/>
          </View> 
          :
          board.map((row, y) => (
            <View style={{ flex: 1, flexDirection: 'row'}} key={y}>
              {row.map((col, x) => (
                <TouchableOpacity onPress={() => selectCell({x,y})} style={styles.box} key={x} >
                  {initialBoard[y][x] !== 0 ? <Text animation="bounceIn" duration={1000} style={{ fontSize: 30 }}>{col}</Text> :
                    <TextInput onChangeText={changeCell} style={{ fontSize: 30 }} maxLength={1} keyboardType='numeric'>{board[y][x] === 0? '' : board[y][x]}</TextInput>}
                </TouchableOpacity>
              ))}
            </View>
          ))
        }
      </View>
      <View style={{ flex: 5, paddingVertical: 15, justifyContent: 'space-evenly'}}>
        <Text style={{ fontSize: 25, alignSelf:'center' }}>{username}</Text>
        <Text style={{ fontSize: 20, alignSelf:'center' }}>Level: {level}</Text>
        <TouchableOpacity style={styles.buttonMenu} onPress={() => validateBoard()}>
          <Text style={{ fontSize: 20 }} >Validate</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonMenu}>
          <Text style={{ fontSize: 20 }} onPress={() => confirmSolve()}>Give Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonMenu} onPress={() => confirmReset()}>
          <Text style={{ fontSize: 20 }} >Reset Board</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    paddingVertical: 30,
    flexDirection: "row",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boardContainer: {
    flex: 9,
    backgroundColor: 'skyblue',
    padding: 9
  },
  cell: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  box: {
    margin: 1,
    borderWidth: 1,
    borderColor: 'black',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonMenu: {
      height: 50,
      backgroundColor: '#fff',
      borderWidth: 2,
      alignItems: 'center',
      borderRadius: 20,
      borderColor: 'white',
      justifyContent: 'center',
      marginVertical: 5
  }
});