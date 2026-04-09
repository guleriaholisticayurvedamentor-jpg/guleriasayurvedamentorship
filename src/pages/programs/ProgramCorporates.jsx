import { Link } from 'react-router-dom'
import './ProgramDetail.css'

export default function ProgramCorporates() {
  return (
    <main className="program-detail program-detail--corporates">
      <section className="page-hero" style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80&fit=crop')",
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      }}>
        <div className="container">
          <p className="section-eyebrow">Program</p>
          <h1>💼 For Corporates</h1>
          <p className="page-hero__sub">Ayurvedic intelligence for modern leaders and professionals</p>
          <div className="hero-tags">
            <span>Clarity</span><span>Emotional Stability</span><span>Strategic Intelligence</span><span>Leadership</span>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="section program-overview">
        <div className="container program-overview__inner">
          <div className="program-overview__text">
            <h2>Program Overview</h2>
            <p>
              The Corporate Ayurveda Mentorship Program is a cutting-edge leadership development
              initiative that applies the ancient science of Ayurveda to the modern corporate world.
              It's designed for executives, managers, and professionals who want to lead with clarity,
              make better decisions, and build high-performance teams.
            </p>
            <p>
              Dr. Praveen Guleria's proprietary Ayurveda Cognitive Alignment Framework (ACAF) provides
              corporate professionals with a unique lens to understand their cognitive patterns, manage
              stress, and develop the emotional intelligence required for strategic leadership.
            </p>
            <p>
              This isn't a wellness retreat — it's a rigorous, results-oriented program that translates
              Ayurvedic wisdom into actionable corporate strategies and leadership frameworks.
            </p>
          </div>
          <div className="program-overview__sidebar">
            <h3>Program Includes</h3>
            <ul>
              <li>ACAF leadership assessment</li>
              <li>Cognitive performance optimization</li>
              <li>Stress & burnout prevention</li>
              <li>Decision-making frameworks</li>
              <li>Team dynamics & communication</li>
              <li>Executive presence coaching</li>
              <li>Energy management strategies</li>
              <li>Corporate wellness integration</li>
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
              { icon: '🧠', title: 'Cognitive Clarity', desc: 'Sharpen decision-making and strategic thinking through Ayurvedic cognitive science.' },
              { icon: '🎯', title: 'Leadership Presence', desc: 'Develop authentic executive presence grounded in self-awareness and purpose.' },
              { icon: '⚡', title: 'Peak Performance', desc: 'Optimize your energy, focus, and productivity using Ayurvedic performance principles.' },
              { icon: '🤝', title: 'Team Intelligence', desc: 'Understand team dynamics through the lens of Prakriti for better collaboration.' },
              { icon: '🛡️', title: 'Stress Resilience', desc: 'Build robust stress management systems to prevent burnout and maintain peak health.' },
              { icon: '📊', title: 'Strategic Thinking', desc: 'Apply Ayurvedic frameworks to enhance long-term strategic planning and vision.' },
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
              { icon: '👔', text: 'C-suite executives and senior managers seeking a leadership edge' },
              { icon: '📈', text: 'Entrepreneurs and business owners wanting sustainable growth' },
              { icon: '🏢', text: 'HR professionals building corporate wellness programs' },
              { icon: '💡', text: 'High-performers experiencing burnout or decision fatigue' },
              { icon: '🌐', text: 'Team leaders wanting to improve team cohesion and performance' },
              { icon: '🎯', text: 'Professionals seeking purpose-driven career transformation' },
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
              'Enhanced cognitive clarity and sharper decision-making abilities',
              'A personalized leadership style aligned with your natural strengths',
              'Measurable reduction in workplace stress and burnout',
              'Improved emotional intelligence and interpersonal effectiveness',
              'A sustainable high-performance routine for long-term success',
              'Deeper self-awareness and authentic executive presence',
              'Strategic frameworks for navigating complex business challenges',
              'A holistic approach to success that integrates health and purpose',
            ].map((o, i) => (
              <div className="outcome-item" key={i}>
                <span className="outcome-num">0{i + 1}</span>
                <p>{o}</p>
              </div>
            ))}
          </div>
          <div className="program-cta">
            <h3>Elevate Your Leadership</h3>
            <p>Bring Ayurvedic intelligence into your professional life and lead with purpose.</p>
            <div className="program-cta__btns">
              <a
                href="https://wa.me/918283811383?text=Hello%20Dr.%20Guleria%2C%20I%20am%20interested%20in%20the%20Corporate%20Ayurveda%20Mentorship%20Program."
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
