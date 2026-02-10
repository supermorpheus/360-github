import { useState, useRef, useEffect } from 'react'
import { useOnboarding, lifeStoryPrompts } from '../../context/OnboardingContext'

function LifeStoryProfessionalConfirm1() {
  const { profileData, updateLifeStory, goToConfirm2 } = useOnboarding()
  const storyData = profileData.lifeStories.professional
  const story = lifeStoryPrompts.professional

  // Local state
  const [selectedThumbnail, setSelectedThumbnail] = useState(0)
  const [customThumbnailPreview, setCustomThumbnailPreview] = useState(storyData.thumbnail || null)
  const [generatedThumbnails, setGeneratedThumbnails] = useState([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [summary, setSummary] = useState(storyData.summary || storyData.text || '')
  const [firstJob, setFirstJob] = useState(
    storyData.firstJob || { company: '', titles: [''] }
  )
  const [newTitle, setNewTitle] = useState('')
  const [showErrors, setShowErrors] = useState(false)

  const fileInputRef = useRef(null)
  const videoRef = useRef(null)

  // Word count helper
  const getWordCount = (text) => {
    return text.trim() ? text.trim().split(/\s+/).length : 0
  }

  const wordCount = getWordCount(summary)
  const maxWords = 100

  // Handle summary change with word limit
  const handleSummaryChange = (e) => {
    const text = e.target.value
    const words = text.trim().split(/\s+/)
    if (words.length <= maxWords || text.length < summary.length) {
      setSummary(text)
    }
  }

  // Generate thumbnails from video
  const generateThumbnails = () => {
    if (storyData.videoUrl && videoRef.current) {
      setIsGenerating(true)
      const video = videoRef.current
      video.src = storyData.videoUrl

      video.onloadeddata = () => {
        const duration = video.duration
        const offsets = [
          Math.random() * 0.2,
          0.2 + Math.random() * 0.2,
          0.4 + Math.random() * 0.2,
          0.6 + Math.random() * 0.3
        ]
        const timestamps = offsets.map(t => t * duration)
        const thumbnails = []

        const canvas = document.createElement('canvas')
        canvas.width = 320
        canvas.height = 180
        const ctx = canvas.getContext('2d')

        let loadedCount = 0

        timestamps.forEach((time, index) => {
          video.currentTime = time
          video.onseeked = () => {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
            thumbnails[index] = canvas.toDataURL('image/jpeg')
            loadedCount++

            if (loadedCount === timestamps.length) {
              setGeneratedThumbnails(thumbnails)
              setIsGenerating(false)
            }
          }
        })
      }
    }
  }

  useEffect(() => {
    if (storyData.videoUrl) {
      generateThumbnails()
    }
  }, [storyData.videoUrl])

  useEffect(() => {
    if (storyData.thumbnail && !generatedThumbnails.includes(storyData.thumbnail)) {
      setCustomThumbnailPreview(storyData.thumbnail)
      setSelectedThumbnail('custom')
    }
  }, [storyData.thumbnail])

  const handleRefresh = () => {
    generateThumbnails()
  }

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setCustomThumbnailPreview(reader.result)
        setSelectedThumbnail('custom')
      }
      reader.readAsDataURL(file)
    }
  }

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

  // Validation check
  const isValid = () => {
    if (!summary.trim()) return false
    // First job with company and at least one title
    if (!firstJob.company.trim()) return false
    const validTitles = firstJob.titles.filter(t => t.trim())
    if (validTitles.length === 0) return false
    return true
  }

  // Individual field error checks
  const getErrors = () => ({
    summary: !summary.trim() ? 'Please share a brief summary of your professional journey' : '',
    company: !firstJob.company.trim() ? 'Please enter your first company name' : '',
    titles: firstJob.titles.filter(t => t.trim()).length === 0 ? 'Please add at least one job title' : ''
  })

  const errors = getErrors()

  const handleContinue = () => {
    if (!isValid()) {
      setShowErrors(true)
      return
    }

    const thumbnailData = selectedThumbnail === 'custom'
      ? customThumbnailPreview
      : generatedThumbnails[selectedThumbnail] || storyData.thumbnail

    updateLifeStory('professional', {
      thumbnail: thumbnailData,
      summary,
      firstJob: firstJob.company.trim() ? {
        ...firstJob,
        titles: firstJob.titles.filter(t => t.trim())
      } : null
    })
    goToConfirm2()
  }

  const hasVideo = storyData.videoUrl && storyData.inputMethod === 'video'
  const isTextInput = storyData.inputMethod === 'text'

  return (
    <div className="onboarding-form">
      <div className="form-header story-header-sticky">
        <div className="story-header-row">
          <div className="story-header-icon">{story.icon}</div>
          <h1 className="form-title">{story.title}</h1>
        </div>
      </div>

      {/* Thumbnail Selection - Only for video */}
      {hasVideo && (
        <div className="thumbnail-section-card">
          <div className="thumbnail-section-header">
            <h2 className="thumbnail-section-title">Thumbnail Selection</h2>
            <div className="thumbnail-header-actions">
              <button
                type="button"
                className="thumbnail-action-btn"
                onClick={handleRefresh}
                disabled={isGenerating}
                title="Refresh thumbnails"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={isGenerating ? 'spin' : ''}>
                  <path d="M23 4v6h-6M1 20v-6h6"/>
                  <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
                </svg>
              </button>
              <button
                type="button"
                className="thumbnail-action-btn"
                onClick={() => fileInputRef.current?.click()}
                title="Upload custom thumbnail"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/>
                  <line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
              </button>
            </div>
          </div>

          <p className="thumbnail-section-description">
            These thumbnails are automatically generated from your video. You can select one, upload a custom thumbnail, or refresh to generate new options.
          </p>

          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
          <video ref={videoRef} style={{ display: 'none' }} />

          <div className="thumbnail-grid thumbnail-grid-small">
            {(() => {
              const thumbs = generatedThumbnails.length > 0
                ? generatedThumbnails.slice(0, 2)
                : [
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='180'%3E%3Crect fill='%23d5e8d4' width='320' height='180'/%3E%3Ctext x='160' y='95' text-anchor='middle' fill='%23608060' font-size='14' font-family='sans-serif'%3ESample 1%3C/text%3E%3C/svg%3E",
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='180'%3E%3Crect fill='%23e8d4e8' width='320' height='180'/%3E%3Ctext x='160' y='95' text-anchor='middle' fill='%23906090' font-size='14' font-family='sans-serif'%3ESample 2%3C/text%3E%3C/svg%3E"
                  ]
              return thumbs.map((thumb, index) => (
                <button
                  key={index}
                  type="button"
                  className={`thumbnail-option ${selectedThumbnail === index ? 'selected' : ''}`}
                  onClick={() => setSelectedThumbnail(index)}
                >
                  <img src={thumb} alt={`Thumbnail ${index + 1}`} />
                  {selectedThumbnail === index && (
                    <div className="thumbnail-selected-badge">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                  )}
                </button>
              ))
            })()}
          </div>

          {customThumbnailPreview && selectedThumbnail === 'custom' && (
            <div className="custom-thumbnail-inline">
              <img src={customThumbnailPreview} alt="Custom thumbnail" className="custom-thumb-preview" />
              <div className="thumbnail-selected-badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Professional Life Summary */}
      <div className="confirm-section">
        <label className="input-label">
          My Mid Life… <span className="required-asterisk">*</span>
        </label>
        <p className="field-hint">Max {maxWords} words</p>
        <textarea
          className={`input-field textarea-field ${showErrors && errors.summary ? 'input-error' : ''}`}
          placeholder="Record concise yet significant aspects of your mid life here, in a story form."
          value={summary}
          onChange={handleSummaryChange}
          rows={4}
        />
        {showErrors && errors.summary && (
          <p className="field-error">{errors.summary}</p>
        )}
        <p className={`word-counter ${wordCount > maxWords ? 'over-limit' : ''}`}>
          {wordCount} / {maxWords} words
        </p>
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

      <button className="btn-primary" onClick={handleContinue}>
        Continue
      </button>
    </div>
  )
}

export default LifeStoryProfessionalConfirm1
