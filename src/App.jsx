import { useRef, useEffect, useState, useCallback, useMemo } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { locations, arcs, categoryColors } from './data/jesusLocations'
import { apparitions, marianArcs } from './data/marianApparitions'
import { massParts, massArcs, massPartColors } from './data/massData'
import { spreadEvents, spreadArcs, eraColors } from './data/spreadData'
import InfoPanel from './components/InfoPanel'
import LayerToggle from './components/LayerToggle'
import Search from './components/Search'
import Timeline from './components/Timeline'
import './App.css'

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN

const MARIAN_COLOR = '#6ba4c9'

const SUBTITLES = {
  jesus: 'The journeys of Jesus',
  marian: 'Marian apparitions across the world',
  mass: 'The Holy Mass — origin of every part',
  spread: 'Two thousand years of the Gospel spreading to every nation',
}

const DEFAULT_VIEWS = {
  jesus: { center: [35.23, 31.77], zoom: 5.5 },
  marian: { center: [10, 30], zoom: 1.5 },
  mass: { center: [25, 36], zoom: 4 },
  spread: { center: [20, 20], zoom: 1.2 },
}

const SELECTED_ZOOM = 8

function getPointColor(d, layer) {
  if (layer === 'marian') return MARIAN_COLOR
  if (layer === 'mass') return massPartColors[d.section] || '#c4a35a'
  if (layer === 'spread') return eraColors[d.era] || '#c9a0dc'
  return categoryColors[d.category] || '#c9a0dc'
}

function getArcColor(d, layer) {
  if (layer === 'marian') return MARIAN_COLOR
  if (layer === 'mass') return massPartColors[d.section] || '#c4a35a'
  if (layer === 'spread') return eraColors[d.era] || '#c9a0dc'
  return 'rgba(201, 160, 220, 0.6)'
}

const TRAVELER_MIN_MS = 45000
const TRAVELER_DEG_PER_SEC = 8

function buildWaypoints(arcData) {
  if (!arcData.length) return []
  const pts = [[arcData[0].startLng, arcData[0].startLat]]
  for (const a of arcData) pts.push([a.endLng, a.endLat])
  return pts
}

function computeCumulativeDist(waypoints) {
  const d = [0]
  for (let i = 1; i < waypoints.length; i++) {
    const dx = waypoints[i][0] - waypoints[i - 1][0]
    const dy = waypoints[i][1] - waypoints[i - 1][1]
    d.push(d[i - 1] + Math.sqrt(dx * dx + dy * dy))
  }
  return d
}

function lerpOnPath(waypoints, cumDist, t) {
  const total = cumDist[cumDist.length - 1]
  const target = t * total
  let i = 1
  while (i < cumDist.length - 1 && cumDist[i] < target) i++
  const segLen = cumDist[i] - cumDist[i - 1]
  const segT = segLen > 0 ? (target - cumDist[i - 1]) / segLen : 0
  return [
    waypoints[i - 1][0] + (waypoints[i][0] - waypoints[i - 1][0]) * segT,
    waypoints[i - 1][1] + (waypoints[i][1] - waypoints[i - 1][1]) * segT,
  ]
}

function getTravelerColor(layer) {
  if (layer === 'marian') return MARIAN_COLOR
  if (layer === 'mass') return '#c4a35a'
  if (layer === 'spread') return '#c9a0dc'
  return '#c9a0dc'
}

function buildPointsGeoJSON(points, layer, opacity = 1) {
  return {
    type: 'FeatureCollection',
    features: points.map((d, index) => ({
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [d.lng, d.lat] },
      properties: { 
        ...d, 
        _color: getPointColor(d, layer),
        _opacity: opacity,
        _index: index
      },
    })),
  }
}

function buildArcsGeoJSON(arcData, layer, opacity = 1) {
  return {
    type: 'FeatureCollection',
    features: arcData.map((d, index) => ({
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [
          [d.startLng, d.startLat],
          [d.endLng, d.endLat],
        ],
      },
      properties: { 
        _color: getArcColor(d, layer),
        _opacity: opacity,
        _index: index
      },
    })),
  }
}

