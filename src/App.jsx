import { useState, useCallback } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import SplashScreen from './components/SplashScreen'
import Home from './pages/Home'
import About from './pages/About'
import Programs from './pages/Programs'
import Contact from './pages/Contact'
import ProgramStudents from './pages/programs/ProgramStudents'
import ProgramWomen from './pages/programs/ProgramWomen'
import ProgramCorporates from './pages/programs/ProgramCorporates'
import './index.css'

const WA_LINK = 'https://wa.me/918283811383?text=Hello%20Dr.%20Guleria%2C%20I%20would%20like%20to%20book%20a%20session.'

export default function App() {
  const [showSplash, setShowSplash] = useState(true)
  const handleDone = useCallback(() => setShowSplash(false), [])

  return (
    <>
      {showSplash && <SplashScreen onDone={handleDone} />}
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/programs/students" element={<ProgramStudents />} />
          <Route path="/programs/women" element={<ProgramWomen />} />
          <Route path="/programs/corporates" element={<ProgramCorporates />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />

        {/* WhatsApp floating button */}
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="wa-float"
          aria-label="Chat on WhatsApp"
        >
          <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="16" cy="16" r="16" fill="#25D366"/>
            <path d="M23.5 8.5A10.44 10.44 0 0 0 16 5.5C10.2 5.5 5.5 10.2 5.5 16c0 1.85.49 3.65 1.41 5.24L5.5 26.5l5.4-1.4A10.44 10.44 0 0 0 16 26.5c5.8 0 10.5-4.7 10.5-10.5 0-2.8-1.09-5.43-3-7.5zm-7.5 16.1c-1.57 0-3.1-.42-4.44-1.2l-.32-.19-3.2.84.85-3.12-.21-.33A8.6 8.6 0 0 1 7.4 16c0-4.74 3.86-8.6 8.6-8.6 2.3 0 4.46.9 6.08 2.52A8.55 8.55 0 0 1 24.6 16c0 4.74-3.86 8.6-8.6 8.6zm4.72-6.44c-.26-.13-1.53-.75-1.77-.84-.23-.09-.4-.13-.57.13-.17.26-.65.84-.8 1.01-.15.17-.29.19-.55.06-.26-.13-1.1-.4-2.1-1.28-.77-.69-1.3-1.54-1.45-1.8-.15-.26-.02-.4.11-.53.12-.12.26-.3.39-.46.13-.16.17-.26.26-.43.09-.17.04-.32-.02-.45-.06-.13-.57-1.37-.78-1.87-.2-.49-.41-.42-.57-.43h-.49c-.17 0-.44.06-.67.32-.23.26-.88.86-.88 2.1s.9 2.43 1.03 2.6c.13.17 1.78 2.72 4.31 3.81.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.53-.63 1.74-1.23.22-.6.22-1.12.15-1.23-.06-.1-.23-.16-.49-.29z" fill="white"/>
          </svg>
        </a>
      </BrowserRouter>
    </>
  )
}
