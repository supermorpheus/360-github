import { useOnboarding } from '../../context/OnboardingContext'
import StatusBar from '../StatusBar'
import '../../styles/onboarding.css'

function OnboardingLayout({ children, showProgress = true, showBack = true, customBackHandler = null, customProgress = null }) {
  const { currentStep, totalSteps, prevStep } = useOnboarding()

  // Calculate progress percentage based on COMPLETED steps
  // Steps 1-10 are the onboarding flow (step 0 = welcome, step 11 = complete)
  // Progress only increases after a step is completed, not when you arrive at it
  // So: on step 1 (Share360 info page) = 0%, on step 2 (BasicInfo) = 10%, on step 3 = 20%, etc.
  const completableSteps = totalSteps - 2 // 10 completable steps (steps 1-10)
  const completedSteps = Math.max(0, currentStep - 1) // steps completed before current
  const stepProgress = Math.round((completedSteps / completableSteps) * 100)
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
