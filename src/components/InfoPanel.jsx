import { useState } from 'react'
import { categoryColors } from '../data/jesusLocations'
import { massPartColors } from '../data/massData'
import { eraColors } from '../data/spreadData'
import './InfoPanel.css'

const MARIAN_ACCENT = '#6ba4c9'

function cleanUrl(url) {
  try {
    const u = new URL(url)
    const path = u.pathname.replace(/\/$/, '')
    return u.host + decodeURIComponent(path)
  } catch {
    return url
  }
}

function MoreLink({ link }) {
  const [hovered, setHovered] = useState(false)
  if (!link) return null
  return (
    <div
      className="info-panel-more-wrap"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="info-panel-more"
      >
        more&hellip;
      </a>
      {hovered && (
        <div className="info-panel-link-preview">
          <img
            className="info-panel-link-favicon"
            src={`https://www.google.com/s2/favicons?sz=32&domain=${new URL(link).hostname}`}
            alt=""
            width="16"
            height="16"
          />
          <span className="info-panel-link-url">{cleanUrl(link)}</span>
        </div>
      )}
    </div>
  )
}

function InfoPanel({ location, layer, onClose }) {
  if (!location) return null

  if (layer === 'spread') {
    const accentColor = eraColors[location.era] || '#c9a0dc'
    return (
      <div className="info-panel">
        <button className="info-panel-close" onClick={onClose} aria-label="Close">
          &times;
        </button>
        <div className="info-panel-accent" style={{ backgroundColor: accentColor }} />
        <p className="info-panel-period">
          <span className="info-panel-section-badge" style={{ borderColor: accentColor, color: accentColor }}>
            {location.eraLabel}
          </span>
          {' '}{location.yearDisplay}
        </p>
        <h2 className="info-panel-title">{location.name}</h2>
        <p className="info-panel-location-line">{location.location}</p>
        <p className="info-panel-description">{location.description}</p>
        <div className="info-panel-meta">
          <p className="info-panel-visionary">{location.keyFigure}</p>
          {location.scripture && (
            <p className="info-panel-scripture">{location.scripture}</p>
          )}
        </div>
        <MoreLink link={location.link} />
      </div>
    )
  }

  if (layer === 'mass') {
    const accentColor = massPartColors[location.section] || '#c4a35a'
    return (
      <div className="info-panel">
        <button className="info-panel-close" onClick={onClose} aria-label="Close">
          &times;
        </button>
        <div className="info-panel-accent" style={{ backgroundColor: accentColor }} />
        <p className="info-panel-period">
          <span className="info-panel-section-badge" style={{ borderColor: accentColor, color: accentColor }}>
            {location.sectionLabel}
          </span>
          {' '}{location.origin} &middot; {location.century}
        </p>
        <h2 className="info-panel-title">{location.name}</h2>
        <p className="info-panel-description">{location.description}</p>
        <p className="info-panel-liturgical">{location.liturgicalText}</p>
        <p className="info-panel-scripture">{location.scripture}</p>
        <MoreLink link={location.link} />
      </div>
    )
  }

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
        <MoreLink link={location.link} />
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
      <MoreLink link={location.link} />
    </div>
  )
}

export default InfoPanel
