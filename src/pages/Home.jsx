import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import Card from '../components/Card'
import Testimonials from '../components/Testimonials'
import './Home.css'

const features = [
  { icon: '🌿', title: 'Classical Ayurvedic Wisdom', desc: 'Rooted in authentic Vedic texts and time-tested Ayurvedic principles.' },
  { icon: '🧠', title: 'Modern Psychological Tools', desc: 'Integrating contemporary psychology with ancient mind-body science.' },
  { icon: '🎯', title: 'Practical Life Skills', desc: 'Actionable frameworks for daily discipline, focus, and productivity.' },
  { icon: '✨', title: 'Spiritual Clarity', desc: 'Connecting purpose, values, and inner wisdom for a meaningful life.' },
]

const acafPillars = ['Clarity', 'Discipline', 'Purpose']

const manasFold = [
  { num: '01', title: 'Manas Shuddhi', desc: 'Purification of the mind from negative patterns and conditioning.' },
  { num: '02', title: 'Manas Sthairya', desc: 'Building mental stability and emotional resilience.' },
  { num: '03', title: 'Manas Shakti', desc: 'Awakening inner strength and cognitive power.' },
  { num: '04', title: 'Manas Prasada', desc: 'Cultivating clarity, joy, and sattvic awareness.' },
  { num: '05', title: 'Manas Vikas', desc: 'Holistic growth — personal, professional, and spiritual.' },
]

const programs = [
  {
    icon: '📚',
    title: 'For Ayurveda Students',
    subtitle: 'Clarity • Discipline • Purpose',
    description: 'A structured mentorship to help BAMS students build confidence, clarity, and a strong Ayurvedic identity.',
    link: '/programs/students',
  },
  {
    icon: '🌸',
    title: 'For Working Women',
    subtitle: 'Balance • Emotional Strength • Self-Growth',
    description: 'Empowering women to reclaim balance, emotional health, and purposeful living through Ayurveda.',
    link: '/programs/women',
  },
  {
    icon: '💼',
    title: 'For Corporates',
    subtitle: 'Clarity • Emotional Stability • Leadership',
    description: 'Strategic intelligence and leadership development grounded in Ayurvedic cognitive science.',
    link: '/programs/corporates',
  },
]

export default function Home() {
  const parallaxRefs = useRef([])

  useEffect(() => {
    const handleScroll = () => {
      parallaxRefs.current.forEach((el) => {
        if (!el) return
        const rect = el.parentElement.getBoundingClientRect()
        const offset = rect.top * 0.35
        el.style.transform = `translateY(${offset}px)`
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const parallaxBg = (index, imageUrl, overlay) => (
    <div
      ref={(el) => (parallaxRefs.current[index] = el)}
      className="parallax-bg"
      style={{
        backgroundImage: `url('${imageUrl}')`,
        '--overlay': overlay,
      }}
    />
  )
  return (
    <main className="home">
      {/* Hero — pure CSS gradient, no image */}
      <section className="hero">
        <div className="hero__overlay" />
        <div className="container hero__content">
          <p className="hero__eyebrow fade-in-delay-1">Guleria's Ayurveda Mentorship Program</p>
          <h1 className="hero__title fade-in-delay-2">
            Life Mastery Through<br />Ayurveda
          </h1>
          <p className="hero__subtitle fade-in-delay-3">
            Helping individuals achieve balance, success, and holistic health
          </p>
          <div className="hero__actions fade-in-delay-4">
            <Link to="/programs" className="btn btn-primary">Explore Programs</Link>
            <Link to="/about" className="btn btn-outline hero__btn-outline">Meet the Mentor</Link>
          </div>
          <div className="hero__mentor-tag fade-in-delay-4">
            <span className="hero__mentor-dot" />
            <span>With Vyasa — Dr. Praveen Guleria</span>
          </div>
        </div>
        <div className="hero__scroll-hint"><span>↓</span></div>
      </section>

      {/* Features */}
      <section className="section features parallax-section">
        {parallaxBg(0, 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1600&q=80&fit=crop', 'rgba(253,246,236,0.55)')}
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <p className="section-eyebrow">What We Offer</p>
          <h2 className="section-title">A Holistic Approach to Transformation</h2>
          <p className="section-subtitle">Four pillars that form the foundation of our mentorship</p>
          <div className="features__grid">
            {features.map((f) => (
              <div className="feature-item" key={f.title}>
                <span className="feature-item__icon">{f.icon}</span>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ACAF Framework */}
      <section className="section acaf">
        <div className="container acaf__inner">
          <div className="acaf__text">
            <p className="section-eyebrow">Our Framework</p>
            <h2 className="section-title">Ayurveda Cognitive Alignment Framework</h2>
            <p className="acaf__acronym">ACAF</p>
            <p className="acaf__desc">
              A proprietary framework developed by Dr. Praveen Guleria that bridges classical Ayurvedic
              psychology with modern cognitive science — helping you align your mind, body, and purpose.
            </p>
            <div className="acaf__pillars">
              {acafPillars.map((p) => (
                <span key={p} className="acaf__pillar">{p}</span>
              ))}
            </div>
            <Link to="/about" className="btn btn-primary" style={{ marginTop: '32px' }}>
              Learn More
            </Link>
          </div>
          <div className="acaf__visual">
            <div className="acaf__circle">
              <span>ACAF</span>
              <small>Ayurveda Cognitive<br />Alignment Framework</small>
            </div>
          </div>
        </div>
      </section>

      {/* Five-Fold Manas Mastery */}
      <section className="section manas parallax-section">
        {parallaxBg(1, 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=1600&q=80&fit=crop', 'rgba(13,43,31,0.88)')}
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <p className="section-eyebrow">The System</p>
          <h2 className="section-title">Five-Fold Manas Mastery System</h2>
          <p className="section-subtitle">A step-by-step journey to complete mental mastery through Ayurveda</p>
          <div className="manas__grid">
            {manasFold.map((m) => (
              <div className="manas__item" key={m.num}>
                <span className="manas__num">{m.num}</span>
                <h3>{m.title}</h3>
                <p>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Preview */}
      <section className="section programs-preview parallax-section">
        {parallaxBg(2, 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=1600&q=80&fit=crop', 'rgba(253,246,236,0.45)')}
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <p className="section-eyebrow">Programs</p>
          <h2 className="section-title">Choose Your Path</h2>
          <p className="section-subtitle">Tailored mentorship for every stage of life</p>
          <div className="programs-preview__grid">
            {programs.map((p) => (
              <Card key={p.title} {...p} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Banner */}
      <section className="cta-banner parallax-section">
        {parallaxBg(3, 'https://images.unsplash.com/photo-1470058869958-2a77ade41c02?w=1600&q=80&fit=crop', 'rgba(13,43,31,0.55)')}
        <div className="container cta-banner__inner" style={{ position: 'relative', zIndex: 1 }}>
          <h2>Ready to Begin Your Transformation?</h2>
          <p>Take the first step towards a balanced, purposeful life with Ayurveda.</p>
          <a
            href="https://wa.me/918283811383?text=Hello%20Dr.%20Guleria%2C%20I%20would%20like%20to%20book%20a%20free%20consultation."
            target="_blank"
            rel="noopener noreferrer"
            className="btn wa-cta-btn"
          >
            💬 Book a Free Consultation on WhatsApp
          </a>
        </div>
      </section>
    </main>
  )
}
