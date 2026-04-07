import { Link } from 'react-router-dom'
import './Card.css'

export default function Card({ icon, title, subtitle, description, link }) {
  return (
    <div className="card">
      {icon && <div className="card__icon">{icon}</div>}
      <h3 className="card__title">{title}</h3>
      {subtitle && <p className="card__subtitle">{subtitle}</p>}
      {description && <p className="card__desc">{description}</p>}
      {link && (
        <Link to={link} className="btn btn-outline card__btn">
          View Details
        </Link>
      )}
    </div>
  )
}
