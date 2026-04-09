import { Link } from 'react-router-dom'
import PhotoSlider from '../components/PhotoSlider'
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
    desc: 'As an expert in Ayurvedic Rasa Shastra and Bhaishajya Kalpana, inculcating the knowledge of medicine preparation and therapeutic effects serving as the basis of future Ayurveda practice.',
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
            <PhotoSlider />
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
              Dr. Praveen Guleria's journey in Ayurveda began not merely as a professional pursuit, but as a
              calling to understand life in its wholeness — the sacred connection between mind, body, purpose,
              and service.
            </p>
            <p style={{ marginTop: '16px' }}>
              As a student of Ayurveda, she experienced firsthand the rigor of classical study, the pressure
              to excel clinically, and the quiet self-doubt that many students carry but seldom voice. She
              began to realize something profound: knowledge alone does not shape a Vaidya. Inner clarity,
              emotional steadiness, ethical strength, and self-trust are equally essential. This realization
              became a defining turning point.
            </p>
            <p style={{ marginTop: '16px' }}>
              Over the past 16+ years as a teacher, physician, and mentor, Dr. Guleria has guided countless
              students through the same inner and professional challenges she once navigated — academic
              overwhelm, lack of clinical confidence, uncertainty about career direction, and the delicate
              balance between personal life and professional growth.
            </p>
            <p style={{ marginTop: '16px' }}>
              She is proficient in her subject expertise of Rasa Shastra and Bhaishajya Kalpana and ensures
              the exposure of students to the intricacies of medicine preparation and their therapeutic
              effects. Her pursuit of an MSc in Spirituality and Value Education deepened her conviction
              that Ayurveda is not only a science of healing but a path of self-evolution. She believes that
              true healing begins within the healer.
            </p>
            <p style={{ marginTop: '16px' }}>
              In classrooms, pharmacy, clinics, and mentorship spaces, she goes beyond teaching formulations
              and treatment protocols. She cultivates discernment. She nurtures confidence. She encourages
              reflection. She trains students to think, feel, and lead like Vaidyas — not merely to memorize
              knowledge.
            </p>
            <p style={{ marginTop: '16px' }}>Her approach integrates:</p>
            <ul style={{ marginTop: '8px', paddingLeft: '20px', color: 'var(--text-mid)', fontSize: '0.95rem', lineHeight: '2' }}>
              <li>Classical Ayurvedic wisdom</li>
              <li>Practical clinical reasoning</li>
              <li>Emotional intelligence and inner resilience</li>
              <li>Ethical clarity and professional integrity</li>
              <li>Purpose-driven leadership</li>
            </ul>
            <p style={{ marginTop: '16px' }}>
              Dr. Guleria believes that a Vaidya must embody balance before prescribing it, cultivate
              compassion before advising it, and lead from wisdom rather than ego.
            </p>
            <p style={{ marginTop: '16px' }}>
              Today, her mission remains unwavering: to help Ayurveda students and professionals evolve into
              confident, balanced, and compassionate Vaidyas — who lead with wisdom, practice with integrity,
              and serve with purpose. For her, mentorship is not instruction. It is transformation.
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
