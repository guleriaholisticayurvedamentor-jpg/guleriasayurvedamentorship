import { useState } from 'react'
import FeedbackForm from '../components/feedback/FeedbackForm'
import ReviewsList from '../components/feedback/ReviewsList'
import './CustomerFeedback.css'

export default function CustomerFeedback() {
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleFeedbackSuccess = () => {
    setRefreshTrigger(prev => prev + 1)
  }

  return (
    <main className="customer-feedback-page">
      <section className="feedback-hero">
        <div className="container">
          <h1>Customer Feedback</h1>
          <p>Share your experience and read what others have to say</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <FeedbackForm onSuccess={handleFeedbackSuccess} />
        </div>
      </section>

      <section className="section" style={{ background: '#f9fafb' }}>
        <div className="container">
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-subtitle">Real feedback from real customers</p>
          <ReviewsList refreshTrigger={refreshTrigger} />
        </div>
      </section>
    </main>
  )
}
