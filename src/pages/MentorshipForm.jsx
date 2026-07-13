import { useState } from 'react'
import './MentorshipForm.css'

const WA_NUMBER = '918283811383'

const BAMS_YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year (Internship)']

const initialState = {
  name: '',
  gender: '',
  age: '',
  address: '',
  phone: '',
  email: '',
  bamsYear: '',
  institution: '',
  struggles: '',
  currentActions: '',
  whereStuck: '',
  agreeHabits: '',
  otherInfo: '',
}

function buildWhatsAppMessage(f) {
  return `🌿 *Guleria's Holistic Ayurveda Mentorship Program*
*New Mentorship Inquiry*

👤 *Personal Details*
• Name: ${f.name}
• Gender: ${f.gender}
• Age: ${f.age}
• Address: ${f.address}
• Phone: ${f.phone}
• Email: ${f.email || 'Not provided'}

🎓 *Academic Details*
• Current BAMS Year: ${f.bamsYear}
• Institution: ${f.institution}

📝 *Struggles & Challenges*
${f.struggles}

🔄 *Current Actions to Combat Struggles*
${f.currentActions || 'None mentioned'}

🤔 *Where Feeling Stuck*
${f.whereStuck || 'Not specified'}

✅ *Willing to Give Up Old Habits & Adopt New Ones?*
${f.agreeHabits}

💬 *Additional Information*
${f.otherInfo || 'None'}

---
_Submitted via Guleria Ayurveda Website_`
}

