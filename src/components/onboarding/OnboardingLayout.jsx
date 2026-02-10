import { useOnboarding } from '../../context/OnboardingContext'
import StatusBar from '../StatusBar'
import '../../styles/onboarding.css'

function OnboardingLayout({ children, showProgress = true, showBack = true, customBackHandler = null, customStepInfo = null, progressLabel = 'Creating Profile' }) {
  const { currentStep, totalSteps, prevStep } = useOnboarding()

  // Calculate step info based on COMPLETED data-entry pages
  // 8 data pages: BasicInfo(2), Professional(3), Quote(4), Intro(5),
  // Location(6), Joy(7), Social(8), Content(9)
  // Share360(1) is info-only and doesn't count.
  // Life Stories (step 10) has its own independent counter via customStepInfo.
  const dataPages = 8
  const firstDataStep = 2 // BasicInfo
  const completedPages = Math.max(0, currentStep - firstDataStep)
  const defaultStepInfo = { current: Math.min(completedPages, dataPages), total: dataPages }

  const stepInfo = customStepInfo !== null ? customStepInfo : defaultStepInfo

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

          {/* Progress Section - Step counter + segmented bar */}
          {showProgress && currentStep > 0 && currentStep < totalSteps - 1 && (
            <div className="onboarding-progress-simple">
              <div className="progress-header-row">
                <div className="progress-label">{progressLabel}</div>
                <div className="progress-step-text">Step {stepInfo.current + 1} of {stepInfo.total}</div>
              </div>
              <div className="progress-bar-segmented">
                {Array.from({ length: stepInfo.total }, (_, i) => (
                  <div
                    key={i}
                    className={`progress-segment ${i <= stepInfo.current ? 'completed' : ''}`}
                  />
                ))}
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
