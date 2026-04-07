import { useState } from 'react'
import './About.css'
import './Contact.css'

const WA_NUMBER = '918283811383'

function openWhatsApp(name, email, message) {
  const text = `Hello Dr. Guleria,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\nI found you through your website.`
  const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`
  window.open(url, '_blank')
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    openWhatsApp(form.name, form.email, form.message)
  }

  return (
    <main className="contact-page">
      <section className="page-hero">
        <div className="container">
          <p className="section-eyebrow">Get in Touch</p>
          <h1>Contact Us</h1>
          <p className="page-hero__sub">We'd love to hear from you. Reach out to begin your journey.</p>
        </div>
      </section>

      <section className="section contact-main">
        <div className="container contact-main__inner">
          {/* Contact Info */}
          <div className="contact-info">
            <h2>Let's Connect</h2>
            <p className="contact-info__intro">
              Whether you have questions about our programs, want to book a consultation,
              or simply want to learn more about Ayurveda — we're here for you.
            </p>

            <div className="contact-info__items">
              <div className="contact-info__item">
                <span className="contact-info__icon">📧</span>
                <div>
                  <h4>Email</h4>
                  <a href="mailto:guleriaholisticayurvedamentor@gmail.com">
                    guleriaholisticayurvedamentor@gmail.com
                  </a>
                </div>
              </div>
              <div className="contact-info__item">
                <span className="contact-info__icon">📞</span>
                <div>
                  <h4>Phone / WhatsApp</h4>
                  <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noopener noreferrer">
                    +91 82838 11383
                  </a>
                </div>
              </div>
              <div className="contact-info__item">
                <span className="contact-info__icon">📍</span>
                <div>
                  <h4>Address</h4>
                  <p>#23 SF Prem Vihar Flats, Ludhiana</p>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp CTA */}
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hello Dr. Guleria, I would like to know more about your Ayurveda Mentorship Programs.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="wa-direct-btn"
            >
              <span>💬</span> Chat on WhatsApp
            </a>

            <div className="contact-hours">
              <h4>Consultation Hours</h4>
              <p>Monday – Saturday: 9:00 AM – 6:00 PM</p>
              <p>Sunday: By appointment only</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-wrap">
            <h2>Send a Message</h2>
            <p className="form-note">Submitting this form will open WhatsApp with your message pre-filled.</p>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="Tell us about yourself and how we can help you..."
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn contact-form__submit wa-submit-btn">
                <span>💬</span> Send via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="contact-map">
        <div className="container">
          <h2 className="section-title">Find Us</h2>
          <p className="section-subtitle">#23 SF Prem Vihar Flats, Ludhiana, Punjab</p>
          <div className="map-placeholder">
            <div className="map-placeholder__inner">
              <span>🗺️</span>
              <h3>Guleria's Ayurveda Mentorship</h3>
              <p>#23 SF Prem Vihar Flats, Ludhiana</p>
              <a
                href="https://maps.google.com/?q=Prem+Vihar+Flats+Ludhiana+Punjab"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
