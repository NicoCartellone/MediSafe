import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView, StyleSheet, Text, View, FlatList, Alert } from 'react-native'
import Title from '../components/common/Title'
import BtnAdd from '../components/common/BtnAdd'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function MonitoringMedication ({ route }) {
  const medicationId = route.params?.medicationId
  const [medicationReports, setMedicationReports] = useState([])
  const flatListRef = useRef(null)

  useEffect(() => {
    const fetchMedicationReports = async () => {
      try {
        // Obtén los datos del usuario desde AsyncStorage
        let userData = await AsyncStorage.getItem('userData')
        userData = JSON.parse(userData)

        // Encuentra el medicamento en el array medications por su ID
        const medication = userData.medications.find((med) => med.id === medicationId)

        if (medication) {
          // Actualiza el estado local con los informes médicos
          setMedicationReports(medication.medicationsReports)
        }
      } catch (error) {
        console.error(error)
        // Maneja errores aquí si es necesario
      }
    }
    fetchMedicationReports()
  }, [medicationId])

  // Usamos una función anónima para pasar medicationId
  const handleAddMedicationReport = () => {
    addMedicationReport(medicationId)
  }

  const addMedicationReport = async (medicationId) => {
    try {
      // Obtén los datos del usuario desde AsyncStorage
      let userData = await AsyncStorage.getItem('userData')
      userData = JSON.parse(userData)

      // Encuentra el medicamento en el array medications por su ID
      const medication = userData.medications.find((med) => med.id === medicationId)

      if (medication) {
        if (medication.quantity > 0) {
          // Verifica si medicationsReports está vacío
          if (!medication.medicationsReports || medication.medicationsReports.length === 0) {
            // Si está vacío, crea el primer ID como "medicationsReportsData_1" y establece el día en 1
            medication.medicationsReports = [
              {
                id: 'medicationsReportsData_1',
                day: 1,
                date: new Date().toLocaleString()
              }
            ]
          } else {
            // Si no está vacío, encuentra el último ID y calcula el siguiente número
            const lastReport = medication.medicationsReports[medication.medicationsReports.length - 1]
            const lastId = parseInt(lastReport.id.split('_')[1])
            const newId = `medicationsReportsData_${lastId + 1}`
            // Calcula el día como el número después del '_'
            const day = lastId + 1

            // Agrega el nuevo reporte al array medicationsReports
            medication.medicationsReports.push({
              id: newId,
              day,
              date: new Date().toLocaleString()
            })
          }

          // Resta 1 a la propiedad quantity
          medication.quantity -= 1

          // Actualiza los datos del usuario en AsyncStorage
          await AsyncStorage.setItem('userData', JSON.stringify(userData))

          setMedicationReports([...medication.medicationsReports])
          flatListRef.current.scrollToEnd({ animated: true })
        } else {
          Alert.alert('No se pueden agregar más informes')
        }
      }
    } catch (error) {
      console.error(error)
      // Maneja errores aquí si es necesario
    }
  }

  const renderItem = ({ item }) => {
    return (
      <View style={styles.reportItem}>
        <Text style={styles.cardDayText}>Día {item.day}</Text>
        <Text style={styles.cardDateText}>{item.date}</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Title title='Control de tu medicación' />
      <View style={styles.contentContainer}>
        <BtnAdd onPress={handleAddMedicationReport} />
        {medicationReports.length === 0
          ? (
            <Text style={{ fontSize: 20 }}>Todavía no tienes reportes.</Text>
            )
          : (
            <FlatList
              ref={flatListRef}
              data={medicationReports}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
            />
            )}
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
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  reportItem: {
    padding: 20,
    backgroundColor: '#159A8A',
    marginBottom: 10,
    borderRadius: 10
  },
  cardDayText: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#F5FBFA',
    textTransform: 'capitalize'
  },
  cardDateText: {
    fontWeight: '700',
    fontSize: 20,
    color: '#B2DED8'
  }
})
