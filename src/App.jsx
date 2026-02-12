import { useRef, useEffect, useState, useCallback } from 'react'
import Globe from 'react-globe.gl'
import { locations, arcs, categoryColors } from './data/jesusLocations'
import { apparitions } from './data/marianApparitions'
import { massParts, massArcs, massPartColors } from './data/massData'
import { spreadEvents, spreadArcs, eraColors } from './data/spreadData'
import InfoPanel from './components/InfoPanel'
import LayerToggle from './components/LayerToggle'
import './App.css'

const GLOBE_IMAGE = '//unpkg.com/three-globe/example/img/earth-blue-marble.jpg'
const BUMP_IMAGE = '//unpkg.com/three-globe/example/img/earth-topology.png'

const MARIAN_COLOR = '#6ba4c9'

const SUBTITLES = {
  jesus: 'The journeys of Jesus',
  marian: 'Marian apparitions across the world',
  mass: 'The Holy Mass — origin of every part',
  spread: 'Two thousand years of the Gospel spreading to every nation',
}

const DEFAULT_VIEWS = {
  jesus: { lat: 31.77, lng: 35.23, altitude: 1.8 },
  marian: { lat: 30, lng: 10, altitude: 2.5 },
  mass: { lat: 36, lng: 25, altitude: 1.6 },
  spread: { lat: 20, lng: 20, altitude: 2.8 },
}

const ATMOSPHERE_COLORS = {
  jesus: '#3a5f8a',
  marian: '#4a6e8a',
  mass: '#5a4a3a',
  spread: '#3a5a3a',
}

