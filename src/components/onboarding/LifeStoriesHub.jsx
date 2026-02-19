import { useOnboarding } from '../../context/OnboardingContext'
import OnboardingLayout from './OnboardingLayout'
import LifeStorySelection from './LifeStorySelection'
import LifeStoryPrompts from './LifeStoryPrompts'
import LifeStoryInputMethod from './LifeStoryInputMethod'
import LifeStoryVideoInput from './LifeStoryVideoInput'
import LifeStoryAudioInput from './LifeStoryAudioInput'
import LifeStoryTextInput from './LifeStoryTextInput'
import LifeStoryUploadComplete from './LifeStoryUploadComplete'
import LifeStoryProcessing from './LifeStoryProcessing'
import LifeStoryThumbnail from './LifeStoryThumbnail'
import LifeStoryEarlyConfirm1 from './LifeStoryEarlyConfirm1'
import LifeStoryEarlyConfirm2 from './LifeStoryEarlyConfirm2'
import LifeStoryEarlyConfirm3 from './LifeStoryEarlyConfirm3'
import LifeStoryEarlyConfirm4 from './LifeStoryEarlyConfirm4'
import LifeStoryEarlyConfirm5 from './LifeStoryEarlyConfirm5'
import LifeStoryProfessionalConfirm1 from './LifeStoryProfessionalConfirm1'
import LifeStoryProfessionalConfirm2 from './LifeStoryProfessionalConfirm2'
import LifeStoryProfessionalConfirm3 from './LifeStoryProfessionalConfirm3'
import LifeStoryCurrentConfirm1 from './LifeStoryCurrentConfirm1'
import LifeStoryCurrentConfirm2 from './LifeStoryCurrentConfirm2'
import LifeStoryCurrentConfirm3 from './LifeStoryCurrentConfirm3'
import LifeStoryCurrentConfirm4 from './LifeStoryCurrentConfirm4'

