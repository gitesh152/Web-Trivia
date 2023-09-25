import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ContextProvider = createContext();

const apiUrl=`http://localhost:5000/api`

const Provider = ({ children }) => {
    const [user, setUser] = useState('')
    const Navigate = useNavigate();
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'))
        if (userInfo) {
            setUser(userInfo)
        } else {
            Navigate('/')
        }
    },[Navigate])
  return (
      <ContextProvider.Provider value={{apiUrl,user}}>
          {children}
    </ContextProvider.Provider>
  )
}

Provider.propTypes={
    children:PropTypes.element.isRequired
}

export const ContextState=()=>useContext(ContextProvider)

export default Provider