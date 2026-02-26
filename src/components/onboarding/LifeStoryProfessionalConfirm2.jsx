import { useState } from 'react'
import { useOnboarding, lifeStoryPrompts } from '../../context/OnboardingContext'

function LifeStoryProfessionalConfirm2() {
  const { profileData, updateLifeStory, goToConfirm3 } = useOnboarding()
  const storyData = profileData.lifeStories.professional
  const story = lifeStoryPrompts.professional

  // Local state - First Job
  const [firstJob, setFirstJob] = useState(
    storyData.firstJob || { company: '', titles: [''] }
  )
  const [newTitle, setNewTitle] = useState('')

  // Local state - Subsequent Jobs
  const [subsequentJobs, setSubsequentJobs] = useState(
    storyData.subsequentJobs.length > 0
      ? storyData.subsequentJobs.map(job => ({
          ...job,
          newTitle: ''
        }))
      : [{ company: '', titles: [], newTitle: '' }]
  )
  const [showErrors, setShowErrors] = useState(false)

  // First Job handlers
  const updateFirstJobCompany = (value) => {
    setFirstJob({ ...firstJob, company: value })
  }

  const addTitle = () => {
    if (newTitle.trim()) {
      setFirstJob({ ...firstJob, titles: [...firstJob.titles.filter(t => t), newTitle.trim()] })
      setNewTitle('')
    }
  }

  const removeTitle = (index) => {
    const filtered = firstJob.titles.filter((_, i) => i !== index)
    setFirstJob({ ...firstJob, titles: filtered.length > 0 ? filtered : [''] })
  }

  const handleTitleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTitle()
    }
  }

  // Subsequent Jobs handlers
  const updateSubsequentJob = (index, field, value) => {
    const updated = [...subsequentJobs]
    updated[index][field] = value
    setSubsequentJobs(updated)
  }

  const addSubsequentJobTitle = (jobIndex) => {
    const job = subsequentJobs[jobIndex]
    if (job.newTitle && job.newTitle.trim()) {
      const updated = [...subsequentJobs]
      updated[jobIndex].titles = [...(updated[jobIndex].titles || []), job.newTitle.trim()]
      updated[jobIndex].newTitle = ''
      setSubsequentJobs(updated)
    }
  }

  const removeSubsequentJobTitle = (jobIndex, titleIndex) => {
    const updated = [...subsequentJobs]
    updated[jobIndex].titles = updated[jobIndex].titles.filter((_, i) => i !== titleIndex)
    setSubsequentJobs(updated)
  }

  const handleSubsequentTitleKeyPress = (e, jobIndex) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addSubsequentJobTitle(jobIndex)
    }
  }

  const addSubsequentJob = () => {
    setSubsequentJobs([...subsequentJobs, { company: '', titles: [], newTitle: '' }])
  }

  const removeSubsequentJob = (index) => {
    if (subsequentJobs.length > 1) {
      setSubsequentJobs(subsequentJobs.filter((_, i) => i !== index))
    }
  }

  // Validation check
  const isValid = () => {
    // First job with company and at least one title
    if (!firstJob.company.trim()) return false
    const validTitles = firstJob.titles.filter(t => t.trim())
    if (validTitles.length === 0) return false
    return true
  }

  // Individual field error checks
  const getErrors = () => ({
    company: !firstJob.company.trim() ? 'Please enter your first company name' : '',
    titles: firstJob.titles.filter(t => t.trim()).length === 0 ? 'Please add at least one job title' : ''
  })

  const errors = getErrors()

  const handleContinue = () => {
    if (!isValid()) {
      setShowErrors(true)
      return
    }

    updateLifeStory('professional', {
      firstJob: firstJob.company.trim() ? {
        ...firstJob,
        titles: firstJob.titles.filter(t => t.trim())
      } : null,
      subsequentJobs: subsequentJobs
        .filter(j => j.company.trim())
        .map(j => ({
          company: j.company,
          titles: j.titles || []
        }))
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

      {/* First Job */}
      <div className="confirm-section">
        <h3 className="section-title-bold">First Job</h3>
        <div className="entry-card">
          <div className="entry-fields">
            <div className="input-group">
              <label className="input-label small">
                Company Name <span className="required-asterisk">*</span>
              </label>
              <input
                type="text"
                className={`input-field ${showErrors && errors.company ? 'input-error' : ''}`}
                placeholder="eg: Google, Facebook, etc"
                value={firstJob.company}
                onChange={(e) => updateFirstJobCompany(e.target.value)}
              />
              {showErrors && errors.company && (
                <p className="field-error">{errors.company}</p>
              )}
            </div>
            <div className="input-group">
              <label className="input-label small">
                Job Titles <span className="required-asterisk">*</span>
              </label>
              {firstJob.titles.filter(t => t).length > 0 && (
                <div className="tags-container">
                  {firstJob.titles.filter(t => t).map((title, idx) => (
                    <span key={idx} className="tag">
                      {title}
                      <button type="button" className="tag-remove" onClick={() => removeTitle(idx)}>×</button>
                    </span>
                  ))}
                </div>
              )}
              <input
                type="text"
                className={`input-field ${showErrors && errors.titles ? 'input-error' : ''}`}
                placeholder="Add a title (eg: Analyst, Director, etc..) and press Enter"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                onKeyPress={handleTitleKeyPress}
              />
              {showErrors && errors.titles && (
                <p className="field-error">{errors.titles}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Subsequent Jobs */}
      <div className="confirm-section">
        <h3 className="section-title-bold">Subsequent Jobs</h3>
        {subsequentJobs.map((job, jobIdx) => (
          <div key={jobIdx} className="entry-card">
            <div className="entry-fields">
              <div className="input-group">
                <label className="input-label small">Company Name</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="eg: Google, Facebook, etc"
                  value={job.company}
                  onChange={(e) => updateSubsequentJob(jobIdx, 'company', e.target.value)}
                />
              </div>
              <div className="input-group">
                <label className="input-label small">Job Titles</label>
                {(job.titles || []).length > 0 && (
                  <div className="tags-container">
                    {(job.titles || []).map((title, titleIdx) => (
                      <span key={titleIdx} className="tag">
                        {title}
                        <button type="button" className="tag-remove" onClick={() => removeSubsequentJobTitle(jobIdx, titleIdx)}>×</button>
                      </span>
                    ))}
                  </div>
                )}
                <input
                  type="text"
                  className="input-field"
                  placeholder="Add a title (eg: Analyst, Director, etc..) and press Enter"
                  value={job.newTitle || ''}
                  onChange={(e) => updateSubsequentJob(jobIdx, 'newTitle', e.target.value)}
                  onKeyPress={(e) => handleSubsequentTitleKeyPress(e, jobIdx)}
                />
              </div>
            </div>
            {subsequentJobs.length > 1 && (
              <button type="button" className="entry-remove-btn" onClick={() => removeSubsequentJob(jobIdx)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                </svg>
              </button>
            )}
          </div>
        ))}
        <button type="button" className="add-entry-btn-dashed" onClick={addSubsequentJob}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Add Another Job
        </button>
      </div>

      <button className="btn-primary" onClick={handleContinue}>
        Continue
      </button>
    </div>
  )
}

export default LifeStoryProfessionalConfirm2
