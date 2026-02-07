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
  // Progress only updates AFTER a data-entry step is COMPLETED.
  // Prompts page is just selection — not a data step.
  //   Video (4 data steps): input(record) → thumbnail → confirm1 → confirm2
  //   Audio (3 data steps): input(record) → confirm1 → confirm2
  //   Text  (2 data steps): confirm1(write) → confirm2(tags)
  const getLifeStoryProgress = () => {
    if (currentInputMethod === 'video') {
      // 4 data steps — each completed = 25%
      switch (lifeStorySubStep) {
        case 'prompts':        return 0   // no data entered yet
        case 'input':          return 0   // recording not done yet
        case 'uploadComplete': return 25  // recording done (1/4)
        case 'processing':     return 25  // auto step
        case 'thumbnail':      return 25  // selecting thumbnail
        case 'confirm1':       return 50  // thumbnail done (2/4)
        case 'confirm2':       return 75  // confirm1 done (3/4)
        default:               return 0
      }
    } else if (currentInputMethod === 'audio') {
      // 3 data steps — each completed = 33%
      switch (lifeStorySubStep) {
        case 'prompts':        return 0   // no data entered yet
        case 'input':          return 0   // recording not done yet
        case 'uploadComplete': return 33  // recording done (1/3)
        case 'processing':     return 33  // auto step
        case 'confirm1':       return 33  // filling summary
        case 'confirm2':       return 67  // confirm1 done (2/3)
        default:               return 0
      }
    } else {
      // Text: 2 data steps — each completed = 50%
      switch (lifeStorySubStep) {
        case 'prompts':        return 0   // no data entered yet
        case 'confirm1':       return 0   // writing not done yet
        case 'confirm2':       return 50  // confirm1 done (1/2)
        default:               return 0
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
