import { useState, useEffect, useMemo, useCallback } from 'react'
import './Timeline.css'

// Extract years from data to determine timeline bounds
function getDataYearRange(pointsData, layer) {
  if (!pointsData || pointsData.length === 0) return { min: 30, max: 2020 }
  
  const years = pointsData
    .map(point => {
      // Handle different year formats across layers
      if (point.year) return point.year
      if (point.yearDisplay) {
        // Parse "AD 40", "1858", etc.
        const match = point.yearDisplay.match(/\d+/)
        return match ? parseInt(match[0]) : null
      }
      return null
    })
    .filter(year => year && year > 0)
  
  if (years.length === 0) return { min: 30, max: 2020 }
  
  const min = Math.min(...years)
  const max = Math.max(...years)
  
  // Add some padding and round to nice numbers
  const padding = (max - min) * 0.1
  return {
    min: Math.max(1, Math.floor((min - padding) / 10) * 10),
    max: Math.ceil((max + padding) / 10) * 10
  }
}

// Pre-defined ranges for different layers
const LAYER_RANGES = {
  jesus: { min: 0, max: 50, defaultMin: 0, defaultMax: 40, step: 1 },
  marian: { min: 40, max: 2030, defaultMin: 40, defaultMax: 2030, step: 10 },
  mass: { min: 30, max: 500, defaultMin: 30, defaultMax: 500, step: 5 },
  spread: { min: 30, max: 2030, defaultMin: 30, defaultMax: 2030, step: 20 }
}

