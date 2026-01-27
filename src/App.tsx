import { Route, Routes } from 'react-router-dom'
import './App.css'
import MainLayout from './layouts/MainLayout'
import Dashboard from './pages/Dashboard'
import NewCase from './pages/NewCase'

function App() {

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/new" element={<NewCase />} />
      </Route>
    </Routes>

  )
}

export default App
