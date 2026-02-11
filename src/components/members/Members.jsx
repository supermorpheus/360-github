import { useState } from 'react'
import { Link } from 'react-router-dom'
import StatusBar from '../StatusBar'
import { members } from '../../data/mockData'
import '../../styles/members.css'

function Members() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('people')

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`
  }

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)

  const truncate = (text, maxLength) => {
    if (!text) return ''
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
  }

  const filteredMembers = members.filter((member) => {
    if (!searchQuery.trim()) return true
    const query = searchQuery.toLowerCase()
    return (
      member.firstName.toLowerCase().includes(query) ||
      member.lastName.toLowerCase().includes(query) ||
      member.email.toLowerCase().includes(query) ||
      member.currentOrganization.toLowerCase().includes(query) ||
      member.tags?.some(tag => tag.toLowerCase().includes(query))
    )
  })

  return (
    <>
      <StatusBar />
      <div className="page-content members-page">
        {/* Header */}
        <div className="members-header">
          <Link to="/dashboard" className="members-back-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </Link>
          <h1 className="members-title">Community</h1>
        </div>

        {/* Tab Bar */}
        <div className="members-tabs">
          <button
            className={`tab-btn ${activeTab === 'people' ? 'active' : ''}`}
            onClick={() => setActiveTab('people')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            People
          </button>
          <button
            className={`tab-btn ${activeTab === 'services' ? 'active' : ''}`}
            onClick={() => setActiveTab('services')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
            Services
          </button>
        </div>

        {/* Search Bar */}
        <div className="search-container">
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
        </div>

        {/* Toolbar */}
        <div className="members-toolbar">
          <span className="members-count">All members ({filteredMembers.length})</span>
          <button className="sort-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="16" y2="12" />
              <line x1="4" y1="18" x2="12" y2="18" />
            </svg>
            Sort
          </button>
        </div>

        {/* Members List */}
        {activeTab === 'people' ? (
          <div className="members-list">
            {filteredMembers.length > 0 ? (
              filteredMembers.map((member) => (
                <div key={member.id} className="member-card">
                  <div className="member-card-header">
                    <div className="member-avatar">
                      {member.profilePicture ? (
                        <img src={member.profilePicture} alt={member.firstName} />
                      ) : (
                        <span>{getInitials(member.firstName, member.lastName)}</span>
                      )}
                    </div>
                    <div className="member-info">
                      <div className="member-name-row">
                        <h3 className="member-name">{member.firstName} {member.lastName}</h3>
                        <span className={`status-badge badge-${member.status}`}>
                          {capitalize(member.status)}
                        </span>
                      </div>
                      <p className="member-role">
                        {member.currentRole} at {member.currentOrganization}
                      </p>
                      <p className="member-location">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        {member.livesIn}
                      </p>
                    </div>
                  </div>
                  <p className="member-intro">{truncate(member.introduction, 80)}</p>
                  {member.tags && member.tags.length > 0 && (
                    <div className="member-tags">
                      {member.tags.map((tag) => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="no-results">No members found matching your search.</div>
            )}
          </div>
        ) : (
          <div className="no-results">Services coming soon.</div>
        )}

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
            <span>Community</span>
          </Link>
          <Link to="/profile" className="nav-item">
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

export default Members
