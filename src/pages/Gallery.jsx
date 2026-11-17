import DynamicGallery from '../components/gallery/DynamicGallery'
import './Gallery.css'

export default function Gallery() {
  return (
    <main className="gallery-page">
      <section className="gallery-hero">
        <div className="container">
          <h1>Gallery</h1>
          <p>Moments, events, and memories from our mentorship journey</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <DynamicGallery />
        </div>
      </section>
    </main>
  )
}
