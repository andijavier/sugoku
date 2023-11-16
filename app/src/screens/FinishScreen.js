import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, ScrollView, TouchableOpacity, View } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import { useDispatch, useSelector } from 'react-redux';
import { setLeaderBoard } from '../store/action'

function FinishScreen(props) {
  const dispatch = useDispatch()
  const { route, navigation } = props
  const { time, surrender, username, level } = route.params
  const { leaderBoard } = useSelector(state => state)
  const [alert, setAlert] = useState({ status: false, message: ''})
  
  useEffect(() => {
    if (time > 0) {
      dispatch(setLeaderBoard({username, time, level, surrender}))
      setAlert({
        status: true,
        message: `Congrats ${username}!, You are in the leaderboard`
      })
    } else {
      setAlert({
        status: true,
        message: `Try Harder next time ${username}!`
       })
    }
  }, [])

  function stopAlert () {
    setAlert({
      status: false,
      message: ''
    })
  }

  function toHome() {
    navigation.navigate('Home')
  }

  return (
    <View style={styles.container}>
      <AwesomeAlert
        show={alert.status}
        showProgress={false}
        message={alert.message}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText='Okay'
        confirmButtonColor="#DD6B55"
        onConfirmPressed={() => {
          stopAlert();
        }}
      />
      <View style={{ flex: 1, paddingVertical: 20 }}>
        <Text style={{ fontSize: 35, color: 'white', fontWeight: 'bold' }}>
          Leaderboard
        </Text>
        
        <ScrollView style={styles.leaderContainer}>
          {leaderBoard.map((data, i) => (
            <View style={styles.row} key={'finish' + i}>
              <Text style={{ flex: 1, textAlign: 'center', fontSize: 20, color: 'white', fontWeight: 'bold' }}>
                {data.username}
              </Text>
              <Text style={{ flex: 1, textAlign: 'center', fontSize: 20, color: 'white', fontWeight: 'bold' }}>
                {data.level}
              </Text>
              <Text style={{ flex: 1, textAlign: 'center', fontSize: 20, color: 'white', fontWeight: 'bold' }}>
                {Math.floor(data.time / 60)}:{(data.time % 60) < 10 ? `0${data.time % 60}` : data.time % 60}
              </Text>
              <Text style={{ flex: 1, textAlign: 'center', fontSize: 20, color: 'white', fontWeight: 'bold' }}>
              {data.surrender?'X':null}
              </Text>
            </View>
          ))}
        </ScrollView>
        <View style={{ flexDirection: 'row', width: '70%', justifyContent: 'center', marginBottom: 100, }}>
                <TouchableOpacity style={styles.btn} onPress={() => toHome()}>
                    <Text style={{ fontSize: 20 }}>Home</Text>
                </TouchableOpacity>
            </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  btn: {
    width: '50%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    marginBottom: 40
  },
  container: {
    backgroundColor: 'skyblue',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  leaderContainer: {
    backgroundColor: 'skyblue',
    // flexDirection: 'row', 
    borderWidth: 4,
    width: '90%',
    height: '40%',
    marginBottom: 50,
    borderRadius: 20,
    borderColor: 'white'
  },
  row: {
    flexDirection: 'row',
    width: 300,
    paddingVertical: 10,
    alignSelf: 'center'
  }
});

export default FinishScreen