function App() {
  const globeRef = useRef()
  const containerRef = useRef()
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [activeLayer, setActiveLayer] = useState('jesus')
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
    const controls = globe.controls()
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.3
    controls.enableDamping = true
    controls.dampingFactor = 0.1
    controls.rotateSpeed = 0.8
    controls.zoomSpeed = 0.6
    controls.minDistance = 120
    controls.maxDistance = 500

    controls.addEventListener('start', () => {
      controls.autoRotate = false
    })
    controls.addEventListener('end', () => {
      setTimeout(() => {
        controls.autoRotate = true
      }, 4000)
    })

    globe.pointOfView(DEFAULT_VIEWS.jesus, 0)

    const scene = globe.scene()
    scene.fog = null
  }, [])

  const handleLayerChange = useCallback((layer) => {
    setActiveLayer(layer)
    setSelected(null)
    setHovered(null)
    if (globeRef.current) {
      globeRef.current.pointOfView(DEFAULT_VIEWS[layer], 1000)
    }
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

  // Layer-specific data
  const isJesus = activeLayer === 'jesus'
  const isMarian = activeLayer === 'marian'
  const isMass = activeLayer === 'mass'
  const isSpread = activeLayer === 'spread'

  let pointsData = locations
  let arcsData = arcs
  if (isMarian) {
    pointsData = apparitions
    arcsData = []
  } else if (isMass) {
    pointsData = massParts
    arcsData = massArcs
  } else if (isSpread) {
    pointsData = spreadEvents
    arcsData = spreadArcs
  }

  const getPointColor = (d) => {
    if (isMarian) return MARIAN_COLOR
    if (isMass) return massPartColors[d.section] || '#c4a35a'
    if (isSpread) return eraColors[d.era] || '#c9a0dc'
    return categoryColors[d.category] || '#c9a0dc'
  }

  const getArcColor = (d) => {
    if (isMass) {
      const c = massPartColors[d.section] || '#c4a35a'
      return c + '55'
    }
    if (isSpread) {
      const c = eraColors[d.era] || '#c9a0dc'
      return c + '44'
    }
    return 'rgba(201, 160, 220, 0.25)'
  }

  const getPointLabel = (d) => {
    if (isMarian) {
      return `<div style="font-family: 'Cormorant Garamond', Georgia, serif; background: rgba(10,10,18,0.88); padding: 6px 10px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.1); pointer-events: none;">
        <div style="font-size: 13px; font-weight: 400; color: rgba(255,255,255,0.9);">${d.name}</div>
        <div style="font-size: 10px; color: rgba(255,255,255,0.35); letter-spacing: 0.08em; margin-top: 2px;">${d.location} &middot; ${d.yearDisplay}</div>
      </div>`
    }
    if (isMass) {
      return `<div style="font-family: 'Cormorant Garamond', Georgia, serif; background: rgba(10,10,18,0.88); padding: 6px 10px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.1); pointer-events: none;">
        <div style="font-size: 13px; font-weight: 400; color: rgba(255,255,255,0.9);">${d.name}</div>
        <div style="font-size: 10px; color: rgba(255,255,255,0.35); letter-spacing: 0.08em; margin-top: 2px;">${d.sectionLabel} &middot; ${d.origin}</div>
      </div>`
    }
    if (isSpread) {
      return `<div style="font-family: 'Cormorant Garamond', Georgia, serif; background: rgba(10,10,18,0.88); padding: 6px 10px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.1); pointer-events: none;">
        <div style="font-size: 13px; font-weight: 400; color: rgba(255,255,255,0.9);">${d.name}</div>
        <div style="font-size: 10px; color: rgba(255,255,255,0.35); letter-spacing: 0.08em; margin-top: 2px;">${d.location} &middot; ${d.yearDisplay}</div>
      </div>`
    }
    return `<div style="font-family: 'Cormorant Garamond', Georgia, serif; background: rgba(10,10,18,0.88); padding: 6px 10px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.1); pointer-events: none;">
      <div style="font-size: 13px; font-weight: 400; color: rgba(255,255,255,0.9);">${d.name}</div>
      <div style="font-size: 10px; color: rgba(255,255,255,0.35); letter-spacing: 0.08em; margin-top: 2px;">${d.period}</div>
    </div>`
  }

  const getRingColor = () => (t) => {
    if (isMarian) return `rgba(107, 164, 201, ${0.3 * (1 - t)})`
    if (isMass) return `rgba(196, 163, 90, ${0.3 * (1 - t)})`
    if (isSpread) return `rgba(138, 184, 122, ${0.3 * (1 - t)})`
    return `rgba(255, 255, 255, ${0.3 * (1 - t)})`
  }

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Mercy</h1>
        <p className="subtitle">{SUBTITLES[activeLayer]}</p>
      </header>

      <LayerToggle activeLayer={activeLayer} onLayerChange={handleLayerChange} />

      <div className="globe-container" ref={containerRef}>
        {dimensions.width > 0 && (
          <Globe
            ref={globeRef}
            width={dimensions.width}
            height={dimensions.height}
            globeImageUrl={GLOBE_IMAGE}
            bumpImageUrl={BUMP_IMAGE}
            backgroundColor="rgba(0,0,0,0)"
            atmosphereColor={ATMOSPHERE_COLORS[activeLayer]}
            atmosphereAltitude={0.2}
            animateIn={true}
            // Point markers
            pointsData={pointsData}
            pointLat="lat"
            pointLng="lng"
            pointColor={getPointColor}
            pointAltitude={d => (selected && selected.id === d.id ? 0.06 : 0.02)}
            pointRadius={d => {
              if (selected && selected.id === d.id) return 0.35
              if (hovered && hovered.id === d.id) return 0.3
              return isMarian ? 0.25 : isSpread ? 0.25 : 0.2
            }}
            pointLabel={getPointLabel}
            onPointClick={handlePointClick}
            onPointHover={handlePointHover}
            pointsTransitionDuration={300}
            // Travel path arcs
            arcsData={arcsData}
            arcStartLat="startLat"
            arcStartLng="startLng"
            arcEndLat="endLat"
            arcEndLng="endLng"
            arcColor={getArcColor}
            arcAltitudeAutoScale={isSpread ? 0.35 : isMass ? 0.25 : 0.3}
            arcStroke={isMass ? 0.4 : isSpread ? 0.35 : 0.3}
            arcDashLength={0.4}
            arcDashGap={0.2}
            arcDashAnimateTime={isSpread ? 3500 : isMass ? 3000 : 2500}
            arcsTransitionDuration={500}
            // Rings on selected point
            ringsData={selected ? [selected] : []}
            ringLat="lat"
            ringLng="lng"
            ringColor={getRingColor}
            ringMaxRadius={isMarian ? 3.5 : isSpread ? 4 : 2.5}
            ringPropagationSpeed={1.5}
            ringRepeatPeriod={1200}
          />
        )}
      </div>

      <InfoPanel location={selected} layer={activeLayer} onClose={handleClosePanel} />

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
