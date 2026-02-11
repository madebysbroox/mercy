import { categoryColors } from '../data/jesusLocations'
import './InfoPanel.css'

const MARIAN_ACCENT = '#6ba4c9'

function InfoPanel({ location, layer, onClose }) {
  if (!location) return null

  if (layer === 'marian') {
    return (
      <div className="info-panel">
        <button className="info-panel-close" onClick={onClose} aria-label="Close">
          &times;
        </button>
        <div className="info-panel-accent" style={{ backgroundColor: MARIAN_ACCENT }} />
        <p className="info-panel-period">{location.yearDisplay}</p>
        <h2 className="info-panel-title">{location.name}</h2>
        <p className="info-panel-location-line">{location.location}</p>
        <p className="info-panel-description">{location.description}</p>
        <div className="info-panel-meta">
          <p className="info-panel-visionary">{location.visionary}</p>
          <p className="info-panel-approval">{location.approval}</p>
        </div>
      </div>
    )
  }

  // Default: Jesus's travels layer
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
