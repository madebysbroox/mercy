import { useRef, useEffect, useState, useCallback } from 'react'
import Globe from 'react-globe.gl'
import { locations, arcs, categoryColors } from './data/jesusLocations'
import InfoPanel from './components/InfoPanel'
import './App.css'

const GLOBE_IMAGE = '//unpkg.com/three-globe/example/img/earth-blue-marble.jpg'
const BUMP_IMAGE = '//unpkg.com/three-globe/example/img/earth-topology.png'

function App() {
  const globeRef = useRef()
  const containerRef = useRef()
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [selected, setSelected] = useState(null)
  const [hovered, setHovered] = useState(null)

  const updateDimensions = useCallback(() => {
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      })
    }
  }, [])

  useEffect(() => {
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [updateDimensions])

  useEffect(() => {
    if (!globeRef.current) return

    const globe = globeRef.current

    // Configure controls for intuitive interaction
    const controls = globe.controls()
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.3
    controls.enableDamping = true
    controls.dampingFactor = 0.1
    controls.rotateSpeed = 0.8
    controls.zoomSpeed = 0.6
    controls.minDistance = 120
    controls.maxDistance = 500

    // Pause auto-rotate while user interacts
    controls.addEventListener('start', () => {
      controls.autoRotate = false
    })
    controls.addEventListener('end', () => {
      setTimeout(() => {
        controls.autoRotate = true
      }, 4000)
    })

    // Set initial point of view (Holy Land overview)
    globe.pointOfView({ lat: 31.77, lng: 35.23, altitude: 1.8 }, 0)

    // Style the scene
    const scene = globe.scene()
    scene.fog = null
  }, [])

  const handlePointClick = useCallback((point) => {
    setSelected(point)
    if (globeRef.current) {
      globeRef.current.pointOfView(
        { lat: point.lat, lng: point.lng, altitude: 0.6 },
        800
      )
    }
  }, [])

  const handlePointHover = useCallback((point) => {
    setHovered(point)
    document.body.style.cursor = point ? 'pointer' : ''
  }, [])

  const handleClosePanel = useCallback(() => {
    setSelected(null)
  }, [])

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Mercy</h1>
        <p className="subtitle">The journeys of Jesus</p>
      </header>

      <div className="globe-container" ref={containerRef}>
        {dimensions.width > 0 && (
          <Globe
            ref={globeRef}
            width={dimensions.width}
            height={dimensions.height}
            globeImageUrl={GLOBE_IMAGE}
            bumpImageUrl={BUMP_IMAGE}
            backgroundColor="rgba(0,0,0,0)"
            atmosphereColor="#3a5f8a"
            atmosphereAltitude={0.2}
            animateIn={true}
            // Point markers
            pointsData={locations}
            pointLat="lat"
            pointLng="lng"
            pointColor={d => categoryColors[d.category] || '#c9a0dc'}
            pointAltitude={d => (selected && selected.id === d.id ? 0.06 : 0.02)}
            pointRadius={d => {
              if (selected && selected.id === d.id) return 0.35
              if (hovered && hovered.id === d.id) return 0.3
              return 0.2
            }}
            pointLabel={d =>
              `<div style="font-family: 'Cormorant Garamond', Georgia, serif; background: rgba(10,10,18,0.88); padding: 6px 10px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.1); pointer-events: none;">
                <div style="font-size: 13px; font-weight: 400; color: rgba(255,255,255,0.9);">${d.name}</div>
                <div style="font-size: 10px; color: rgba(255,255,255,0.35); letter-spacing: 0.08em; margin-top: 2px;">${d.period}</div>
              </div>`
            }
            onPointClick={handlePointClick}
            onPointHover={handlePointHover}
            pointsTransitionDuration={300}
            // Travel path arcs
            arcsData={arcs}
            arcStartLat="startLat"
            arcStartLng="startLng"
            arcEndLat="endLat"
            arcEndLng="endLng"
            arcColor={() => 'rgba(201, 160, 220, 0.25)'}
            arcAltitudeAutoScale={0.3}
            arcStroke={0.3}
            arcDashLength={0.4}
            arcDashGap={0.2}
            arcDashAnimateTime={2500}
            arcsTransitionDuration={500}
            // Rings on selected point
            ringsData={selected ? [selected] : []}
            ringLat="lat"
            ringLng="lng"
            ringColor={() => t =>
              `rgba(255, 255, 255, ${0.3 * (1 - t)})`
            }
            ringMaxRadius={2.5}
            ringPropagationSpeed={1.5}
            ringRepeatPeriod={1200}
          />
        )}
      </div>

      <InfoPanel location={selected} onClose={handleClosePanel} />

      <footer className="footer">
        <p className="hint">
          {selected
            ? 'Click another point or drag to explore'
            : 'Click a point to learn more \u00b7 Drag to explore'}
        </p>
      </footer>
    </div>
  )
}

export default App
