import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import StatusBar from '../StatusBar'
import { currentUser, newMembers, stats } from '../../data/mockData'
import '../../styles/dashboard.css'

function Dashboard() {
  const [activeSlide, setActiveSlide] = useState(0)
  const totalSlides = 3

  // Auto-rotate every 5 seconds, reset timer on manual click
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % totalSlides)
    }, 5000)
    return () => clearInterval(timer)
  }, [activeSlide])

  const handleCardClick = () => {
    setActiveSlide(prev => (prev + 1) % totalSlides)
  }

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'super': return 'status-super'
      case 'active': return 'status-active'
      default: return 'status-basic'
    }
  }

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`
  }

  return (
    <>
      <StatusBar />
      <div className="page-content dashboard-page">
        {/* Card 1: Welcome Card with revolving messages below */}
        <div className="welcome-card" onClick={handleCardClick}>
          {/* Fixed: Name + Avatar + Org */}
          <div className="welcome-card-header">
            <div className="welcome-card-avatar">
              {currentUser.profilePicture ? (
                <img src={currentUser.profilePicture} alt={currentUser.firstName} />
              ) : (
                <span>{getInitials(currentUser.firstName, currentUser.lastName)}</span>
              )}
            </div>
            <div className="welcome-card-info">
              <h1 className="welcome-card-name">Welcome, {currentUser.firstName}!</h1>
              <p className="welcome-card-role">
                {currentUser.currentRole} at {currentUser.currentOrganization}
              </p>
            </div>
          </div>

          {/* Revolving onboarding messages */}
          <div className="welcome-carousel-inner">
            <div className="carousel-track" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>

              {/* Screen 1: Complete Onboarding */}
              <div className="carousel-slide">
                <div className="carousel-slide-content">
                  <span className="screen-label">Screen 1</span>
                  <div className="screen-message">
                    <div className="screen-icon">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                        <circle cx="8.5" cy="7" r="4"/>
                        <line x1="20" y1="8" x2="20" y2="14"/>
                        <line x1="23" y1="11" x2="17" y2="11"/>
                      </svg>
                    </div>
                    <div className="screen-text">
                      <h3 className="screen-title">Complete Your Onboarding</h3>
                      <p className="screen-desc">Tell us about yourself — your story, your passions, and what makes you, you.</p>
                    </div>
                  </div>
                  <div className="completion-mini">
                    <div className="completion-label">
                      <span>Profile Completion</span>
                      <span className="completion-value">0%</span>
                    </div>
                    <div className="completion-progress">
                      <div className="completion-bar" style={{ width: '0%' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Screen 2: Add Life Stories */}
              <div className="carousel-slide">
                <div className="carousel-slide-content">
                  <span className="screen-label">Screen 2</span>
                  <div className="screen-message">
                    <div className="screen-icon">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M12 20h9"/>
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                      </svg>
                    </div>
                    <div className="screen-text">
                      <h3 className="screen-title">Add Your Life Stories</h3>
                      <p className="screen-desc">Share your early life, mid life, and current life — the gang wants to know you!</p>
                    </div>
                  </div>
                  <div className="completion-mini">
                    <div className="completion-label">
                      <span>Profile Completion</span>
                      <span className="completion-value">50%</span>
                    </div>
                    <div className="completion-progress">
                      <div className="completion-bar" style={{ width: '50%' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Screen 3: Profile Complete */}
              <div className="carousel-slide">
                <div className="carousel-slide-content">
                  <span className="screen-label">Screen 3</span>
                  <div className="screen-message">
                    <div className="screen-icon">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                        <polyline points="22 4 12 14.01 9 11.01"/>
                      </svg>
                    </div>
                    <div className="screen-text">
                      <h3 className="screen-title">Your Profile is Complete!</h3>
                      <p className="screen-desc">You're all set! Explore the gang, connect, and make things happen.</p>
                    </div>
                  </div>
                  <div className="completion-mini">
                    <div className="completion-label">
                      <span>Profile Completion</span>
                      <span className="completion-value">100%</span>
                    </div>
                    <div className="completion-progress">
                      <div className="completion-bar" style={{ width: '100%' }} />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Carousel Dots */}
          <div className="carousel-dots">
            {[0, 1, 2].map(i => (
              <button
                key={i}
                className={`carousel-dot ${activeSlide === i ? 'active' : ''}`}
                onClick={(e) => { e.stopPropagation(); setActiveSlide(i) }}
              />
            ))}
          </div>
        </div>

        {/* Card 2: Members Joined */}
        <div className="members-joined-card">
          <div className="members-joined-header">
            <h2 className="members-joined-title">
              {stats.newMembersRecent} members have joined in the past 2 weeks
            </h2>
          </div>
          <div className="new-members-scroll">
            {newMembers.map((member) => (
              <div key={member.id} className="new-member-card">
                <div className="new-member-avatar">
                  {member.profilePicture ? (
                    <img src={member.profilePicture} alt={member.firstName} />
                  ) : (
                    <span>{getInitials(member.firstName, member.lastName)}</span>
                  )}
                  <span className={`member-status-dot ${getStatusBadgeClass(member.status)}`} />
                </div>
                <span className="new-member-name">{member.firstName}</span>
              </div>
            ))}
          </div>
          <Link to="/members" className="browse-all-btn">
            Browse All Members
          </Link>
        </div>

        {/* Card 3: Search Bar */}
        <div className="section">
          <Link to="/members" className="search-bar-link">
            <div className="search-bar">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <span>Search by name, passion, location</span>
            </div>
          </Link>
        </div>

        {/* Bottom Navigation */}
        <nav className="bottom-nav">
          <Link to="/dashboard" className="nav-item active">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            <span>Home</span>
          </Link>
          <Link to="/members" className="nav-item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            <span>Members</span>
          </Link>
          <Link to="/profile" className="nav-item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <span>Profile</span>
          </Link>
        </nav>
      </div>
    </>
  )
}

export default Dashboard
