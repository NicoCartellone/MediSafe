import { StyleSheet, Text, View } from 'react-native'
import Constants from 'expo-constants'

export default function Title ({ title }) {
  return (
    <View>
      <Text style={styles.titleText}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: Constants.statusBarHeight + 20
  }
})
