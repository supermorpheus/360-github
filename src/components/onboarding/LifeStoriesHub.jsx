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

  // Life Stories has its own independent progress counter (0% to 100%)
  // Different input methods have different step counts:
  //   Video (5 data steps): prompts → input(record) → thumbnail → confirm1 → confirm2
  //   Audio (4 data steps): prompts → input(record) → confirm1 → confirm2
  //   Text  (3 data steps): prompts → confirm1 → confirm2
  // Progress only updates AFTER a step where the user enters data is completed.
  // uploadComplete/processing are automated steps — progress stays at the previous value.
  const getLifeStoryProgress = () => {
    if (currentInputMethod === 'video') {
      // 5 data steps — each completed = 20%
      switch (lifeStorySubStep) {
        case 'prompts':       return 0    // nothing done yet
        case 'input':         return 20   // prompts done (1/5)
        case 'uploadComplete': return 40  // input done (2/5)
        case 'processing':    return 40   // auto step, same as upload
        case 'thumbnail':     return 40   // auto step, same
        case 'confirm1':      return 60   // thumbnail done (3/5)
        case 'confirm2':      return 80   // confirm1 done (4/5)
        default:              return 0
      }
    } else if (currentInputMethod === 'audio') {
      // 4 data steps — each completed = 25%
      switch (lifeStorySubStep) {
        case 'prompts':       return 0    // nothing done yet
        case 'input':         return 25   // prompts done (1/4)
        case 'uploadComplete': return 50  // input done (2/4)
        case 'processing':    return 50   // auto step, same
        case 'confirm1':      return 50   // processing done (2/4)
        case 'confirm2':      return 75   // confirm1 done (3/4)
        default:              return 0
      }
    } else {
      // Text: 3 data steps — each completed = 33%
      switch (lifeStorySubStep) {
        case 'prompts':       return 0    // nothing done yet
        case 'confirm1':      return 33   // prompts done (1/3)
        case 'confirm2':      return 67   // confirm1 done (2/3)
        default:              return 0
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

  // For upload/processing screens, hide back button
  const showBack = !['uploadComplete', 'processing', 'thumbnail'].includes(lifeStorySubStep)

  // For other substeps, show custom back handler and custom progress
  return (
    <OnboardingLayout
      customBackHandler={getBackHandler()}
      customProgress={getLifeStoryProgress()}
      showBack={showBack}
    >
      {renderSubStep()}
    </OnboardingLayout>
  )
}

export default LifeStoriesHub
