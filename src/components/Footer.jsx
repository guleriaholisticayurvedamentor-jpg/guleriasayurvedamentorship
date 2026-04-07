import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <h3>🌿 Guleria's Ayurveda</h3>
          <p>Life Mastery Through Ayurveda</p>
          <p className="footer__tagline">Clarity • Discipline • Purpose</p>
        </div>

        <div className="footer__links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Mentor</Link></li>
            <li><Link to="/programs">Programs</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer__programs">
          <h4>Programs</h4>
          <ul>
            <li><Link to="/programs/students">For Ayurveda Students</Link></li>
            <li><Link to="/programs/women">For Working Women</Link></li>
            <li><Link to="/programs/corporates">For Corporates</Link></li>
          </ul>
        </div>

        <div className="footer__contact">
          <h4>Contact</h4>
          <p>📧 guleriaholisticayurvedamentor@gmail.com</p>
          <p>📞 8283811383</p>
          <p>📍 #23 SF Prem Vihar Flats, Ludhiana</p>
        </div>
      </div>
      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} Guleria's Ayurveda Mentorship Program. All rights reserved.</p>
      </div>
    </footer>
  )
}
