import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import OnboardingLayout from './OnboardingLayout'

function OnboardingComplete() {
  const navigate = useNavigate()
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          navigate('/dashboard')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [navigate])

  return (
    <OnboardingLayout showProgress={false} showBack={false}>
      <div className="complete-screen complete-screen-simple">
        {/* Success Icon */}
        <div className="complete-icon complete-icon-animated">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
        </div>

        {/* Message */}
        <div className="complete-content">
          <h1 className="complete-title">You're All Set!</h1>
          <p className="complete-subtitle">
            Welcome to Gang 360.
          </p>
        </div>

        {/* Redirect Notice */}
        <p className="redirect-notice">
          Redirecting you to the home page in {countdown} second{countdown !== 1 ? 's' : ''}...
        </p>

        {/* Loading Animation */}
        <div className="redirect-loader">
          <div className="redirect-loader-bar">
            <div className="redirect-loader-fill" />
          </div>
        </div>
      </div>
    </OnboardingLayout>
  )
}

export default OnboardingComplete
