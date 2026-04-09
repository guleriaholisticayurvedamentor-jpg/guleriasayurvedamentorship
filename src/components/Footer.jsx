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
          <div className="footer__socials">
            <a href="https://wa.me/918283811383?text=Hello%20Dr.%20Guleria%2C%20I%20would%20like%20to%20book%20a%20session." target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <svg viewBox="0 0 32 32" width="24" height="24" fill="none"><circle cx="16" cy="16" r="16" fill="#25D366"/><path d="M23.5 8.5A10.44 10.44 0 0 0 16 5.5C10.2 5.5 5.5 10.2 5.5 16c0 1.85.49 3.65 1.41 5.24L5.5 26.5l5.4-1.4A10.44 10.44 0 0 0 16 26.5c5.8 0 10.5-4.7 10.5-10.5 0-2.8-1.09-5.43-3-7.5zm-7.5 16.1c-1.57 0-3.1-.42-4.44-1.2l-.32-.19-3.2.84.85-3.12-.21-.33A8.6 8.6 0 0 1 7.4 16c0-4.74 3.86-8.6 8.6-8.6 2.3 0 4.46.9 6.08 2.52A8.55 8.55 0 0 1 24.6 16c0 4.74-3.86 8.6-8.6 8.6zm4.72-6.44c-.26-.13-1.53-.75-1.77-.84-.23-.09-.4-.13-.57.13-.17.26-.65.84-.8 1.01-.15.17-.29.19-.55.06-.26-.13-1.1-.4-2.1-1.28-.77-.69-1.3-1.54-1.45-1.8-.15-.26-.02-.4.11-.53.12-.12.26-.3.39-.46.13-.16.17-.26.26-.43.09-.17.04-.32-.02-.45-.06-.13-.57-1.37-.78-1.87-.2-.49-.41-.42-.57-.43h-.49c-.17 0-.44.06-.67.32-.23.26-.88.86-.88 2.1s.9 2.43 1.03 2.6c.13.17 1.78 2.72 4.31 3.81.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.53-.63 1.74-1.23.22-.6.22-1.12.15-1.23-.06-.1-.23-.16-.49-.29z" fill="white"/></svg>
            </a>
            <a href="https://www.youtube.com/@ayurvedamentorguleria" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <svg viewBox="0 0 32 32" width="24" height="24" fill="none"><circle cx="16" cy="16" r="16" fill="#FF0000"/><path d="M24.5 11.5s-.2-1.4-.8-2c-.77-.8-1.63-.8-2.02-.85C19.2 8.5 16 8.5 16 8.5s-3.2 0-5.68.15c-.4.05-1.25.05-2.02.85-.6.6-.8 2-.8 2S7.3 13.1 7.3 14.7v1.5c0 1.6.2 3.2.2 3.2s.2 1.4.8 2c.77.8 1.78.77 2.23.85C11.7 22.4 16 22.5 16 22.5s3.2 0 5.68-.2c.4-.05 1.25-.05 2.02-.85.6-.6.8-2 .8-2s.2-1.6.2-3.2v-1.5c0-1.6-.2-3.2-.2-3.2zm-11.9 6.5v-5.5l5.4 2.76-5.4 2.74z" fill="white"/></svg>
            </a>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} Guleria's Ayurveda Mentorship Program. All rights reserved.</p>
      </div>
    </footer>
  )
}
