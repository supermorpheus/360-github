import { useOnboarding } from '../../context/OnboardingContext'
import OnboardingLayout from './OnboardingLayout'

function OnboardingShare360() {
  const { nextStep } = useOnboarding()

  return (
    <OnboardingLayout showProgress={false}>
      <div className="share360-screen">
        <div className="share360-content">
          <h1 className="share360-title">Create Your Profile</h1>

          <p className="share360-message">
            Gang 360 is a private community platform where we can share 360 degrees of our lives—thoughts, struggles, wins, chaos, clarity—with people we don't just know, but trust.
          </p>

          <p className="share360-message">
            As you step in, move with awareness. Be silent. Be self-aware, authentic, open, fearless— quirky, intense, and unapologetically you.
          </p>

        </div>

        <button className="btn-primary" onClick={nextStep}>
          Go forth, Carpe Diem!
        </button>
      </div>
    </OnboardingLayout>
  )
}

export default OnboardingShare360
