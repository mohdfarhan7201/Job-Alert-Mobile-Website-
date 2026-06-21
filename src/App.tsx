import { useState, useEffect, useMemo } from 'react';
import {
  FiHome,
  FiTarget,
  FiBriefcase,
  FiUser,
  FiBell,
  FiZap,
  FiRadio,
  FiPlus,
  FiXCircle,
  FiChevronRight,
  FiSearch
} from 'react-icons/fi';
import { RiBuilding4Line, RiUserSearchLine } from 'react-icons/ri';
import './App.css';

// Types
interface Job {
  id: string;
  company: string;
  role: string;
  location: string;
  applyUrl: string;
  platform?: string;
  isMatch?: boolean;
}

const INITIAL_TARGET_COMPANIES = ['Google', 'Microsoft', 'Amazon', 'Meta', 'Netflix'];
const INITIAL_ROLES = ['Frontend Developer', 'Backend Developer', 'React Developer'];

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [targetCompanies, setTargetCompanies] = useState<string[]>(INITIAL_TARGET_COMPANIES);
  const [targetRoles, setTargetRoles] = useState<string[]>(INITIAL_ROLES);
  const [rawJobs, setRawJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [newCompany, setNewCompany] = useState('');
  const [newRole, setNewRole] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [notification, setNotification] = useState<string | null>(null);

  // Sync Data
  const syncFeeds = async () => {
    setLoading(true);
    try {
      const res = await Promise.all([
        fetch('https://www.arbeitnow.com/api/job-board-api'),
        fetch('https://remotive.com/api/remote-jobs?limit=40')
      ]);
      const [arbeit, remotive] = await Promise.all(res.map(r => r.json()));

      const combined: Job[] = [
        ...arbeit.data.map((j: any) => ({
          id: j.slug, company: j.company_name, role: j.title, location: j.location,
          applyUrl: j.url, platform: 'Global Feed'
        })),
        ...remotive.jobs.map((j: any) => ({
          id: j.id.toString(), company: j.company_name, role: j.title,
          location: j.candidate_required_location || 'Remote',
          applyUrl: j.url, platform: 'LinkedIn Sync'
        }))
      ];
      setRawJobs(combined);
    } catch (e) {
      setNotification("Offline Sync Active");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { syncFeeds(); }, []);

  // SMART FILTERING
  const processedJobs = useMemo(() => {
    return rawJobs.map(job => {
      const hasCo = targetCompanies.some(c => job.company.toLowerCase().includes(c.toLowerCase().trim()));
      const hasRo = targetRoles.some(r => job.role.toLowerCase().includes(r.toLowerCase().trim()));
      return { ...job, isMatch: hasCo || hasRo };
    }).sort((a, b) => (b.isMatch ? 1 : 0) - (a.isMatch ? 1 : 0));
  }, [rawJobs, targetCompanies, targetRoles]);

  const displayedJobs = useMemo(() => {
    let filtered = processedJobs;
    if (filterType === 'Best Fits') filtered = filtered.filter(j => j.isMatch);
    if (searchQuery) filtered = filtered.filter(j => j.company.toLowerCase().includes(searchQuery.toLowerCase()) || j.role.toLowerCase().includes(searchQuery.toLowerCase()));
    return filtered;
  }, [processedJobs, filterType, searchQuery]);

  const addTarget = (val: string, setVal: any, type: 'Co' | 'Ro') => {
    const trimmed = val.trim();
    if (!trimmed) return;
    if (type === 'Co' && !targetCompanies.includes(trimmed)) setTargetCompanies([...targetCompanies, trimmed]);
    if (type === 'Ro' && !targetRoles.includes(trimmed)) setTargetRoles([...targetRoles, trimmed]);
    setVal('');
    setNotification(type === 'Co' ? `${trimmed} Tracked!` : `${trimmed} Watchlisted!`);
    setTimeout(() => setNotification(null), 2000);
  };

  return (
    <div className="app-container">
      {notification && <div className="toast-notification"><FiBell /> {notification}</div>}

      <header className="header">
        <div className="logo-section">
          <h1 onClick={() => setActiveTab('home')}>Hire<span>Pulse</span></h1>
        </div>
        <div className="profile-btn" onClick={() => setActiveTab('profile')}>
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Farhan" alt="User" />
        </div>
      </header>

      <main className="main-content">
        {loading && <div className="loading-bar"><div className="spinner"></div> Updating Live Feed...</div>}

        {activeTab === 'home' && (
          <div className="home-layout fade-in">
            <section className="hero-gradient-card">
              <div className="hero-content">
                <h2>Hi, Farhan 👋</h2>
                <p>We found <strong>{processedJobs.filter(j => j.isMatch).length}</strong> new opportunities matching your profile today.</p>
                <div className="hero-stats-row">
                  <div className="hero-stat-pill"><FiZap /> <span>Fits</span><strong>{processedJobs.filter(j => j.isMatch).length}</strong></div>
                  <div className="hero-stat-pill"><FiTarget /> <span>Track</span><strong>{targetCompanies.length}</strong></div>
                </div>
              </div>
            </section>

            <section className="priority-track-container">
              <div className="section-header"><h3>Priority Tracks</h3><button onClick={() => setActiveTab('targets')}>Edit</button></div>
              <div className="logo-circle-grid">
                {targetCompanies.slice(0, 4).map(c => (
                  <div key={c} className="priority-logo fade-in">
                    <div className="l-symbol"><RiBuilding4Line /></div>
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="pulse-feed-container">
              <div className="section-header"><h3>Hiring Pulse</h3><span className="live-indicator"><FiRadio /> LIVE</span></div>
              {processedJobs.slice(0, 6).map(job => (
                <div key={job.id} className={`pulse-card ${job.isMatch ? 'match' : ''}`} onClick={() => window.open(job.applyUrl, '_blank')}>
                  <div className="pulse-avatar">{job.company[0]}</div>
                  <div className="pulse-info">
                    <strong>{job.role}</strong>
                    <span>{job.company} • {job.location}</span>
                  </div>
                  {job.isMatch ? <span className="pulse-badge">MATCH</span> : <FiBriefcase className="card-icon" />}
                </div>
              ))}
            </section>
          </div>
        )}

        {activeTab === 'targets' && (
          <div className="target-board fade-in">
            <div className="target-card">
              <h4><FiTarget /> Tracking Companies</h4>
              <div className="input-container">
                <input placeholder="Add (e.g. Amazon)" value={newCompany} onChange={e => setNewCompany(e.target.value)} onKeyDown={e => e.key === 'Enter' && addTarget(newCompany, setNewCompany, 'Co')} />
                <button onClick={() => addTarget(newCompany, setNewCompany, 'Co')}><FiPlus /></button>
              </div>
              <div className="chip-cloud">
                {targetCompanies.map(c => (
                  <div key={c} className="custom-chip">{c} <FiXCircle className="remove-btn" onClick={() => setTargetCompanies(targetCompanies.filter(x => x !== c))} /></div>
                ))}
              </div>
            </div>

            <div className="target-card">
              <h4><RiUserSearchLine /> Target Roles</h4>
              <div className="input-container">
                <input placeholder="Add (e.g. SDE II)" value={newRole} onChange={e => setNewRole(e.target.value)} onKeyDown={e => e.key === 'Enter' && addTarget(newRole, setNewRole, 'Ro')} />
                <button onClick={() => addTarget(newRole, setNewRole, 'Ro')}><FiPlus /></button>
              </div>
              <div className="chip-cloud">
                {targetRoles.map(r => (
                  <div key={r} className="custom-chip">{r} <FiXCircle className="remove-btn" onClick={() => setTargetRoles(targetRoles.filter(x => x !== r))} /></div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'jobs' && (
          <div className="jobs-layout fade-in">
            <div className="search-box"><FiSearch /> <input placeholder="Search company or role..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} /></div>
            <div className="job-pill-nav">
              {['All', 'Best Fits', 'Remote'].map(t => (
                <div key={t} className={`pill ${filterType === t ? 'active' : ''}`} onClick={() => setFilterType(t)}>{t}</div>
              ))}
            </div>
            <div className="job-list large">
              {displayedJobs.map(job => (
                <div key={job.id} className={`pulse-card ${job.isMatch ? 'match' : ''}`} onClick={() => window.open(job.applyUrl, '_blank')}>
                  <div className="pulse-avatar">{job.company[0]}</div>
                  <div className="pulse-info">
                    <strong>{job.role}</strong>
                    <span>{job.company} • {job.location}</span>
                  </div>
                  {job.isMatch && <span className="pulse-badge">PREMIUM</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="me-layout fade-in">
            <div className="p-card-hero">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Farhan" className="large-avatar" alt="profile" />
              <h2>Mohd Farhan</h2>
              <p>Fullstack Developer | India</p>
              <div className="accuracy-meter">
                <div className="meter-item"><span>Fits</span><strong>{processedJobs.filter(j => j.isMatch).length}</strong></div>
                <div className="meter-item"><span>Track</span><strong>{targetCompanies.length}</strong></div>
                <div className="meter-item"><span>Score</span><strong>98%</strong></div>
              </div>
            </div>
            <div className="me-actions">
              <div className="me-item"><div className="icon-wrap"><FiBell /></div><div className="text-wrap"><strong>Smart Alerts</strong><span>Get hiring notifications</span></div><FiChevronRight className="chevron" /></div>
              <div className="me-item"><div className="icon-wrap"><FiBriefcase /></div><div className="text-wrap"><strong>Resume Sync</strong><span>Active • 2 days ago</span></div><FiChevronRight className="chevron" /></div>
              <div className="me-item"><div className="icon-wrap"><FiUser /></div><div className="text-wrap"><strong>Privacy Settings</strong><span>Only verified hiring</span></div><FiChevronRight className="chevron" /></div>
            </div>
          </div>
        )}
      </main>

      <nav className="bottom-nav">
        <button className={activeTab === 'home' ? 'active' : ''} onClick={() => setActiveTab('home')}><FiHome /><span>Home</span></button>
        <button className={activeTab === 'targets' ? 'active' : ''} onClick={() => setActiveTab('targets')}><FiTarget /><span>Targets</span></button>
        <button className={activeTab === 'jobs' ? 'active' : ''} onClick={() => setActiveTab('jobs')}><FiBriefcase /><span>Jobs</span></button>
        <button className={activeTab === 'profile' ? 'active' : ''} onClick={() => setActiveTab('profile')}><FiUser /><span>Me</span></button>
      </nav>
    </div>
  );
}

export default App;
