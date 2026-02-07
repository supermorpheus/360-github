import { useState } from 'react'
import { useOnboarding } from '../../context/OnboardingContext'
import OnboardingLayout from './OnboardingLayout'

function OnboardingIntro() {
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

    if (!profileData.introduction?.trim()) {
      newErrors.introduction = 'Please write a short introduction'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    nextStep()
  }

  const wordCount = countWords(profileData.introduction || '')

  return (
    <OnboardingLayout>
      <div className="onboarding-form">
        <div className="form-header">
          <h2 className="form-subtitle">Creating Profile</h2>
          <h1 className="form-title form-title-small">A brief introduction about myself</h1>
        </div>

        <div className="input-group">
          <div className={`input-field-with-icon textarea-field ${errors.introduction ? 'input-error' : ''}`}>
            <span className="input-icon intro-icon">📝</span>
            <textarea
              id="introduction"
              name="introduction"
              className="input-naked"
              placeholder={`Please don't copy-paste a standard introduction from elsewhere.

Share something that captures the shades and colours of your life—the personal and the professional, the private and the public, the crazy and the quiet, the peculiar parts that make you you.`}
              value={profileData.introduction}
              onChange={handleChange}
              rows={8}
            />
          </div>
          <div className="word-counter-row">
            <span className={`word-counter ${wordCount >= MAX_WORDS ? 'limit-reached' : ''}`}>
              {wordCount} / {MAX_WORDS} words
            </span>
          </div>
          {errors.introduction && <span className="error-text">{errors.introduction}</span>}
        </div>

        <button className="btn-primary" onClick={validateAndNext}>
          Continue
        </button>
      </div>
    </OnboardingLayout>
  )
}

export default OnboardingIntro
