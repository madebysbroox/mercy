import { useState, useRef, useEffect, useMemo } from 'react'
import { locations, arcs } from '../data/jesusLocations'
import { apparitions, marianArcs } from '../data/marianApparitions'
import { massParts, massArcs } from '../data/massData'
import { spreadEvents, spreadArcs } from '../data/spreadData'
import './Search.css'

function Search({ 
  pointsData, 
  activeLayer, 
  onLocationSelect, 
  onLayerChange,
  transitioning 
}) {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef(null)
  const resultsRef = useRef(null)

  // Search across all layers and data types
  const searchResults = useMemo(() => {
    if (!query.trim() || query.length < 2) return []

    const searchTerm = query.toLowerCase().trim()
    const results = []

    // All layer data
    const allLayersData = {
      jesus: locations,
      marian: apparitions,
      mass: massParts,
      spread: spreadEvents
    }

    // Search function that scores matches
    const scoreMatch = (text, searchTerm) => {
      if (!text) return 0
      const lowerText = text.toLowerCase()
      
      if (lowerText === searchTerm) return 100 // Exact match
      if (lowerText.startsWith(searchTerm)) return 90 // Starts with
      if (lowerText.includes(` ${searchTerm}`)) return 80 // Word boundary
      if (lowerText.includes(searchTerm)) return 60 // Contains
      
      // Fuzzy matching for typos
      const words = searchTerm.split(' ')
      const matches = words.filter(word => lowerText.includes(word))
      if (matches.length > 0) return 40 * (matches.length / words.length)
      
      return 0
    }

    const searchLayer = (layerData, layerId) => {
      layerData.forEach(point => {
        let score = 0
        let matchField = ''
        
        // Check different fields based on layer
        const searchFields = {
          name: point.name || '',
          location: point.location || '',
          visionary: point.visionary || '',
          title: point.title || '',
          category: point.category || '',
          section: point.section || '',
          sectionLabel: point.sectionLabel || '',
          origin: point.origin || ''
        }

        Object.entries(searchFields).forEach(([field, value]) => {
          const fieldScore = scoreMatch(value, searchTerm)
          if (fieldScore > score) {
            score = fieldScore
            matchField = field
          }
        })

        if (score > 30) { // Minimum relevance threshold
          const isCurrentLayer = layerId === activeLayer
          const finalScore = isCurrentLayer ? score : score * 0.8 // Slight boost for current layer
          
          results.push({
            ...point,
            score: finalScore,
            matchField,
            layer: layerId,
            displayText: point.name || point.title || 'Unknown',
            subtitle: getSubtitle(point, layerId),
            isCurrentLayer,
            needsLayerSwitch: !isCurrentLayer
          })
        }
      })
    }

    // Search all layers
    Object.entries(allLayersData).forEach(([layerId, layerData]) => {
      searchLayer(layerData, layerId)
    })

    // Sort by relevance score, then by current layer preference
    return results
      .sort((a, b) => {
        // First by score
        if (b.score !== a.score) return b.score - a.score
        // Then by current layer preference
        if (a.isCurrentLayer !== b.isCurrentLayer) {
          return a.isCurrentLayer ? -1 : 1
        }
        // Finally alphabetically
        return a.displayText.localeCompare(b.displayText)
      })
      .slice(0, 10) // Limit results
  }, [query, activeLayer])

  const getSubtitle = (point, layer) => {
    switch (layer) {
      case 'marian':
        return `${point.location} • ${point.yearDisplay || point.year}`
      case 'mass':
        return `${point.sectionLabel} • ${point.origin}`
      case 'spread':
        return `${point.location} • ${point.yearDisplay || point.year}`
      default:
        return point.location || point.period || ''
    }
  }

  const handleInputChange = (e) => {
    setQuery(e.target.value)
    setSelectedIndex(-1)
    setIsOpen(e.target.value.length >= 2)
  }

  const handleKeyDown = (e) => {
    if (!isOpen || searchResults.length === 0) {
      if (e.key === 'Escape') {
        setQuery('')
        setIsOpen(false)
        inputRef.current?.blur()
      }
      return
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => 
          prev < searchResults.length - 1 ? prev + 1 : 0
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : searchResults.length - 1
        )
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0) {
          selectResult(searchResults[selectedIndex])
        } else if (searchResults.length > 0) {
          selectResult(searchResults[0])
        }
        break
      case 'Escape':
        setQuery('')
        setIsOpen(false)
        inputRef.current?.blur()
        break
    }
  }

  const selectResult = (result) => {
    // Switch layer if needed
    if (result.needsLayerSwitch) {
      onLayerChange(result.layer)
      // Delay location selection to allow layer change to complete
      setTimeout(() => {
        onLocationSelect(result)
      }, 300)
    } else {
      onLocationSelect(result)
    }
    
    setQuery(result.displayText)
    setIsOpen(false)
    setSelectedIndex(-1)
    inputRef.current?.blur()
  }

  const handleInputFocus = () => {
    if (query.length >= 2) {
      setIsOpen(true)
    }
  }

  const handleInputBlur = () => {
    // Delay closing to allow clicks on results
    setTimeout(() => setIsOpen(false), 150)
  }

  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0 && resultsRef.current) {
      const selectedElement = resultsRef.current.children[selectedIndex]
      if (selectedElement) {
        selectedElement.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth'
        })
      }
    }
  }, [selectedIndex])

  // Clear search when layer changes
  useEffect(() => {
    setQuery('')
    setIsOpen(false)
    setSelectedIndex(-1)
  }, [activeLayer])

  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <input
          ref={inputRef}
          type="text"
          className="search-input"
          placeholder={`Search ${getLayerName(activeLayer)}...`}
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          disabled={transitioning}
        />
        <div className="search-icon">🔍</div>
        {query && (
          <button
            className="search-clear"
            onClick={() => {
              setQuery('')
              setIsOpen(false)
              inputRef.current?.focus()
            }}
            title="Clear search"
          >
            ×
          </button>
        )}
      </div>

      {isOpen && searchResults.length > 0 && (
        <div className="search-results" ref={resultsRef}>
          {searchResults.map((result, index) => (
            <button
              key={`${result.id}-${result.layer}`}
              className={`search-result ${index === selectedIndex ? 'selected' : ''} ${result.needsLayerSwitch ? 'cross-layer' : ''}`}
              onClick={() => selectResult(result)}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              <div className="search-result-main">
                <span className="search-result-name">
                  {highlightMatch(result.displayText, query)}
                  {result.needsLayerSwitch && (
                    <span className="search-result-layer-badge">
                      {getLayerName(result.layer)}
                    </span>
                  )}
                </span>
                {result.matchField !== 'name' && result[result.matchField] && (
                  <span className="search-result-field">
                    in {result.matchField}: {highlightMatch(result[result.matchField], query)}
                  </span>
                )}
              </div>
              <div className="search-result-subtitle">
                {result.subtitle}
                {result.needsLayerSwitch && (
                  <span className="search-result-switch-hint">
                    • Click to switch layer
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      {isOpen && query.length >= 2 && searchResults.length === 0 && (
        <div className="search-no-results">
          <div className="search-no-results-text">
            No results found for "{query}"
          </div>
          <div className="search-no-results-hint">
            Try a different term or switch layers
          </div>
        </div>
      )}
    </div>
  )
}

function getLayerName(layer) {
  const names = {
    jesus: 'journeys of Jesus',
    marian: 'Marian apparitions',
    mass: 'Mass origins',
    spread: 'Christian history'
  }
  return names[layer] || 'locations'
}

function highlightMatch(text, query) {
  if (!query || !text) return text
  
  const searchTerm = query.toLowerCase().trim()
  const lowerText = text.toLowerCase()
  const index = lowerText.indexOf(searchTerm)
  
  if (index === -1) return text
  
  const before = text.slice(0, index)
  const match = text.slice(index, index + searchTerm.length)
  const after = text.slice(index + searchTerm.length)
  
  return (
    <>
      {before}
      <mark className="search-highlight">{match}</mark>
      {after}
    </>
  )
}

export default Search