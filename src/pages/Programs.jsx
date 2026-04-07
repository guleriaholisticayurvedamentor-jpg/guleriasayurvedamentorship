import Card from '../components/Card'
import './About.css'
import './Programs.css'

const programs = [
  {
    icon: '📚',
    title: 'For Ayurveda Students',
    subtitle: 'Clarity • Discipline • Purpose',
    desc: 'A structured mentorship program designed to help BAMS students build confidence, develop a strong Ayurvedic identity, and navigate their academic and professional journey with clarity.',
    link: '/programs/students',
  },
  {
    icon: '🌸',
    title: 'For Working Women',
    subtitle: 'Balance • Emotional Strength • Self-Growth',
    desc: 'Empowering working women to reclaim balance, build emotional resilience, and achieve holistic well-being through the timeless wisdom of Ayurveda.',
    link: '/programs/women',
  },
  {
    icon: '💼',
    title: 'For Corporates',
    subtitle: 'Clarity • Emotional Stability • Strategic Intelligence • Leadership',
    desc: 'A transformative program for corporate professionals seeking to enhance leadership, manage stress, and build strategic intelligence through Ayurvedic cognitive science.',
    link: '/programs/corporates',
  },
]

export default function Programs() {
  return (
    <main className="programs-page">
      <section className="page-hero">
        <div className="container">
          <p className="section-eyebrow">Our Programs</p>
          <h1>Choose Your Path to Mastery</h1>
          <p className="page-hero__sub">Tailored Ayurvedic mentorship for every stage of life</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="section-eyebrow">All Programs</p>
          <h2 className="section-title">Three Paths, One Purpose</h2>
          <p className="section-subtitle">Each program is uniquely designed to meet you where you are</p>
          <div className="programs-page__grid">
            {programs.map((p) => (
              <Card key={p.title} {...p} />
            ))}
          </div>
        </div>
      </section>

      <section className="programs-why section">
        <div className="container">
          <p className="section-eyebrow">Why Choose Us</p>
          <h2 className="section-title">What Makes This Different</h2>
          <div className="programs-why__grid">
            {[
              { icon: '🎓', title: 'Expert-Led', desc: '16+ years of Ayurvedic teaching and mentorship experience.' },
              { icon: '🔬', title: 'Evidence-Based', desc: 'Classical Ayurveda integrated with modern psychological research.' },
              { icon: '🤝', title: 'Personalized', desc: 'Each program is tailored to your unique constitution and goals.' },
              { icon: '📈', title: 'Results-Oriented', desc: 'Practical tools and frameworks for measurable transformation.' },
            ].map((w) => (
              <div className="why-item" key={w.title}>
                <span>{w.icon}</span>
                <h3>{w.title}</h3>
                <p>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
