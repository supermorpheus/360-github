import { useOnboarding } from '../../context/OnboardingContext'
import OnboardingLayout from './OnboardingLayout'

function OnboardingWelcome() {
  const { nextStep } = useOnboarding()

  return (
    <OnboardingLayout showProgress={false} showBack={false}>
      <div className="welcome-screen">
        {/* SuperMorpheus Logo - Top Left */}
        <div className="welcome-sm-logo">
          <img
            src="/360-github/SM Logo .jpeg"
            alt="Super Morpheus"
            className="welcome-sm-logo-img"
          />
        </div>

        {/* Circular Flower Logo - Center */}
        <div className="welcome-logo">
          <img
            src="/360-github/SM_Color_Whole.jpeg"
            alt="Gang 360"
            className="welcome-logo-img"
          />
        </div>

        {/* Gang 360 Title */}
        <div className="welcome-content">
          <h1 className="welcome-title">gang 360</h1>
        </div>

        {/* Tagline */}
        <div className="welcome-tagline">
          <img
            src="/360-github/place for good people text.png"
            alt="A place for good people to come together."
            className="welcome-tagline-img"
          />
        </div>

        {/* CTA Button */}
        <button className="btn-primary welcome-cta" onClick={nextStep}>
          Enter the rabbit hole
        </button>

        <p className="welcome-time-note">
          This will take about 10 minutes
        </p>
      </div>
    </OnboardingLayout>
  )
}

export default OnboardingWelcome
