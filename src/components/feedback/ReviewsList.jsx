import { useState, useEffect } from 'react'
import ReviewCard from './ReviewCard'
import { getPublishedFeedback, getFeedbackStats, subscribeTofeedback } from '../../services/feedbackService'
import './ReviewsList.css'

export default function ReviewsList({ refreshTrigger }) {
  const [reviews, setReviews] = useState([])
  const [stats, setStats] = useState({ totalReviews: 0, averageRating: 0 })
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [offset, setOffset] = useState(0)
  const limit = 6

  const loadReviews = async (isLoadMore = false) => {
    try {
      if (isLoadMore) {
        setLoadingMore(true)
      } else {
        setLoading(true)
      }

      const currentOffset = isLoadMore ? offset : 0
      const data = await getPublishedFeedback(limit, currentOffset)
      
      if (isLoadMore) {
        setReviews(prev => [...prev, ...data])
      } else {
        setReviews(data)
      }

      setHasMore(data.length === limit)
      setOffset(currentOffset + data.length)
    } catch (error) {
      console.error('Error loading reviews:', error)
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }

  const loadStats = async () => {
    try {
      const statsData = await getFeedbackStats()
      setStats(statsData)
    } catch (error) {
      console.error('Error loading stats:', error)
    }
  }

  useEffect(() => {
    loadReviews()
    loadStats()

    // Subscribe to realtime updates
    const subscription = subscribeTofeedback((payload) => {
      if (payload.new) {
        setReviews(prev => [payload.new, ...prev])
        loadStats() // Refresh stats when new review added
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [refreshTrigger])

  const handleLoadMore = () => {
    loadReviews(true)
  }

  if (loading) {
    return (
      <div className="reviews-loading">
        <div className="spinner"></div>
        <p>Loading reviews...</p>
      </div>
    )
  }

  return (
    <div className="reviews-list-container">
      <div className="reviews-stats">
        <div className="stat-card">
          <div className="stat-value">{stats.totalReviews}</div>
          <div className="stat-label">Total Reviews</div>
        </div>
        <div className="stat-card highlight">
          <div className="stat-value">
            {stats.averageRating.toFixed(1)} <span className="star-icon">★</span>
          </div>
          <div className="stat-label">Average Rating</div>
        </div>
      </div>

      {reviews.length === 0 ? (
        <div className="reviews-empty">
          <p>No reviews yet. Be the first to share your experience!</p>
        </div>
      ) : (
        <>
          <div className="reviews-grid">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>

          {hasMore && (
            <div className="reviews-load-more">
              <button
                onClick={handleLoadMore}
                className="btn btn-outline"
                disabled={loadingMore}
              >
                {loadingMore ? 'Loading...' : 'Load More Reviews'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
