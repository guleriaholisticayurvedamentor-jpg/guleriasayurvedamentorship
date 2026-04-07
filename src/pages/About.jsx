import { Link } from 'react-router-dom'
import './About.css'

const philosophy = [
  { icon: '🤝', label: 'Responsibility' },
  { icon: '💛', label: 'Emotional Maturity' },
  { icon: '🪞', label: 'Self-Awareness' },
  { icon: '🕊️', label: 'Compassion' },
  { icon: '🎯', label: 'Discipline' },
]

const journey = [
  {
    phase: 'As a BAMS Student',
    icon: '📖',
    desc: 'Navigated the challenges of Ayurvedic education, developing a deep understanding of classical texts and clinical practice.',
  },
  {
    phase: 'As an Ayurvedist',
    icon: '🌿',
    desc: 'Practiced and taught Ayurveda for over 16 years, helping hundreds of patients and students reconnect with holistic health.',
  },
  {
    phase: 'As a Life Mentor',
    icon: '🧭',
    desc: 'Evolved into a certified life coach, integrating Ayurvedic wisdom with modern psychology to guide individuals toward life mastery.',
  },
]

export default function About() {
  return (
    <main className="about">
      {/* Page Hero */}
      <section className="page-hero">
        <div className="container">
          <p className="section-eyebrow">About the Mentor</p>
          <h1>Dr. Praveen Guleria</h1>
          <p className="page-hero__sub">Vyasa — The Knower & Transmitter of Wisdom</p>
        </div>
      </section>

      {/* Intro */}
      <section className="section about-intro">
        <div className="container about-intro__inner">
          <div className="about-intro__avatar">
            <div className="avatar-circle">
              <span>🌿</span>
              <p>Dr. Praveen<br />Guleria</p>
            </div>
            <div className="about-intro__creds">
              <span>BAMS</span>
              <span>MD (Ayurveda)</span>
              <span>MSc Spirituality</span>
              <span>Certified Life Coach</span>
            </div>
          </div>
          <div className="about-intro__text">
            <p className="section-eyebrow">16+ Years of Experience</p>
            <h2 className="section-title">Ayurveda Educator & Mentor</h2>
            <p>
              Dr. Praveen Guleria is a distinguished Ayurveda physician, educator, and life mentor with over
              16 years of experience in Ayurvedic teaching and practice. Holding a BAMS, MD in Ayurveda,
              and an MSc in Spirituality & Value Education, he brings a rare combination of classical
              scholarship and modern insight.
            </p>
            <p style={{ marginTop: '16px' }}>
              As a Certified Life Coach and Ayurveda Educator, Dr. Guleria has dedicated his life to
              helping students and professionals become confident, balanced, and purposeful Vaidyas.
              His approach bridges the ancient wisdom of Ayurveda with contemporary psychological tools
              to create lasting transformation.
            </p>
            <div className="about-intro__quals">
              <div className="qual-item">
                <strong>16+</strong>
                <span>Years Experience</span>
              </div>
              <div className="qual-item">
                <strong>500+</strong>
                <span>Students Mentored</span>
              </div>
              <div className="qual-item">
                <strong>3</strong>
                <span>Specialized Programs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="section journey">
        <div className="container">
          <p className="section-eyebrow">The Journey</p>
          <h2 className="section-title">Three Phases of Wisdom</h2>
          <p className="section-subtitle">A life lived in service of Ayurveda and human transformation</p>
          <div className="journey__grid">
            {journey.map((j) => (
              <div className="journey__item" key={j.phase}>
                <span className="journey__icon">{j.icon}</span>
                <h3>{j.phase}</h3>
                <p>{j.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section philosophy">
        <div className="container">
          <p className="section-eyebrow">Core Philosophy</p>
          <h2 className="section-title">Values That Guide the Work</h2>
          <p className="section-subtitle">Every session, every program is rooted in these five principles</p>
          <div className="philosophy__grid">
            {philosophy.map((p) => (
              <div className="philosophy__item" key={p.label}>
                <span>{p.icon}</span>
                <h3>{p.label}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section mission">
        <div className="container mission__inner">
          <div className="mission__quote">
            <span className="mission__quote-mark">"</span>
            <p>
              My mission is to help Ayurveda students and professionals become not just skilled practitioners,
              but confident, balanced, and compassionate Vaidyas who lead with wisdom and serve with purpose.
            </p>
            <cite>— Dr. Praveen Guleria</cite>
          </div>
          <div className="mission__cta">
            <h3>Ready to Work with Dr. Guleria?</h3>
            <p>Explore the programs designed for your unique journey.</p>
            <Link to="/programs" className="btn btn-primary">View Programs</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
