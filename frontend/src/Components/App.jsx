import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from '../Pages/HomePage'
import TriviaPage from '../Pages/TriviaPage'

function App() {
  return (
     <div className='App'>
      <Routes>
        <Route path='/'  element={<HomePage />} />
        <Route path='/trivia'  element={<TriviaPage />} />
      </Routes>
    </div>
  )
}

export default App
