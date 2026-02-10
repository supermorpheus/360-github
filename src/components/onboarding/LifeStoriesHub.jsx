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
import LifeStoryProfessionalConfirm1 from './LifeStoryProfessionalConfirm1'
import LifeStoryProfessionalConfirm2 from './LifeStoryProfessionalConfirm2'
import LifeStoryCurrentConfirm1 from './LifeStoryCurrentConfirm1'
import LifeStoryCurrentConfirm2 from './LifeStoryCurrentConfirm2'

function LifeStoriesHub() {
  const {
    selectedLifeStory,
    lifeStorySubStep,
    profileData,
    backToLifeStorySelection,
    backToPrompts,
    backToInputMethod,
    backToThumbnail,
    backToConfirm1
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
      default:
        return null
    }
  }

  // Life Stories has its own independent step counter
  // Progress only updates AFTER a data-entry step is COMPLETED.
  // Prompts page is just selection — not a data step.
  // Returns { current: completedSteps, total: totalDataSteps }
  //   Video (4 data steps): input(record) → thumbnail → confirm1 → confirm2
  //   Audio (3 data steps): input(record) → confirm1 → confirm2
  //   Text  (2 data steps): confirm1(write) → confirm2(tags)
  const getLifeStoryStepInfo = () => {
    if (currentInputMethod === 'video') {
      const total = 4
      switch (lifeStorySubStep) {
        case 'prompts':        return { current: 0, total }
        case 'input':          return { current: 0, total }
        case 'uploadComplete': return { current: 1, total } // recording done
        case 'processing':     return { current: 1, total }
        case 'thumbnail':      return { current: 1, total }
        case 'confirm1':       return { current: 2, total } // thumbnail done
        case 'confirm2':       return { current: 3, total } // confirm1 done
        default:               return { current: 0, total }
      }
    } else if (currentInputMethod === 'audio') {
      const total = 3
      switch (lifeStorySubStep) {
        case 'prompts':        return { current: 0, total }
        case 'input':          return { current: 0, total }
        case 'uploadComplete': return { current: 1, total } // recording done
        case 'processing':     return { current: 1, total }
        case 'confirm1':       return { current: 1, total }
        case 'confirm2':       return { current: 2, total } // confirm1 done
        default:               return { current: 0, total }
      }
    } else {
      const total = 2
      switch (lifeStorySubStep) {
        case 'prompts':        return { current: 0, total }
        case 'confirm1':       return { current: 0, total }
        case 'confirm2':       return { current: 1, total } // confirm1 done
        default:               return { current: 0, total }
      }
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
