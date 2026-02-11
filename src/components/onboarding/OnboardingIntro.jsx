import { useState } from 'react'
import { useOnboarding } from '../../context/OnboardingContext'
import OnboardingLayout from './OnboardingLayout'

function OnboardingIntro() {
  const { profileData, updateProfileData, nextStep } = useOnboarding()
  const [errors, setErrors] = useState({})
  const [showSamples, setShowSamples] = useState(false)

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
          <h1 className="form-title form-title-small">A brief introduction about myself</h1>
        </div>

        <div className="input-group">
          <span className="see-samples-link" onClick={() => setShowSamples(true)}>See sample intros</span>
          <div className={`input-field-with-icon textarea-field ${errors.introduction ? 'input-error' : ''}`}>
            <span className="input-icon intro-icon">📝</span>
            <div className="textarea-with-hint">
              <p className="textarea-hint-italic">Please don't copy-paste a standard introduction from elsewhere.</p>
              <textarea
                id="introduction"
                name="introduction"
                className="input-naked"
                placeholder="Share something that captures the shades and colours of your life—the personal and the professional, the private and the public, the crazy and the quiet, the peculiar parts that make you, you."
                value={profileData.introduction}
                onChange={handleChange}
                rows={6}
              />
            </div>
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

      {showSamples && (
        <div className="popup-overlay" onClick={() => setShowSamples(false)}>
          <div className="popup-content prompts-popup" onClick={(e) => e.stopPropagation()}>
            <div className="prompts-popup-header">
              <h3 className="popup-title" style={{ fontSize: '18px', marginBottom: 0 }}>Sample Introductions</h3>
              <button className="popup-close-btn" onClick={() => setShowSamples(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="prompts-popup-body">
              <div className="sample-intro-card">
                <span className="sample-intro-label">Sample 1</span>
                <p>I strive to grow in whatever I happen to be doing. I love programming, and building software. I am a poet at heart, and in an alternate life, I would probably have been an artist of some sort.</p>
              </div>
              <div className="sample-intro-card">
                <span className="sample-intro-label">Sample 2</span>
                <p>Engineer by education, seeker of "truth" by choice (if there's any). Father of 2 beautiful (read annoying) boys, married to a super psychologist (read healer). Building an ed tech start up in a conscious way.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </OnboardingLayout>
  )
}

export default OnboardingIntro
