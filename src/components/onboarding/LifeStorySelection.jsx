import { useOnboarding, lifeStoryPrompts } from '../../context/OnboardingContext'

function LifeStorySelection() {
  const { selectLifeStory, isLifeStoryComplete, nextStep, profileData } = useOnboarding()

  const stories = [
    { key: 'earlyLife', ...lifeStoryPrompts.earlyLife },
    { key: 'professional', ...lifeStoryPrompts.professional },
    { key: 'current', ...lifeStoryPrompts.current }
  ]

  // Get the input method label for completed stories
  const getInputMethodLabel = (storyKey) => {
    const story = profileData.lifeStories[storyKey]
    if (!story.inputMethod) return null
    const labels = { video: 'Video', audio: 'Audio', text: 'Text' }
    return labels[story.inputMethod]
  }

  const allComplete = stories.every(s => isLifeStoryComplete(s.key))
  const someComplete = stories.some(s => isLifeStoryComplete(s.key))

  return (
    <div className="onboarding-form">
      <div className="form-header story-header-sticky">
        <h1 className="form-title form-title-small" style={{ marginBottom: '12px' }}>My Life Stories</h1>
        <p className="share360-message">
          The more real and interesting your stories are, the better the gang gets to know you. So go on…
        </p>
      </div>

      <div className="life-story-cards">
        {stories.map((story) => {
          const isComplete = isLifeStoryComplete(story.key)
          const inputMethod = getInputMethodLabel(story.key)

          // Current Life auto-completes when any story is done
          const anyStoryComplete = stories.some(s => isLifeStoryComplete(s.key))
          const showAsComplete = story.key === 'current' ? anyStoryComplete : isComplete

          const statusTag = showAsComplete
            ? (story.key === 'current' ? 'Under review' : 'Approved')
            : null

          return (
            <button
              key={story.key}
              className={`life-story-card ${showAsComplete ? 'completed' : ''}`}
              onClick={() => selectLifeStory(story.key)}
            >
              <div className="story-card-icon">{story.icon}</div>
              <div className="story-card-content">
                <h3 className="story-card-title">{story.title}</h3>
                <p className="story-card-subtitle">{story.subtitle}</p>
                {showAsComplete && statusTag && (
                  <span className={`story-card-badge ${story.key === 'current' ? 'badge-review' : 'badge-approved'}`}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                    {statusTag}
                  </span>
                )}
              </div>
              <div className="story-card-arrow">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </div>
            </button>
          )
        })}
      </div>

      <button className="btn-primary" onClick={nextStep}>
        Go to Homepage
      </button>

      <p className="skip-note skip-note-visible">
        You can add/ update "My Life Stories" from "My Profile" anytime.
      </p>
    </div>
  )
}

export default LifeStorySelection