function getTooltipHTML(d, layer) {
  const base = `font-family: 'Cormorant Garamond', Georgia, serif; background: rgba(10,10,18,0.92); padding: 8px 12px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.1); pointer-events: none;`
  const title = `font-size: 14px; font-weight: 400; color: rgba(255,255,255,0.9);`
  const sub = `font-size: 11px; color: rgba(255,255,255,0.4); letter-spacing: 0.08em; margin-top: 3px;`

  let subtitle = d.period || ''
  if (layer === 'marian') subtitle = `${d.location} · ${d.yearDisplay}`
  else if (layer === 'mass') subtitle = `${d.sectionLabel} · ${d.origin}`
  else if (layer === 'spread') subtitle = `${d.location} · ${d.yearDisplay}`

  return `<div style="${base}"><div style="${title}">${d.name}</div><div style="${sub}">${subtitle}</div></div>`
}

function App() {
  const mapContainer = useRef(null)
  const mapRef = useRef(null)
  const popupRef = useRef(null)
  const rotationRef = useRef(null)
  const userInteractingRef = useRef(false)
  const hasZoomedRef = useRef(false)
  const resumeTimeoutRef = useRef(null)
  const travelerRafRef = useRef(null)

  const [activeLayer, setActiveLayer] = useState('jesus')
  const [selected, setSelected] = useState(null)
  const [mapReady, setMapReady] = useState(false)
  const [layerTransitioning, setLayerTransitioning] = useState(false)
  const [initialLoad, setInitialLoad] = useState(true)
  const [timeRange, setTimeRange] = useState(null)
  const prevLayerRef = useRef(null)

  // Compute base layer data
  const { basePointsData, arcsData } = useMemo(() => {
    if (activeLayer === 'marian') return { basePointsData: apparitions, arcsData: marianArcs }
    if (activeLayer === 'mass') return { basePointsData: massParts, arcsData: massArcs }
    if (activeLayer === 'spread') return { basePointsData: spreadEvents, arcsData: spreadArcs }
    return { basePointsData: locations, arcsData: arcs }
  }, [activeLayer])

  // Filter data by time range
  const pointsData = useMemo(() => {
    if (!timeRange || !basePointsData.length) {
      return basePointsData
    }

    const [startYear, endYear] = timeRange
    return basePointsData.filter(point => {
      if (!point.year || isNaN(point.year)) return true // Include items without years
      return point.year >= startYear && point.year <= endYear
    })
  }, [basePointsData, timeRange])

  // Handle timeline range changes
  const handleTimeRangeChange = useCallback((newTimeRange) => {
    setTimeRange(newTimeRange)
  }, [])

  // Reset timeline when layer changes
  useEffect(() => {
    setTimeRange(null)
  }, [activeLayer])

  // Initialize map
  useEffect(() => {
    if (mapRef.current) return

    mapboxgl.accessToken = MAPBOX_TOKEN

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        name: 'Mercy Dark',
        sources: {
          'raster-tiles': {
            type: 'raster',
            tiles: [
              'https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=' + MAPBOX_TOKEN,
            ],
            tileSize: 256,
          },
        },
        layers: [
          {
            id: 'background',
            type: 'background',
            paint: { 'background-color': '#0a0a12' },
          },
          {
            id: 'satellite',
            type: 'raster',
            source: 'raster-tiles',
            paint: {
              'raster-brightness-max': 0.35,
              'raster-contrast': 0.2,
              'raster-saturation': -0.5,
              'raster-fade-duration': 300,
            },
          },
        ],
        glyphs: 'mapbox://fonts/mapbox/{fontstack}/{range}.pbf',
      },
      center: DEFAULT_VIEWS.jesus.center,
      zoom: DEFAULT_VIEWS.jesus.zoom,
      projection: 'globe',
      maxZoom: 16,
      minZoom: 1,
      attributionControl: false,
    })

    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'bottom-right')

    map.on('style.load', () => {
      map.setFog({
        color: '#0a0a12',
        'high-color': '#1a1a2e',
        'horizon-blend': 0.08,
        'space-color': '#0a0a12',
        'star-intensity': 0.25,
      })
    })

    map.on('load', () => {
      // Points source & layer
      map.addSource('points', {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: [] },
        buffer: 512,
      })
      map.addLayer({
        id: 'points-glow',
        type: 'circle',
        source: 'points',
        paint: {
          'circle-radius': 12,
          'circle-color': ['get', '_color'],
          'circle-opacity': ['*', ['coalesce', ['get', '_opacity'], 1], 0.15],
          'circle-blur': 1,
        },
      })
      map.addLayer({
        id: 'points-circle',
        type: 'circle',
        source: 'points',
        paint: {
          'circle-radius': 5,
          'circle-color': ['get', '_color'],
          'circle-opacity': ['*', ['coalesce', ['get', '_opacity'], 1], 0.9],
          'circle-stroke-width': 1.5,
          'circle-stroke-color': 'rgba(255,255,255,0.25)',
          'circle-stroke-opacity': ['coalesce', ['get', '_opacity'], 1],
        },
      })

      // Arcs source & layer
      map.addSource('arcs', {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: [] },
      })
      map.addLayer({
        id: 'arcs-line',
        type: 'line',
        source: 'arcs',
        paint: {
          'line-color': ['get', '_color'],
          'line-opacity': ['*', ['coalesce', ['get', '_opacity'], 1], 0.4],
          'line-width': 1.5,
          'line-dasharray': [2, 2],
        },
        layout: {
          'line-cap': 'round',
          'line-join': 'round',
        },
      })

      // Selected ring source & layer
      map.addSource('selected-ring', {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: [] },
        buffer: 512,
      })
      map.addLayer({
        id: 'selected-ring-layer',
        type: 'circle',
        source: 'selected-ring',
        paint: {
          'circle-radius': 18,
          'circle-color': 'transparent',
          'circle-stroke-width': 2,
          'circle-stroke-color': ['get', '_color'],
          'circle-stroke-opacity': 0.5,
        },
      })

      // Traveling light source & layers
      map.addSource('traveler', {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: [] },
        buffer: 512,
      })
      map.addLayer({
        id: 'traveler-glow',
        type: 'circle',
        source: 'traveler',
        paint: {
          'circle-radius': 20,
          'circle-color': ['get', '_color'],
          'circle-opacity': 0.3,
          'circle-blur': 1,
        },
      })
      map.addLayer({
        id: 'traveler-dot',
        type: 'circle',
        source: 'traveler',
        paint: {
          'circle-radius': 3,
          'circle-color': '#ffffff',
          'circle-opacity': 0.9,
        },
      })

      mapRef.current = map
      setMapReady(true)
    })

    // Hover cursor
    map.on('mouseenter', 'points-circle', () => {
      map.getCanvas().style.cursor = 'pointer'
    })
    map.on('mouseleave', 'points-circle', () => {
      map.getCanvas().style.cursor = ''
      if (popupRef.current) {
        popupRef.current.remove()
        popupRef.current = null
      }
    })

    // Hover tooltip
    map.on('mousemove', 'points-circle', (e) => {
      if (!e.features.length) return
      const props = e.features[0].properties
      // Parse stringified nested properties
      const d = { ...props }
      const html = getTooltipHTML(d, activeLayer)

      if (popupRef.current) {
        popupRef.current.setLngLat(e.lngLat).setHTML(html)
      } else {
        popupRef.current = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false,
          className: 'mercy-popup',
          offset: 12,
        })
          .setLngLat(e.lngLat)
          .setHTML(html)
          .addTo(map)
      }
    })

    // Auto-rotation
    function spinGlobe() {
      if (!userInteractingRef.current && !hasZoomedRef.current && map) {
        const center = map.getCenter()
        center.lng += 0.01
        map.easeTo({ center, duration: 50, easing: (t) => t })
      }
      rotationRef.current = requestAnimationFrame(spinGlobe)
    }
    rotationRef.current = requestAnimationFrame(spinGlobe)

    map.on('mousedown', () => { userInteractingRef.current = true })
    map.on('touchstart', () => { userInteractingRef.current = true })
    map.on('dragstart', () => { userInteractingRef.current = true })

    // Stop spinning permanently when user zooms (originalEvent distinguishes
    // user-initiated zoom from programmatic flyTo/easeTo zoom)
    map.on('zoomstart', (e) => {
      if (e.originalEvent) {
        hasZoomedRef.current = true
      }
    })

    const resumeRotation = () => {
      clearTimeout(resumeTimeoutRef.current)
      resumeTimeoutRef.current = setTimeout(() => {
        userInteractingRef.current = false
      }, 5000)
    }
    map.on('mouseup', resumeRotation)
    map.on('touchend', resumeRotation)
    map.on('dragend', resumeRotation)

    return () => {
      cancelAnimationFrame(rotationRef.current)
      if (travelerRafRef.current) cancelAnimationFrame(travelerRafRef.current)
      clearTimeout(resumeTimeoutRef.current)
      map.remove()
      mapRef.current = null
    }
  }, [])

  // Smooth layer transition logic
  const animateLayerTransition = useCallback(async (newPointsData, newArcsData, layer) => {
    const map = mapRef.current
    if (!map || !mapReady) return

    const pointsSrc = map.getSource('points')
    const arcsSrc = map.getSource('arcs')
    
    // Phase 1: Fade out current data
    setLayerTransitioning(true)
    
    // Fade out animation (300ms)
    const fadeOutSteps = 10
    const fadeOutDelay = 25
    
    for (let i = fadeOutSteps; i >= 0; i--) {
      const opacity = i / fadeOutSteps
      
      // Update current data with fading opacity (using previous layer data)
      if (pointsSrc) {
        const prevPointsData = pointsData
        const fadingData = buildPointsGeoJSON(prevPointsData, activeLayer, opacity)
        pointsSrc.setData(fadingData)
      }
      
      if (arcsSrc) {
        const prevArcsData = arcsData
        const fadingData = buildArcsGeoJSON(prevArcsData, activeLayer, opacity)
        arcsSrc.setData(fadingData)
      }
      
      await new Promise(resolve => setTimeout(resolve, fadeOutDelay))
    }
    
    // Phase 2: Update with new data (invisible)
    if (pointsSrc) pointsSrc.setData(buildPointsGeoJSON(newPointsData, layer, 0))
    if (arcsSrc) arcsSrc.setData(buildArcsGeoJSON(newArcsData, layer, 0))
    
    // Brief pause
    await new Promise(resolve => setTimeout(resolve, 100))
    
    // Phase 3: Staggered fade-in animation for points
    const totalPoints = newPointsData.length
    const staggerDelay = Math.min(50, Math.max(15, 2000 / totalPoints)) // Between 15-50ms, max 2 seconds total
    
    // Animate points in staggered fashion
    for (let pointIndex = 0; pointIndex <= totalPoints; pointIndex++) {
      if (pointsSrc) {
        const staggeredData = buildPointsGeoJSON(newPointsData, layer, 1)
        staggeredData.features = staggeredData.features.map((feature, index) => ({
          ...feature,
          properties: {
            ...feature.properties,
            _opacity: index < pointIndex ? 1 : 0
          }
        }))
        pointsSrc.setData(staggeredData)
      }
      
      await new Promise(resolve => setTimeout(resolve, staggerDelay))
    }
    
    // Phase 4: Fade in arcs after points
    const fadeInSteps = 8
    const fadeInStepDelay = 25
    
    for (let i = 0; i <= fadeInSteps; i++) {
      const opacity = i / fadeInSteps
      if (arcsSrc) arcsSrc.setData(buildArcsGeoJSON(newArcsData, layer, opacity))
      await new Promise(resolve => setTimeout(resolve, fadeInStepDelay))
    }
    
    // Clear selected ring
    const ringSrc = map.getSource('selected-ring')
    if (ringSrc) ringSrc.setData({ type: 'FeatureCollection', features: [] })
    
    setLayerTransitioning(false)
  }, [mapReady, pointsData, arcsData, activeLayer])

  // Update data when layer changes or timeline filters data
  useEffect(() => {
    const map = mapRef.current
    if (!map || !mapReady) return

    const layerChanged = prevLayerRef.current !== null && prevLayerRef.current !== activeLayer
    prevLayerRef.current = activeLayer

    if (initialLoad) {
      // Initial load - no animation, just set the data
      const pointsSrc = map.getSource('points')
      const arcsSrc = map.getSource('arcs')
      const ringSrc = map.getSource('selected-ring')

      if (pointsSrc) pointsSrc.setData(buildPointsGeoJSON(pointsData, activeLayer))
      if (arcsSrc) arcsSrc.setData(buildArcsGeoJSON(arcsData, activeLayer))
      if (ringSrc) ringSrc.setData({ type: 'FeatureCollection', features: [] })

      setInitialLoad(false)
    } else if (layerChanged) {
      // Layer actually changed - use smooth transition animation
      animateLayerTransition(pointsData, arcsData, activeLayer)
    } else {
      // Only data changed (e.g., timeline filter) - update map directly without animation
      const pointsSrc = map.getSource('points')
      if (pointsSrc) pointsSrc.setData(buildPointsGeoJSON(pointsData, activeLayer))
    }
  }, [pointsData, arcsData, activeLayer, mapReady, animateLayerTransition, initialLoad])

  // Traveling light animation
  useEffect(() => {
    const map = mapRef.current
    if (!map || !mapReady) return

    if (!arcsData.length) {
      const src = map.getSource('traveler')
      if (src) src.setData({ type: 'FeatureCollection', features: [] })
      return
    }

    const waypoints = buildWaypoints(arcsData)
    if (waypoints.length < 2) return

    const cumDist = computeCumulativeDist(waypoints)
    const totalDist = cumDist[cumDist.length - 1]
    const cycleDuration = Math.max(TRAVELER_MIN_MS, (totalDist / TRAVELER_DEG_PER_SEC) * 1000)
    const color = getTravelerColor(activeLayer)

    let start = null
    function tick(ts) {
      if (!start) start = ts
      const t = ((ts - start) % cycleDuration) / cycleDuration
      const pos = lerpOnPath(waypoints, cumDist, t)
      const src = map.getSource('traveler')
      if (src) {
        src.setData({
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            geometry: { type: 'Point', coordinates: pos },
            properties: { _color: color },
          }],
        })
      }
      travelerRafRef.current = requestAnimationFrame(tick)
    }

    travelerRafRef.current = requestAnimationFrame(tick)

    return () => {
      if (travelerRafRef.current) cancelAnimationFrame(travelerRafRef.current)
      const src = map.getSource('traveler')
      if (src) src.setData({ type: 'FeatureCollection', features: [] })
    }
  }, [arcsData, activeLayer, mapReady])

  // Handle point click (registered once, reads activeLayer via ref)
  const activeLayerRef = useRef(activeLayer)
  activeLayerRef.current = activeLayer

  const pointsDataRef = useRef(pointsData)
  pointsDataRef.current = pointsData

  useEffect(() => {
    const map = mapRef.current
    if (!map || !mapReady) return

    const handleClick = (e) => {
      if (!e.features.length) return
      const props = e.features[0].properties
      // Find the full data object by id
      const d = pointsDataRef.current.find((p) => String(p.id) === String(props.id))
      if (!d) return

      setSelected(d)

      // Update selected ring
      const ringSrc = map.getSource('selected-ring')
      if (ringSrc) {
        ringSrc.setData({
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: { type: 'Point', coordinates: [d.lng, d.lat] },
              properties: { _color: getPointColor(d, activeLayerRef.current) },
            },
          ],
        })
      }

      // Fly to point
      map.flyTo({
        center: [d.lng, d.lat],
        zoom: SELECTED_ZOOM,
        duration: 1200,
        essential: true,
      })

      // Pause rotation
      userInteractingRef.current = true
      clearTimeout(resumeTimeoutRef.current)
      resumeTimeoutRef.current = setTimeout(() => {
        userInteractingRef.current = false
      }, 8000)
    }

    map.on('click', 'points-circle', handleClick)
    return () => map.off('click', 'points-circle', handleClick)
  }, [mapReady])

  // Layer change handler
  const handleLayerChange = useCallback(
    (layer) => {
      // Prevent layer changes during transitions
      if (layerTransitioning) return
      
      setActiveLayer(layer)
      setSelected(null)
      setTimeRange(null) // Reset timeline filter
      hasZoomedRef.current = false

      if (popupRef.current) {
        popupRef.current.remove()
        popupRef.current = null
      }

      const map = mapRef.current
      if (map) {
        const view = DEFAULT_VIEWS[layer]
        map.flyTo({
          center: view.center,
          zoom: view.zoom,
          duration: 1500,
          essential: true,
        })
      }
    },
    [layerTransitioning],
  )

  const handleClosePanel = useCallback(() => {
    setSelected(null)
    const map = mapRef.current
    const ringSrc = map && map.getSource('selected-ring')
    if (ringSrc) ringSrc.setData({ type: 'FeatureCollection', features: [] })
  }, [])

  // Handle location selection from search
  const handleLocationSelect = useCallback((location) => {
    const map = mapRef.current
    if (!map) return

    setSelected(location)

    // Update selected ring
    const ringSrc = map.getSource('selected-ring')
    if (ringSrc) {
      ringSrc.setData({
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [location.lng, location.lat] },
            properties: { _color: getPointColor(location, activeLayer) },
          },
        ],
      })
    }

    // Fly to location
    map.flyTo({
      center: [location.lng, location.lat],
      zoom: SELECTED_ZOOM,
      duration: 1200,
      essential: true,
    })

    // Pause rotation
    userInteractingRef.current = true
    clearTimeout(resumeTimeoutRef.current)
    resumeTimeoutRef.current = setTimeout(() => {
      userInteractingRef.current = false
    }, 8000)
  }, [activeLayer])

  // Timeline handler already defined above

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Mercy</h1>
        <p className="subtitle">{SUBTITLES[activeLayer]}</p>
      </header>

      <Search
        pointsData={basePointsData}
        activeLayer={activeLayer}
        onLocationSelect={handleLocationSelect}
        onLayerChange={handleLayerChange}
        transitioning={layerTransitioning}
      />

      <LayerToggle 
        activeLayer={activeLayer} 
        onLayerChange={handleLayerChange}
        transitioning={layerTransitioning}
      />

      <div className="globe-container" ref={mapContainer} />

      <InfoPanel location={selected} layer={activeLayer} onClose={handleClosePanel} />

      <Timeline
        activeLayer={activeLayer}
        pointsData={basePointsData}
        onTimeRangeChange={handleTimeRangeChange}
        transitioning={layerTransitioning}
      />

      <footer className="footer">
        <p className="hint">
          {selected
            ? 'Click another point or drag to explore'
            : timeRange && pointsData.length < basePointsData.length
            ? `Showing ${pointsData.length} of ${basePointsData.length} points • Drag timeline to adjust`
            : 'Click a point to learn more \u00b7 Drag to explore'}
        </p>
      </footer>
    </div>
  )
}

export default App
