import { Link } from 'react-router-dom'
import StatusBar from '../StatusBar'
import { currentUser } from '../../data/mockData'
import '../../styles/profile.css'

function Profile() {
  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`
  }

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)

  const checklistItems = [
    { label: 'Basic Info', done: !!(currentUser.firstName && currentUser.lastName) },
    { label: 'Organization & Role', done: !!(currentUser.currentOrganization && currentUser.currentRole) },
    { label: 'Introduction', done: !!currentUser.introduction },
    { label: 'Location', done: !!currentUser.livesIn },
    { label: 'Quote', done: !!currentUser.inspiringQuote },
    { label: 'Early Life Video', done: false },
    { label: 'Professional Life Video', done: false },
    { label: 'Current Life Video', done: false },
  ]

  const completionPercent = Math.round(
    (checklistItems.filter(i => i.done).length / checklistItems.length) * 100
  )

  return (
    <>
      <StatusBar />
      <div className="page-content my-profile-page">
        {/* Header */}
        <div className="my-profile-header">
          <h1 className="page-title">My Profile</h1>
          <div className="header-actions">
            <button className="icon-btn">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
            </button>
            <button className="edit-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              Edit
            </button>
          </div>
        </div>

        {/* Profile Completion Card */}
        <div className="profile-completion-section">
          <div className="profile-completion-header">
            <span className="completion-label">Profile Completion</span>
            <span className="completion-percent">{completionPercent}%</span>
          </div>
          <div className="profile-completion-bar">
            <div className="profile-completion-fill" style={{ width: `${completionPercent}%` }} />
          </div>
          <div className="completion-checklist">
            {checklistItems.map((item) => (
              <div key={item.label} className={`checklist-item ${item.done ? 'done' : ''}`}>
                {item.done ? (
                  <svg className="checklist-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 11 12 14 22 4" />
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                  </svg>
                ) : (
                  <svg className="checklist-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  </svg>
                )}
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Avatar Section */}
        <div className="profile-avatar-section">
          <div className="my-profile-avatar">
            {currentUser.profilePicture ? (
              <img src={currentUser.profilePicture} alt={currentUser.firstName} />
            ) : (
              <span>{getInitials(currentUser.firstName, currentUser.lastName)}</span>
            )}
          </div>
          <div className="profile-name-status">
            <h2 className="my-profile-name">{currentUser.firstName} {currentUser.lastName}</h2>
            <span className={`status-badge badge-${currentUser.status}`}>
              {capitalize(currentUser.status)}
            </span>
          </div>
          <p className="my-profile-email">{currentUser.email}</p>
        </div>

        {/* Basic Information */}
        <div className="profile-section">
          <h3 className="profile-section-title">Basic Information</h3>
          <div className="info-card">
            <span className="info-role">{currentUser.currentRole}</span>
            <span className="info-org">at {currentUser.currentOrganization}</span>
          </div>
        </div>

        {/* About */}
        <div className="profile-section">
          <h3 className="profile-section-title">About</h3>
          <p className="bio-text">{currentUser.introduction}</p>
          <div className="location-display">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {currentUser.livesIn}
          </div>
        </div>

        {/* Inspiring Quote Card */}
        {currentUser.inspiringQuote && (
          <div className="colored-card quote-card-purple">
            <span className="card-label">A Quote that inspires me!</span>
            <p className="card-text">{currentUser.inspiringQuote}</p>
            <div className="card-decoration">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="white">
                <polygon points="30,5 55,50 5,50" />
                <circle cx="45" cy="15" r="12" />
              </svg>
            </div>
          </div>
        )}

        {/* Joy Card */}
        {currentUser.joyOutsideWork && (
          <div className="colored-card joy-card-orange">
            <span className="card-label">What fills me with joy outside work</span>
            <p className="card-text">{currentUser.joyOutsideWork}</p>
            <div className="card-decoration">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="white">
                <polygon points="30,5 55,50 5,50" />
                <circle cx="45" cy="15" r="12" />
              </svg>
            </div>
          </div>
        )}

        {/* Coordinates Section */}
        <div className="coordinates-section">
          <h3 className="coordinates-title">{currentUser.firstName}'s Coordinates</h3>
          <div className="coordinates-divider" />
          <div className="coordinates-grid">
            {currentUser.linkedin && (
              <a href={currentUser.linkedin} className="coordinate-link" target="_blank" rel="noopener noreferrer">
                <div className="coordinate-icon linkedin">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <span className="coordinate-label">LinkedIn</span>
              </a>
            )}
            <a href={`mailto:${currentUser.email}`} className="coordinate-link">
              <div className="coordinate-icon email">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <span className="coordinate-label">Email</span>
            </a>
            {currentUser.mobile && (
              <a href={`https://wa.me/${currentUser.mobile.replace(/\s+/g, '').replace('+', '')}`} className="coordinate-link">
                <div className="coordinate-icon whatsapp">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <span className="coordinate-label">WhatsApp</span>
              </a>
            )}
            {currentUser.mobile && (
              <a href={`tel:${currentUser.mobile}`} className="coordinate-link">
                <div className="coordinate-icon phone">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <span className="coordinate-label">Call</span>
              </a>
            )}
          </div>
        </div>

        {/* Story Videos Section */}
        <div className="profile-section">
          <h3 className="profile-section-title">Story Videos</h3>
          <p className="section-subtitle">Share your journey through video to become a Super member</p>
          <div className="video-upload-grid">
            <div className="video-upload-card">
              <div className="video-upload-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="23 7 16 12 23 17 23 7" />
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                </svg>
              </div>
              <span className="video-label">Early Life</span>
              <span className="video-status-text">Not uploaded</span>
            </div>
            <div className="video-upload-card">
              <div className="video-upload-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="23 7 16 12 23 17 23 7" />
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                </svg>
              </div>
              <span className="video-label">Professional Life</span>
              <span className="video-status-text">Not uploaded</span>
            </div>
            <div className="video-upload-card">
              <div className="video-upload-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="23 7 16 12 23 17 23 7" />
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                </svg>
              </div>
              <span className="video-label">Current Life</span>
              <span className="video-status-text">Not uploaded</span>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <nav className="bottom-nav">
          <Link to="/dashboard" className="nav-item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span>Home</span>
          </Link>
          <Link to="/members" className="nav-item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <span>Community</span>
          </Link>
          <Link to="/profile" className="nav-item active">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span>Profile</span>
          </Link>
        </nav>
      </div>
    </>
  )
}

export default Profile
