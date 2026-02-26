import { useState } from 'react'
import { useOnboarding, lifeStoryPrompts } from '../../context/OnboardingContext'

function LifeStoryEarlyConfirm4() {
  const { profileData, updateLifeStory, goToConfirm5 } = useOnboarding()
  const storyData = profileData.lifeStories.earlyLife
  const story = lifeStoryPrompts.earlyLife

  // Local state
  const [universities, setUniversities] = useState(
    storyData.universities.length > 0
      ? storyData.universities
      : [{ name: '', location: '', course: '' }]
  )
  const [showErrors, setShowErrors] = useState(false)

  // University handlers
  const updateUniversity = (index, field, value) => {
    const updated = [...universities]
    updated[index][field] = value
    setUniversities(updated)
  }

  const addUniversity = () => {
    setUniversities([...universities, { name: '', location: '', course: '' }])
  }

  const removeUniversity = (index) => {
    if (universities.length > 1) {
      setUniversities(universities.filter((_, i) => i !== index))
    }
  }

  // Validation check
  const isValid = () => {
    // At least one university with all fields
    const validUniversities = universities.filter(u => u.name.trim() && u.course.trim() && u.location.trim())
    if (validUniversities.length === 0) return false
    return true
  }

  // Individual field error checks
  const getErrors = () => ({
    universities: universities.filter(u => u.name.trim() && u.course.trim() && u.location.trim()).length === 0
      ? 'Please add at least one university/college with name, course, and location' : ''
  })

  const errors = getErrors()

  const handleContinue = () => {
    if (!isValid()) {
      setShowErrors(true)
      return
    }

    updateLifeStory('earlyLife', {
      universities: universities.filter(u => u.name.trim())
    })
    goToConfirm5()
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

      {/* Universities */}
      <div className="confirm-section">
        <h3 className="section-title-bold">Universities / Colleges</h3>
        {showErrors && errors.universities && (
          <p className="field-error section-error">{errors.universities}</p>
        )}
        {universities.map((uni, idx) => (
          <div key={idx} className="entry-card">
            <div className="entry-fields">
              <div className="input-group">
                <label className="input-label small">
                  Name <span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  className={`input-field ${showErrors && errors.universities && !uni.name.trim() ? 'input-error' : ''}`}
                  placeholder="University / College name"
                  value={uni.name}
                  onChange={(e) => updateUniversity(idx, 'name', e.target.value)}
                />
              </div>
              <div className="input-group">
                <label className="input-label small">
                  Course <span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  className={`input-field ${showErrors && errors.universities && !(uni.course || '').trim() ? 'input-error' : ''}`}
                  placeholder="Course / Degree"
                  value={uni.course || uni.major || ''}
                  onChange={(e) => updateUniversity(idx, 'course', e.target.value)}
                />
              </div>
              <div className="input-group">
                <label className="input-label small">
                  Location <span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  className={`input-field ${showErrors && errors.universities && !uni.location.trim() ? 'input-error' : ''}`}
                  placeholder="Location"
                  value={uni.location}
                  onChange={(e) => updateUniversity(idx, 'location', e.target.value)}
                />
              </div>
            </div>
            {universities.length > 1 && (
              <button type="button" className="entry-remove-btn" onClick={() => removeUniversity(idx)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                </svg>
              </button>
            )}
          </div>
        ))}
        <button type="button" className="add-entry-btn-dashed" onClick={addUniversity}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Add University / College
        </button>
      </div>

      <button className="btn-primary" onClick={handleContinue}>
        Continue
      </button>
    </div>
  )
}

export default LifeStoryEarlyConfirm4
