import { useState, useRef, useEffect } from 'react'
import { useOnboarding, lifeStoryPrompts } from '../../context/OnboardingContext'

function LifeStoryEarlyConfirm1() {
  const { profileData, updateLifeStory, goToConfirm2 } = useOnboarding()
  const storyData = profileData.lifeStories.earlyLife
  const story = lifeStoryPrompts.earlyLife

  // Local state
  const [selectedThumbnail, setSelectedThumbnail] = useState(0)
  const [customThumbnailPreview, setCustomThumbnailPreview] = useState(storyData.thumbnail || null)
  const [generatedThumbnails, setGeneratedThumbnails] = useState([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [summary, setSummary] = useState(storyData.summary || storyData.text || '')
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

  // Initialize with existing thumbnail
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

  // Validation check
  const isValid = () => {
    if (!summary.trim()) return false
    return true
  }

  // Individual field error checks
  const getErrors = () => ({
    summary: !summary.trim() ? 'Please share a brief summary of your early life' : ''
  })

  const errors = getErrors()

  const handleContinue = () => {
    if (!isValid()) {
      setShowErrors(true)
      return
    }

    // Save thumbnail
    const thumbnailData = selectedThumbnail === 'custom'
      ? customThumbnailPreview
      : generatedThumbnails[selectedThumbnail] || storyData.thumbnail

    updateLifeStory('earlyLife', {
      thumbnail: thumbnailData,
      summary
    })
    goToConfirm2()
  }

  const hasVideo = storyData.videoUrl && storyData.inputMethod === 'video'

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
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='180'%3E%3Crect fill='%23e8d5b7' width='320' height='180'/%3E%3Ctext x='160' y='95' text-anchor='middle' fill='%23a08060' font-size='14' font-family='sans-serif'%3ESample 1%3C/text%3E%3C/svg%3E",
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='180'%3E%3Crect fill='%23b7d5e8' width='320' height='180'/%3E%3Ctext x='160' y='95' text-anchor='middle' fill='%236090a0' font-size='14' font-family='sans-serif'%3ESample 2%3C/text%3E%3C/svg%3E"
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

      {/* Early Life Summary */}
      <div className="confirm-section">
        <label className="input-label">
          My Early Life… <span className="required-asterisk">*</span>
        </label>
        <p className="field-hint">Max {maxWords} words</p>
        <textarea
          className={`input-field textarea-field ${showErrors && errors.summary ? 'input-error' : ''}`}
          placeholder="Record concise yet significant aspects of your early life here, in a story form."
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

      <button className="btn-primary" onClick={handleContinue}>
        Continue
      </button>
    </div>
  )
}

export default LifeStoryEarlyConfirm1
