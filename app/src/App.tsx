import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Resources from './pages/Resources'

function AssessmentPage() {
  return (
    <div className="min-h-[60dvh] flex items-center justify-center pt-24">
      <div className="text-center">
        <h1 className="text-4xl font-display font-bold text-[#1C1917] mb-4">Assessment</h1>
        <p className="text-[#57534E]">Mental health assessment page coming soon.</p>
      </div>
    </div>
  )
}

function ContactPage() {
  return (
    <div className="min-h-[60dvh] flex items-center justify-center pt-24">
      <div className="text-center">
        <h1 className="text-4xl font-display font-bold text-[#1C1917] mb-4">Contact</h1>
        <p className="text-[#57534E]">Contact page coming soon.</p>
      </div>
    </div>
  )
}

function DashboardPage() {
  return (
    <div className="min-h-[60dvh] flex items-center justify-center pt-24">
      <div className="text-center">
        <h1 className="text-4xl font-display font-bold text-[#1C1917] mb-4">Dashboard</h1>
        <p className="text-[#57534E]">Admin dashboard page coming soon.</p>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/assessment" element={<AssessmentPage />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Layout>
  )
}
