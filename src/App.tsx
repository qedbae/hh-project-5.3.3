import './App.css'
import VacanciesPage from './pages/VacanciesPage'
import { Routes, Route, Navigate } from 'react-router-dom'
import VacancyPage from './pages/VacancyPage'

function App() {
  return(
    <>
    <Routes>
      <Route path='/vacancies' element={<VacanciesPage />} />
      <Route path='/vacancies/:id' element={<VacancyPage />} />
      <Route path='*' element={<Navigate to='/vacancies' />} />
    </Routes>
    </>
  )
}

export default App
