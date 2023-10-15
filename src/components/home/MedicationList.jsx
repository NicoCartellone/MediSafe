import { useState, useEffect } from 'react'
import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

export default function MedicationList () {
  const navigation = useNavigation()
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const retrieveData = async () => {
      try {
        const userDataJSON = await AsyncStorage.getItem('userData')
        if (userDataJSON) {
          const userData = JSON.parse(userDataJSON)
          setUserData(userData)
        }
      } catch (error) {
        console.log(error)
      }
    }
    retrieveData()
  }, [userData])

  const handleDeleteItem = async (medicationId) => {
    try {
      // Obtén la lista actual de medicamentos del estado.
      const currentMedications = [...userData.medications]

      // Encuentra el índice del medicamento que se va a eliminar.
      const indexToDelete = currentMedications.findIndex((medication) => medication.id === medicationId)

      if (indexToDelete !== -1) {
        // Elimina el medicamento del array.
        currentMedications.splice(indexToDelete, 1)

        // Actualiza el estado con la nueva lista de medicamentos.
        setUserData({ ...userData, medications: currentMedications })

        // Guarda la nueva lista en AsyncStorage.
        await AsyncStorage.setItem('userData', JSON.stringify({ ...userData, medications: currentMedications }))
      }
    } catch (error) {
      console.log(error)
    }
  }

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.medicationItem}
        onPress={() => navigation.navigate('MonitoringMedication', { medicationId: item.id })}
        onLongPress={() => handleDeleteItem(item.id)}
      >
        <Text style={styles.cardMedicationNameText}>{item.medicationName}</Text>
        <Text style={styles.cardMedicationQuantityText}>Te quedan {item.quantity} unidades</Text>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      {userData && userData.medications && userData.medications.length > 0
        ? (
          <FlatList
            data={userData.medications}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
          )
        : (
          <View style={styles.noMedicationsContainer}>
            <Text style={styles.noMedicationsText}>
              No tienes medicamentos agregados
            </Text>
          </View>
          )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 70,
    width: '80%'
  },
  medicationItem: {
    padding: 20,
    backgroundColor: '#159A8A',
    marginBottom: 10,
    borderRadius: 10
  },
  noMedicationsContainer: {
    marginTop: 100
  },
  noMedicationsText: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center'
  },
  cardMedicationNameText: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#F5FBFA',
    textTransform: 'capitalize'
  },
  cardMedicationQuantityText: {
    fontWeight: '700',
    fontSize: 20,
    color: '#B2DED8'
  }
})