function Timeline({ 
  pointsData, 
  activeLayer, 
  onTimeRangeChange,
  transitioning,
  className = ''
}) {
  const layerConfig = LAYER_RANGES[activeLayer] || LAYER_RANGES.spread
  const dataRange = useMemo(() => getDataYearRange(pointsData, activeLayer), [pointsData, activeLayer])
  
  // Use layer defaults or data bounds
  const minYear = Math.min(layerConfig.min, dataRange.min)
  const maxYear = Math.max(layerConfig.max, dataRange.max)
  
  const [timeRange, setTimeRange] = useState([minYear, maxYear])
  const [isPlaying, setIsPlaying] = useState(false)
  const [playSpeed, setPlaySpeed] = useState(1)
  
  // Reset timeline when layer changes
  useEffect(() => {
    const newMin = Math.min(layerConfig.defaultMin, dataRange.min)
    const newMax = Math.max(layerConfig.defaultMax, dataRange.max)
    setTimeRange([newMin, newMax])
    setIsPlaying(false)
  }, [activeLayer, layerConfig, dataRange])
  
  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) return
    
    const interval = setInterval(() => {
      setTimeRange(([currentMin, currentMax]) => {
        const step = layerConfig.step * playSpeed
        const newMax = Math.min(currentMax + step, maxYear)
        
        // Stop at the end
        if (newMax >= maxYear) {
          setIsPlaying(false)
          return [currentMin, maxYear]
        }
        
        // Expand window over time
        const windowSize = Math.min(300, (maxYear - minYear) * 0.3)
        const newMin = Math.max(minYear, newMax - windowSize)
        
        return [newMin, newMax]
      })
    }, 500 / playSpeed) // Faster animation with higher speed
    
    return () => clearInterval(interval)
  }, [isPlaying, playSpeed, minYear, maxYear, layerConfig.step])
  
  // Notify parent of range changes
  useEffect(() => {
    onTimeRangeChange?.(timeRange)
  }, [timeRange, onTimeRangeChange])
  
  const handleRangeChange = useCallback((newRange) => {
    setTimeRange(newRange)
    setIsPlaying(false) // Stop playing when user manually adjusts
  }, [])
  
  const togglePlay = () => {
    if (timeRange[1] >= maxYear) {
      // Reset to beginning if at end
      const windowSize = Math.min(200, (maxYear - minYear) * 0.2)
      setTimeRange([minYear, minYear + windowSize])
    }
    setIsPlaying(!isPlaying)
  }
  
  const reset = () => {
    setTimeRange([minYear, maxYear])
    setIsPlaying(false)
  }
  
  const formatYear = (year) => {
    if (year < 100) return `AD ${year}`
    if (year < 1000) return `${year} AD`
    return `${year}`
  }
  
  const getMarkerYears = () => {
    const span = maxYear - minYear
    let interval
    
    if (span <= 50) interval = 10
    else if (span <= 200) interval = 25
    else if (span <= 500) interval = 50
    else if (span <= 1000) interval = 100
    else interval = 250
    
    const markers = []
    for (let year = Math.ceil(minYear / interval) * interval; year <= maxYear; year += interval) {
      markers.push(year)
    }
    return markers
  }
  
  const markers = getMarkerYears()
  const filteredCount = pointsData.filter(point => {
    const year = point.year || (point.yearDisplay ? parseInt(point.yearDisplay.match(/\d+/)?.[0]) : null)
    return year && year >= timeRange[0] && year <= timeRange[1]
  }).length
  
  // Don't show timeline for Jesus layer (no meaningful time progression)
  if (activeLayer === 'jesus') return null
  
  return (
    <div className={`timeline ${className} ${transitioning ? 'transitioning' : ''}`}>
      <div className="timeline-header">
        <div className="timeline-title">
          Timeline • {formatYear(timeRange[0])} - {formatYear(timeRange[1])}
        </div>
        <div className="timeline-count">
          {filteredCount} of {pointsData.length} events
        </div>
      </div>
      
      <div className="timeline-controls">
        <button 
          className={`timeline-play-btn ${isPlaying ? 'playing' : ''}`}
          onClick={togglePlay}
          disabled={transitioning}
          title={isPlaying ? 'Pause' : 'Play through time'}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
        
        <div className="timeline-speed">
          <label>Speed:</label>
          <select 
            value={playSpeed} 
            onChange={(e) => setPlaySpeed(Number(e.target.value))}
            disabled={transitioning}
          >
            <option value={0.5}>0.5x</option>
            <option value={1}>1x</option>
            <option value={2}>2x</option>
            <option value={3}>3x</option>
          </select>
        </div>
        
        <button 
          className="timeline-reset-btn"
          onClick={reset}
          disabled={transitioning}
          title="Show all events"
        >
          Reset
        </button>
      </div>
      
      <div className="timeline-slider-container">
        <div className="timeline-markers">
          {markers.map(year => (
            <div 
              key={year}
              className="timeline-marker"
              style={{ left: `${((year - minYear) / (maxYear - minYear)) * 100}%` }}
            >
              <div className="timeline-marker-line" />
              <div className="timeline-marker-label">
                {formatYear(year)}
              </div>
            </div>
          ))}
        </div>
        
        <DualRangeSlider
          min={minYear}
          max={maxYear}
          value={timeRange}
          onChange={handleRangeChange}
          disabled={transitioning}
          step={layerConfig.step}
        />
      </div>
    </div>
  )
}

// Custom dual-range slider component
function DualRangeSlider({ min, max, value, onChange, disabled, step = 1 }) {
  const [minVal, maxVal] = value
  
  const handleMinChange = (e) => {
    const val = Math.min(Number(e.target.value), maxVal - step)
    onChange([val, maxVal])
  }
  
  const handleMaxChange = (e) => {
    const val = Math.max(Number(e.target.value), minVal + step)
    onChange([minVal, val])
  }
  
  const minPercent = ((minVal - min) / (max - min)) * 100
  const maxPercent = ((maxVal - min) / (max - min)) * 100
  
  return (
    <div className="dual-range-slider">
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        step={step}
        onChange={handleMinChange}
        disabled={disabled}
        className="range-slider range-slider-min"
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        step={step}
        onChange={handleMaxChange}
        disabled={disabled}
        className="range-slider range-slider-max"
      />
      
      <div className="range-track">
        <div 
          className="range-track-highlight"
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`
          }}
        />
      </div>
      
      <div 
        className="range-thumb range-thumb-min"
        style={{ left: `${minPercent}%` }}
      />
      <div 
        className="range-thumb range-thumb-max"
        style={{ left: `${maxPercent}%` }}
      />
    </div>
  )
}

export default Timeline