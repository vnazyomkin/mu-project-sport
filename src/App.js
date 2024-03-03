import './App.css'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './Modules/AppRouter/AppRouter'
import Header from './Components/Header'
import AutorizationPage from './Pages/Autorization/AutorizationPage'
import { useState } from 'react'

function App() {
  const [authorization, setAuthorization] = useState(false)
  return (
    <div>
      {authorization ? (
        <BrowserRouter>
          <Header setAuthorization={setAuthorization} />
          <AppRouter />
        </BrowserRouter>
      ) : (
        <AutorizationPage setAuthorization={setAuthorization} />
      )}
    </div>
  )
}

export default App
