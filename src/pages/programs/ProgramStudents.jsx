import { Link } from 'react-router-dom'
import './ProgramDetail.css'

export default function ProgramStudents() {
  return (
    <main className="program-detail">
      <section className="page-hero">
        <div className="container">
          <p className="section-eyebrow">Program</p>
          <h1>📚 For Ayurveda Students</h1>
          <p className="page-hero__sub">A mentorship program for BAMS students and early-career Ayurvedists</p>
          <div className="hero-tags">
            <span>Clarity</span><span>Discipline</span><span>Purpose</span>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="section program-overview">
        <div className="container program-overview__inner">
          <div className="program-overview__text">
            <h2>Program Overview</h2>
            <p>
              The Ayurveda Students Mentorship Program is a comprehensive, structured journey designed
              specifically for BAMS students and early-career Ayurvedists who feel lost, overwhelmed,
              or disconnected from their purpose in Ayurveda.
            </p>
            <p>
              Dr. Praveen Guleria draws from his own experience as a BAMS student, Ayurvedist, and
              life mentor to create a program that addresses not just academic challenges, but the
              deeper psychological and identity-related struggles that students face.
            </p>
            <p>
              Through the Ayurveda Cognitive Alignment Framework (ACAF) and the Five-Fold Manas
              Mastery System, students learn to align their mind, build unshakeable discipline,
              and discover their unique purpose within Ayurveda.
            </p>
          </div>
          <div className="program-overview__sidebar">
            <h3>Program Includes</h3>
            <ul>
              <li>1-on-1 mentorship sessions</li>
              <li>ACAF framework training</li>
              <li>Study strategy & time management</li>
              <li>Ayurvedic identity building</li>
              <li>Emotional resilience coaching</li>
              <li>Career path clarity sessions</li>
              <li>Classical text study guidance</li>
              <li>Community of like-minded students</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section program-benefits">
        <div className="container">
          <p className="section-eyebrow">Benefits</p>
          <h2 className="section-title">What You Will Gain</h2>
          <div className="benefits-grid">
            {[
              { icon: '🧠', title: 'Mental Clarity', desc: 'Clear your mind of confusion and develop laser-sharp focus on your Ayurvedic path.' },
              { icon: '📖', title: 'Academic Excellence', desc: 'Master study techniques rooted in Ayurvedic learning principles for better retention.' },
              { icon: '🌿', title: 'Ayurvedic Identity', desc: 'Develop a strong, confident identity as an Ayurvedist and future Vaidya.' },
              { icon: '⚡', title: 'Discipline & Routine', desc: 'Build a Dinacharya-based daily routine that supports peak performance.' },
              { icon: '🎯', title: 'Career Clarity', desc: 'Discover your unique niche and create a clear roadmap for your Ayurvedic career.' },
              { icon: '💪', title: 'Emotional Strength', desc: 'Develop the emotional maturity to handle academic pressure and life challenges.' },
            ].map((b) => (
              <div className="benefit-item" key={b.title}>
                <span>{b.icon}</span>
                <h3>{b.title}</h3>
                <p>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="section program-who">
        <div className="container">
          <p className="section-eyebrow">Eligibility</p>
          <h2 className="section-title">Who Is This For?</h2>
          <div className="who-grid" style={{ marginTop: '40px' }}>
            {[
              { icon: '🎓', text: 'BAMS students in any year who feel overwhelmed or lack direction' },
              { icon: '🌱', text: 'Recent BAMS graduates unsure about their next steps' },
              { icon: '🔍', text: 'Students struggling with academic performance and focus' },
              { icon: '💭', text: 'Aspiring Vaidyas who want to build a strong philosophical foundation' },
              { icon: '🏥', text: 'Interns and house surgeons seeking clinical confidence' },
              { icon: '✨', text: 'Anyone who wants to integrate Ayurveda into a purposeful life' },
            ].map((w) => (
              <div className="who-item" key={w.text}>
                <span>{w.icon}</span>
                <p>{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="section program-outcomes">
        <div className="container">
          <p className="section-eyebrow">Outcomes</p>
          <h2 className="section-title">Transformation You Can Expect</h2>
          <div className="outcomes-list" style={{ marginTop: '40px' }}>
            {[
              'A clear, confident Ayurvedic identity and sense of purpose',
              'Structured daily routine aligned with Ayurvedic principles',
              'Improved academic performance and study efficiency',
              'Emotional resilience to handle stress and setbacks',
              'A defined career roadmap in Ayurveda',
              'Deep understanding of Ayurvedic philosophy and its application',
              'A supportive network of fellow Ayurveda students and mentors',
              'Tools to maintain balance between studies, health, and personal life',
            ].map((o, i) => (
              <div className="outcome-item" key={i}>
                <span className="outcome-num">0{i + 1}</span>
                <p>{o}</p>
              </div>
            ))}
          </div>
          <div className="program-cta">
            <h3>Ready to Begin Your Journey?</h3>
            <p>Take the first step towards becoming a confident, purposeful Vaidya.</p>
            <div className="program-cta__btns">
              <a
                href="https://wa.me/918283811383?text=Hello%20Dr.%20Guleria%2C%20I%20am%20interested%20in%20the%20Ayurveda%20Students%20Mentorship%20Program."
                target="_blank"
                rel="noopener noreferrer"
                className="btn wa-enroll-btn"
              >
                💬 Enroll via WhatsApp
              </a>
              <Link to="/programs" className="btn btn-outline">View All Programs</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
