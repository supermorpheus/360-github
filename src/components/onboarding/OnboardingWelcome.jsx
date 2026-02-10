import { useOnboarding } from '../../context/OnboardingContext'
import OnboardingLayout from './OnboardingLayout'

function OnboardingWelcome() {
  const { nextStep } = useOnboarding()

  return (
    <OnboardingLayout showProgress={false} showBack={false}>
      <div className="welcome-screen">
        {/* SuperMorpheus Full Logo */}
        <div className="welcome-logo">
          <img
            src="/360-github/SM_Color_Whole.jpeg"
            alt="Super Morpheus"
            className="welcome-logo-img"
          />
        </div>

        {/* Welcome Content */}
        <div className="welcome-content">
          <h1 className="welcome-title">Welcome to Gang 360</h1>
        </div>

        {/* Tagline */}
        <div className="welcome-tagline">
          <p>A place for good people to come together.</p>
        </div>

        {/* CTA Button */}
        <button className="btn-primary welcome-cta" onClick={nextStep}>
          Enter the rabbit hole.
        </button>

        <p className="welcome-time-note">
          This will take about 10 minutes
        </p>
      </div>
    </OnboardingLayout>
  )
}

export default OnboardingWelcome
