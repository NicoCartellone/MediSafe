import { useEffect } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Loading = ({ navigation }) => {
  useEffect(() => {
    const checkUserName = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData')
        if (userData) {
          const userDataParse = JSON.parse(userData)
          const userNameData = userDataParse.userName
          if (userNameData) {
            navigation.replace('Home') // Redirige a la pantalla Home si hay un nombre de usuario
          } else {
            navigation.replace('Auth') // Redirige a la pantalla Auth si no hay un nombre de usuario
          }
        } else {
          navigation.replace('Auth') // Redirige a la pantalla Auth si no existe ningún dato de usuario
        }
      } catch (error) {
        console.error(error)
        // Maneja errores aquí si es necesario
      }
    }

    checkUserName()
  }, [navigation])

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Cargando...</Text>
      <ActivityIndicator size='large' />
    </View>
  )
}

export default Loading
