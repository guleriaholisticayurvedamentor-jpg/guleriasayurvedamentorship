import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        <Link to="/" className="navbar__brand" onClick={closeMenu}>
          <span className="navbar__brand-leaf">🪷</span>
          <span className="navbar__brand-text">Guleria's Ayurveda Mentorship</span>
        </Link>

        <button
          className={`navbar__toggle ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>

        <ul className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
          {[
            { to: '/', label: 'Home' },
            { to: '/about', label: 'About' },
            { to: '/programs', label: 'Programs' },
            { to: '/contact', label: 'Contact' },
          ].map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) => isActive ? 'active' : ''}
                onClick={closeMenu}
              >
                {label}
              </NavLink>
            </li>
          ))}
          <li>
            <a
              href="https://wa.me/918283811383?text=Hello%20Dr.%20Guleria%2C%20I%20would%20like%20to%20book%20a%20session."
              target="_blank"
              rel="noopener noreferrer"
              className="navbar__cta btn btn-primary"
              onClick={closeMenu}
            >
              💬 Book a Session
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
