import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import React, { useState, useEffect } from 'react'

function HomeScreen(props) {
  const { navigation } = props
  const [error, setError] = useState(false)
  const [username, setUsername] = useState(false)
  const [level, setLevel] = useState(false)

  useEffect(() => {
    if (username !== '') {
      setError(false)
    }
  }, [username])

  function play(level) {
    if (!username.length) {
      setError(true)
    } else {
      setLevel(level)
      let time;
      if (level === 'easy') {
        time = 900
      } else if (level === 'medium') {
        time = 600
      } else if (level === 'hard') {
        time = 500
      } else {
        time = 500
      }

      navigation.push('Game', { time, level, username })
    }
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 2, width: '80%', height: '100%', marginTop: 70 }}>
        <Text style={{ alignSelf: 'center', fontSize: 50 }}>SUGOKU</Text>
      </View>
      <View style={{flex: 8, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
        <Text style={{ fontSize: 30 }}>Your Name:</Text>
        <TextInput style={error ? styles.input : styles.input1 } placeholder={'Input Your Name Here'} onChangeText={(value) => setUsername(value)}></TextInput>
        <Text style={{ fontSize: 30 }}>Select Level:</Text>
        <TouchableOpacity style={styles.btn} onPress={() => play('easy')}>
          <Text style={{ fontSize: 20 }}>Easy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => play('medium')}>
          <Text animation="bounceIn" delay={1600} style={{ fontSize: 20 }}>Medium</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => play('hard')}> 
          <Text animation="bounceIn" delay={1800} style={{ fontSize: 20 }}>Hard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => play('random')}> 
          <Text animation="bounceIn" delay={2000} style={{ fontSize: 20 }}>Random</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'skyblue',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btn: {
    width: '60%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8
  },
  input: {
    fontSize: 20,
    width: '60%',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 25,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
    borderWidth: 3,
    borderColor: 'red'
  },
  input1: {
    fontSize: 20,
    width: '60%',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 25,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
    borderColor: 'black'
  }
});

export default HomeScreen