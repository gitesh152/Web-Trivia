import ReactDOM from 'react-dom/client'
import App from './Components/App.jsx'
// import './index.css'
import { BrowserRouter } from 'react-router-dom'

// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'
import Provider from './Context/Provider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <ChakraProvider>
  <BrowserRouter>
    <Provider>
      <App />
    </Provider>
  </BrowserRouter>
    </ChakraProvider>,
)
