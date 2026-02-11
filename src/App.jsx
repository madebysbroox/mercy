import { useRef, useEffect, useState, useCallback } from 'react'
import Globe from 'react-globe.gl'
import './App.css'

const GLOBE_IMAGE = '//unpkg.com/three-globe/example/img/earth-blue-marble.jpg'
const BUMP_IMAGE = '//unpkg.com/three-globe/example/img/earth-topology.png'

function App() {
  const globeRef = useRef()
  const containerRef = useRef()
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

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
    controls.autoRotateSpeed = 0.4
    controls.enableDamping = true
    controls.dampingFactor = 0.1
    controls.rotateSpeed = 0.8
    controls.zoomSpeed = 0.6
    controls.minDistance = 150
    controls.maxDistance = 500

    // Pause auto-rotate while user interacts
    controls.addEventListener('start', () => {
      controls.autoRotate = false
    })
    controls.addEventListener('end', () => {
      // Resume auto-rotate after interaction ends
      setTimeout(() => {
        controls.autoRotate = true
      }, 3000)
    })

    // Set initial point of view (centered on Jerusalem)
    globe.pointOfView({ lat: 31.77, lng: 35.23, altitude: 2.2 }, 0)

    // Style the scene
    const scene = globe.scene()
    scene.fog = null
  }, [])

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Mercy</h1>
        <p className="subtitle">A history of grace across the world</p>
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
          />
        )}
      </div>

      <footer className="footer">
        <p className="hint">Drag to explore &middot; Scroll to zoom</p>
      </footer>
    </div>
  )
}

export default App
