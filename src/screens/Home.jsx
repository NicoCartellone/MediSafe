import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import WelcomeText from '../components/home/WelcomeText'
import MedicationList from '../components/home/MedicationList'
import BtnAdd from '../components/common/BtnAdd'

export default function Home ({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <WelcomeText />
      <MedicationList />
      <BtnAdd onPress={() => navigation.navigate('AddMedication')} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  }
})
