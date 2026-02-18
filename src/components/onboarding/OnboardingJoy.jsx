import { useState } from 'react'
import { useOnboarding } from '../../context/OnboardingContext'
import OnboardingLayout from './OnboardingLayout'

function OnboardingJoy() {
  const { profileData, updateProfileData, nextStep } = useOnboarding()
  const [errors, setErrors] = useState({})

  const MAX_WORDS = 100

  const countWords = (text) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    const wordCount = countWords(value)

    if (wordCount > MAX_WORDS) {
      return
    }

    updateProfileData({ [name]: value })

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }))
    }
  }

  const validateAndNext = () => {
    const newErrors = {}

    if (!profileData.joyOutsideWork?.trim()) {
      newErrors.joyOutsideWork = 'Please share what brings you joy'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    nextStep()
  }

  const wordCount = countWords(profileData.joyOutsideWork || '')

  return (
    <OnboardingLayout>
      <div className="onboarding-form">
        <div className="form-header">
          <h1 className="form-title form-title-small">Outside work, I find joy in…</h1>
        </div>

        <div className="input-group">
          <div className={`input-field-with-icon textarea-field ${errors.joyOutsideWork ? 'input-error' : ''}`}>
            <span className="input-icon joy-icon">☺</span>
            <textarea
              id="joyOutsideWork"
              name="joyOutsideWork"
              className="input-naked"
              placeholder="e.g., I love to fly kites and race bikes"
              value={profileData.joyOutsideWork}
              onChange={handleChange}
              rows={5}
            />
          </div>
          {errors.joyOutsideWork && <span className="error-text">{errors.joyOutsideWork}</span>}
          <div className="word-counter-row">
            <span className={`word-counter ${wordCount >= MAX_WORDS ? 'limit-reached' : ''}`}>
              {wordCount} / {MAX_WORDS} words
            </span>
          </div>
        </div>

        <button className="btn-primary" onClick={validateAndNext}>
          Continue
        </button>
      </div>
    </OnboardingLayout>
  )
}

export default OnboardingJoy