export default function MentorshipForm() {
  const [form, setForm] = useState(initialState)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const required = ['name', 'gender', 'age', 'address', 'phone', 'bamsYear', 'institution', 'struggles', 'agreeHabits']
    const newErrors = {}
    required.forEach((key) => {
      if (!form[key].trim()) newErrors[key] = 'This field is required.'
    })
    if (form.phone && !/^\+?[\d\s\-()]{7,15}$/.test(form.phone)) {
      newErrors.phone = 'Please enter a valid phone number.'
    }
    if (form.age && (isNaN(form.age) || Number(form.age) < 17 || Number(form.age) > 60)) {
      newErrors.age = 'Please enter a valid age (17–60).'
    }
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      // Scroll to first error
      const firstErrorKey = Object.keys(newErrors)[0]
      document.getElementById(firstErrorKey)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    const message = buildWhatsAppMessage(form)
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

  return (
    <main className="mform-page">
      {/* Hero / Headline */}
      <section className="mform-hero">
        <div className="container">
          <p className="section-eyebrow">Join the Journey</p>
          <h1 className="mform-hero__title">Guleria's Holistic Ayurveda<br />Mentorship Program</h1>
          <p className="mform-hero__caption">Help us serve you better</p>
          <p className="mform-hero__desc">
            Fill in the details below and we'll get back to you on WhatsApp to begin your personalised mentorship journey.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="section mform-section">
        <div className="container mform-container">
          <div className="mform-card">
            <p className="mform-note">
              📲 Submitting this form will open WhatsApp with your details pre-filled for Dr. Guleria.
            </p>

            <form className="mform" onSubmit={handleSubmit} noValidate>

              {/* ── Personal Details ── */}
              <div className="mform-group-header">
                <span className="mform-group-icon">👤</span>
                <h2>Personal Details</h2>
              </div>

              <div className="mform-grid-2">
                <div className="form-group">
                  <label htmlFor="name">Full Name <span className="req">*</span></label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="e.g. Aarav Sharma"
                    value={form.name}
                    onChange={handleChange}
                    aria-required="true"
                    aria-describedby={errors.name ? 'name-err' : undefined}
                  />
                  {errors.name && <span className="mform-error" id="name-err">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="gender">Gender <span className="req">*</span></label>
                  <select
                    id="gender"
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    aria-required="true"
                    aria-describedby={errors.gender ? 'gender-err' : undefined}
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                  {errors.gender && <span className="mform-error" id="gender-err">{errors.gender}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="age">Age <span className="req">*</span></label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    placeholder="e.g. 22"
                    min="17"
                    max="60"
                    value={form.age}
                    onChange={handleChange}
                    aria-required="true"
                    aria-describedby={errors.age ? 'age-err' : undefined}
                  />
                  {errors.age && <span className="mform-error" id="age-err">{errors.age}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone / WhatsApp Number <span className="req">*</span></label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="e.g. +91 98765 43210"
                    value={form.phone}
                    onChange={handleChange}
                    aria-required="true"
                    aria-describedby={errors.phone ? 'phone-err' : undefined}
                  />
                  {errors.phone && <span className="mform-error" id="phone-err">{errors.phone}</span>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address <span className="mform-optional">(optional)</span></label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">Address <span className="req">*</span></label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="City, State, Country"
                  value={form.address}
                  onChange={handleChange}
                  aria-required="true"
                  aria-describedby={errors.address ? 'address-err' : undefined}
                />
                {errors.address && <span className="mform-error" id="address-err">{errors.address}</span>}
              </div>

              {/* ── Academic Details ── */}
              <div className="mform-group-header mform-group-header--spaced">
                <span className="mform-group-icon">🎓</span>
                <h2>Academic Details</h2>
              </div>

              <div className="mform-grid-2">
                <div className="form-group">
                  <label htmlFor="bamsYear">Current BAMS Year <span className="req">*</span></label>
                  <select
                    id="bamsYear"
                    name="bamsYear"
                    value={form.bamsYear}
                    onChange={handleChange}
                    aria-required="true"
                    aria-describedby={errors.bamsYear ? 'bamsYear-err' : undefined}
                  >
                    <option value="">Select year</option>
                    {BAMS_YEARS.map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                  {errors.bamsYear && <span className="mform-error" id="bamsYear-err">{errors.bamsYear}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="institution">Your Institution <span className="req">*</span></label>
                  <input
                    type="text"
                    id="institution"
                    name="institution"
                    placeholder="College / University name"
                    value={form.institution}
                    onChange={handleChange}
                    aria-required="true"
                    aria-describedby={errors.institution ? 'institution-err' : undefined}
                  />
                  {errors.institution && <span className="mform-error" id="institution-err">{errors.institution}</span>}
                </div>
              </div>

              {/* ── Struggles & Challenges ── */}
              <div className="mform-group-header mform-group-header--spaced">
                <span className="mform-group-icon">📝</span>
                <h2>Struggles &amp; Challenges</h2>
              </div>

              <div className="form-group">
                <label htmlFor="struggles">
                  Mention your struggles <span className="req">*</span>
                  <span className="mform-hint">Can include academic, practical, and clinical challenges</span>
                </label>
                <textarea
                  id="struggles"
                  name="struggles"
                  rows={5}
                  placeholder="Describe your academic, practical, or clinical struggles honestly. The more detail you share, the better we can help you."
                  value={form.struggles}
                  onChange={handleChange}
                  aria-required="true"
                  aria-describedby={errors.struggles ? 'struggles-err' : undefined}
                />
                {errors.struggles && <span className="mform-error" id="struggles-err">{errors.struggles}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="currentActions">
                  Any actions you are currently adopting to combat your struggle?
                  <span className="mform-hint">Leave blank if none</span>
                </label>
                <textarea
                  id="currentActions"
                  name="currentActions"
                  rows={4}
                  placeholder="e.g. Reading extra references, watching lectures online, self-study groups..."
                  value={form.currentActions}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="whereStuck">
                  If yes, where are you feeling stuck?
                  <span className="mform-hint">What's the specific point or bottleneck?</span>
                </label>
                <textarea
                  id="whereStuck"
                  name="whereStuck"
                  rows={4}
                  placeholder="e.g. Unable to retain Nidan, confused about clinical diagnosis, lack of practicals..."
                  value={form.whereStuck}
                  onChange={handleChange}
                />
              </div>

              {/* ── Mindset ── */}
              <div className="mform-group-header mform-group-header--spaced">
                <span className="mform-group-icon">✅</span>
                <h2>Commitment &amp; Mindset</h2>
              </div>

              <div className="form-group">
                <label htmlFor="agreeHabits">
                  Do you agree that you need to give up certain habits and adopt new ones to improve your life? <span className="req">*</span>
                </label>
                <select
                  id="agreeHabits"
                  name="agreeHabits"
                  value={form.agreeHabits}
                  onChange={handleChange}
                  aria-required="true"
                  aria-describedby={errors.agreeHabits ? 'agreeHabits-err' : undefined}
                >
                  <option value="">Select your answer</option>
                  <option value="Yes, I fully agree and I am ready">Yes, I fully agree and I am ready</option>
                  <option value="Yes, I agree but I need guidance on how">Yes, I agree but I need guidance on how</option>
                  <option value="I am not sure yet">I am not sure yet</option>
                  <option value="No, I prefer to keep my current habits">No, I prefer to keep my current habits</option>
                </select>
                {errors.agreeHabits && <span className="mform-error" id="agreeHabits-err">{errors.agreeHabits}</span>}
              </div>

              {/* ── Other Info ── */}
              <div className="mform-group-header mform-group-header--spaced">
                <span className="mform-group-icon">💬</span>
                <h2>Anything Else?</h2>
              </div>

              <div className="form-group">
                <label htmlFor="otherInfo">
                  Any other information you wish to add
                  <span className="mform-hint">Optional — share anything else that may help us understand your situation</span>
                </label>
                <textarea
                  id="otherInfo"
                  name="otherInfo"
                  rows={4}
                  placeholder="Any other context, questions, or things you'd like Dr. Guleria to know..."
                  value={form.otherInfo}
                  onChange={handleChange}
                />
              </div>

              <div className="mform-footer">
                <p className="mform-privacy">
                  🔒 Your information is shared only with Dr. Guleria via WhatsApp and is kept strictly confidential.
                </p>
                <button type="submit" className="btn mform-submit">
                  <span>💬</span> Submit via WhatsApp
                </button>
              </div>

            </form>
          </div>
        </div>
      </section>
    </main>
  )
}
