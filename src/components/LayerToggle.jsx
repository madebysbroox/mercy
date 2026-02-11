import './LayerToggle.css'

const layers = [
  { id: 'jesus', label: 'Journeys of Jesus', icon: '✝' },
  { id: 'marian', label: 'Marian Apparitions', icon: '✦' },
]

function LayerToggle({ activeLayer, onLayerChange }) {
  return (
    <nav className="layer-toggle" aria-label="Data layers">
      {layers.map((layer) => (
        <button
          key={layer.id}
          className={`layer-toggle-btn ${activeLayer === layer.id ? 'active' : ''}`}
          onClick={() => onLayerChange(layer.id)}
          aria-pressed={activeLayer === layer.id}
          title={layer.label}
        >
          <span className="layer-toggle-icon">{layer.icon}</span>
          <span className="layer-toggle-label">{layer.label}</span>
        </button>
      ))}
    </nav>
  )
}

export default LayerToggle
