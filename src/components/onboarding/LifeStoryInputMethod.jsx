import { useOnboarding, lifeStoryPrompts } from '../../context/OnboardingContext'

function LifeStoryInputMethod({ storyKey }) {
  const { selectInputMethod } = useOnboarding()

  const story = lifeStoryPrompts[storyKey]

  const inputMethods = [
    {
      key: 'video',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M23 7l-7 5 7 5V7z"/>
          <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
        </svg>
      ),
      title: 'Record Video',
      description: 'Share your story through a personal video recording'
    },
    {
      key: 'audio',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
          <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
          <line x1="12" y1="19" x2="12" y2="23"/>
          <line x1="8" y1="23" x2="16" y2="23"/>
        </svg>
      ),
      title: 'Record Audio',
      description: 'Share your story through a voice recording'
    },
    {
      key: 'text',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10 9 9 9 8 9"/>
        </svg>
      ),
      title: 'Write Text',
      description: 'Share your story by typing in the details'
    }
  ]

  return (
    <div className="onboarding-form">
      <div className="form-header story-header-sticky">
        <div className="story-header-row">
          <div className="story-header-icon">{story.icon}</div>
          <h1 className="form-title">{story.title}</h1>
        </div>
        <p className="form-subtitle" style={{ textTransform: 'none' }}>{story.subtitle}</p>
      </div>

      <div className="input-method-cards input-method-row">
        {inputMethods.map((method) => (
          <button
            key={method.key}
            className="input-method-card input-method-compact"
            onClick={() => selectInputMethod(method.key)}
          >
            <div className="method-card-icon">{method.icon}</div>
            <h3 className="method-card-title">{method.title}</h3>
          </button>
        ))}
      </div>
    </div>
  )
}

export default LifeStoryInputMethod
