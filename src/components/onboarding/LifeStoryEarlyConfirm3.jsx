import { useState } from 'react'
import { useOnboarding, lifeStoryPrompts } from '../../context/OnboardingContext'

function LifeStoryEarlyConfirm3() {
  const { profileData, updateLifeStory, goToConfirm4 } = useOnboarding()
  const storyData = profileData.lifeStories.earlyLife
  const story = lifeStoryPrompts.earlyLife

  // Local state
  const [schools, setSchools] = useState(
    storyData.schools.length > 0 ? storyData.schools : [{ name: '', location: '' }]
  )
  const [showErrors, setShowErrors] = useState(false)

  // School handlers
  const updateSchool = (index, field, value) => {
    const updated = [...schools]
    updated[index][field] = value
    setSchools(updated)
  }

  const addSchool = () => {
    setSchools([...schools, { name: '', location: '' }])
  }

  const removeSchool = (index) => {
    if (schools.length > 1) {
      setSchools(schools.filter((_, i) => i !== index))
    }
  }

  // Validation check
  const isValid = () => {
    // At least one school with name and location
    const validSchools = schools.filter(s => s.name.trim() && s.location.trim())
    if (validSchools.length === 0) return false
    return true
  }

  // Individual field error checks
  const getErrors = () => ({
    schools: schools.filter(s => s.name.trim() && s.location.trim()).length === 0
      ? 'Please add at least one school with name and location' : ''
  })

  const errors = getErrors()

  const handleContinue = () => {
    if (!isValid()) {
      setShowErrors(true)
      return
    }

    updateLifeStory('earlyLife', {
      schools: schools.filter(s => s.name.trim())
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
        <p className="form-subtitle" style={{ textTransform: 'none' }}>{story.subtitle}</p>
      </div>

      {/* Schools */}
      <div className="confirm-section">
        <h3 className="section-title-bold">School(s)</h3>
        {showErrors && errors.schools && (
          <p className="field-error section-error">{errors.schools}</p>
        )}
        {schools.map((school, idx) => (
          <div key={idx} className="entry-card">
            <div className="entry-fields">
              <div className="input-group">
                <label className="input-label small">
                  Name <span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  className={`input-field ${showErrors && errors.schools && !school.name.trim() ? 'input-error' : ''}`}
                  placeholder="School name"
                  value={school.name}
                  onChange={(e) => updateSchool(idx, 'name', e.target.value)}
                />
              </div>
              <div className="input-group">
                <label className="input-label small">
                  Location <span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  className={`input-field ${showErrors && errors.schools && !school.location.trim() ? 'input-error' : ''}`}
                  placeholder="Location"
                  value={school.location}
                  onChange={(e) => updateSchool(idx, 'location', e.target.value)}
                />
              </div>
            </div>
            {schools.length > 1 && (
              <button type="button" className="entry-remove-btn" onClick={() => removeSchool(idx)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                </svg>
              </button>
            )}
          </div>
        ))}
        <button type="button" className="add-entry-btn-dashed" onClick={addSchool}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Add School
        </button>
      </div>

      <button className="btn-primary" onClick={handleContinue}>
        Continue
      </button>
    </div>
  )
}

export default LifeStoryEarlyConfirm3
