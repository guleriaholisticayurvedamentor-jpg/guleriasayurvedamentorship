import { Link } from 'react-router-dom'
import './ProgramDetail.css'

export default function ProgramWomen() {
  return (
    <main className="program-detail program-detail--women">
      <section className="page-hero" style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1600&q=80&fit=crop')",
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      }}>
        <div className="container">
          <p className="section-eyebrow">Program</p>
          <h1>🌸 For Working Women</h1>
          <p className="page-hero__sub">Reclaim balance, strength, and purpose through Ayurveda</p>
          <div className="hero-tags">
            <span>Balance</span><span>Emotional Strength</span><span>Self-Growth</span>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="section program-overview">
        <div className="container program-overview__inner">
          <div className="program-overview__text">
            <h2>Program Overview</h2>
            <p>
              The Working Women's Ayurveda Mentorship Program is a transformative journey designed
              for modern women who are juggling careers, family, and personal aspirations — often
              at the cost of their own health and happiness.
            </p>
            <p>
              Through the lens of Ayurveda, Dr. Praveen Guleria helps women understand their unique
              Prakriti (constitution), identify the root causes of imbalance, and build sustainable
              practices for physical, emotional, and spiritual well-being.
            </p>
            <p>
              This program goes beyond diet and lifestyle tips — it's a deep dive into self-awareness,
              emotional intelligence, and the art of living in harmony with your natural rhythms.
            </p>
          </div>
          <div className="program-overview__sidebar">
            <h3>Program Includes</h3>
            <ul>
              <li>Prakriti assessment & analysis</li>
              <li>Personalized Dinacharya planning</li>
              <li>Emotional intelligence coaching</li>
              <li>Stress management techniques</li>
              <li>Hormonal balance through Ayurveda</li>
              <li>Mindfulness & meditation practices</li>
              <li>Nutrition & seasonal eating guidance</li>
              <li>Work-life integration strategies</li>
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
              { icon: '⚖️', title: 'Life Balance', desc: 'Restore harmony between your professional ambitions and personal well-being.' },
              { icon: '💆', title: 'Stress Relief', desc: 'Learn Ayurvedic techniques to manage stress and prevent burnout effectively.' },
              { icon: '🌺', title: 'Hormonal Health', desc: 'Understand and support your hormonal cycles through Ayurvedic wisdom.' },
              { icon: '💛', title: 'Emotional Mastery', desc: 'Develop emotional intelligence and resilience to navigate life\'s challenges.' },
              { icon: '✨', title: 'Self-Confidence', desc: 'Reconnect with your authentic self and build unshakeable self-worth.' },
              { icon: '🌙', title: 'Restful Sleep', desc: 'Establish Ayurvedic sleep rituals for deep, restorative rest every night.' },
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
              { icon: '👩‍💼', text: 'Working professionals feeling overwhelmed and burned out' },
              { icon: '👩‍👧', text: 'Mothers balancing career and family responsibilities' },
              { icon: '🌿', text: 'Women seeking a natural approach to health and wellness' },
              { icon: '💭', text: 'Those experiencing hormonal imbalances or chronic fatigue' },
              { icon: '🎯', text: 'Women wanting to align their lifestyle with their true purpose' },
              { icon: '🌸', text: 'Anyone ready to invest in their holistic well-being' },
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
              'A personalized Ayurvedic lifestyle plan aligned with your Prakriti',
              'Significantly reduced stress and anxiety levels',
              'Improved hormonal balance and energy levels',
              'Stronger emotional boundaries and self-awareness',
              'A sustainable daily routine that nourishes body and mind',
              'Deeper connection with your authentic self and values',
              'Practical tools for managing relationships and work dynamics',
              'A renewed sense of purpose, joy, and vitality',
            ].map((o, i) => (
              <div className="outcome-item" key={i}>
                <span className="outcome-num">0{i + 1}</span>
                <p>{o}</p>
              </div>
            ))}
          </div>
          <div className="program-cta">
            <h3>Begin Your Wellness Journey</h3>
            <p>Reclaim your balance and step into your most vibrant, purposeful self.</p>
            <div className="program-cta__btns">
              <a
                href="https://wa.me/918283811383?text=Hello%20Dr.%20Guleria%2C%20I%20am%20interested%20in%20the%20Working%20Women%20Mentorship%20Program."
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
