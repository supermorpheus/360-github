import { useOnboarding } from '../../context/OnboardingContext'
import OnboardingWelcome from './OnboardingWelcome'
import OnboardingBasicInfo from './OnboardingBasicInfo'
import OnboardingAbout from './OnboardingAbout'
import OnboardingSocial from './OnboardingSocial'
import OnboardingContent from './OnboardingContent'
import LifeStoriesHub from './LifeStoriesHub'
import OnboardingComplete from './OnboardingComplete'

function Onboarding() {
  const { currentStep } = useOnboarding()

  const steps = [
    <OnboardingWelcome key="welcome" />,
    <OnboardingBasicInfo key="basic-info" />,
    <OnboardingAbout key="about" />,
    <OnboardingSocial key="coordinates" />,
    <OnboardingContent key="content" />,
    <LifeStoriesHub key="life-stories" />,
    <OnboardingComplete key="complete" />
  ]

  return steps[currentStep] || steps[0]
}

export default Onboarding
