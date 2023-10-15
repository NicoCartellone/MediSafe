import { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  Auth,
  Home,
  AddMedication,
  MonitoringMedication,
  Loading
} from '../screens/index'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Stack = createNativeStackNavigator()

const StackNavigation = () => {
  const [userName, setUserName] = useState(null)

  useEffect(() => {
    const getUserFromStorage = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem('userData')
        const storedUserDataParse = JSON.parse(storedUserData)
        const storeUserNameData = storedUserDataParse.userName
        if (storeUserNameData) {
          setUserName(storeUserNameData)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getUserFromStorage()
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={userName ? 'Home' : 'Loading'}
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name='Loading' component={Loading} />
        <Stack.Screen name='Auth' component={Auth} />
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='AddMedication' component={AddMedication} />
        <Stack.Screen name='MonitoringMedication' component={MonitoringMedication} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default StackNavigation
