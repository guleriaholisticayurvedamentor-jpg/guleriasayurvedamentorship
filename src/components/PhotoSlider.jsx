import { useState, useEffect } from 'react'
import './PhotoSlider.css'

const photos = [
  '/images/WhatsApp Image 2026-04-07 at 2.49.20 PM (1).jpeg',
  '/images/WhatsApp Image 2026-04-07 at 2.49.20 PM.jpeg',
  '/images/WhatsApp Image 2026-04-07 at 3.43.07 PM.jpeg',
  '/images/WhatsApp Image 2026-04-07 at 3.45.39 PM.jpeg',
]

export default function PhotoSlider() {
  const [current, setCurrent] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % photos.length)
        setVisible(true)
      }, 500)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="mentor-photo">
      <div className={`mentor-photo__frame ${visible ? 'visible' : 'hidden'}`}>
        <img
          src={photos[current]}
          alt="Dr. Praveen Guleria"
        />
      </div>
      <div className="mentor-photo__dots">
        {photos.map((_, i) => (
          <span key={i} className={`mentor-photo__dot ${i === current ? 'active' : ''}`} />
        ))}
      </div>
    </div>
  )
}
