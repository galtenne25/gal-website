import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">האתר של גל</Link>
      <div className="nav-links">
        <Link to="/" className="nav-link">בית</Link>
        <Link to="/contact" className="nav-link">צור קשר</Link>
      </div>
    </nav>
  )
}
