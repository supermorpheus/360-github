import { useState, useRef } from 'react'
import { useOnboarding } from '../../context/OnboardingContext'
import OnboardingLayout from './OnboardingLayout'

function OnboardingBasicInfo() {
  const { profileData, updateProfileData, nextStep } = useOnboarding()
  const [errors, setErrors] = useState({})
  const fileInputRef = useRef(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    updateProfileData({ [name]: value })

    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }))
    }
  }

  const handleProfilePictureClick = () => {
    fileInputRef.current?.click()
  }

  const handleProfilePictureChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      // Create preview URL
      const previewUrl = URL.createObjectURL(file)
      updateProfileData({
        profilePicture: file,
        profilePicturePreview: previewUrl
      })
    }
  }

  const getInitials = () => {
    const first = profileData.firstName?.charAt(0) || ''
    const last = profileData.lastName?.charAt(0) || ''
    return (first + last).toUpperCase() || 'YA'
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
      newErrors.inspiringQuote = 'Please share a quote that inspires you'
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
        </div>

        {/* Profile Picture */}
        <div className="profile-picture-section">
          <label className="input-label centered-label">Profile Picture *</label>
          <div
            className="profile-picture-upload"
            onClick={handleProfilePictureClick}
          >
            {profileData.profilePicturePreview ? (
              <img
                src={profileData.profilePicturePreview}
                alt="Profile"
                className="profile-picture-preview"
              />
            ) : (
              <div className="profile-picture-placeholder">
                <span className="profile-initials">{getInitials()}</span>
              </div>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleProfilePictureChange}
            style={{ display: 'none' }}
          />
        </div>

        {/* Name Fields */}
        <div className="input-group">
          <label className="input-label" htmlFor="firstName">First Name *</label>
          <div className={`input-with-icon-inline ${errors.firstName ? 'input-error' : ''}`}>
            <svg className="field-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="input-field input-field-icon"
              placeholder="e.g., John"
              value={profileData.firstName}
              onChange={handleChange}
            />
          </div>
          {errors.firstName && <span className="error-text">{errors.firstName}</span>}
        </div>

        <div className="input-group">
          <label className="input-label" htmlFor="middleName">Middle Name</label>
          <div className="input-with-icon-inline">
            <svg className="field-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <input
              type="text"
              id="middleName"
              name="middleName"
              className="input-field input-field-icon"
              placeholder="e.g., Fitzgerald"
              value={profileData.middleName || ''}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="input-group">
          <label className="input-label" htmlFor="lastName">Last Name *</label>
          <div className={`input-with-icon-inline ${errors.lastName ? 'input-error' : ''}`}>
            <svg className="field-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="input-field input-field-icon"
              placeholder="e.g., Kennedy"
              value={profileData.lastName}
              onChange={handleChange}
            />
          </div>
          {errors.lastName && <span className="error-text">{errors.lastName}</span>}
        </div>

        <div className="input-group">
          <label className="input-label" htmlFor="currentOrganization">Current Organization *</label>
          <div className={`input-with-icon-inline ${errors.currentOrganization ? 'input-error' : ''}`}>
            <svg className="field-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
            </svg>
            <input
              type="text"
              id="currentOrganization"
              name="currentOrganization"
              className="input-field input-field-icon"
              placeholder="Company or organization name"
              value={profileData.currentOrganization}
              onChange={handleChange}
            />
          </div>
          {errors.currentOrganization && <span className="error-text">{errors.currentOrganization}</span>}
        </div>

        <div className="input-group">
          <label className="input-label" htmlFor="currentRole">Current Role *</label>
          <div className={`input-with-icon-inline ${errors.currentRole ? 'input-error' : ''}`}>
            <svg className="field-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
            </svg>
            <input
              type="text"
              id="currentRole"
              name="currentRole"
              className="input-field input-field-icon"
              placeholder="e.g., Founder & CEO"
              value={profileData.currentRole}
              onChange={handleChange}
            />
          </div>
          {errors.currentRole && <span className="error-text">{errors.currentRole}</span>}
        </div>

        {/* Quote */}
        <div className="input-group">
          <label className="input-label" htmlFor="inspiringQuote">A quote that inspires me *</label>
          <div className={`input-field-with-icon textarea-field ${errors.inspiringQuote ? 'input-error' : ''}`}>
            <span className="input-icon quote-icon">"</span>
            <textarea
              id="inspiringQuote"
              name="inspiringQuote"
              className="input-naked"
              placeholder="This quote will be displayed as a part of your profile. Please provide the full quote along with the source."
              value={profileData.inspiringQuote}
              onChange={handleChange}
              rows={5}
            />
          </div>
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
