import { useState, useEffect } from 'react'
import { getActiveMedia } from '../../services/mediaService'
import ImageLightbox from './ImageLightbox'
import './DynamicGallery.css'

export default function DynamicGallery({ mediaType = null }) {
  const [media, setMedia] = useState([])
  const [loading, setLoading] = useState(true)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  useEffect(() => {
    loadMedia()
  }, [mediaType])

  const loadMedia = async () => {
    try {
      setLoading(true)
      const data = await getActiveMedia(mediaType)
      setMedia(data)
    } catch (error) {
      console.error('Error loading media:', error)
    } finally {
      setLoading(false)
    }
  }

  const openLightbox = (index) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const images = media.filter(m => m.media_type === 'image')
  const videos = media.filter(m => m.media_type === 'video')

  if (loading) {
    return (
      <div className="gallery-loading">
        <div className="spinner"></div>
        <p>Loading gallery...</p>
      </div>
    )
  }

  if (media.length === 0) {
    return (
      <div className="gallery-empty">
        <p>No media available at the moment. Check back soon!</p>
      </div>
    )
  }

  return (
    <div className="dynamic-gallery">
      {/* Images Section */}
      {images.length > 0 && (
        <div className="gallery-section">
          {!mediaType && <h3 className="gallery-section-title">Images</h3>}
          <div className="gallery-grid">
            {images.map((item, index) => (
              <div
                key={item.id}
                className="gallery-item"
                onClick={() => openLightbox(index)}
              >
                <img src={item.media_url} alt={item.title || 'Gallery image'} />
                {item.title && (
                  <div className="gallery-item-overlay">
                    <span>{item.title}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Videos Section */}
      {videos.length > 0 && (
        <div className="gallery-section">
          {!mediaType && <h3 className="gallery-section-title">Videos</h3>}
          <div className="gallery-grid">
            {videos.map((item) => (
              <div key={item.id} className="gallery-item video-item">
                <video controls preload="metadata">
                  <source src={item.media_url} type="video/mp4" />
                  <source src={item.media_url} type="video/webm" />
                  Your browser does not support the video tag.
                </video>
                {item.title && (
                  <div className="video-title">
                    <span>{item.title}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lightbox for images */}
      {lightboxOpen && images.length > 0 && (
        <ImageLightbox
          images={images}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
          onNavigate={setLightboxIndex}
        />
      )}
    </div>
  )
}
