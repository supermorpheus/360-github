import { useState, useRef } from 'react'
import { useOnboarding } from '../../context/OnboardingContext'
import OnboardingLayout from './OnboardingLayout'

function OnboardingBasicInfo() {
  const { profileData, updateProfileData, nextStep } = useOnboarding()
  const fileInputRef = useRef(null)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    updateProfileData({ [name]: value })

    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }))
    }
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, profilePicture: 'Image must be less than 5MB' }))
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        updateProfileData({
          profilePicture: file,
          profilePicturePreview: reader.result
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const validateAndNext = () => {
    const newErrors = {}

    if (!profileData.firstName?.trim()) {
      newErrors.firstName = 'First name is required'
    }
    if (!profileData.lastName?.trim()) {
      newErrors.lastName = 'Last name is required'
    }
    if (!profileData.currentOrganization?.trim()) {
      newErrors.currentOrganization = 'Organization is required'
    }
    if (!profileData.currentRole?.trim()) {
      newErrors.currentRole = 'Role is required'
    }
    if (!profileData.inspiringQuote?.trim()) {
      newErrors.inspiringQuote = 'Quote is required'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    nextStep()
  }

  return (
    <OnboardingLayout>
      <div className="onboarding-form">
        <div className="form-header">
          <h1 className="form-title">Basic Information</h1>
          <p className="form-subtitle">Tell us about yourself</p>
        </div>

        {/* Profile Picture Upload */}
        <div className="profile-picture-upload">
          <div
            className="profile-picture-preview"
            onClick={() => fileInputRef.current?.click()}
          >
            {profileData.profilePicturePreview ? (
              <img src={profileData.profilePicturePreview} alt="Profile preview" />
            ) : (
              <div className="profile-picture-placeholder">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                <span>Add Photo</span>
              </div>
            )}
            <div className="profile-picture-overlay">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                <circle cx="12" cy="13" r="4"/>
              </svg>
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
          {errors.profilePicture && <span className="error-text">{errors.profilePicture}</span>}
        </div>

        {/* Name Fields */}
        <div className="form-row">
          <div className="input-group">
            <label className="input-label" htmlFor="firstName">First Name *</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className={`input-field ${errors.firstName ? 'input-error' : ''}`}
              placeholder="e.g., John"
              value={profileData.firstName}
              onChange={handleChange}
            />
            {errors.firstName && <span className="error-text">{errors.firstName}</span>}
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="middleName">Middle Name</label>
            <input
              type="text"
              id="middleName"
              name="middleName"
              className="input-field"
              placeholder="e.g., Fitzgerald"
              value={profileData.middleName}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="input-group">
          <label className="input-label" htmlFor="lastName">Last Name *</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className={`input-field ${errors.lastName ? 'input-error' : ''}`}
            placeholder="e.g., Kennedy"
            value={profileData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <span className="error-text">{errors.lastName}</span>}
        </div>

        <div className="input-group">
          <label className="input-label" htmlFor="currentOrganization">Current Organization *</label>
          <input
            type="text"
            id="currentOrganization"
            name="currentOrganization"
            className={`input-field ${errors.currentOrganization ? 'input-error' : ''}`}
            placeholder="Company or organization name"
            value={profileData.currentOrganization}
            onChange={handleChange}
          />
          {errors.currentOrganization && <span className="error-text">{errors.currentOrganization}</span>}
        </div>

        <div className="input-group">
          <label className="input-label" htmlFor="currentRole">Current Role *</label>
          <input
            type="text"
            id="currentRole"
            name="currentRole"
            className={`input-field ${errors.currentRole ? 'input-error' : ''}`}
            placeholder="e.g., Founder & CEO"
            value={profileData.currentRole}
            onChange={handleChange}
          />
          {errors.currentRole && <span className="error-text">{errors.currentRole}</span>}
        </div>

        <div className="input-group">
          <label className="input-label" htmlFor="inspiringQuote">A Quote That Inspires You *</label>
          <textarea
            id="inspiringQuote"
            name="inspiringQuote"
            className={`input-field textarea-field ${errors.inspiringQuote ? 'input-error' : ''}`}
            placeholder="Share a quote that motivates you, along with its source"
            value={profileData.inspiringQuote}
            onChange={handleChange}
            rows={3}
          />
          {errors.inspiringQuote && <span className="error-text">{errors.inspiringQuote}</span>}
        </div>

        {/* Continue Button */}
        <button className="btn-primary" onClick={validateAndNext}>
          Continue
        </button>
      </div>
    </OnboardingLayout>
  )
}

export default OnboardingBasicInfo
