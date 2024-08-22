import { StyleSheet, View, TouchableOpacity } from 'react-native'
import MaterialIcon from '@expo/vector-icons/MaterialCommunityIcons'

export default function BtnAdd ({ onPress }) {
  return (
    <View style={styles.btnAddContainer}>
      <TouchableOpacity onPress={onPress} style={styles.btnAdd}>
        <MaterialIcon name='plus' color='#fff' size={30} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  btnAddContainer: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    zIndex: 100
  },
  btnAdd: {
    backgroundColor: '#159A8A',
    padding: 10,
    borderRadius: 100,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2
  }
})
