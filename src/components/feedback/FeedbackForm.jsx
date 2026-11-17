import { useState } from 'react'
import StarRating from './StarRating'
import { submitFeedback } from '../../services/feedbackService'
import './FeedbackForm.css'

export default function FeedbackForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    customerName: '',
    customerRole: '',
    feedback: '',
    stars: 0
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    // Validation
    if (!formData.customerName.trim()) {
      setError('Please enter your name')
      return
    }
    if (!formData.customerRole.trim()) {
      setError('Please enter your role/occupation')
      return
    }
    if (!formData.feedback.trim()) {
      setError('Please enter your feedback')
      return
    }
    if (formData.stars === 0) {
      setError('Please select a star rating')
      return
    }

    setLoading(true)

    try {
      await submitFeedback(
        formData.customerName.trim(),
        formData.customerRole.trim(),
        formData.feedback.trim(),
        formData.stars
      )

      setSuccess(true)
      setFormData({ customerName: '', customerRole: '', feedback: '', stars: 0 })
      
      if (onSuccess) {
        onSuccess()
      }

      setTimeout(() => setSuccess(false), 5000)
    } catch (err) {
      console.error('Error submitting feedback:', err)
      setError(err.message || 'Failed to submit feedback. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="feedback-form-container">
      <h3>Share Your Experience</h3>
      <p className="feedback-form-subtitle">Your feedback helps us improve and inspire others</p>

      <form onSubmit={handleSubmit} className="feedback-form">
        <div className="form-group">
          <label htmlFor="customerName">Your Name *</label>
          <input
            type="text"
            id="customerName"
            value={formData.customerName}
            onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
            placeholder="Enter your name"
            disabled={loading}
            maxLength={100}
          />
        </div>

        <div className="form-group">
          <label htmlFor="customerRole">Your Role/Occupation *</label>
          <input
            type="text"
            id="customerRole"
            value={formData.customerRole}
            onChange={(e) => setFormData({ ...formData, customerRole: e.target.value })}
            placeholder="e.g., Ayurveda Student, BAMS Graduate, Medical Practitioner"
            disabled={loading}
            maxLength={100}
          />
        </div>

        <div className="form-group">
          <label htmlFor="feedback">Your Feedback *</label>
          <textarea
            id="feedback"
            value={formData.feedback}
            onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
            placeholder="Share your thoughts, experience, or testimonial..."
            rows={5}
            disabled={loading}
            maxLength={1000}
          />
          <small>{formData.feedback.length}/1000 characters</small>
        </div>

        <div className="form-group">
          <label>Your Rating *</label>
          <StarRating
            rating={formData.stars}
            onRatingChange={(rating) => setFormData({ ...formData, stars: rating })}
            readonly={loading}
          />
        </div>

        {error && <div className="feedback-error">{error}</div>}
        {success && <div className="feedback-success">✓ Thank you for your feedback! It's now live on the website.</div>}

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </form>
    </div>
  )
}
