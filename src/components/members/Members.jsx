import { useState } from 'react'
import { Link } from 'react-router-dom'
import StatusBar from '../StatusBar'
import { members, currentUser, stats, getPizzaLevel } from '../../data/mockData'
import PizzaIcon from '../PizzaIcon'
import '../../styles/members.css'
import '../../styles/dashboard.css'

function Members() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showMenu, setShowMenu] = useState(false)

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`
  }

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)

  const truncate = (text, maxLength) => {
    if (!text) return ''
    return text.length > maxLength ? text.substring(0, maxLength) + '…' : text
  }

  const filteredMembers = members.filter((member) => {
    if (!searchQuery.trim()) return true
    const query = searchQuery.toLowerCase()
    return (
      member.firstName.toLowerCase().includes(query) ||
      member.lastName.toLowerCase().includes(query) ||
      member.email.toLowerCase().includes(query) ||
      member.currentOrganization.toLowerCase().includes(query) ||
      member.currentRole.toLowerCase().includes(query) ||
      member.tags?.some(tag => tag.toLowerCase().includes(query))
    )
  })

  return (
    <>
      <StatusBar />
      <div className="page-content members-page">
        {/* Welcome Header */}
        <div className="members-welcome">
          <span className="members-welcome-label">Welcome,</span>
          <h1 className="members-welcome-name">{currentUser.firstName} {currentUser.lastName}</h1>
        </div>

        {/* Subtitle */}
        <p className="members-subtitle">
          {stats.newMembersRecent} new people have joined the community in the last 2 weeks
        </p>

        {/* Search Bar */}
        <div className="members-search-row">
          <div className="search-input-wrapper">
            <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              className="search-input"
              type="text"
              placeholder="Search by name, email or tags"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="filter-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="8" y1="12" x2="16" y2="12" />
              <line x1="10" y1="18" x2="14" y2="18" />
            </svg>
          </button>
        </div>

        {/* Members List */}
        <div className="members-list">
          {filteredMembers.length > 0 ? (
            filteredMembers.map((member) => (
              <div key={member.id} className="member-card">
                <div className="member-card-layout">
                  {/* Left: Photo */}
                  <div className="member-photo">
                    {member.profilePicture ? (
                      <img src={member.profilePicture} alt={member.firstName} />
                    ) : (
                      <span className="member-photo-initials">
                        {getInitials(member.firstName, member.lastName)}
                      </span>
                    )}
                  </div>

                  {/* Right: Info */}
                  <div className="member-details">
                    <span className={`pizza-badge pizza-${getPizzaLevel(member)}`}>
                      <PizzaIcon level={getPizzaLevel(member)} size={18} />
                    </span>
                    <h3 className="member-name">{member.firstName} {member.lastName}</h3>
                    <p className="member-intro">{truncate(member.introduction, 120)}</p>

                    {/* Location */}
                    <div className="member-contact-row">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="10" r="3" />
                        <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
                      </svg>
                      <span>{member.livesIn}</span>
                    </div>

                    {/* Tags: Org + Role */}
                    <div className="member-org-tags">
                      <span className="org-tag">{member.currentOrganization}</span>
                      <span className="org-tag">{member.currentRole}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">No members found matching your search.</div>
          )}
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
          <Link to="/members" className="nav-item active">
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

export default Members
