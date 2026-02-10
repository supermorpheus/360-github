import { useState } from 'react'
import { useOnboarding, lifeStoryPrompts } from '../../context/OnboardingContext'

function LifeStoryPrompts({ storyKey }) {
  const { selectInputMethod } = useOnboarding()
  const [selectedMethod, setSelectedMethod] = useState(null)
  const [showError, setShowError] = useState(false)

  const story = lifeStoryPrompts[storyKey]

  const renderPromptList = () => {
    // Current life has sections (Personal & Professional)
    if (story.sections) {
      return story.sections.map((section, idx) => (
        <div key={idx} className="prompt-section">
          <p className="prompt-section-title"><strong>{section.title}:</strong></p>
          <ul>
            {section.prompts.map((prompt, pIdx) => (
              <li key={pIdx}>{prompt}</li>
            ))}
          </ul>
        </div>
      ))
    }

    // Other stories have a flat list with optional intro text
    return (
      <>
        {story.introText && (
          <p className="prompt-intro-text">{story.introText}</p>
        )}
        <ul>
          {story.prompts.map((prompt, idx) => (
            <li key={idx}>{prompt}</li>
          ))}
        </ul>
        {story.highlightText && (
          <p className="prompt-highlight-text"><u>{story.highlightText}</u></p>
        )}
      </>
    )
  }

  const handleReady = () => {
    if (selectedMethod) {
      setShowError(false)
      selectInputMethod(selectedMethod)
    } else {
      setShowError(true)
    }
  }

  const handleSelectMethod = (method) => {
    setSelectedMethod(method)
    setShowError(false)
  }

  return (
    <div className="onboarding-form">
      {/* Life Stories header */}
      <div className="progress-label" style={{ marginBottom: '16px' }}>My Life Stories</div>

      {/* Input method selection - at the top */}
      <p className="input-method-label">I'd like to:</p>
      <div className="input-method-cards input-method-row">
        <button className={`input-method-card input-method-compact ${selectedMethod === 'video' ? 'selected' : ''}`} onClick={() => handleSelectMethod('video')}>
          <div className="method-card-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M23 7l-7 5 7 5V7z"/>
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
            </svg>
          </div>
          <h3 className="method-card-title">Record Video</h3>
        </button>
        <button className={`input-method-card input-method-compact ${selectedMethod === 'audio' ? 'selected' : ''}`} onClick={() => handleSelectMethod('audio')}>
          <div className="method-card-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
              <line x1="12" y1="19" x2="12" y2="23"/>
              <line x1="8" y1="23" x2="16" y2="23"/>
            </svg>
          </div>
          <h3 className="method-card-title">Record Audio</h3>
        </button>
        <button className={`input-method-card input-method-compact ${selectedMethod === 'text' ? 'selected' : ''}`} onClick={() => handleSelectMethod('text')}>
          <div className="method-card-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
          </div>
          <h3 className="method-card-title">Write Text</h3>
        </button>
      </div>

      {/* Story header - sticky */}
      <div className="form-header story-header-sticky">
        <div className="story-header-row">
          <div className="story-header-icon">{story.icon}</div>
          <h1 className="form-title">{story.title}</h1>
        </div>
        <p className="form-subtitle" style={{ textTransform: 'none' }}>{story.subtitle}</p>
      </div>

      {/* Prompt instructions - always visible, no collapse */}
      <div className="video-prompt-list">
        <span className="prompt-intro">What you can talk about:</span>
        <div className="prompt-content">
          {renderPromptList()}
        </div>
      </div>

      {/* I am Ready button */}
      {showError && (
        <p className="error-message">Please select an input method to continue</p>
      )}
      <button
        className="btn-primary"
        onClick={handleReady}
      >
        I am Ready
      </button>

    </div>
  )
}

export default LifeStoryPrompts
