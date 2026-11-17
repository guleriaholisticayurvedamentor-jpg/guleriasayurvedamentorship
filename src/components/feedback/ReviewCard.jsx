import StarRating from './StarRating'
import './ReviewCard.css'

export default function ReviewCard({ review }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="review-card">
      <div className="review-card-header">
        <div className="review-avatar">
          {review.customer_name.charAt(0).toUpperCase()}
        </div>
        <div className="review-info">
          <h4>{review.customer_name}</h4>
          {review.customer_role && <span className="review-role">{review.customer_role}</span>}
          <span className="review-date">{formatDate(review.created_at)}</span>
        </div>
      </div>
      
      <div className="review-rating">
        <StarRating rating={review.stars} readonly />
      </div>
      
      <p className="review-text">{review.feedback}</p>
    </div>
  )
}
