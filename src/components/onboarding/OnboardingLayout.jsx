import { useOnboarding } from '../../context/OnboardingContext'
import StatusBar from '../StatusBar'
import '../../styles/onboarding.css'

function OnboardingLayout({ children, showProgress = true, showBack = true, customBackHandler = null, customProgress = null }) {
  const { currentStep, totalSteps, prevStep } = useOnboarding()

  // Calculate progress percentage based on COMPLETED onboarding pages
  // 9 pages: Share360(1), BasicInfo(2), Professional(3), Quote(4), Intro(5),
  // Location(6), Joy(7), Social(8), Content(9)
  // Each completed page adds 100/9 ≈ 11%.
  // On Share360 (step 1) = 0%, on BasicInfo (step 2) = 11%, on Content (step 9) = 89%
  // Life Stories (step 10) has its own independent counter.
  const onboardingPages = 9
  const completedPages = Math.max(0, currentStep - 1) // step 1 is first page, 0 completed
  const stepProgress = Math.round((completedPages / onboardingPages) * 100)
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
