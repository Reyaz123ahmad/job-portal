


import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { 
  FaBars, FaTimes, FaBriefcase, FaLock, FaPlus, FaSignOutAlt, 
  FaTrash, FaCalendarAlt, FaGraduationCap, FaRupeeSign, FaClock, 
  FaExternalLinkAlt, FaEdit, FaHome, FaInfoCircle, FaEnvelope, 
  FaShieldAlt, FaCheckCircle, FaPhone, FaMapMarkerAlt, FaPaperPlane,
  FaHashtag, FaFacebook, FaTwitter, FaInstagram, FaLinkedin
} from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

const API_URL = 'https://job-portal-ce48.onrender.com/api';

// Background Pattern
const BG_PATTERN = "https://www.transparenttextures.com/patterns/cubes.png";

// ========== FOOTER ==========
function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-10">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-3 flex items-center gap-2"><FaBriefcase /> JobPost India</h3>
            <p className="text-gray-300 text-sm">Latest Government Job Notifications. Get all updates about SSC, Banking, Railway, UPSC, and more.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-gray-300 hover:text-white transition">🏠 Home</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition">ℹ️ About Us</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition">📧 Contact Us</Link></li>
              <li><Link to="/privacy" className="text-gray-300 hover:text-white transition">🔒 Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact Info</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center gap-2"><FaEnvelope /> support@jobpostindia.com</li>
              <li className="flex items-center gap-2"><FaPhone /> +91-XXXXXXXXXX</li>
              <li className="flex items-center gap-2"><FaMapMarkerAlt /> India</li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a href="#" className="text-gray-300 hover:text-white transition"><FaFacebook size={20} /></a>
              <a href="#" className="text-gray-300 hover:text-white transition"><FaTwitter size={20} /></a>
              <a href="#" className="text-gray-300 hover:text-white transition"><FaInstagram size={20} /></a>
              <a href="#" className="text-gray-300 hover:text-white transition"><FaLinkedin size={20} /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-6 pt-4 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} JobPost India. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

