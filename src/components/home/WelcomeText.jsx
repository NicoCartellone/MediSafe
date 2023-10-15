import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function WelcomeText () {
  const [userName, setUserName] = useState(null)
  const [welcomeMessage, setWelcomeMessage] = useState('')

  useEffect(() => {
    const getUserFromStorage = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem('userData')
        const storedUserDataParse = JSON.parse(storedUserData)
        const userName = storedUserDataParse.userName
        if (userName) {
          setUserName(userName)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getUserFromStorage()
  }, [])

  useEffect(() => {
    changeWelcomeMessage()
  }, [])

  const changeWelcomeMessage = () => {
    const currentHour = new Date().getHours()
    if (currentHour >= 6 && currentHour < 12) {
      setWelcomeMessage('Buenos días,')
    } else if (currentHour >= 12 && currentHour < 18) {
      setWelcomeMessage('Buenas tardes,')
    } else {
      setWelcomeMessage('Buenas noches,')
    }
  }
  return (
    <SafeAreaView style={styles.welcomeTextContainer}>
      <Text style={{ fontSize: 50 }}>👋</Text>
      <View style={{ marginLeft: 5 }}>
        <Text style={{ color: '#4e546d', fontWeight: 'bold', fontSize: 20 }}>
          {welcomeMessage}
        </Text>
        <Text style={styles.welcomeText}>{userName || 'Bienvenido'}</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  welcomeTextContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    padding: 20,
    position: 'absolute',
    top: 20
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: 'bold'
  }
})
