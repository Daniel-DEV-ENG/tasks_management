// ** React Imports
import { createContext, useEffect, useState } from 'react'


// ** Axios
import axios from 'axios'

// ** Config
import authConfig from '../config/auth'
import mock from '../fake-db/mockup'
import { useNavigate } from 'react-router-dom'
import Router from '../route/router'
import { hashPassword, comparePassword } from '../utiltis/passwordUtils';
import toast from 'react-hot-toast'
// ** Defaults
const defaultProvider = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
}
const AuthContext = createContext(defaultProvider)

const AuthProvider = ({ children }) => {

  const navigation=useNavigate()
  // ** States
  const [user, setUser] = useState(defaultProvider.user)
  const [loading, setLoading] = useState(defaultProvider.loading)

  // ** Hooks
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = window.localStorage.getItem("accessToken")
        console.log("🚀 ~ initAuth ~ storedToken:", storedToken)
        await axios
          .get('/auth/me', {
            headers: {
              Authorization: storedToken
            }
          })
          .then(async response => {
            console.log("🚀 ~ initAuth ~ response:", response)
            
            setUser({ ...response.data.userData })
            
          })
          .catch((error) => {
            setUser(null)
            setLoading(false)
            toast.error('User authenticated');
navigation('/login')           
          })
      
    }
    initAuth()
  
  }, [])
  const handleLogin = async (params, errorCallback) => {
    const {email,password}=params
    try {
      // Hash the password before sending it to the server
      const hashedPassword = await hashPassword(password);
      
      // Authenticate user using the hashed password
      const userData = await authenticateUser(email, password);
      
      console.log('User authenticated:', userData);
      
      // Further logic after successful authentication (e.g., redirect to dashboard)
    } catch (error) {
      console.error('Error:', error.message);
      // Handle authentication error (e.g., display error message to the user)
    }
  };


  
  const authenticateUser = async(email, password) => {
    try {
      const response = await axios.post('/jwt/login', {
        email,
        password
      }).then(async response => {
        console.log("🚀 ~ authenticateUser ~ response:", response)
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('userData', JSON.stringify(response.data.userData));

        setUser(response.data.data?.user)
        toast.success('Successfully created!');
  navigation('/')
      })
      .catch(err => {

  })


    } catch (error) {
      console.error('Error authenticating user:', error);
      throw new Error('Authentication failed');
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    // router.push('/login')
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout
  }

  return <AuthContext.Provider value={values}>
    
   {children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
