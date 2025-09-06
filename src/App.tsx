import { Routes, Route } from 'react-router-dom'
import { Toaster } from "@/components/ui/toaster"
import CareerJobs from './pages/CareerJobs'

function App() {
  return (
    <>
      <Routes>
        <Route path="/careers/jobs" element={<CareerJobs />} />
        <Route path="/" element={<div>Home Page</div>} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App