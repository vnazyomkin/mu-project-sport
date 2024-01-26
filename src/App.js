import './App.css'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './Modules/AppRouter/AppRouter'
import Header from './Components/Header'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <AppRouter />
      </BrowserRouter>
    </div>
  )
}

export default App
