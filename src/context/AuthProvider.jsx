import React, { createContext, useContext, useReducer, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const AuthContext = createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

const initialState = {
  userName: null,
  isLoading: true
}

const authReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER_NAME':
      return { ...state, userName: action.payload, isLoading: false }
    case 'CLEAR_USER_NAME':
      return { ...state, userName: null, isLoading: false }
    default:
      return state
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  useEffect(() => {
    const checkUserName = async () => {
      try {
        const userName = await AsyncStorage.getItem('userName')
        if (userName) {
          dispatch({ type: 'SET_USER_NAME', payload: userName })
        } else {
          dispatch({ type: 'CLEAR_USER_NAME' })
        }
      } catch (error) {
        console.error(error)
        dispatch({ type: 'CLEAR_USER_NAME' })
      }
    }

    checkUserName()
  }, [])

  const setUserName = async (userName) => {
    try {
      await AsyncStorage.setItem('userName', userName)
      dispatch({ type: 'SET_USER_NAME', payload: userName })
    } catch (error) {
      console.log(error)
    }
  }

  const clearUserName = async () => {
    try {
      await AsyncStorage.removeItem('userName')
      dispatch({ type: 'CLEAR_USER_NAME' })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AuthContext.Provider value={{ userName: state.userName, setUserName, clearUserName, isLoading: state.isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}
