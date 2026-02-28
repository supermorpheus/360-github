import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import StatusBar from '../StatusBar'
import { currentUser, members, newMembers, stats, getPizzaLevel } from '../../data/mockData'
import PizzaIcon from '../PizzaIcon'
import '../../styles/dashboard.css'

function Dashboard() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [showMenu, setShowMenu] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchInputRef = useRef(null)
  const totalSlides = 3

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % totalSlides)
    }, 10000)
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

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)

  const openSearch = () => {
    setShowSearch(true)
    setSearchQuery('')
    setTimeout(() => searchInputRef.current?.focus(), 100)
  }

  const closeSearch = () => {
    setShowSearch(false)
    setSearchQuery('')
  }

  const filteredMembers = members.filter((member) => {
    if (!searchQuery.trim()) return false
    const query = searchQuery.toLowerCase()
    return (
      member.firstName.toLowerCase().includes(query) ||
      member.lastName.toLowerCase().includes(query) ||
      member.currentOrganization.toLowerCase().includes(query) ||
      member.currentRole.toLowerCase().includes(query) ||
      member.livesIn.toLowerCase().includes(query) ||
      member.tags?.some(tag => tag.toLowerCase().includes(query))
    )
  })

  return (
    <>
      <StatusBar />
      <div className="page-content dashboard-page">

        {/* Search Bar - Top */}
        <div className="section search-section">
          <button className="search-bar-btn" onClick={openSearch}>
            <div className="search-bar">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <span>Search by name, passion, location</span>
            </div>
          </button>
        </div>

        {/* Card 1: Revolving Welcome Cards */}
        <div className="welcome-carousel" onClick={handleCardClick}>

          {/* Screen 1: Complete Onboarding - 1 slice */}
          <div className={`welcome-card welcome-card-screen1 ${activeSlide === 0 ? 'active' : ''}`}>
            <div className="welcome-card-top">
              <div className="welcome-card-info">
                <h1 className="welcome-card-name">Welcome, {currentUser.firstName}!</h1>
                <p className="welcome-card-role">{currentUser.currentRole} at {currentUser.currentOrganization}</p>
              </div>
              <span className="screen-label"><PizzaIcon level="slice" size={22} /></span>
            </div>
            <div className="welcome-card-avatar">
              {currentUser.profilePicture ? (
                <img src={currentUser.profilePicture} alt={currentUser.firstName} />
              ) : (
                <span>{getInitials(currentUser.firstName, currentUser.lastName)}</span>
              )}
            </div>
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
                <h3 className="screen-title">Complete Your Profile Overview</h3>
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

          {/* Screen 2: Add My Life Stories - half pizza */}
          <div className={`welcome-card welcome-card-screen2 ${activeSlide === 1 ? 'active' : ''}`}>
            <div className="welcome-card-top">
              <div className="welcome-card-info">
                <h1 className="welcome-card-name">Welcome, {currentUser.firstName}!</h1>
                <p className="welcome-card-role">{currentUser.currentRole} at {currentUser.currentOrganization}</p>
              </div>
              <span className="screen-label"><PizzaIcon level="half" size={22} /></span>
            </div>
            <div className="welcome-card-avatar">
              {currentUser.profilePicture ? (
                <img src={currentUser.profilePicture} alt={currentUser.firstName} />
              ) : (
                <span>{getInitials(currentUser.firstName, currentUser.lastName)}</span>
              )}
            </div>
            <div className="screen-message">
              <div className="screen-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 20h9"/>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                </svg>
              </div>
              <div className="screen-text">
                <h3 className="screen-title">Add Your Life Stories</h3>
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

          {/* Screen 3: Profile Complete - full pizza */}
          <div className={`welcome-card welcome-card-screen3 ${activeSlide === 2 ? 'active' : ''}`}>
            <div className="welcome-card-top">
              <div className="welcome-card-info">
                <h1 className="welcome-card-name">Welcome, {currentUser.firstName}!</h1>
                <p className="welcome-card-role">{currentUser.currentRole} at {currentUser.currentOrganization}</p>
              </div>
              <span className="screen-label"><PizzaIcon level="full" size={22} /></span>
            </div>
            <div className="welcome-card-avatar">
              {currentUser.profilePicture ? (
                <img src={currentUser.profilePicture} alt={currentUser.firstName} />
              ) : (
                <span>{getInitials(currentUser.firstName, currentUser.lastName)}</span>
              )}
            </div>
            <div className="screen-complete-msg">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              <span>Your profile is complete! Explore and connect.</span>
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

        {/* Card 2: New Members */}
        <div className="members-joined-card">
          <div className="members-joined-header">
            <h2 className="members-joined-title">New Members</h2>
          </div>
          <div className="new-members-list">
            {newMembers.slice(0, 4).map((member) => (
              <div key={member.id} className="new-member-card">
                <div className="new-member-avatar">
                  {member.profilePicture ? (
                    <img src={member.profilePicture} alt={member.firstName} />
                  ) : (
                    <span>{getInitials(member.firstName, member.lastName)}</span>
                  )}
                  <span className={`member-status-dot ${getStatusBadgeClass(member.status)}`} />
                </div>
                <div className="new-member-info">
                  <span className="new-member-name">{member.firstName} {member.lastName}</span>
                  {member.livesIn && <span className="new-member-location">{member.livesIn}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Search Overlay */}
        {showSearch && (
          <div className="search-overlay">
            <div className="search-overlay-header">
              <h2 className="search-overlay-title">Search Users</h2>
              <button className="search-overlay-close" onClick={closeSearch}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="search-overlay-input-wrapper">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                ref={searchInputRef}
                className="search-overlay-input"
                type="text"
                placeholder="Search by name, passion, location"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="search-overlay-results">
              {filteredMembers.map((member) => (
                <Link key={member.id} to={`/member/${member.id}`} className="search-result-card search-result-link">
                  <div className="search-result-photo">
                    {member.profilePicture ? (
                      <img src={member.profilePicture} alt={member.firstName} />
                    ) : (
                      <span className="search-result-initials">
                        {getInitials(member.firstName, member.lastName)}
                      </span>
                    )}
                  </div>
                  <div className="search-result-info">
                    <span className={`pizza-badge pizza-${getPizzaLevel(member)}`}>
                      <PizzaIcon level={getPizzaLevel(member)} size={18} />
                    </span>
                    <h3 className="search-result-name">{member.firstName} {member.lastName}</h3>
                    <div className="search-result-location">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="10" r="3" />
                        <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
                      </svg>
                      <span>{member.livesIn}</span>
                    </div>
                  </div>
                </Link>
              ))}
              {filteredMembers.length === 0 && (
                <div className="search-no-results">No users found.</div>
              )}
            </div>
          </div>
        )}

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
          <button className="nav-item" onClick={() => setShowMenu(!showMenu)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
            <span>More</span>
          </button>
        </nav>

        {/* Hamburger Menu Overlay */}
        {showMenu && (
          <div className="menu-overlay" onClick={() => setShowMenu(false)}>
            <div className="menu-panel" onClick={(e) => e.stopPropagation()}>
              <div className="menu-header">
                <h3 className="menu-title">More</h3>
                <button className="menu-close" onClick={() => setShowMenu(false)}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
              <nav className="menu-nav">
                <Link to="/profile" className="menu-item" onClick={() => setShowMenu(false)}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  <span>My Profile</span>
                </Link>
                <Link to="/events" className="menu-item" onClick={() => setShowMenu(false)}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  <span>Events</span>
                </Link>
              </nav>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Dashboard
