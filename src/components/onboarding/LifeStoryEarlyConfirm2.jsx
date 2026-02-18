import { useState } from 'react'
import { useOnboarding, lifeStoryPrompts } from '../../context/OnboardingContext'

function LifeStoryEarlyConfirm2() {
  const { profileData, updateLifeStory, goToConfirm3 } = useOnboarding()
  const storyData = profileData.lifeStories.earlyLife
  const story = lifeStoryPrompts.earlyLife

  // Local state
  const [bornIn, setBornIn] = useState(storyData.bornIn || '')
  const [hometown, setHometown] = useState(storyData.hometown || '')
  const [showErrors, setShowErrors] = useState(false)

  // Validation check
  const isValid = () => {
    if (!bornIn.trim()) return false
    if (!hometown.trim()) return false
    return true
  }

  // Individual field error checks
  const getErrors = () => ({
    bornIn: !bornIn.trim() ? 'Please enter the city where you were born' : '',
    hometown: !hometown.trim() ? 'Please enter your hometown' : ''
  })

  const errors = getErrors()

  const handleContinue = () => {
    if (!isValid()) {
      setShowErrors(true)
      return
    }

    updateLifeStory('earlyLife', {
      bornIn,
      hometown
    })
    goToConfirm3()
  }

  return (
    <div className="onboarding-form">
      <div className="form-header story-header-sticky">
        <div className="story-header-row">
          <div className="story-header-icon">{story.icon}</div>
          <h1 className="form-title">{story.title}</h1>
        </div>
      </div>

      {/* Born In */}
      <div className="confirm-section">
        <label className="input-label">
          Born in <span className="required-asterisk">*</span>
        </label>
        <input
          type="text"
          className={`input-field ${showErrors && errors.bornIn ? 'input-error' : ''}`}
          placeholder="City where you were born"
          value={bornIn}
          onChange={(e) => setBornIn(e.target.value)}
        />
        {showErrors && errors.bornIn && (
          <p className="field-error">{errors.bornIn}</p>
        )}
      </div>

      {/* Hometown */}
      <div className="confirm-section">
        <label className="input-label">
          Hometown <span className="required-asterisk">*</span>
        </label>
        <input
          type="text"
          className={`input-field ${showErrors && errors.hometown ? 'input-error' : ''}`}
          placeholder="Your hometown"
          value={hometown}
          onChange={(e) => setHometown(e.target.value)}
        />
        {showErrors && errors.hometown && (
          <p className="field-error">{errors.hometown}</p>
        )}
      </div>

      <button className="btn-primary" onClick={handleContinue}>
        Continue
      </button>
    </div>
  )
}

export default LifeStoryEarlyConfirm2
