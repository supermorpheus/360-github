import { useState } from 'react'
import { useOnboarding } from '../../context/OnboardingContext'
import OnboardingLayout from './OnboardingLayout'

function OnboardingQuote() {
  const { profileData, updateProfileData, nextStep } = useOnboarding()
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    updateProfileData({ [name]: value })

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }))
    }
  }

  const validateAndNext = () => {
    const newErrors = {}

    if (!profileData.inspiringQuote?.trim()) {
      newErrors.inspiringQuote = 'Please share a quote that inspires you'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    nextStep()
  }

  return (
    <OnboardingLayout>
      <div className="onboarding-form">
        <div className="form-header">
          <h2 className="form-subtitle">Creating Profile</h2>
          <h1 className="form-title form-title-small">A quote that inspires me</h1>
        </div>

        <div className="input-group">
          <div className={`input-field-with-icon textarea-field ${errors.inspiringQuote ? 'input-error' : ''}`}>
            <span className="input-icon quote-icon">"</span>
            <textarea
              id="inspiringQuote"
              name="inspiringQuote"
              className="input-naked"
              placeholder="Share a quote that you have tried to live your life by, it will be displayed as part of your Profile. Please share the quote in its entirety and share its source."
              value={profileData.inspiringQuote}
              onChange={handleChange}
              rows={5}
            />
          </div>
          {errors.inspiringQuote && <span className="error-text">{errors.inspiringQuote}</span>}
        </div>

        <button className="btn-primary" onClick={validateAndNext}>
          Continue
        </button>
      </div>
    </OnboardingLayout>
  )
}

export default OnboardingQuote
