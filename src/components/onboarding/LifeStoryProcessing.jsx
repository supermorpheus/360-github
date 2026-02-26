import { useEffect, useState } from 'react'
import { useOnboarding, lifeStoryPrompts } from '../../context/OnboardingContext'

function LifeStoryProcessing({ storyKey }) {
  const { goToThumbnail, profileData } = useOnboarding()
  const story = lifeStoryPrompts[storyKey]
  const inputMethod = profileData.lifeStories[storyKey]?.inputMethod
  const mediaType = inputMethod === 'audio' ? 'audio' : 'video'
  const [progress, setProgress] = useState(0)

  const storyTitles = {
    earlyLife: 'Early Life',
    professional: 'Mid/Professional Life',
    current: 'Current Life'
  }

  // Simulate processing with auto-redirect
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 2
      })
    }, 100)

    // Auto redirect after processing completes
    const timeout = setTimeout(() => {
      goToThumbnail()
    }, 5500) // 5.5 seconds to allow progress bar to complete

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [goToThumbnail])

  return (
    <div className="onboarding-form processing-screen">
      <div className="form-header story-header-sticky">
        <div className="story-header-row">
          <div className="story-header-icon">{story.icon}</div>
          <h1 className="form-title">{story.title}</h1>
        </div>
        <p className="form-subtitle" style={{ textTransform: 'none' }}>{story.subtitle}</p>
      </div>

      <div className="processing-icon">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="clock-icon">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
      </div>

      <h1 className="processing-title">Processing your {mediaType}</h1>

      <p className="processing-message">
        We're extracting information from your {mediaType} to populate your profile. This usually takes 1–2 minutes.
      </p>

      <div className="processing-progress">
        <div className="processing-progress-bar">
          <div
            className="processing-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="processing-percentage">{progress}%</span>
      </div>

      <div className="upload-warning-box">
        <ul className="warning-list">
          <li>
            Please do not navigate away, refresh, or close this tab while your {mediaType} is being processed.
          </li>
        </ul>
      </div>

      <p className="processing-auto-note">
        You'll be automatically redirected once processing is complete.
      </p>
    </div>
  )
}

export default LifeStoryProcessing
