import { useState, useEffect } from 'react'
import './Testimonials.css'

const testimonials = [
  {
    id: 1,
    name: 'Dr. Rohini Garg',
    role: 'Ayurvedic Medical Officer, Haryana Government',
    avatar: '👩‍⚕️',
    short: 'Because of your teaching, I have grown both in knowledge and in my approach toward treating patients.',
    full: `Respected Dr. Praveen Ma'am,

I would like to sincerely thank you for your guidance and support and for always encouraging me to focus on the basics of Ayurveda. Because of your teaching, I have grown both in knowledge and in my approach toward treating patients. Today, as I am working as an AMO and serving patients, I truly feel grateful for everything you have taught me.

Along with academics, you also taught me the importance of patience and how to stay calm in every situation, no matter how difficult it may be.

Thank you for always guiding and supporting me. I am here today because of your encouragement and blessings.

With respect and gratitude,
Dr. Rohini Garg
Ayurvedic Medical Officer, Haryana Government`,
  },
  {
    id: 2,
    name: 'Dr. Sahore Shikha Virmani',
    role: 'Ayurveda Practitioner',
    avatar: '👩‍⚕️',
    short: 'At times when I couldn\'t see my own potential, you believed in me. You had faith in me becoming a good Vaidya even before I truly believed it myself.',
    full: `Yes Ma'am, you have guided me in ways I can't fully put into words. Not just academically, but in shaping me as a person. You've always been a guiding light for me.

With you, I always felt I had a safe space, someone I could talk to openly, share my thoughts with, without any hesitation. That comfort and understanding meant a lot to me.

At times when I couldn't see my own potential, you believed in me. You had faith in me becoming a good Vaidya even before I truly believed it myself. Somewhere along the way, you helped me reconnect with who I am… and that has changed how I look at my life and my goals.

And most importantly… I still remember the promise I made to you — that I will work hard, be successful, and make you proud. I carry that with me every day.

Thank you for everything, Ma'am. You've truly made a difference in my life.

With deepest respect and gratitude,
Dr. Sahore Shikha Virmani`,
  },
  {
    id: 3,
    name: 'Dr. Puja Shelke',
    role: 'BAMS MS Shalya Tantra, Assistant Professor',
    avatar: '👩‍⚕️',
    short: 'You were not only a guide or mentor for students but like a light beam for the whole SKSS. That single statement — "you have the capability, you should do PG" — made me choose my path.',
    full: `You were not only a guide or mentor for students but like a light beam for the whole SKSS...!!!

You were the one who motivated me for my PG. Once you said this to me outside the Rasa Shastra lab — "you have the capability, you should do PG." Only that single statement made me choose my path.

The confidence that you saw in me once still boosts my confidence in my bad and struggling times...!!!

You are the best teacher, guide, and I would also say a friend I have ever got in my life...!!!

Thank you for everything...!!!

Dr. Puja Shelke
BAMS MS Shalya Tantra, Assistant Professor`,
  },
  {
    id: 4,
    name: 'Dr. Rohit Wandraw',
    role: 'BAMS MD Final Year Student',
    avatar: '👨‍⚕️',
    short: 'From the kharals of Ras Shastra to the hurdles of life, your selfless help and guidance has truly made our journey commendable.',
    full: `Mam, your guidance has truly helped me move closer to my goals. Your support, clarity in teaching and constant motivation have made a meaningful difference in my journey. I'm really grateful for everything you've shared with us.

From the kharals of Ras Shastra to the hurdles of life, your selfless help and guidance has truly made our journey commendable.

Thank you for always guiding us in the right direction. 🙏

Dr. Rohit Wandraw
BAMS MD Final Year Student`,
  },
]

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const [expanded, setExpanded] = useState(null)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    const t = setInterval(() => {
      setAnimating(true)
      setTimeout(() => {
        setActive((p) => (p + 1) % testimonials.length)
        setAnimating(false)
      }, 400)
    }, 6000)
    return () => clearInterval(t)
  }, [])

  const t = testimonials[active]

  return (
    <section className="testimonials section">
      <div className="container">
        <p className="section-eyebrow">Student Testimonials</p>
        <h2 className="section-title">Words From Our Students</h2>
        <p className="section-subtitle">Real transformations, real gratitude</p>

        <div className={`testimonials__card ${animating ? 'testimonials__card--out' : 'testimonials__card--in'}`}>
          <div className="testimonials__quote-mark">"</div>
          <p className="testimonials__text">{t.short}</p>

          {expanded === t.id ? (
            <div className="testimonials__full">
              {t.full.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
              <button className="testimonials__toggle" onClick={() => setExpanded(null)}>
                Show less ↑
              </button>
            </div>
          ) : (
            <button className="testimonials__toggle" onClick={() => setExpanded(t.id)}>
              Read full message ↓
            </button>
          )}

          <div className="testimonials__author">
            <span className="testimonials__avatar">{t.avatar}</span>
            <div>
              <strong>{t.name}</strong>
              <span>{t.role}</span>
            </div>
          </div>
        </div>

        <div className="testimonials__nav">
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`testimonials__dot ${i === active ? 'active' : ''}`}
              onClick={() => { setAnimating(true); setTimeout(() => { setActive(i); setAnimating(false) }, 400) }}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>

        <div className="testimonials__all">
          {testimonials.map((t, i) => (
            <div key={t.id} className={`testimonials__mini ${i === active ? 'active' : ''}`} onClick={() => setActive(i)}>
              <span>{t.avatar}</span>
              <div>
                <strong>{t.name}</strong>
                <small>{t.role}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
