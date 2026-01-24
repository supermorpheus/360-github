import { useState } from 'react'
import { useOnboarding } from '../../context/OnboardingContext'
import OnboardingLayout from './OnboardingLayout'

function OnboardingSocial() {
  const { profileData, updateProfileData, nextStep } = useOnboarding()
  const [errors, setErrors] = useState({})
  const [newContentLink, setNewContentLink] = useState('')
  const [newSocialLink, setNewSocialLink] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    updateProfileData({ [name]: value })

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }))
    }
  }

  const isValidUrl = (url) => {
    if (!url) return true // Empty is valid (optional field)
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const addContentLink = () => {
    if (!newContentLink.trim()) return

    if (!isValidUrl(newContentLink)) {
      setErrors(prev => ({ ...prev, contentLink: 'Please enter a valid URL' }))
      return
    }

    const currentLinks = profileData.contentLinks || []
    updateProfileData({
      contentLinks: [...currentLinks, newContentLink.trim()]
    })
    setNewContentLink('')
    setErrors(prev => ({ ...prev, contentLink: null }))
  }

  const removeContentLink = (index) => {
    const currentLinks = [...(profileData.contentLinks || [])]
    currentLinks.splice(index, 1)
    updateProfileData({ contentLinks: currentLinks })
  }

  const addSocialLink = () => {
    if (!newSocialLink.trim()) return

    if (!isValidUrl(newSocialLink)) {
      setErrors(prev => ({ ...prev, socialLink: 'Please enter a valid URL' }))
      return
    }

    const currentLinks = profileData.otherSocialLinks || []
    updateProfileData({
      otherSocialLinks: [...currentLinks, newSocialLink.trim()]
    })
    setNewSocialLink('')
    setErrors(prev => ({ ...prev, socialLink: null }))
  }

  const removeSocialLink = (index) => {
    const currentLinks = [...(profileData.otherSocialLinks || [])]
    currentLinks.splice(index, 1)
    updateProfileData({ otherSocialLinks: currentLinks })
  }

  const validateAndNext = () => {
    const newErrors = {}

    // Validate URLs if provided
    if (profileData.twitter && !isValidUrl(profileData.twitter)) {
      newErrors.twitter = 'Please enter a valid URL'
    }
    if (profileData.instagram && !isValidUrl(profileData.instagram)) {
      newErrors.instagram = 'Please enter a valid URL'
    }
    if (profileData.linkedin && !isValidUrl(profileData.linkedin)) {
      newErrors.linkedin = 'Please enter a valid URL'
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
          <h1 className="form-title">Connect & Share</h1>
          <p className="form-subtitle">Add your social profiles and content links</p>
        </div>

        {/* Contact Info (Read-only display) */}
        <div className="section-divider">
          <span className="section-label">Contact Information</span>
        </div>

        <div className="readonly-fields">
          <div className="input-group">
            <label className="input-label">Email</label>
            <div className="input-field readonly">
              {profileData.email || 'your@email.com'}
              <span className="readonly-badge">From account</span>
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Mobile</label>
            <div className="input-field readonly">
              {profileData.mobile || 'Add in profile settings'}
              <span className="readonly-badge">From account</span>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="section-divider">
          <span className="section-label">Social Profiles</span>
        </div>

        <div className="input-group">
          <label className="input-label" htmlFor="twitter">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="input-icon">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            X (Twitter)
          </label>
          <input
            type="url"
            id="twitter"
            name="twitter"
            className={`input-field ${errors.twitter ? 'input-error' : ''}`}
            placeholder="https://x.com/username"
            value={profileData.twitter}
            onChange={handleChange}
          />
          {errors.twitter && <span className="error-text">{errors.twitter}</span>}
        </div>

        <div className="input-group">
          <label className="input-label" htmlFor="instagram">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="input-icon">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            Instagram
          </label>
          <input
            type="url"
            id="instagram"
            name="instagram"
            className={`input-field ${errors.instagram ? 'input-error' : ''}`}
            placeholder="https://instagram.com/username"
            value={profileData.instagram}
            onChange={handleChange}
          />
          {errors.instagram && <span className="error-text">{errors.instagram}</span>}
        </div>

        <div className="input-group">
          <label className="input-label" htmlFor="linkedin">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="input-icon">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn
          </label>
          <input
            type="url"
            id="linkedin"
            name="linkedin"
            className={`input-field ${errors.linkedin ? 'input-error' : ''}`}
            placeholder="https://linkedin.com/in/username"
            value={profileData.linkedin}
            onChange={handleChange}
          />
          {errors.linkedin && <span className="error-text">{errors.linkedin}</span>}
        </div>

        {/* Content Links */}
        <div className="section-divider">
          <span className="section-label">Content Links</span>
          <span className="section-hint">Blogs, videos, podcasts, etc.</span>
        </div>

        <div className="dynamic-links-section">
          {(profileData.contentLinks || []).map((link, index) => (
            <div key={index} className="link-item">
              <a href={link} target="_blank" rel="noopener noreferrer" className="link-text">
                {link}
              </a>
              <button
                type="button"
                className="link-remove-btn"
                onClick={() => removeContentLink(index)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                </svg>
              </button>
            </div>
          ))}

          <div className="add-link-row">
            <input
              type="url"
              className={`input-field ${errors.contentLink ? 'input-error' : ''}`}
              placeholder="https://your-content-link.com"
              value={newContentLink}
              onChange={(e) => setNewContentLink(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addContentLink())}
            />
            <button type="button" className="add-link-btn" onClick={addContentLink}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            </button>
          </div>
          {errors.contentLink && <span className="error-text">{errors.contentLink}</span>}
        </div>

        {/* Other Social Handles */}
        <div className="section-divider">
          <span className="section-label">Other Social Handles</span>
        </div>

        <div className="dynamic-links-section">
          {(profileData.otherSocialLinks || []).map((link, index) => (
            <div key={index} className="link-item">
              <a href={link} target="_blank" rel="noopener noreferrer" className="link-text">
                {link}
              </a>
              <button
                type="button"
                className="link-remove-btn"
                onClick={() => removeSocialLink(index)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                </svg>
              </button>
            </div>
          ))}

          <div className="add-link-row">
            <input
              type="url"
              className={`input-field ${errors.socialLink ? 'input-error' : ''}`}
              placeholder="https://your-social-profile.com"
              value={newSocialLink}
              onChange={(e) => setNewSocialLink(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSocialLink())}
            />
            <button type="button" className="add-link-btn" onClick={addSocialLink}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            </button>
          </div>
          {errors.socialLink && <span className="error-text">{errors.socialLink}</span>}
        </div>

        {/* Continue Button */}
        <button className="btn-primary" onClick={validateAndNext}>
          Complete Setup
        </button>

        <p className="skip-note">
          You can add more links later in your profile settings
        </p>
      </div>
    </OnboardingLayout>
  )
}

export default OnboardingSocial
