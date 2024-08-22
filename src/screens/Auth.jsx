import { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Title from '../components/common/Title'

export default function Auth ({ navigation }) {
  const [userName, setUserName] = useState('')
  const [isUserNameValid, setIsUserNameValid] = useState()

  const handleUserName = (text) => {
    setUserName(text)
    setIsUserNameValid(!!text)
  }

  const handleSubmit = async () => {
    try {
      const userData = {
        userName,
        medications: []
      }
      const userDataJson = JSON.stringify(userData)
      await AsyncStorage.setItem('userData', userDataJson)
      const isUserDataSet = await AsyncStorage.getItem('userData')
      const isUserDataSetParse = JSON.parse(isUserDataSet)
      const userNameData = isUserDataSetParse.userName
      if (userNameData) {
        navigation.replace('Home')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
      <Title title='Empezar' />
      <View style={styles.contentContainer}>
        <View style={styles.textInput}>
          <TextInput
            style={{ fontSize: 20 }}
            placeholder='Ingrese su nombre'
            value={userName}
            onChangeText={handleUserName}
          />
        </View>
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={!isUserNameValid}
          style={[styles.btnAddContainer, (!isUserNameValid ? styles.DisabledColor : styles.EnableColor)]}
        >
          <Text style={[styles.btnAddText, (!isUserNameValid ? styles.DisabledColor : styles.EnableColor)]}>Ingresar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  textInput: {
    backgroundColor: '#e3f2ef',
    padding: 10,
    width: '80%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#159A8A'
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnAddContainer: {
    alignSelf: 'center',
    marginTop: 20,
    backgroundColor: '#e3f2ef',
    width: '60%',
    padding: 10,
    borderRadius: 10
  },
  DisabledColor: {
    backgroundColor: '#e3f2ef',
    color: '#818596'
  },
  EnableColor: {
    backgroundColor: '#159A8A',
    color: '#fff'
  },
  btnAddText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20
  }
})
