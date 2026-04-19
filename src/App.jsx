

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaBars, FaTimes, FaBriefcase, FaLock, FaPlus, FaSignOutAlt, FaTrash, FaCalendarAlt, FaGraduationCap, FaRupeeSign, FaClock, FaExternalLinkAlt, FaInfoCircle } from 'react-icons/fa';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"
// const API_URL = 'http://localhost:5000/api';
const API_URL = 'https://job-portal-ce48.onrender.com/api'

function App() {
  const [jobs, setJobs] = useState([]);
  const [isOwner, setIsOwner] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Form state
  const [form, setForm] = useState({
    title: '', organization: '', applicationStart: '', applicationLast: '',
    eligibility: '', genMaleFee: '', genFemaleFee: '', obcFee: '',
    scStFee: '', femaleSpecialNote: '', examDateInfo: '', externalLink: '', extraInfo: ''
  });

  const fetchJobs = async () => {
    try {
      const res = await axios.get(`${API_URL}/jobs`);
      setJobs(res.data);
    } catch (err) {
      console.error('Error fetching jobs:', err);
    }
  };

  const verifyToken = async (token) => {
    try {
      await axios.get(`${API_URL}/verify`, { headers: { Authorization: token } });
      setIsOwner(true);
    } catch(err) {
      localStorage.removeItem('token');
      setIsOwner(false);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchJobs();
      const token = localStorage.getItem('token');
      if (token) {
        await verifyToken(token);
      }
    })();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/login`, loginData);
      localStorage.setItem('token', res.data.token);
      setIsOwner(true);
      setShowLogin(false);
      setMobileMenuOpen(false);
      alert('✅ Login successful!');
    } catch(err) {
      alert('❌ Invalid username/password');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsOwner(false);
    setShowForm(false);
    setMobileMenuOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post(`${API_URL}/jobs`, form, { 
        headers: { Authorization: token } 
      });
      alert('✅ Job posted successfully!');
      setShowForm(false);
      setForm({
        title: '', organization: '', applicationStart: '', applicationLast: '',
        eligibility: '', genMaleFee: '', genFemaleFee: '', obcFee: '',
        scStFee: '', femaleSpecialNote: '', examDateInfo: '', externalLink: '', extraInfo: ''
      });
      fetchJobs();
    } catch(err) {
      alert('❌ Failed to post job');
    }
  };

  const deleteJob = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${API_URL}/jobs/${id}`, { 
        headers: { Authorization: token } 
      });
      fetchJobs();
    } catch(err) {
      alert('❌ Failed to delete job');
    }
  };

  return (
  <>
    <Analytics />
    <SpeedInsights/>
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-800 text-white shadow-lg sticky top-0 z-20">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo Section */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
              <FaBriefcase /> 
              JobPost India
            </h1>
            <p className="text-blue-100 text-xs md:text-sm">Latest Govt Job Notifications</p>
          </div>
          
          {/* Desktop Buttons - Hidden on mobile */}
          <div className="hidden md:block">
            {!isOwner ? (
              <button onClick={() => setShowLogin(!showLogin)} className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-lg flex items-center gap-2">
                <FaLock /> Owner Login
              </button>
            ) : (
              <div className="flex gap-3">
                <button onClick={() => setShowForm(!showForm)} className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-lg flex items-center gap-2">
                  <FaPlus /> Post New Job
                </button>
                <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg flex items-center gap-2">
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            )}
          </div>
          
          {/* Hamburger Icon - React Icons - VISIBLE NOW */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden bg-blue-700 hover:bg-blue-600 rounded-lg p-2 transition-all flex items-center justify-center w-10 h-10"
          >
            {mobileMenuOpen ? (
              <FaTimes className="text-white text-xl" />
            ) : (
              <FaBars className="text-white text-xl" />
            )}
          </button>
        </div>
        
        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-blue-900 border-t border-blue-700 py-3 px-4">
            {!isOwner ? (
              <button 
                onClick={() => {
                  setShowLogin(!showLogin);
                  setMobileMenuOpen(false);
                }} 
                className="w-full bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-left flex items-center gap-2"
              >
                <FaLock /> Owner Login
              </button>
            ) : (
              <div className="space-y-2">
                <button 
                  onClick={() => {
                    setShowForm(!showForm);
                    setMobileMenuOpen(false);
                  }} 
                  className="w-full bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-lg text-left flex items-center gap-2"
                >
                  <FaPlus /> Post New Job
                </button>
                <button 
                  onClick={handleLogout} 
                  className="w-full bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-left flex items-center gap-2"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            )}
          </div>
        )}
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Login Modal */}
        {showLogin && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-96">
              <h2 className="text-2xl font-bold mb-4">Owner Login</h2>
              <form onSubmit={handleLogin}>
                <input type="text" placeholder="Username" className="w-full border rounded-lg p-2 mb-3" 
                  value={loginData.username} onChange={(e) => setLoginData({...loginData, username: e.target.value})} />
                <input type="password" placeholder="Password" className="w-full border rounded-lg p-2 mb-4"
                  value={loginData.password} onChange={(e) => setLoginData({...loginData, password: e.target.value})} />
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg">Login</button>
                <button type="button" onClick={() => setShowLogin(false)} className="w-full mt-2 text-gray-500">Cancel</button>
              </form>
            </div>
          </div>
        )}

        {/* Job Post Form */}
        {showForm && isOwner && (
          <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto z-50">
            <div className="bg-white rounded-2xl p-6 max-w-2xl mx-auto my-10">
              <h2 className="text-2xl font-bold mb-4">Post New Job</h2>
              <form onSubmit={handleSubmit} className="space-y-3 max-h-96 overflow-y-auto">
                <input type="text" placeholder="Job Title *" className="w-full border rounded p-2" 
                  value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} required />
                <input type="text" placeholder="Organization *" className="w-full border rounded p-2"
                  value={form.organization} onChange={(e) => setForm({...form, organization: e.target.value})} required />
                <div className="grid grid-cols-2 gap-2">
                  <input type="date" placeholder="App Start" className="border rounded p-2" 
                    value={form.applicationStart} onChange={(e) => setForm({...form, applicationStart: e.target.value})} />
                  <input type="date" placeholder="App Last" className="border rounded p-2"
                    value={form.applicationLast} onChange={(e) => setForm({...form, applicationLast: e.target.value})} />
                </div>
                <textarea placeholder="Eligibility" rows="2" className="w-full border rounded p-2"
                  value={form.eligibility} onChange={(e) => setForm({...form, eligibility: e.target.value})}></textarea>
                <div className="grid grid-cols-2 gap-2">
                  <input placeholder="General Male Fee" className="border rounded p-2"
                    value={form.genMaleFee} onChange={(e) => setForm({...form, genMaleFee: e.target.value})} />
                  <input placeholder="General Female Fee" className="border rounded p-2"
                    value={form.genFemaleFee} onChange={(e) => setForm({...form, genFemaleFee: e.target.value})} />
                  <input placeholder="OBC Fee" className="border rounded p-2"
                    value={form.obcFee} onChange={(e) => setForm({...form, obcFee: e.target.value})} />
                  <input placeholder="SC/ST Fee" className="border rounded p-2"
                    value={form.scStFee} onChange={(e) => setForm({...form, scStFee: e.target.value})} />
                </div>
                <input placeholder="Female Special Note" className="w-full border rounded p-2"
                  value={form.femaleSpecialNote} onChange={(e) => setForm({...form, femaleSpecialNote: e.target.value})} />
                <input placeholder="Exam Date Info" className="w-full border rounded p-2"
                  value={form.examDateInfo} onChange={(e) => setForm({...form, examDateInfo: e.target.value})} />
                <input placeholder="External Link (Apply Link)" className="w-full border rounded p-2"
                  value={form.externalLink} onChange={(e) => setForm({...form, externalLink: e.target.value})} />
                <textarea placeholder="Extra Info" rows="2" className="w-full border rounded p-2"
                  value={form.extraInfo} onChange={(e) => setForm({...form, extraInfo: e.target.value})}></textarea>
                <div className="flex gap-3">
                  <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-lg">Post Job</button>
                  <button type="button" onClick={() => setShowForm(false)} className="bg-gray-400 px-6 py-2 rounded-lg">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Job List */}
        <div className="grid gap-6">
          <h2 className="text-2xl font-bold">📢 Latest Job Notifications ({jobs.length})</h2>
          {jobs.length === 0 && <p className="text-gray-400">No jobs posted yet.</p>}
          
          {jobs.map(job => (
            <div key={job._id} className="bg-white rounded-2xl shadow-md p-5">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-xl font-bold">{job.title}</h3>
                  <p className="text-blue-600">{job.organization}</p>
                </div>
                {isOwner && (
                  <button onClick={() => deleteJob(job._id)} className="text-red-500 hover:text-red-700">
                    <FaTrash />
                  </button>
                )}
              </div>
              <div className="grid md:grid-cols-2 gap-3 mt-3 text-sm">
                {job.applicationStart && <p className="flex items-center gap-1"><FaCalendarAlt /> Start: {job.applicationStart}</p>}
                {job.applicationLast && <p className="flex items-center gap-1"><FaClock /> Last: {job.applicationLast}</p>}
                {job.eligibility && <p className="flex items-center gap-1"><FaGraduationCap /> Eligibility: {job.eligibility}</p>}
              </div>
              <div className="bg-gray-50 p-3 rounded mt-2">
                <p className="font-semibold flex items-center gap-1"><FaRupeeSign /> Fee Structure:</p>
                <div className="grid grid-cols-2 gap-1 text-sm">
                  {job.genMaleFee && <span>Male Gen: {job.genMaleFee}</span>}
                  {job.genFemaleFee && <span>Female Gen: {job.genFemaleFee}</span>}
                  {job.obcFee && <span>OBC: {job.obcFee}</span>}
                  {job.scStFee && <span>SC/ST: {job.scStFee}</span>}
                </div>
                {job.femaleSpecialNote && <p className="text-xs mt-1">👩 {job.femaleSpecialNote}</p>}
              </div>
              {job.examDateInfo && <p className="text-sm mt-1">📅 Exam: {job.examDateInfo}</p>}
              {job.externalLink && (
                <a href={job.externalLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
                  <FaExternalLinkAlt /> Apply / Notification Link →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  </>
    
  );
}

export default App;