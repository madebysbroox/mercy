import { categoryColors } from '../data/jesusLocations'
import './InfoPanel.css'

function InfoPanel({ location, onClose }) {
  if (!location) return null

  const accentColor = categoryColors[location.category] || '#c9a0dc'

  return (
    <div className="info-panel">
      <button className="info-panel-close" onClick={onClose} aria-label="Close">
        &times;
      </button>
      <div className="info-panel-accent" style={{ backgroundColor: accentColor }} />
      <p className="info-panel-period">{location.period}</p>
      <h2 className="info-panel-title">{location.name}</h2>
      <p className="info-panel-description">{location.description}</p>
      <p className="info-panel-scripture">{location.scripture}</p>
    </div>
  )
}

export default InfoPanel
