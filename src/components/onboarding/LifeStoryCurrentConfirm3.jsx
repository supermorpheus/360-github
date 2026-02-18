import { useState } from 'react'
import { useOnboarding, lifeStoryPrompts } from '../../context/OnboardingContext'

function LifeStoryCurrentConfirm3() {
  const { profileData, updateLifeStory, goToConfirm4 } = useOnboarding()
  const storyData = profileData.lifeStories.current
  const story = lifeStoryPrompts.current

  // Local state
  const [currentCities, setCurrentCities] = useState(storyData.currentCities || [])
  const [newCity, setNewCity] = useState('')
  const [travelCities, setTravelCities] = useState(storyData.travelCities || [])
  const [newTravelCity, setNewTravelCity] = useState('')
  const [showErrors, setShowErrors] = useState(false)

  // Current Cities handlers
  const addCity = () => {
    if (newCity.trim()) {
      setCurrentCities([...currentCities, newCity.trim()])
      setNewCity('')
    }
  }

  const removeCity = (index) => {
    setCurrentCities(currentCities.filter((_, i) => i !== index))
  }

  const handleCityKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addCity()
    }
  }

  // Travel Cities handlers
  const addTravelCity = () => {
    if (newTravelCity.trim()) {
      setTravelCities([...travelCities, newTravelCity.trim()])
      setNewTravelCity('')
    }
  }

  const removeTravelCity = (index) => {
    setTravelCities(travelCities.filter((_, i) => i !== index))
  }

  const handleTravelCityKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTravelCity()
    }
  }

  // Validation check
  const isValid = () => {
    if (currentCities.length === 0) return false
    return true
  }

  // Individual field error checks
  const getErrors = () => ({
    currentCities: currentCities.length === 0 ? 'Please add at least one city where you currently live' : ''
  })

  const errors = getErrors()

  const handleContinue = () => {
    if (!isValid()) {
      setShowErrors(true)
      return
    }

    updateLifeStory('current', {
      currentCities,
      travelCities
    })
    goToConfirm4()
  }

  return (
    <div className="onboarding-form">
      <div className="form-header story-header-sticky">
        <div className="story-header-row">
          <div className="story-header-icon">{story.icon}</div>
          <h1 className="form-title">{story.title}</h1>
        </div>
      </div>

      {/* Current Cities */}
      <div className="confirm-section">
        <label className="input-label">
          Current Cities <span className="required-asterisk">*</span>
        </label>
        {currentCities.length > 0 && (
          <div className="tags-container">
            {currentCities.map((city, idx) => (
              <span key={idx} className="tag tag-location">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                {city}
                <button type="button" className="tag-remove" onClick={() => removeCity(idx)}>×</button>
              </span>
            ))}
          </div>
        )}
        <input
          type="text"
          className={`input-field ${showErrors && errors.currentCities ? 'input-error' : ''}`}
          placeholder="Add a city and press Enter"
          value={newCity}
          onChange={(e) => setNewCity(e.target.value)}
          onKeyPress={handleCityKeyPress}
        />
        {showErrors && errors.currentCities && (
          <p className="field-error">{errors.currentCities}</p>
        )}
      </div>

      {/* Frequent Travel Cities */}
      <div className="confirm-section">
        <label className="input-label">
          Frequent Travel Cities
        </label>
        {travelCities.length > 0 && (
          <div className="tags-container">
            {travelCities.map((city, idx) => (
              <span key={idx} className="tag tag-location">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                {city}
                <button type="button" className="tag-remove" onClick={() => removeTravelCity(idx)}>×</button>
              </span>
            ))}
          </div>
        )}
        <input
          type="text"
          className="input-field"
          placeholder="Add a city and press Enter"
          value={newTravelCity}
          onChange={(e) => setNewTravelCity(e.target.value)}
          onKeyPress={handleTravelCityKeyPress}
        />
      </div>

      <button className="btn-primary" onClick={handleContinue}>
        Continue
      </button>
    </div>
  )
}

export default LifeStoryCurrentConfirm3