// ========== HEADER ==========
function Header({ isOwner, onLoginClick, onPostClick, onLogout }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getLinkClass = (path) => {
    return `flex items-center gap-2 transition-colors font-medium ${
      location.pathname === path 
        ? 'text-yellow-300 border-b-2 border-yellow-300 pb-1' 
        : 'hover:text-blue-200'
    }`;
  };

  const getMobileLinkClass = (path) => {
    return `px-4 py-2 rounded flex items-center gap-2 font-medium ${
      location.pathname === path ? 'bg-blue-700' : 'hover:bg-blue-800'
    }`;
  };

  return (
    <header className="bg-blue-800 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="hover:opacity-90">
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2"><FaBriefcase /> JobPost India</h1>
            <p className="text-blue-100 text-xs md:text-sm font-normal">Latest Govt Job Notifications</p>
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className={getLinkClass('/')}><FaHome /> Home</Link>
            <Link to="/about" className={getLinkClass('/about')}><FaInfoCircle /> About</Link>
            <Link to="/contact" className={getLinkClass('/contact')}><FaEnvelope /> Contact</Link>
            <Link to="/privacy" className={getLinkClass('/privacy')}><FaShieldAlt /> Privacy</Link>
            
            {!isOwner ? (
              <button onClick={onLoginClick} className="bg-green-600 hover:bg-green-700 px-4 py-1.5 rounded-lg flex items-center gap-2 text-sm font-medium ml-4 transition-all hover:scale-105">
                <FaLock /> Owner Login
              </button>
            ) : (
              <div className="flex gap-2 ml-4">
                <button onClick={onPostClick} className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1.5 rounded-lg flex items-center gap-2 text-sm font-medium transition-all hover:scale-105">
                  <FaPlus /> Post New Job
                </button>
                <button onClick={onLogout} className="bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded-lg flex items-center gap-2 text-sm font-medium transition-all hover:scale-105">
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            )}
          </div>
          
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden bg-blue-700 hover:bg-blue-600 rounded-lg p-2 transition-all flex items-center justify-center w-10 h-10"
          >
            {mobileMenuOpen ? <FaTimes className="text-white text-xl" /> : <FaBars className="text-white text-xl" />}
          </button>
        </div>
        
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-blue-700 flex flex-col gap-2">
            <Link to="/" className={getMobileLinkClass('/')} onClick={() => setMobileMenuOpen(false)}><FaHome /> Home</Link>
            <Link to="/about" className={getMobileLinkClass('/about')} onClick={() => setMobileMenuOpen(false)}><FaInfoCircle /> About</Link>
            <Link to="/contact" className={getMobileLinkClass('/contact')} onClick={() => setMobileMenuOpen(false)}><FaEnvelope /> Contact</Link>
            <Link to="/privacy" className={getMobileLinkClass('/privacy')} onClick={() => setMobileMenuOpen(false)}><FaShieldAlt /> Privacy</Link>
            
            {!isOwner ? (
              <button onClick={() => { onLoginClick(); setMobileMenuOpen(false); }} className="w-full bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-left flex items-center gap-2 font-medium mt-2">
                <FaLock /> Owner Login
              </button>
            ) : (
              <div className="flex flex-col gap-2 mt-2">
                <button onClick={() => { onPostClick(); setMobileMenuOpen(false); }} className="w-full bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-lg text-left flex items-center gap-2 font-medium">
                  <FaPlus /> Post New Job
                </button>
                <button onClick={onLogout} className="w-full bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-left flex items-center gap-2 font-medium">
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

// ========== ABOUT PAGE ==========
function About() {
  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 py-10" style={{ backgroundImage: `url(${BG_PATTERN})`, backgroundBlend: 'overlay' }}>
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 transition-all hover:shadow-3xl">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600 mb-4 flex items-center gap-2"><FaInfoCircle /> About Us</h1>
          <div className="space-y-4 text-gray-700">
            <p className="font-medium"><strong className="font-bold">JobPost India</strong> is a dedicated platform providing latest government job notifications.</p>
            <h2 className="text-xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600 mt-6">What We Offer:</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li className="flex items-center gap-2 font-medium"><FaCheckCircle className="text-green-500" /> Latest Sarkari Job Notifications</li>
              <li className="flex items-center gap-2 font-medium"><FaCheckCircle className="text-green-500" /> Complete Application Details</li>
              <li className="flex items-center gap-2 font-medium"><FaCheckCircle className="text-green-500" /> Category-wise Fee Structure</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// ========== CONTACT PAGE ==========
function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 py-10" style={{ backgroundImage: `url(${BG_PATTERN})`, backgroundBlend: 'overlay' }}>
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 transition-all hover:shadow-3xl">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600 mb-6">Contact Us</h1>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600 mb-4">Get in Touch</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 font-medium"><FaEnvelope className="text-blue-600" /> support@jobpostindia.com</div>
                <div className="flex items-center gap-3 font-medium"><FaPhone className="text-blue-600" /> +91-XXXXXXXXXX</div>
                <div className="flex items-center gap-3 font-medium"><FaMapMarkerAlt className="text-blue-600" /> India</div>
              </div>
            </div>
            <div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" placeholder="Your Name *" required className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium bg-white/50"
                  value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                <input type="email" placeholder="Your Email *" required className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium bg-white/50"
                  value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                <textarea placeholder="Your Message *" rows="4" required className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium bg-white/50"
                  value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}></textarea>
                <button type="submit" disabled={loading} className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 justify-center font-semibold transition-all hover:scale-105 shadow-lg">
                  {loading ? <ClipLoader size={20} color="white" /> : <><FaPaperPlane /> Send Message</>}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// ========== PRIVACY PAGE ==========
function Privacy() {
  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 py-10" style={{ backgroundImage: `url(${BG_PATTERN})`, backgroundBlend: 'overlay' }}>
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 transition-all hover:shadow-3xl">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600 mb-4 flex items-center gap-2"><FaShieldAlt /> Privacy Policy</h1>
          <p className="text-gray-500 mb-6 font-medium">Last Updated: April 2026</p>
          <div className="space-y-4 text-gray-700">
            <section><h2 className="text-xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600 mb-2">1. Information We Collect</h2><p className="font-medium">We collect information you provide directly to us.</p></section>
            <section><h2 className="text-xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600 mb-2">2. Cookies & Tracking</h2><p className="font-medium">We use cookies to enhance user experience and analyze site traffic.</p></section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// ========== HOME PAGE ==========
function HomePage({ externalShowForm, setExternalShowForm }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [formLoading, setFormLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null);
  
  const [form, setForm] = useState({
    title: '', organization: '', applicationStart: '', applicationLast: '',
    eligibility: '', genMaleFee: '', genFemaleFee: '', obcFee: '',
    scStFee: '', femaleSpecialNote: '', examDateInfo: '', externalLink: '', extraInfo: '', totalPosts: ''
  });

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/jobs`);
      setJobs(res.data);
    } catch (err) {
      toast.error('Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  }, []);

  const verifyToken = useCallback(async (token) => {
    try {
      await axios.get(`${API_URL}/verify`, { headers: { Authorization: token } });
      setIsOwner(true);
    } catch(err) {
      localStorage.removeItem('token');
      setIsOwner(false);
    }
  }, []);

  // Initial load - only once
  useEffect(() => {
    fetchJobs();
    const token = localStorage.getItem('token');
    if (token) verifyToken(token);
  }, [fetchJobs, verifyToken]);

  // Handle external post form trigger
  useEffect(() => {
    if (externalShowForm) {
      setShowForm(true);
      setExternalShowForm(false);
    }
  }, [externalShowForm, setExternalShowForm]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const res = await axios.post(`${API_URL}/login`, loginData);
      localStorage.setItem('token', res.data.token);
      setIsOwner(true);
      setShowLogin(false);
      toast.success('Login successful!');
    } catch(err) {
      toast.error('Invalid username/password');
    } finally {
      setFormLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsOwner(false);
    setShowForm(false);
    setShowEditForm(false);
    toast.success('Logged out successfully');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    const token = localStorage.getItem('token');
    try {
      await axios.post(`${API_URL}/jobs`, form, { headers: { Authorization: token } });
      toast.success('Job posted successfully!');
      setShowForm(false);
      resetForm();
      fetchJobs();
    } catch(err) {
      toast.error('Failed to post job');
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    const token = localStorage.getItem('token');
    try {
      await axios.put(`${API_URL}/jobs/${editingJob._id}`, form, { headers: { Authorization: token } });
      toast.success('Job updated successfully!');
      setShowEditForm(false);
      setEditingJob(null);
      resetForm();
      fetchJobs();
    } catch(err) {
      toast.error('Failed to update job');
    } finally {
      setFormLoading(false);
    }
  };

  const openEditForm = (job) => {
    setEditingJob(job);
    setForm({
      title: job.title || '',
      organization: job.organization || '',
      applicationStart: job.applicationStart || '',
      applicationLast: job.applicationLast || '',
      eligibility: job.eligibility || '',
      genMaleFee: job.genMaleFee || '',
      genFemaleFee: job.genFemaleFee || '',
      obcFee: job.obcFee || '',
      scStFee: job.scStFee || '',
      femaleSpecialNote: job.femaleSpecialNote || '',
      examDateInfo: job.examDateInfo || '',
      externalLink: job.externalLink || '',
      extraInfo: job.extraInfo || '',
      totalPosts: job.totalPosts || ''
    });
    setShowEditForm(true);
  };

  const resetForm = () => {
    setForm({
      title: '', organization: '', applicationStart: '', applicationLast: '',
      eligibility: '', genMaleFee: '', genFemaleFee: '', obcFee: '',
      scStFee: '', femaleSpecialNote: '', examDateInfo: '', externalLink: '', extraInfo: '', totalPosts: ''
    });
  };

  const deleteJob = async (id) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;
    setDeleteLoading(id);
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${API_URL}/jobs/${id}`, { headers: { Authorization: token } });
      toast.success('Job deleted successfully');
      fetchJobs();
    } catch(err) {
      toast.error('Failed to delete job');
    } finally {
      setDeleteLoading(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-br from-indigo-50 via-white to-purple-50" style={{ backgroundImage: `url(${BG_PATTERN})`, backgroundBlend: 'overlay' }}>
      <div className="flex-grow container mx-auto px-4 py-8">
        {/* Login Modal */}
        {showLogin && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 w-96 shadow-2xl">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600 mb-4">Owner Login</h2>
              <form onSubmit={handleLogin}>
                <input type="text" placeholder="Username" className="w-full border rounded-lg p-2 mb-3 font-medium focus:ring-2 focus:ring-blue-500 outline-none bg-white/80" 
                  value={loginData.username} onChange={(e) => setLoginData({...loginData, username: e.target.value})} />
                <input type="password" placeholder="Password" className="w-full border rounded-lg p-2 mb-4 font-medium focus:ring-2 focus:ring-blue-500 outline-none bg-white/80" 
                  value={loginData.password} onChange={(e) => setLoginData({...loginData, password: e.target.value})} />
                <button type="submit" disabled={formLoading} className="w-full bg-linear-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 font-semibold hover:shadow-xl transition-all">
                  {formLoading ? <ClipLoader size={20} color="white" /> : 'Login'}
                </button>
                <button type="button" onClick={() => setShowLogin(false)} className="w-full mt-2 text-gray-500 font-medium hover:text-gray-700">Cancel</button>
              </form>
            </div>
          </div>
        )}

        {/* Post Job Form */}
        {showForm && isOwner && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm overflow-y-auto z-50">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 max-w-2xl mx-auto my-10 shadow-2xl">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-green-600 to-blue-600 mb-4 border-l-4 border-green-500 pl-3">📝 Post New Job</h2>
              <form onSubmit={handleSubmit} className="space-y-3 max-h-96 overflow-y-auto">
                <input type="text" placeholder="Job Title *" className="w-full border rounded-lg p-2 font-medium focus:ring-2 focus:ring-green-400 outline-none bg-white/80" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} required />
                <input type="text" placeholder="Organization *" className="w-full border rounded-lg p-2 font-medium focus:ring-2 focus:ring-green-400 outline-none bg-white/80" value={form.organization} onChange={(e) => setForm({...form, organization: e.target.value})} required />
                <input type="text" placeholder="Total Posts (Vacancies)" className="w-full border rounded-lg p-2 font-medium focus:ring-2 focus:ring-green-400 outline-none bg-white/80" value={form.totalPosts} onChange={(e) => setForm({...form, totalPosts: e.target.value})} />
                <div className="grid grid-cols-2 gap-2">
                  <input type="date" className="border rounded-lg p-2 font-medium focus:ring-2 focus:ring-green-400 outline-none bg-white/80" value={form.applicationStart} onChange={(e) => setForm({...form, applicationStart: e.target.value})} />
                  <input type="date" className="border rounded-lg p-2 font-medium focus:ring-2 focus:ring-green-400 outline-none bg-white/80" value={form.applicationLast} onChange={(e) => setForm({...form, applicationLast: e.target.value})} />
                </div>
                <textarea placeholder="Eligibility (योग्यता)" rows="3" className="w-full border rounded-lg p-2 font-medium focus:ring-2 focus:ring-green-400 outline-none bg-white/80" value={form.eligibility} onChange={(e) => setForm({...form, eligibility: e.target.value})}></textarea>
                <div className="grid grid-cols-2 gap-2 bg-linear-to-r from-blue-50 to-indigo-50 p-3 rounded-lg">
                  <input placeholder="General Male Fee" className="border rounded-lg p-2 font-medium bg-white/80" value={form.genMaleFee} onChange={(e) => setForm({...form, genMaleFee: e.target.value})} />
                  <input placeholder="General Female Fee" className="border rounded-lg p-2 font-medium bg-white/80" value={form.genFemaleFee} onChange={(e) => setForm({...form, genFemaleFee: e.target.value})} />
                  <input placeholder="OBC Fee" className="border rounded-lg p-2 font-medium bg-white/80" value={form.obcFee} onChange={(e) => setForm({...form, obcFee: e.target.value})} />
                  <input placeholder="SC/ST Fee" className="border rounded-lg p-2 font-medium bg-white/80" value={form.scStFee} onChange={(e) => setForm({...form, scStFee: e.target.value})} />
                </div>
                <input placeholder="Female Special Note" className="w-full border rounded-lg p-2 font-medium focus:ring-2 focus:ring-green-400 outline-none bg-white/80" value={form.femaleSpecialNote} onChange={(e) => setForm({...form, femaleSpecialNote: e.target.value})} />
                <input placeholder="Exam Date Info" className="w-full border rounded-lg p-2 font-medium focus:ring-2 focus:ring-green-400 outline-none bg-white/80" value={form.examDateInfo} onChange={(e) => setForm({...form, examDateInfo: e.target.value})} />
                <input placeholder="External Link (Apply Link)" className="w-full border rounded-lg p-2 font-medium focus:ring-2 focus:ring-green-400 outline-none bg-white/80" value={form.externalLink} onChange={(e) => setForm({...form, externalLink: e.target.value})} />
                <textarea placeholder="Extra Info" rows="2" className="w-full border rounded-lg p-2 font-medium focus:ring-2 focus:ring-green-400 outline-none bg-white/80" value={form.extraInfo} onChange={(e) => setForm({...form, extraInfo: e.target.value})}></textarea>
                <div className="flex gap-3 pt-2">
                  <button type="submit" disabled={formLoading} className="bg-linear-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 font-semibold transition-all hover:scale-105 shadow-lg">
                    {formLoading ? <ClipLoader size={20} color="white" /> : 'Post Job'}
                  </button>
                  <button type="button" onClick={() => setShowForm(false)} className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold transition-all">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Job Form */}
        {showEditForm && isOwner && editingJob && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm overflow-y-auto z-50">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 max-w-2xl mx-auto my-10 shadow-2xl">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-yellow-600 to-orange-600 mb-4 border-l-4 border-yellow-500 pl-3">Edit Job</h2>
              <form onSubmit={handleEdit} className="space-y-3 max-h-96 overflow-y-auto">
                <input type="text" placeholder="Job Title *" className="w-full border rounded-lg p-2 font-medium focus:ring-2 focus:ring-yellow-400 outline-none bg-white/80" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} required />
                <input type="text" placeholder="Organization *" className="w-full border rounded-lg p-2 font-medium focus:ring-2 focus:ring-yellow-400 outline-none bg-white/80" value={form.organization} onChange={(e) => setForm({...form, organization: e.target.value})} required />
                <input type="text" placeholder="Total Posts" className="w-full border rounded-lg p-2 font-medium focus:ring-2 focus:ring-yellow-400 outline-none bg-white/80" value={form.totalPosts} onChange={(e) => setForm({...form, totalPosts: e.target.value})} />
                <div className="grid grid-cols-2 gap-2">
                  <input type="date" className="border rounded-lg p-2 font-medium focus:ring-2 focus:ring-yellow-400 outline-none bg-white/80" value={form.applicationStart} onChange={(e) => setForm({...form, applicationStart: e.target.value})} />
                  <input type="date" className="border rounded-lg p-2 font-medium focus:ring-2 focus:ring-yellow-400 outline-none bg-white/80" value={form.applicationLast} onChange={(e) => setForm({...form, applicationLast: e.target.value})} />
                </div>
                <textarea placeholder="Eligibility" rows="3" className="w-full border rounded-lg p-2 font-medium focus:ring-2 focus:ring-yellow-400 outline-none bg-white/80" value={form.eligibility} onChange={(e) => setForm({...form, eligibility: e.target.value})}></textarea>
                <div className="grid grid-cols-2 gap-2 bg-linear-to-r from-blue-50 to-indigo-50 p-3 rounded-lg">
                  <input placeholder="General Male Fee" className="border rounded-lg p-2 font-medium bg-white/80" value={form.genMaleFee} onChange={(e) => setForm({...form, genMaleFee: e.target.value})} />
                  <input placeholder="General Female Fee" className="border rounded-lg p-2 font-medium bg-white/80" value={form.genFemaleFee} onChange={(e) => setForm({...form, genFemaleFee: e.target.value})} />
                  <input placeholder="OBC Fee" className="border rounded-lg p-2 font-medium bg-white/80" value={form.obcFee} onChange={(e) => setForm({...form, obcFee: e.target.value})} />
                  <input placeholder="SC/ST Fee" className="border rounded-lg p-2 font-medium bg-white/80" value={form.scStFee} onChange={(e) => setForm({...form, scStFee: e.target.value})} />
                </div>
                <input placeholder="Female Special Note" className="w-full border rounded-lg p-2 font-medium focus:ring-2 focus:ring-yellow-400 outline-none bg-white/80" value={form.femaleSpecialNote} onChange={(e) => setForm({...form, femaleSpecialNote: e.target.value})} />
                <input placeholder="Exam Date Info" className="w-full border rounded-lg p-2 font-medium focus:ring-2 focus:ring-yellow-400 outline-none bg-white/80" value={form.examDateInfo} onChange={(e) => setForm({...form, examDateInfo: e.target.value})} />
                <input placeholder="External Link" className="w-full border rounded-lg p-2 font-medium focus:ring-2 focus:ring-yellow-400 outline-none bg-white/80" value={form.externalLink} onChange={(e) => setForm({...form, externalLink: e.target.value})} />
                <textarea placeholder="Extra Info" rows="2" className="w-full border rounded-lg p-2 font-medium focus:ring-2 focus:ring-yellow-400 outline-none bg-white/80" value={form.extraInfo} onChange={(e) => setForm({...form, extraInfo: e.target.value})}></textarea>
                <div className="flex gap-3 pt-2">
                  <button type="submit" disabled={formLoading} className="bg-linear-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 font-semibold transition-all hover:scale-105 shadow-lg">
                    {formLoading ? <ClipLoader size={20} color="white" /> : 'Update Job'}
                  </button>
                  <button type="button" onClick={() => { setShowEditForm(false); setEditingJob(null); resetForm(); }} className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold transition-all">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Job List */}
        <div className="grid gap-6">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">📢 Latest Job Notifications ({jobs.length})</h2>
          
          {loading ? (
            <div className="flex justify-center items-center py-20"><ClipLoader size={50} color="#3b82f6" /></div>
          ) : jobs.length === 0 ? (
            <p className="text-gray-400 text-center py-10 font-medium">No jobs posted yet.</p>
          ) : (
            jobs.map(job => (
              <div key={job._id} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-5 transition-all hover:shadow-2xl hover:-translate-y-1 border border-white/20">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-transparent bg-clip-text bg-linear-to-r from-gray-800 to-gray-600">{job.title}</h3>
                    <p className="text-blue-600 font-semibold">{job.organization}</p>
                    {job.totalPosts && <p className="text-green-600 text-sm mt-1 flex items-center gap-1 font-medium"><FaHashtag /> Total Vacancies: {job.totalPosts}</p>}
                  </div>
                  {isOwner && (
                    <div className="flex gap-2">
                      <button onClick={() => openEditForm(job)} className="text-yellow-500 hover:text-yellow-700 p-1 transition-all hover:scale-110"><FaEdit size={18} /></button>
                      <button onClick={() => deleteJob(job._id)} disabled={deleteLoading === job._id} className="text-red-500 hover:text-red-700 p-1 transition-all hover:scale-110">
                        {deleteLoading === job._id ? <ClipLoader size={16} color="#ef4444" /> : <FaTrash size={18} />}
                      </button>
                    </div>
                  )}
                </div>
                <div className="grid md:grid-cols-2 gap-3 mt-3 text-sm">
                  {job.applicationStart && <p className="flex items-center gap-1 font-medium text-gray-700"><FaCalendarAlt /> Start: {job.applicationStart}</p>}
                  {job.applicationLast && <p className="flex items-center gap-1 font-medium text-gray-700"><FaClock /> Last: {job.applicationLast}</p>}
                  {job.eligibility && <p className="flex items-center gap-1 font-medium text-gray-700"><FaGraduationCap /> Eligibility: {job.eligibility}</p>}
                </div>
                <div className="bg-linear-to-r from-blue-50 to-indigo-50 p-3 rounded-lg mt-2">
                  <p className="font-bold flex items-center gap-1 text-gray-800"><FaRupeeSign /> Fee Structure:</p>
                  <div className="grid grid-cols-2 gap-1 text-sm font-medium text-gray-700">
                    {job.genMaleFee && <span>Male Gen: {job.genMaleFee}</span>}
                    {job.genFemaleFee && <span>Female Gen: {job.genFemaleFee}</span>}
                    {job.obcFee && <span>OBC: {job.obcFee}</span>}
                    {job.scStFee && <span>SC/ST: {job.scStFee}</span>}
                  </div>
                  {job.femaleSpecialNote && <p className="text-xs mt-1 font-medium text-gray-600">👩 {job.femaleSpecialNote}</p>}
                </div>
                {job.examDateInfo && <p className="text-sm mt-1 font-medium text-gray-700">📅 Exam: {job.examDateInfo}</p>}
                {job.externalLink && (
                  <a href={job.externalLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-3 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:scale-105 shadow-md">
                    <FaExternalLinkAlt /> Apply / Notification Link →
                  </a>
                )}
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

// ========== MAIN APP ==========
function App() {
  const [isOwner, setIsOwner] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showPostForm, setShowPostForm] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [formLoading, setFormLoading] = useState(false);

  const verifyToken = useCallback(async (token) => {
    try {
      await axios.get(`${API_URL}/verify`, { headers: { Authorization: token } });
      setIsOwner(true);
    } catch(err) {
      localStorage.removeItem('token');
      setIsOwner(false);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) verifyToken(token);
  }, [verifyToken]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const res = await axios.post(`${API_URL}/login`, loginData);
      localStorage.setItem('token', res.data.token);
      setIsOwner(true);
      setShowLogin(false);
      toast.success('Login successful!');
    } catch(err) {
      toast.error('Invalid username/password');
    } finally {
      setFormLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsOwner(false);
    toast.success('Logged out successfully');
  };

  const handlePostClick = () => {
    setShowPostForm(true);
    setTimeout(() => setShowPostForm(false), 200);
  };

  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Analytics />
      <SpeedInsights />
      
      <Header 
        isOwner={isOwner}
        onLoginClick={() => setShowLogin(true)}
        onPostClick={handlePostClick}
        onLogout={handleLogout}
      />

      {showLogin && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 w-96 shadow-2xl">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600 mb-4">Owner Login</h2>
            <form onSubmit={handleLogin}>
              <input type="text" placeholder="Username" className="w-full border rounded-lg p-2 mb-3 font-medium focus:ring-2 focus:ring-blue-500 outline-none bg-white/80" 
                value={loginData.username} onChange={(e) => setLoginData({...loginData, username: e.target.value})} />
              <input type="password" placeholder="Password" className="w-full border rounded-lg p-2 mb-4 font-medium focus:ring-2 focus:ring-blue-500 outline-none bg-white/80" 
                value={loginData.password} onChange={(e) => setLoginData({...loginData, password: e.target.value})} />
              <button type="submit" disabled={formLoading} className="w-full bg-linear-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 font-semibold hover:shadow-xl transition-all">
                {formLoading ? <ClipLoader size={20} color="white" /> : 'Login'}
              </button>
              <button type="button" onClick={() => setShowLogin(false)} className="w-full mt-2 text-gray-500 font-medium hover:text-gray-700">Cancel</button>
            </form>
          </div>
        </div>
      )}

      <Routes>
        <Route path="/" element={<HomePage externalShowForm={showPostForm} setExternalShowForm={setShowPostForm} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;