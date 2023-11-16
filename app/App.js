import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './src/store/index'
import GameScreen from './src/screens/GameScreen'
import HomeScreen from './src/screens/HomeScreen'
import FinishScreen from './src/screens/FinishScreen'

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer 
    screenOptions={{headerShown:false}}>
      <Provider store={store}> 
        <Stack.Navigator >
          <Stack.Screen
            name='Home'
            component={HomeScreen}  
            options={{headerShown:false}}
          />
          <Stack.Screen name='Game' component={GameScreen} options={{ title: 'Home' }}/>
          <Stack.Screen name='Finish' component={FinishScreen} />
        </Stack.Navigator>  
      </Provider> 
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingTop: Constants.statusBarHeight,
//     backgroundColor: '#ecf0f1',
//     padding: 8,
//   },
//   paragraph: {
//     margin: 24,
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   col: {
//     flex: 1,
//     flexDirection: 'column'
//   }
// });
