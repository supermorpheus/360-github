import { useState } from 'react'
import { useOnboarding, lifeStoryPrompts } from '../../context/OnboardingContext'

function LifeStoryCurrentConfirm4() {
  const { profileData, updateLifeStory, completeLifeStory } = useOnboarding()
  const storyData = profileData.lifeStories.current
  const story = lifeStoryPrompts.current

  // Local state
  const [tags, setTags] = useState(storyData.tags || storyData.interests || [])
  const [newTag, setNewTag] = useState('')
  const [showSubmitPopup, setShowSubmitPopup] = useState(false)
  const [showErrors, setShowErrors] = useState(false)

  const maxTags = 15

  // Tag handlers
  const addTag = () => {
    const newTags = newTag.split(',').map(t => t.trim()).filter(t => t)
    if (newTags.length > 0) {
      const remaining = maxTags - tags.length
      setTags([...tags, ...newTags.slice(0, remaining)])
      setNewTag('')
    }
  }

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index))
  }

  const handleTagKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTag()
    }
  }

  // Validation check
  const isValid = () => {
    if (tags.length === 0) return false
    return true
  }

  // Individual field error checks
  const getErrors = () => ({
    tags: tags.length === 0 ? 'Please add at least one tag to describe your current interests' : ''
  })

  const errors = getErrors()

  const handleSubmit = () => {
    if (!isValid()) {
      setShowErrors(true)
      return
    }

    updateLifeStory('current', {
      tags
    })
    setShowSubmitPopup(true)
  }

  const handlePopupClose = () => {
    setShowSubmitPopup(false)
    completeLifeStory()
  }

  return (
    <div className="onboarding-form">
      <div className="form-header story-header-sticky">
        <div className="story-header-row">
          <div className="story-header-icon">{story.icon}</div>
          <h1 className="form-title">{story.title}</h1>
        </div>
      </div>

      {/* Current Life Tags */}
      <div className="confirm-section">
        <h3 className="section-title-bold">Tags</h3>
        <p className="tag-description">Add some descriptive tags that will give people a feel of your current life. (Example: Bengaluru, AI Enthusiast, Fitness, Travel, Podcasts, Cooking, Remote work, Mentoring etc)</p>
        {tags.length > 0 && (
          <div className="tags-container">
            {tags.map((tag, idx) => (
              <span key={idx} className="tag">
                {tag}
                <button type="button" className="tag-remove" onClick={() => removeTag(idx)}>×</button>
              </span>
            ))}
          </div>
        )}
        <input
          type="text"
          className={`input-field ${showErrors && errors.tags ? 'input-error' : ''}`}
          placeholder="Press enter after each tag"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyPress={handleTagKeyPress}
          disabled={tags.length >= maxTags}
        />
        {showErrors && errors.tags && (
          <p className="field-error">{errors.tags}</p>
        )}
        <p className={`tag-counter ${tags.length >= maxTags ? 'at-limit' : ''}`}>
          {tags.length} / {maxTags} tags
        </p>
      </div>

      <button className="btn-primary btn-with-icon" onClick={handleSubmit}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10 9 9 9 8 9"/>
        </svg>
        Submit for Review
      </button>

      {/* Submit Popup */}
      {showSubmitPopup && (
        <div className="popup-overlay" onClick={handlePopupClose}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-icon" style={{ background: 'none', width: 'auto', height: 'auto' }}>
              <img src={`${import.meta.env.BASE_URL}Popcorn Final.jpeg`} alt="Popcorn" style={{ width: '80px', height: '80px', objectFit: 'contain' }} />
            </div>
            <h2 className="popup-title">Yay!</h2>
            <p className="popup-message">
              Your Current Life story has been submitted for review. Our admin team will review your submission and get back to you soon.
            </p>
            <button className="btn-primary" onClick={handlePopupClose}>
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default LifeStoryCurrentConfirm4
