import { Route, Routes } from 'react-router-dom'
import './App.css'
import MainLayout from './layouts/MainLayout'
import Dashboard from './pages/Dashboard'
import NewCase from './pages/NewCase'
import CaseDetails from './pages/CaseDetail'
import EditCase from './pages/EditCase'

function App() {

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/new" element={<NewCase />} />
        <Route path="/case/:id" element={<CaseDetails />} />
        <Route path="/case/:id/edit" element={<EditCase />} />
      </Route>
    </Routes>

  )
}

export default App
