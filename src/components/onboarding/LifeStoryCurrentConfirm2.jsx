import { useState } from 'react'
import { useOnboarding, lifeStoryPrompts } from '../../context/OnboardingContext'

function LifeStoryCurrentConfirm2() {
  const { profileData, updateLifeStory, goToConfirm3 } = useOnboarding()
  const storyData = profileData.lifeStories.current
  const story = lifeStoryPrompts.current

  // Local state
  const [organizations, setOrganizations] = useState(
    (storyData.organizations && storyData.organizations.length > 0)
      ? storyData.organizations
      : (storyData.rolesOrganizations && storyData.rolesOrganizations.length > 0)
        ? storyData.rolesOrganizations.map(r => ({ name: r.organization, role: r.role }))
        : [{ name: '', role: '' }]
  )
  const [showErrors, setShowErrors] = useState(false)

  // Organization handlers
  const updateOrganization = (index, field, value) => {
    const updated = [...organizations]
    updated[index][field] = value
    setOrganizations(updated)
  }

  const addOrganization = () => {
    setOrganizations([...organizations, { name: '', role: '' }])
  }

  const removeOrganization = (index) => {
    if (organizations.length > 1) {
      setOrganizations(organizations.filter((_, i) => i !== index))
    }
  }

  // Validation check
  const isValid = () => {
    const validOrgs = organizations.filter(o => o.name.trim() && o.role.trim())
    if (validOrgs.length === 0) return false
    return true
  }

  // Individual field error checks
  const getErrors = () => ({
    organizations: organizations.filter(o => o.name.trim() && o.role.trim()).length === 0
      ? 'Please add at least one organization with name and role' : ''
  })

  const errors = getErrors()

  const handleContinue = () => {
    if (!isValid()) {
      setShowErrors(true)
      return
    }

    updateLifeStory('current', {
      organizations: organizations.filter(o => o.name.trim())
    })
    goToConfirm3()
  }

  return (
    <div className="onboarding-form">
      <div className="form-header story-header-sticky">
        <div className="story-header-row">
          <div className="story-header-icon">{story.icon}</div>
          <h1 className="form-title">{story.title}</h1>
        </div>
        <p className="form-subtitle" style={{ textTransform: 'none' }}>{story.subtitle}</p>
      </div>

      {/* Current Organizations */}
      <div className="confirm-section">
        <h3 className="section-title-bold">Current Organizations</h3>
        {showErrors && errors.organizations && (
          <p className="field-error section-error">{errors.organizations}</p>
        )}
        {organizations.map((org, idx) => (
          <div key={idx} className="entry-card">
            <div className="entry-fields">
              <div className="input-group">
                <label className="input-label small">
                  Name <span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  className={`input-field ${showErrors && errors.organizations && !org.name.trim() ? 'input-error' : ''}`}
                  placeholder="Organization name"
                  value={org.name}
                  onChange={(e) => updateOrganization(idx, 'name', e.target.value)}
                />
              </div>
              <div className="input-group">
                <label className="input-label small">
                  Role <span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  className={`input-field ${showErrors && errors.organizations && !org.role.trim() ? 'input-error' : ''}`}
                  placeholder="Your role"
                  value={org.role}
                  onChange={(e) => updateOrganization(idx, 'role', e.target.value)}
                />
              </div>
            </div>
            {organizations.length > 1 && (
              <button type="button" className="entry-remove-btn" onClick={() => removeOrganization(idx)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                </svg>
              </button>
            )}
          </div>
        ))}
        <button type="button" className="add-entry-btn-dashed" onClick={addOrganization}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Add Organization
        </button>
      </div>

      <button className="btn-primary" onClick={handleContinue}>
        Continue
      </button>
    </div>
  )
}

export default LifeStoryCurrentConfirm2
