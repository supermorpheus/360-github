import { Link } from 'react-router-dom'
import StatusBar from '../StatusBar'
import { currentUser, newMembers, stats } from '../../data/mockData'
import '../../styles/dashboard.css'

function Dashboard() {
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
        {/* Card 1: Welcome + Profile Completion */}
        <div className="welcome-card">
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
          <div className="welcome-card-completion">
            <div className="completion-label">
              <span>Profile Completion</span>
              <span className="completion-value">{currentUser.profileCompletion}%</span>
            </div>
            <div className="completion-progress">
              <div
                className="completion-bar"
                style={{ width: `${currentUser.profileCompletion}%` }}
              />
            </div>
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
