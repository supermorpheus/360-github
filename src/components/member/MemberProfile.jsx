import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import StatusBar from '../StatusBar'
import { members, getPizzaLevel } from '../../data/mockData'
import PizzaIcon from '../PizzaIcon'
import '../../styles/profile.css'
import '../../styles/dashboard.css'

function MemberProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)
  const [expandedSummaries, setExpandedSummaries] = useState({})

  const member = members.find(m => m.id === id)

  if (!member) {
    return (
      <>
        <StatusBar />
        <div className="page-content my-profile-page">
          <div className="my-profile-header">
            <button className="back-btn" onClick={() => navigate(-1)}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <h1 className="page-title">Member Not Found</h1>
          </div>
        </div>
      </>
    )
  }

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`
  }

  const pizzaLevel = getPizzaLevel(member)
  const lifeStories = member.lifeStories || {}

  const toggleSummary = (key) => {
    setExpandedSummaries(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <>
      <StatusBar />
      <div className="page-content my-profile-page">
        {/* Header */}
        <div className="my-profile-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <h1 className="page-title">{member.firstName}'s Profile</h1>
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
          </div>
        </div>

        {/* Name + Photo Row */}
        <div className="profile-name-photo-row">
          <div className="profile-name-info">
            <div className="profile-name-row">
              <h2 className="my-profile-name">{member.firstName} {member.lastName}</h2>
              <span className={`pizza-badge pizza-${pizzaLevel}`}>
                <PizzaIcon level={pizzaLevel} size={21} />
              </span>
            </div>
            {member.currentOrganization && (
              <div className="profile-org-line">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
                <span>{member.currentOrganization}</span>
              </div>
            )}
            {member.currentRole && !member.currentOrganization && (
              <div className="profile-org-line">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span>{member.currentRole}</span>
              </div>
            )}
          </div>
          <div className="profile-photo-circle">
            {member.profilePicture ? (
              <img src={member.profilePicture} alt={member.firstName} />
            ) : (
              <span>{getInitials(member.firstName, member.lastName)}</span>
            )}
          </div>
        </div>

        <div className="profile-divider" />

        {/* Lives In */}
        <div className="profile-lives-in">
          <span className="lives-in-label">Lives in </span>
          <span className="lives-in-city">{member.livesIn}</span>
        </div>

        {/* Introduction */}
        {member.introduction && (
          <div className="profile-intro">
            <p className="intro-text">{member.introduction}</p>
          </div>
        )}

        {/* Basic Profile Empty State */}
        {!member.introduction && !lifeStories.current && !lifeStories.earlyLife && !lifeStories.professional && !member.inspiringQuote && !member.joyOutsideWork && (
          <div className="basic-profile-empty">
            <div className="basic-empty-icon">
              <PizzaIcon level="slice" size={40} />
            </div>
            <h3 className="basic-empty-title">{member.firstName} just joined!</h3>
            <p className="basic-empty-text">This member hasn't completed their profile yet. They'll add their story, passions, and more soon.</p>
          </div>
        )}

        {/* Current Life Section */}
        {lifeStories.current && (
          <div className="life-story-section">
            <div className="story-section-header">
              <h3 className="story-section-title">Current Life</h3>
              <span className="story-section-icon">✨</span>
            </div>
            <div className="story-section-divider" />

            {member.videos?.currentLife?.thumbnail && (
              <div className="story-video-thumbnail">
                <img src={member.videos.currentLife.thumbnail} alt="Current Life" />
                <div className="video-play-btn">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
                {lifeStories.current.videoDuration && (
                  <span className="video-duration-badge">{lifeStories.current.videoDuration}</span>
                )}
              </div>
            )}

            {lifeStories.current.tags?.length > 0 && (
              <div className="story-tags">
                {lifeStories.current.tags.map(tag => (
                  <span key={tag} className="story-tag">{tag}</span>
                ))}
              </div>
            )}

            {lifeStories.current.organizations?.length > 0 && (
              <div className="story-meta-field">
                <span className="meta-label">Roles / Organizations</span>
                {lifeStories.current.organizations.map((org, i) => (
                  <span key={i} className="meta-value">{org.role} / {org.org}</span>
                ))}
              </div>
            )}

            {lifeStories.current.travelCities?.length > 0 && (
              <div className="story-meta-field">
                <span className="meta-label">Frequent Travel Cities</span>
                <div className="meta-pills">
                  {lifeStories.current.travelCities.map(city => (
                    <span key={city} className="meta-pill">{city}</span>
                  ))}
                </div>
              </div>
            )}

            {lifeStories.current.summary && (
              <div className="story-summary">
                <span className="summary-label">Current Life Summary</span>
                <p className={`summary-text ${expandedSummaries.current ? 'expanded' : ''}`}>
                  {lifeStories.current.summary}
                </p>
                <button className="show-more-btn" onClick={() => toggleSummary('current')}>
                  {expandedSummaries.current ? 'Show Less' : 'Show More'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Early Life Section */}
        {lifeStories.earlyLife && (
          <div className="life-story-section">
            <div className="story-section-header">
              <h3 className="story-section-title">Early Life</h3>
              <span className="story-section-icon">🌱</span>
            </div>
            <div className="story-section-divider" />

            {member.videos?.earlyLife?.thumbnail && (
              <div className="story-video-thumbnail">
                <img src={member.videos.earlyLife.thumbnail} alt="Early Life" />
                <div className="video-play-btn">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
                {lifeStories.earlyLife.videoDuration && (
                  <span className="video-duration-badge">{lifeStories.earlyLife.videoDuration}</span>
                )}
              </div>
            )}

            {lifeStories.earlyLife.tags?.length > 0 && (
              <div className="story-tags">
                {lifeStories.earlyLife.tags.map(tag => (
                  <span key={tag} className="story-tag">{tag}</span>
                ))}
              </div>
            )}

            {lifeStories.earlyLife.hometown && (
              <div className="story-meta-field">
                <span className="meta-label">Hometown</span>
                <span className="meta-value">{lifeStories.earlyLife.hometown}</span>
              </div>
            )}

            {lifeStories.earlyLife.bornIn && (
              <div className="story-meta-field">
                <span className="meta-label">Born in</span>
                <span className="meta-value">{lifeStories.earlyLife.bornIn}</span>
              </div>
            )}

            {lifeStories.earlyLife.schools?.length > 0 && (
              <div className="story-meta-field">
                <span className="meta-label">School(s)</span>
                <span className="meta-value">{lifeStories.earlyLife.schools.join(', ')}</span>
              </div>
            )}

            {lifeStories.earlyLife.universities?.length > 0 && (
              <div className="story-meta-field">
                <span className="meta-label">Universities / Colleges</span>
                <span className="meta-value">{lifeStories.earlyLife.universities.join(', ')}</span>
              </div>
            )}

            {lifeStories.earlyLife.summary && (
              <div className="story-summary">
                <span className="summary-label">Early Life Summary</span>
                <p className={`summary-text ${expandedSummaries.earlyLife ? 'expanded' : ''}`}>
                  {lifeStories.earlyLife.summary}
                </p>
                <button className="show-more-btn" onClick={() => toggleSummary('earlyLife')}>
                  {expandedSummaries.earlyLife ? 'Show Less' : 'Show More'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Inspiring Quote Card */}
        {member.inspiringQuote && (
          <div className="colored-card quote-card-green">
            <span className="card-label">A Quote that inspires me!</span>
            <p className="card-text">{member.inspiringQuote}</p>
            <div className="card-decoration">
              <img src="/360-github/SM All White Logo.jpeg" alt="" className="card-logo-img" />
            </div>
          </div>
        )}

        {/* Professional Life Section */}
        {lifeStories.professional && (
          <div className="life-story-section">
            <div className="story-section-header">
              <h3 className="story-section-title">Professional Life</h3>
              <span className="story-section-icon">💼</span>
            </div>
            <div className="story-section-divider" />

            {member.videos?.professionalLife?.thumbnail && (
              <div className="story-video-thumbnail">
                <img src={member.videos.professionalLife.thumbnail} alt="Professional Life" />
                <div className="video-play-btn">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
                {lifeStories.professional.videoDuration && (
                  <span className="video-duration-badge">{lifeStories.professional.videoDuration}</span>
                )}
              </div>
            )}

            {lifeStories.professional.tags?.length > 0 && (
              <div className="story-tags">
                {lifeStories.professional.tags.map(tag => (
                  <span key={tag} className="story-tag">{tag}</span>
                ))}
              </div>
            )}

            {lifeStories.professional.firstJob && (
              <div className="story-meta-field">
                <span className="meta-label">First Job</span>
                <span className="meta-value">{lifeStories.professional.firstJob}</span>
              </div>
            )}

            {lifeStories.professional.subsequentJobs?.length > 0 && (
              <div className="story-meta-field">
                <span className="meta-label">Subsequent Jobs</span>
                {lifeStories.professional.subsequentJobs.map(job => (
                  <span key={job} className="meta-value">{job}</span>
                ))}
              </div>
            )}

            {lifeStories.professional.summary && (
              <div className="story-summary">
                <span className="summary-label">Professional Life Summary</span>
                <p className={`summary-text ${expandedSummaries.professional ? 'expanded' : ''}`}>
                  {lifeStories.professional.summary}
                </p>
                <button className="show-more-btn" onClick={() => toggleSummary('professional')}>
                  {expandedSummaries.professional ? 'Show Less' : 'Show More'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Joy Card */}
        {member.joyOutsideWork && (
          <div className="colored-card joy-card-golden">
            <span className="card-label">What fills me with joy</span>
            <p className="card-text">{member.joyOutsideWork}</p>
            <div className="card-decoration">
              <img src="/360-github/SM All White Logo.jpeg" alt="" className="card-logo-img" />
            </div>
          </div>
        )}

        {/* Coordinates Section */}
        <div className="coordinates-section">
          <h3 className="coordinates-title">{member.firstName}'s Coordinates</h3>
          <div className="coordinates-divider" />
          <div className="coordinates-grid">
            <a href={`mailto:${member.email}`} className="coordinate-link">
              <div className="coordinate-icon email">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <span className="coordinate-label">Email</span>
            </a>
            {member.phone && (
              <a href={`https://wa.me/${member.phone.replace(/\s+/g, '').replace('+', '')}`} className="coordinate-link">
                <div className="coordinate-icon whatsapp">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <span className="coordinate-label">Whatsapp</span>
              </a>
            )}
            {member.phone && (
              <a href={`tel:${member.phone}`} className="coordinate-link">
                <div className="coordinate-icon phone">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <span className="coordinate-label">Text/Cell</span>
              </a>
            )}
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
            <span>Members</span>
          </Link>
          <button className="nav-item" onClick={() => setShowMenu(!showMenu)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
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
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              <nav className="menu-nav">
                <Link to="/profile" className="menu-item" onClick={() => setShowMenu(false)}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <span>My Profile</span>
                </Link>
                <Link to="/events" className="menu-item" onClick={() => setShowMenu(false)}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
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

export default MemberProfile
