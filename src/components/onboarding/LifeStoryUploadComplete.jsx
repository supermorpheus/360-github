import { useOnboarding, lifeStoryPrompts } from '../../context/OnboardingContext'

function LifeStoryUploadComplete({ storyKey }) {
  const { goToProcessing, profileData } = useOnboarding()
  const story = lifeStoryPrompts[storyKey]
  const inputMethod = profileData.lifeStories[storyKey]?.inputMethod
  const mediaType = inputMethod === 'audio' ? 'audio' : 'video'

  const storyTitles = {
    earlyLife: 'Early Life',
    professional: 'Mid/Professional Life',
    current: 'Current Life'
  }

  return (
    <div className="onboarding-form upload-complete-screen">
      <div className="form-header story-header-sticky">
        <div className="story-header-row">
          <div className="story-header-icon">{story.icon}</div>
          <h1 className="form-title">{story.title}</h1>
        </div>
        <p className="form-subtitle" style={{ textTransform: 'none' }}>{story.subtitle}</p>
      </div>

      <div className="upload-complete-icon">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>

      <h1 className="upload-complete-title">
        Upload Complete
      </h1>

      <p className="upload-complete-message">
        Thanks for uploading your {mediaType}, We're processing it to extract the information for your profile.
      </p>

      <p className="upload-complete-time">
        This usually takes 1–2 minutes. You'll be automatically redirected to next stage once it's ready, and we'll also notify you by email.
      </p>

      <div className="upload-warning-box">
        <ul className="warning-list">
          <li>
            Do not navigate away or close this tab while {mediaType} is uploading.
          </li>
          <li>
            Do not click the Back button, refresh, close this tab, or navigate elsewhere while {mediaType} is being processed.
          </li>
        </ul>
      </div>

      <button className="btn-primary" onClick={goToProcessing}>
        Continue to Processing
      </button>
    </div>
  )
}

export default LifeStoryUploadComplete
