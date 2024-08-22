import { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import Title from '../components/common/Title'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function AddMedication ({ navigation }) {
  const [medicationName, setMedicationName] = useState('')
  const [quantity, setQuantity] = useState('')
  const [isNameValid, setIsNameValid] = useState(false)
  const [isQuantityValid, setIsQuantityValid] = useState(false)

  const handleSubmit = async () => {
    if (isNameValid && isQuantityValid) {
      await saveMedication()
      navigation.replace('Home')
    }
  }

  const saveMedication = async () => {
    // Obtén los datos actuales del usuario desde AsyncStorage
    let userData = await AsyncStorage.getItem('userData')
    userData = JSON.parse(userData)

    // Encuentra el último ID de medicación en el array medications, si hay medicaciones existentes
    let lastMedicationId = 0
    if (userData.medications.length > 0) {
      const lastMedication = userData.medications[userData.medications.length - 1]
      const parts = lastMedication.id.split('_')
      lastMedicationId = parseInt(parts[1])
    }

    // Si el array de medicaciones está vacío, el primer ID será "medicationData_1"
    if (lastMedicationId === 0) {
      lastMedicationId = 1
    } else {
      // Incrementa el contador de medicamentos y genera un nuevo ID
      lastMedicationId++
    }

    // Genera el nuevo ID
    const medicationDataId = `medicationData_${lastMedicationId}`

    // Crea el objeto de medicación
    const medication = {
      id: medicationDataId,
      medicationName,
      quantity,
      medicationsReports: []
    }

    // Agrega la medicación al array medications
    userData.medications.push(medication)

    // Guarda los datos actualizados en AsyncStorage
    await AsyncStorage.setItem('userData', JSON.stringify(userData))

    // Limpiar los campos de entrada
    setMedicationName('')
    setQuantity('')

    // Luego, puedes redirigir al usuario o realizar otras acciones necesarias
  }

  const handleNameChange = (text) => {
    setMedicationName(text)
    setIsNameValid(!!text)
  }

  const handleQuantityChange = (text) => {
    setQuantity(text)
    setIsQuantityValid(!!text)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Title title='Agregar medicación' />
      <View style={styles.contentContainer}>
        <View style={styles.textInput}>
          <TextInput
            style={{ fontSize: 20 }}
            placeholder='Ingrese el nombre'
            value={medicationName}
            onChangeText={handleNameChange}
          />
        </View>
        <View style={styles.textInput}>
          <TextInput
            style={{ fontSize: 20 }}
            placeholder='Ingrese la cantidad'
            keyboardType='number-pad'
            value={quantity}
            onChangeText={handleQuantityChange}
          />
        </View>
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={!isNameValid || !isQuantityValid}
          style={[styles.btnAddContainer, (!isNameValid || !isQuantityValid ? styles.DisabledColor : styles.EnableColor)]}
        >
          <Text style={[styles.btnAddText, (!isNameValid || !isQuantityValid ? styles.DisabledColor : styles.EnableColor)]}>Agregar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
    flex: 1,
    marginTop: 60,
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
  },
  textInput: {
    backgroundColor: '#e3f2ef',
    padding: 10,
    width: '80%',
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#159A8A'
  }
})
