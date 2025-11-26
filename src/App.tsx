import { BrowserRouter } from 'react-router-dom'
import AppRouter from './router'
import './assets/styles/index'

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </div>
  )
}

export default App
