import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components'
import HomePage from './components/HomePage'
import ContactPage from './components/ContactPage'
import './App.css'

export default function App() {
  return (
    <div className="app">
      <div className="container">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
      <footer className="footer">© {new Date().getFullYear()} האתר של גל — כל הזכויות שמורות.</footer>
    </div>
  )
}