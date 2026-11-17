import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminLogout } from '../../services/adminService'
import { getFeedbackStats } from '../../services/feedbackService'
import { getMediaStats } from '../../services/mediaService'
import { getAllFeedback, deleteFeedback, updateFeedbackStatus } from '../../services/feedbackService'
import { getAllMedia, deleteMedia, updateMediaVisibility, uploadMediaFile, createMediaRecord } from '../../services/mediaService'
import StarRating from '../../components/feedback/StarRating'
import './AdminDashboard.css'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [stats, setStats] = useState({
    totalReviews: 0,
    averageRating: 0,
    totalImages: 0,
    totalVideos: 0,
    activeMedia: 0,
    hiddenMedia: 0
  })
  const [reviews, setReviews] = useState([])
  const [media, setMedia] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    loadData()
  }, [activeTab])

  const loadData = async () => {
    try {
      setLoading(true)
      const [feedbackStats, mediaStats] = await Promise.all([
        getFeedbackStats(),
        getMediaStats()
      ])
      
      setStats({ ...feedbackStats, ...mediaStats })

      if (activeTab === 'feedback') {
        const feedbackData = await getAllFeedback()
        setReviews(feedbackData)
      } else if (activeTab === 'media') {
        const mediaData = await getAllMedia()
        setMedia(mediaData)
      }
    } catch (error) {
      console.error('Error loading data:', error)
      alert('Error loading data: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await adminLogout()
      navigate('/admin/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const handleDeleteReview = async (id) => {
    if (!confirm('Are you sure you want to delete this review?')) return
    
    try {
      await deleteFeedback(id)
      await loadData()
      alert('Review deleted successfully')
    } catch (error) {
      alert('Error deleting review: ' + error.message)
    }
  }

  const handleToggleReviewStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'published' ? 'hidden' : 'published'
    try {
      await updateFeedbackStatus(id, newStatus)
      await loadData()
    } catch (error) {
      alert('Error updating status: ' + error.message)
    }
  }

  const handleMediaUpload = async (event, mediaType) => {
    const files = Array.from(event.target.files)
    if (files.length === 0) return

    setUploading(true)
    const bucket = mediaType === 'image' ? 'website-images' : 'website-videos'

    try {
      let successCount = 0
      let failedCount = 0

      for (const file of files) {
        try {
          // Upload file
          const { path, url } = await uploadMediaFile(file, bucket)
          
          // Create database record
          await createMediaRecord({
            title: file.name.split('.')[0],
            media_url: url,
            storage_path: path,
            media_type: mediaType,
            is_active: true,
            display_order: 0
          })
          
          successCount++
        } catch (error) {
          console.error(`Failed to upload ${file.name}:`, error)
          failedCount++
        }
      }

      if (successCount > 0) {
        alert(`✓ Successfully uploaded ${successCount} file(s)` + (failedCount > 0 ? `\n✗ Failed to upload ${failedCount} file(s)` : ''))
        await loadData()
      } else {
        alert('✗ All uploads failed. Please check:\n1. Storage buckets exist (website-images, website-videos)\n2. Storage policies allow uploads\n3. File format is correct')
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Upload error: ' + error.message + '\n\nPlease run the fix-storage-upload-policies.sql script in Supabase.')
    } finally {
      setUploading(false)
      event.target.value = ''
    }
  }

  const handleDeleteMedia = async (item) => {
    if (!confirm('Are you sure you want to delete this media?')) return

    try {
      const bucket = item.media_type === 'image' ? 'website-images' : 'website-videos'
      await deleteMedia(item.id, item.storage_path, bucket)
      await loadData()
      alert('Media deleted successfully')
    } catch (error) {
      alert('Error deleting media: ' + error.message)
    }
  }

  const handleToggleMediaVisibility = async (id, currentStatus) => {
    try {
      await updateMediaVisibility(id, !currentStatus)
      await loadData()
    } catch (error) {
      alert('Error updating visibility: ' + error.message)
    }
  }

  const filteredReviews = reviews.filter(r =>
    r.customer_name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="admin-dashboard">
      <button 
        className="mobile-menu-toggle"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <aside className={`admin-sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="admin-logo">
          <h2>Admin Panel</h2>
        </div>
        <nav className="admin-nav">
          <button
            className={activeTab === 'overview' ? 'active' : ''}
            onClick={() => { setActiveTab('overview'); setMobileMenuOpen(false); }}
          >
            📊 Overview
          </button>
          <button
            className={activeTab === 'feedback' ? 'active' : ''}
            onClick={() => { setActiveTab('feedback'); setMobileMenuOpen(false); }}
          >
            💬 Feedback
          </button>
          <button
            className={activeTab === 'media' ? 'active' : ''}
            onClick={() => { setActiveTab('media'); setMobileMenuOpen(false); }}
          >
            🖼️ Media
          </button>
        </nav>
        <button className="admin-logout" onClick={handleLogout}>
          🚪 Logout
        </button>
      </aside>

      {mobileMenuOpen && (
        <div 
          className="mobile-overlay" 
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <main className="admin-content">
        <header className="admin-header">
          <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
        </header>

        {activeTab === 'overview' && (
          <div className="stats-grid">
            <div className="stat-box">
              <div className="stat-value">{stats.totalReviews}</div>
              <div className="stat-label">Total Reviews</div>
            </div>
            <div className="stat-box highlight">
              <div className="stat-value">{stats.averageRating.toFixed(1)} ★</div>
              <div className="stat-label">Avg Rating</div>
            </div>
            <div className="stat-box">
              <div className="stat-value">{stats.totalImages}</div>
              <div className="stat-label">Images</div>
            </div>
            <div className="stat-box">
              <div className="stat-value">{stats.totalVideos}</div>
              <div className="stat-label">Videos</div>
            </div>
            <div className="stat-box">
              <div className="stat-value">{stats.activeMedia}</div>
              <div className="stat-label">Active Media</div>
            </div>
            <div className="stat-box">
              <div className="stat-value">{stats.hiddenMedia}</div>
              <div className="stat-label">Hidden Media</div>
            </div>
          </div>
        )}

        {activeTab === 'feedback' && (
          <div className="admin-section">
            <div className="admin-toolbar">
              <input
                type="text"
                placeholder="Search by customer name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            {loading ? (
              <div className="admin-loading">Loading...</div>
            ) : (
              <div className="table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Feedback</th>
                      <th>Rating</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReviews.map((review) => (
                      <tr key={review.id}>
                        <td>{review.customer_name}</td>
                        <td className="feedback-text">{review.feedback}</td>
                        <td>
                          <StarRating rating={review.stars} readonly />
                        </td>
                        <td>{new Date(review.created_at).toLocaleDateString()}</td>
                        <td>
                          <span className={`status-badge ${review.status}`}>
                            {review.status}
                          </span>
                        </td>
                        <td>
                          <button
                            className="btn-icon"
                            onClick={() => handleToggleReviewStatus(review.id, review.status)}
                            title={review.status === 'published' ? 'Hide' : 'Publish'}
                          >
                            {review.status === 'published' ? '👁️' : '🔒'}
                          </button>
                          <button
                            className="btn-icon btn-danger"
                            onClick={() => handleDeleteReview(review.id)}
                            title="Delete"
                          >
                            🗑️
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'media' && (
          <div className="admin-section">
            <div className="media-upload-area">
              <h3>Upload Media</h3>
              <p className="upload-description">Upload images and videos to display in your gallery</p>
              
              <div className="upload-buttons">
                <label className="upload-btn upload-btn-image" disabled={uploading}>
                  <span className="upload-icon">📷</span>
                  <span className="upload-text">
                    <strong>Upload Images</strong>
                    <small>JPG, PNG, WEBP</small>
                  </span>
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    multiple
                    onChange={(e) => handleMediaUpload(e, 'image')}
                    disabled={uploading}
                  />
                </label>
                
                <label className="upload-btn upload-btn-video" disabled={uploading}>
                  <span className="upload-icon">🎥</span>
                  <span className="upload-text">
                    <strong>Upload Videos</strong>
                    <small>MP4, WEBM</small>
                  </span>
                  <input
                    type="file"
                    accept="video/mp4,video/webm"
                    multiple
                    onChange={(e) => handleMediaUpload(e, 'video')}
                    disabled={uploading}
                  />
                </label>
              </div>
              
              {uploading && (
                <div className="upload-progress">
                  <div className="spinner"></div>
                  <span>Uploading files...</span>
                </div>
              )}
            </div>

            <div className="media-list-section">
              <div className="section-header">
                <h3>Media Library</h3>
                <span className="media-count">{media.length} items</span>
              </div>

              {loading ? (
                <div className="admin-loading">
                  <div className="spinner"></div>
                  <p>Loading media...</p>
                </div>
              ) : media.length === 0 ? (
                <div className="empty-state">
                  <span className="empty-icon">📁</span>
                  <h4>No media uploaded yet</h4>
                  <p>Upload images and videos to get started</p>
                </div>
              ) : (
                <div className="media-grid">
                  {media.map((item) => (
                    <div key={item.id} className="media-card">
                      <div className="media-preview">
                        {item.media_type === 'image' ? (
                          <img src={item.media_url} alt={item.title} loading="lazy" />
                        ) : (
                          <video src={item.media_url} controls />
                        )}
                        <div className="media-overlay">
                          <button
                            className="btn-icon btn-icon-white"
                            onClick={() => handleToggleMediaVisibility(item.id, item.is_active)}
                            title={item.is_active ? 'Hide from gallery' : 'Show in gallery'}
                          >
                            {item.is_active ? '👁️' : '🔒'}
                          </button>
                          <button
                            className="btn-icon btn-icon-white btn-danger"
                            onClick={() => handleDeleteMedia(item)}
                            title="Delete"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                      <div className="media-info">
                        <h4 title={item.title}>{item.title || 'Untitled'}</h4>
                        <span className={`status-badge ${item.is_active ? 'published' : 'hidden'}`}>
                          {item.is_active ? '● Active' : '● Hidden'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
