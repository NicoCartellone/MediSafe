import { StatusBar } from 'react-native'
import StackNavigation from './src/navigation/StackNavigation'

export default function App () {
  return (
    <>
      <StackNavigation />
      <StatusBar translucent backgroundColor='transparent' barStyle='dark-content' />
    </>
  )
}
