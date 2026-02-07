import { useOnboarding } from '../../context/OnboardingContext'
import StatusBar from '../StatusBar'
import '../../styles/onboarding.css'

function OnboardingLayout({ children, showProgress = true, showBack = true, customBackHandler = null, customProgress = null }) {
  const { currentStep, totalSteps, prevStep } = useOnboarding()

  // Calculate progress percentage based on COMPLETED data-entry steps only
  // Steps 0-1 are info pages (Welcome, Share360) — no data added, 0%
  // Steps 2-10 are data-entry pages (9 total) — progress increases after each is completed
  // So: arriving at BasicInfo (step 2) = 0%, completing it and arriving at step 3 = 11%, etc.
  const firstDataStep = 2 // BasicInfo is the first data-entry step
  const dataSteps = 9 // Steps 2-10 (BasicInfo through LifeStories)
  const completedDataSteps = Math.max(0, currentStep - firstDataStep)
  const stepProgress = Math.round((completedDataSteps / dataSteps) * 100)
  const defaultProgress = Math.min(stepProgress, 100)

  const progressPercentage = customProgress !== null ? customProgress : defaultProgress

  // Use custom back handler if provided, otherwise use default prevStep
  const handleBack = customBackHandler || prevStep

  return (
    <>
      <StatusBar />
      <div className="page-content">
        <div className="onboarding-screen">
          {/* Back Button */}
          {showBack && currentStep > 0 && currentStep < totalSteps - 1 && (
            <button className="onboarding-back-btn" onClick={handleBack}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </button>
          )}

          {/* Progress Section - Simple percentage + bar */}
          {showProgress && currentStep > 0 && currentStep < totalSteps - 1 && (
            <div className="onboarding-progress-simple">
              <div className="progress-percentage-large">{progressPercentage}% Complete</div>
              <div className="progress-bar-container">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          )}

          {/* Content */}
          <div className={`onboarding-content ${!showProgress && currentStep > 0 ? 'no-progress' : ''}`}>
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

export default OnboardingLayout