function LifeStoriesHub() {
  const {
    selectedLifeStory,
    lifeStorySubStep,
    profileData,
    backToLifeStorySelection,
    backToPrompts,
    backToInputMethod,
    backToThumbnail,
    backToConfirm1,
    backToConfirm2,
    backToConfirm3,
    backToConfirm4
  } = useOnboarding()

  // Get current input method for the selected story
  const currentInputMethod = selectedLifeStory
    ? profileData.lifeStories[selectedLifeStory].inputMethod
    : null

  // Custom back handler based on substep
  const getBackHandler = () => {
    switch (lifeStorySubStep) {
      case 'prompts':
        return backToLifeStorySelection
      case 'inputMethod':
        return backToPrompts
      case 'input':
        return backToPrompts
      case 'uploadComplete':
      case 'processing':
        // No back during upload/processing
        return null
      case 'thumbnail':
        return null // No back during thumbnail selection
      case 'confirm1':
        return backToThumbnail
      case 'confirm2':
        return backToConfirm1
      case 'confirm3':
        return backToConfirm2
      case 'confirm4':
        return backToConfirm3
      case 'confirm5':
        return backToConfirm4
      default:
        return null
    }
  }

  // Life Stories has its own independent step counter
  // The total number of confirm steps varies by story type:
  //   earlyLife: 5 confirm screens
  //   professional: 3 confirm screens
  //   current: 3 confirm screens
  const getLifeStoryStepInfo = () => {
    // Determine total confirm steps based on story type
    let totalConfirms = 3
    if (selectedLifeStory === 'earlyLife') {
      totalConfirms = 5
    } else if (selectedLifeStory === 'current') {
      totalConfirms = 4
    }

    const total = totalConfirms

    switch (lifeStorySubStep) {
      case 'prompts':        return { current: 0, total }
      case 'input':          return { current: 0, total }
      case 'uploadComplete': return { current: 0, total }
      case 'processing':     return { current: 0, total }
      case 'confirm1':       return { current: 0, total }
      case 'confirm2':       return { current: 1, total }
      case 'confirm3':       return { current: 2, total }
      case 'confirm4':       return { current: 3, total }
      case 'confirm5':       return { current: 4, total }
      default:               return { current: 0, total }
    }
  }

  // Render confirm1 component based on selected life story
  const renderConfirm1Component = () => {
    switch (selectedLifeStory) {
      case 'earlyLife':
        return <LifeStoryEarlyConfirm1 />
      case 'professional':
        return <LifeStoryProfessionalConfirm1 />
      case 'current':
        return <LifeStoryCurrentConfirm1 />
      default:
        return null
    }
  }

  // Render confirm2 component based on selected life story
  const renderConfirm2Component = () => {
    switch (selectedLifeStory) {
      case 'earlyLife':
        return <LifeStoryEarlyConfirm2 />
      case 'professional':
        return <LifeStoryProfessionalConfirm2 />
      case 'current':
        return <LifeStoryCurrentConfirm2 />
      default:
        return null
    }
  }

  // Render confirm3 component based on selected life story
  const renderConfirm3Component = () => {
    switch (selectedLifeStory) {
      case 'earlyLife':
        return <LifeStoryEarlyConfirm3 />
      case 'professional':
        return <LifeStoryProfessionalConfirm3 />
      case 'current':
        return <LifeStoryCurrentConfirm3 />
      default:
        return null
    }
  }

  // Render confirm4 component (earlyLife and current have this)
  const renderConfirm4Component = () => {
    switch (selectedLifeStory) {
      case 'earlyLife':
        return <LifeStoryEarlyConfirm4 />
      case 'current':
        return <LifeStoryCurrentConfirm4 />
      default:
        return null
    }
  }

  // Render confirm5 component (only earlyLife has this)
  const renderConfirm5Component = () => {
    switch (selectedLifeStory) {
      case 'earlyLife':
        return <LifeStoryEarlyConfirm5 />
      default:
        return null
    }
  }

  // Render the appropriate component based on substep
  const renderSubStep = () => {
    switch (lifeStorySubStep) {
      case 'selection':
        return <LifeStorySelection />

      case 'prompts':
        return <LifeStoryPrompts storyKey={selectedLifeStory} />

      case 'inputMethod':
        return <LifeStoryInputMethod storyKey={selectedLifeStory} />

      case 'input':
        if (currentInputMethod === 'video') {
          return <LifeStoryVideoInput storyKey={selectedLifeStory} />
        } else if (currentInputMethod === 'audio') {
          return <LifeStoryAudioInput storyKey={selectedLifeStory} />
        } else if (currentInputMethod === 'text') {
          return <LifeStoryTextInput storyKey={selectedLifeStory} />
        }
        return null

      case 'uploadComplete':
        return <LifeStoryUploadComplete storyKey={selectedLifeStory} />

      case 'processing':
        return <LifeStoryProcessing storyKey={selectedLifeStory} />

      case 'thumbnail':
        return <LifeStoryThumbnail storyKey={selectedLifeStory} />

      case 'confirm1':
        return renderConfirm1Component()

      case 'confirm2':
        return renderConfirm2Component()

      case 'confirm3':
        return renderConfirm3Component()

      case 'confirm4':
        return renderConfirm4Component()

      case 'confirm5':
        return renderConfirm5Component()

      default:
        return <LifeStorySelection />
    }
  }

  // For selection screen, don't show custom back - use default layout back
  if (lifeStorySubStep === 'selection') {
    return (
      <OnboardingLayout showProgress={false}>
        {renderSubStep()}
      </OnboardingLayout>
    )
  }

  // For prompts screen, hide progress bar (input method selection page)
  if (lifeStorySubStep === 'prompts') {
    return (
      <OnboardingLayout showProgress={false} customBackHandler={getBackHandler()}>
        {renderSubStep()}
      </OnboardingLayout>
    )
  }

  // For upload/processing screens, hide back button
  const showBack = !['uploadComplete', 'processing', 'thumbnail'].includes(lifeStorySubStep)

  // For other substeps, show custom back handler and custom progress
  return (
    <OnboardingLayout
      customBackHandler={getBackHandler()}
      customStepInfo={getLifeStoryStepInfo()}
      progressLabel="My Life Stories"
      showBack={showBack}
    >
      {renderSubStep()}
    </OnboardingLayout>
  )
}

export default LifeStoriesHub
