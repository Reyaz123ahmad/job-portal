// import React, { useState } from 'react';
// import ReactDOM from 'react-dom/client';
// const JobPortal = () => {
//   // State for all job posts
//   const [jobs, setJobs] = useState([]);
  
//   // Form state
//   const [form, setForm] = useState({
//     title: '',
//     organization: '',
//     applicationStart: '',
//     applicationLast: '',
//     eligibility: '',
//     genMaleFee: '',
//     genFemaleFee: '',
//     obcFee: '',
//     scStFee: '',
//     femaleSpecialNote: '',
//     examDateInfo: '',
//     externalLink: '',
//     extraInfo: ''
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!form.title || !form.organization) {
//       alert("कृपया Job Title और Organization भरें!");
//       return;
//     }
    
//     const newJob = {
//       id: Date.now(),
//       ...form,
//       postedOn: new Date().toLocaleDateString('hi-IN')
//     };
    
//     setJobs([newJob, ...jobs]); 
    
//     // Reset form
//     setForm({
//       title: '',
//       organization: '',
//       applicationStart: '',
//       applicationLast: '',
//       eligibility: '',
//       genMaleFee: '',
//       genFemaleFee: '',
//       obcFee: '',
//       scStFee: '',
//       femaleSpecialNote: '',
//       examDateInfo: '',
//       externalLink: '',
//       extraInfo: ''
//     });
    
//     alert("✅ Job सफलतापूर्वक पोस्ट हो गई!");
//   };

//   const deleteJob = (id) => {
//     setJobs(jobs.filter(job => job.id !== id));
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Header */}
//       <header className="bg-blue-800 text-white shadow-lg sticky top-0 z-10">
//         <div className="container mx-auto px-4 py-5">
//           <h1 className="text-3xl font-bold flex items-center gap-2">
//             <i className="fas fa-briefcase"></i> 
//             JobPost India - लाइव जॉब पोर्टल
//           </h1>
//           <p className="text-blue-100 mt-1">सरकारी / प्राइवेट जॉब का पूरा डिटेल पोस्ट करें और देखें</p>
//         </div>
//       </header>

//       <div className="container mx-auto px-4 py-8">
//         <div className="grid lg:grid-cols-12 gap-8">
//           {/* LEFT: Post Job Form */}
//           <div className="lg:col-span-5">
//             <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24">
//               <h2 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-blue-600 pl-3">
//                 <i className="fas fa-pen-alt text-blue-600 mr-2"></i>नई जॉब पोस्ट करें
//               </h2>
              
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 {/* Job Title & Organization */}
//                 <div className="grid md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-1">जॉब टाइटल *</label>
//                     <input type="text" name="title" value={form.title} onChange={handleChange}
//                       className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
//                       placeholder="e.g., SSC CGL 2025" />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-1">Organization *</label>
//                     <input type="text" name="organization" value={form.organization} onChange={handleChange}
//                       className="w-full border border-gray-300 rounded-lg px-3 py-2"
//                       placeholder="e.g., Staff Selection Commission" />
//                   </div>
//                 </div>

//                 {/* Dates */}
//                 <div className="grid md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-1">आवेदन शुरू</label>
//                     <input type="date" name="applicationStart" value={form.applicationStart} onChange={handleChange}
//                       className="w-full border border-gray-300 rounded-lg px-3 py-2" />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-1">आवेदन अंतिम तारीख</label>
//                     <input type="date" name="applicationLast" value={form.applicationLast} onChange={handleChange}
//                       className="w-full border border-gray-300 rounded-lg px-3 py-2" />
//                   </div>
//                 </div>

//                 {/* Eligibility */}
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-1">योग्यता (Eligibility)</label>
//                   <textarea name="eligibility" rows="2" value={form.eligibility} onChange={handleChange}
//                     className="w-full border border-gray-300 rounded-lg px-3 py-2"
//                     placeholder="e.g., Graduate, Age 18-32 years, Indian Citizen"></textarea>
//                 </div>

//                 {/* Fee Structure */}
//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2"><i className="fas fa-rupee-sign"></i> आवेदन फीस (Category-wise)</h3>
//                   <div className="grid grid-cols-2 gap-3">
//                     <div><label className="text-xs text-gray-600">General (Male)</label>
//                       <input type="text" name="genMaleFee" value={form.genMaleFee} onChange={handleChange} placeholder="₹100" className="w-full border rounded px-2 py-1 text-sm" />
//                     </div>
//                     <div><label className="text-xs text-gray-600">General (Female)</label>
//                       <input type="text" name="genFemaleFee" value={form.genFemaleFee} onChange={handleChange} placeholder="₹100" className="w-full border rounded px-2 py-1 text-sm" />
//                     </div>
//                     <div><label className="text-xs text-gray-600">OBC (Male/Female)</label>
//                       <input type="text" name="obcFee" value={form.obcFee} onChange={handleChange} placeholder="₹100" className="w-full border rounded px-2 py-1 text-sm" />
//                     </div>
//                     <div><label className="text-xs text-gray-600">SC/ST (All)</label>
//                       <input type="text" name="scStFee" value={form.scStFee} onChange={handleChange} placeholder="₹0 / Exempted" className="w-full border rounded px-2 py-1 text-sm" />
//                     </div>
//                   </div>
//                   <div className="mt-2">
//                     <label className="text-xs text-gray-600">महिलाओं के लिए विशेष (Female Special Note)</label>
//                     <input type="text" name="femaleSpecialNote" value={form.femaleSpecialNote} onChange={handleChange} placeholder="e.g., All female SC/ST exempted" className="w-full border rounded px-2 py-1 text-sm" />
//                   </div>
//                 </div>

//                 {/* Exam Date Info */}
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-1">परीक्षा तिथि / Important Dates</label>
//                   <input type="text" name="examDateInfo" value={form.examDateInfo} onChange={handleChange}
//                     className="w-full border border-gray-300 rounded-lg px-3 py-2"
//                     placeholder="e.g., Tier I: June 2025, Tier II: Aug 2025" />
//                 </div>

//                 {/* External Link */}
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-1">External Link (Apply / Notification)</label>
//                   <input type="url" name="externalLink" value={form.externalLink} onChange={handleChange}
//                     className="w-full border border-gray-300 rounded-lg px-3 py-2"
//                     placeholder="https://ssc.nic.in" />
//                 </div>

//                 {/* Extra Info */}
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-1">अतिरिक्त जानकारी (Additional Details)</label>
//                   <textarea name="extraInfo" rows="2" value={form.extraInfo} onChange={handleChange}
//                     className="w-full border border-gray-300 rounded-lg px-3 py-2"
//                     placeholder="Selection process, interview, document required etc."></textarea>
//                 </div>

//                 <button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2">
//                   <i className="fas fa-upload"></i> जॉब पोस्ट करें
//                 </button>
//               </form>
//             </div>
//           </div>

//           {/* RIGHT: All Job Posts Display */}
//           <div className="lg:col-span-7">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-2xl font-bold text-gray-800"><i className="fas fa-list-ul text-blue-600 mr-2"></i>पोस्टेड जॉब्स ({jobs.length})</h2>
//               {jobs.length === 0 && <span className="text-gray-400 text-sm">कोई जॉब नहीं, अभी पोस्ट करें ↑</span>}
//             </div>
            
//             {jobs.length === 0 ? (
//               <div className="bg-white rounded-2xl shadow-md p-12 text-center text-gray-400">
//                 <i className="fas fa-newspaper text-6xl mb-3"></i>
//                 <p>अभी तक कोई जॉब पोस्ट नहीं हुई।</p>
//                 <p className="text-sm">बाएं फॉर्म से पहली जॉब पोस्ट करें!</p>
//               </div>
//             ) : (
//               <div className="space-y-6">
//                 {jobs.map((job) => (
//                   <div key={job.id} className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 job-card">
//                     <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border-b border-blue-100 flex justify-between items-start">
//                       <div>
//                         <h3 className="text-xl font-extrabold text-gray-800">{job.title}</h3>
//                         <p className="text-blue-700 font-medium"><i className="fas fa-building"></i> {job.organization}</p>
//                       </div>
//                       <button onClick={() => deleteJob(job.id)} className="text-red-500 hover:text-red-700 bg-white rounded-full p-2 shadow">
//                         <i className="fas fa-trash-alt"></i>
//                       </button>
//                     </div>
                    
//                     <div className="p-5 space-y-3">
//                       {/* Application Dates */}
//                       {(job.applicationStart || job.applicationLast) && (
//                         <div className="flex flex-wrap gap-4 text-sm bg-gray-50 p-2 rounded-lg">
//                           {job.applicationStart && <span><i className="fas fa-calendar-alt text-green-600"></i> <strong>शुरू:</strong> {job.applicationStart}</span>}
//                           {job.applicationLast && <span><i className="fas fa-calendar-times text-red-500"></i> <strong>अंतिम तारीख:</strong> {job.applicationLast}</span>}
//                         </div>
//                       )}
                      
//                       {/* Eligibility */}
//                       {job.eligibility && (
//                         <div className="border-l-4 border-green-500 pl-3">
//                           <p className="font-semibold text-gray-700"><i className="fas fa-graduation-cap"></i> Eligibility / योग्यता:</p>
//                           <p className="text-gray-600 text-sm">{job.eligibility}</p>
//                         </div>
//                       )}
                      
//                       {/* Fee Structure - Detailed */}
//                       {(job.genMaleFee || job.genFemaleFee || job.obcFee || job.scStFee || job.femaleSpecialNote) && (
//                         <div className="bg-amber-50 p-3 rounded-lg">
//                           <h4 className="font-bold text-amber-800 flex items-center gap-2"><i className="fas fa-rupee-sign"></i> Application Fee (श्रेणीवार फीस)</h4>
//                           <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm mt-2">
//                             {job.genMaleFee && <div className="bg-white p-1 rounded"><span className="font-semibold">General Male:</span> {job.genMaleFee}</div>}
//                             {job.genFemaleFee && <div className="bg-white p-1 rounded"><span className="font-semibold">General Female:</span> {job.genFemaleFee}</div>}
//                             {job.obcFee && <div className="bg-white p-1 rounded"><span className="font-semibold">OBC:</span> {job.obcFee}</div>}
//                             {job.scStFee && <div className="bg-white p-1 rounded"><span className="font-semibold">SC/ST:</span> {job.scStFee}</div>}
//                           </div>
//                           {job.femaleSpecialNote && <p className="text-xs text-amber-700 mt-1 italic">👩 महिला विशेष: {job.femaleSpecialNote}</p>}
//                         </div>
//                       )}
                      
//                       {/* Exam Date Info */}
//                       {job.examDateInfo && (
//                         <div className="flex items-start gap-2">
//                           <i className="fas fa-clock text-purple-600 mt-0.5"></i>
//                           <div><span className="font-semibold">परीक्षा/महत्वपूर्ण तिथियाँ:</span> <span className="text-gray-700">{job.examDateInfo}</span></div>
//                         </div>
//                       )}
                      
//                       {/* Extra Info */}
//                       {job.extraInfo && (
//                         <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
//                           <i className="fas fa-info-circle text-blue-500"></i> {job.extraInfo}
//                         </div>
//                       )}
                      
//                       {/* External Link */}
//                       {job.externalLink && (
//                         <div className="mt-2">
//                           <a href={job.externalLink} target="_blank" rel="noopener noreferrer" 
//                             className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition">
//                             <i className="fas fa-external-link-alt"></i> आधिकारिक नोटिफिकेशन / अप्लाई लिंक
//                           </a>
//                         </div>
//                       )}
                      
//                       <div className="text-xs text-gray-400 border-t pt-2 mt-2 flex justify-between">
//                         <span><i className="far fa-clock"></i> पोस्टेड: {job.postedOn}</span>
//                         <span className="cursor-pointer hover:text-red-500" onClick={() => deleteJob(job.id)}><i className="fas fa-trash"></i> हटाएं</span>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
      
//       <footer className="bg-gray-800 text-white text-center py-5 mt-10">
//         <p><i className="fas fa-edit"></i> आप जितनी मर्जी जॉब पोस्ट कर सकते हैं | सारे डिटेल्स के साथ | External link भी जोड़ सकते हैं</p>
//       </footer>
//     </div>
//   );
// };
// export default JobPortal;
// // ... your JobPortal component above ...

// // Render the app
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<JobPortal />);














// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const API_URL = 'http://localhost:5000/api';

// function App() {
//   const [jobs, setJobs] = useState([]);
//   const [isOwner, setIsOwner] = useState(false);
//   const [showLogin, setShowLogin] = useState(false);
//   const [showForm, setShowForm] = useState(false);
//   const [loginData, setLoginData] = useState({ username: '', password: '' });
  
//   // Form state
//   const [form, setForm] = useState({
//     title: '', organization: '', applicationStart: '', applicationLast: '',
//     eligibility: '', genMaleFee: '', genFemaleFee: '', obcFee: '',
//     scStFee: '', femaleSpecialNote: '', examDateInfo: '', externalLink: '', extraInfo: ''
//   });

//   const fetchJobs = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/jobs`);
//       setJobs(res.data);
//     } catch (err) {
//       console.error('Error fetching jobs:', err);
//     }
//   };

//   const verifyToken = async (token) => {
//     try {
//       await axios.get(`${API_URL}/verify`, { headers: { Authorization: token } });
//       setIsOwner(true);
//     } catch(err) {
//       localStorage.removeItem('token');
//       setIsOwner(false);
//     }
//   };

//   // ✅ FIXED: IIFE pattern - no more warning
//   useEffect(() => {
//     (async () => {
//       await fetchJobs();
//       const token = localStorage.getItem('token');
//       if (token) {
//         await verifyToken(token);
//       }
//     })();
//   }, []);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(`${API_URL}/login`, loginData);
//       localStorage.setItem('token', res.data.token);
//       setIsOwner(true);
//       setShowLogin(false);
//       alert('✅ Login successful!');
//     } catch(err) {
//       alert('❌ Invalid username/password');
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     setIsOwner(false);
//     setShowForm(false);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem('token');
//     try {
//       await axios.post(`${API_URL}/jobs`, form, { 
//         headers: { Authorization: token } 
//       });
//       alert('✅ Job posted successfully!');
//       setShowForm(false);
//       setForm({
//         title: '', organization: '', applicationStart: '', applicationLast: '',
//         eligibility: '', genMaleFee: '', genFemaleFee: '', obcFee: '',
//         scStFee: '', femaleSpecialNote: '', examDateInfo: '', externalLink: '', extraInfo: ''
//       });
//       fetchJobs();
//     } catch(err) {
//       alert('❌ Failed to post job');
//     }
//   };

//   const deleteJob = async (id) => {
//     const token = localStorage.getItem('token');
//     try {
//       await axios.delete(`${API_URL}/jobs/${id}`, { 
//         headers: { Authorization: token } 
//       });
//       fetchJobs();
//     } catch(err) {
//       alert('❌ Failed to delete job');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <header className="bg-blue-800 text-white shadow-lg sticky top-0 z-10">
//         <div className="container mx-auto px-4 py-5 flex justify-between items-center">
//           <div>
//             <h1 className="text-3xl font-bold flex items-center gap-2">
//               <i className="fas fa-briefcase"></i> JobPost India
//             </h1>
//             <p className="text-blue-100 text-sm">Latest Govt Job Notifications</p>
//           </div>
//           <div>
//             {!isOwner ? (
//               <button onClick={() => setShowLogin(!showLogin)} className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-lg">
//                 <i className="fas fa-lock"></i> Owner Login
//               </button>
//             ) : (
//               <div className="flex gap-3">
//                 <button onClick={() => setShowForm(!showForm)} className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-lg">
//                   <i className="fas fa-plus"></i> Post New Job
//                 </button>
//                 <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg">
//                   <i className="fas fa-sign-out-alt"></i> Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </header>

//       <div className="container mx-auto px-4 py-8">
//         {showLogin && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white rounded-2xl p-6 w-96">
//               <h2 className="text-2xl font-bold mb-4">Owner Login</h2>
//               <form onSubmit={handleLogin}>
//                 <input type="text" placeholder="Username" className="w-full border rounded-lg p-2 mb-3" 
//                   value={loginData.username} onChange={(e) => setLoginData({...loginData, username: e.target.value})} />
//                 <input type="password" placeholder="Password" className="w-full border rounded-lg p-2 mb-4"
//                   value={loginData.password} onChange={(e) => setLoginData({...loginData, password: e.target.value})} />
//                 <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg">Login</button>
//                 <button type="button" onClick={() => setShowLogin(false)} className="w-full mt-2 text-gray-500">Cancel</button>
//               </form>
//             </div>
//           </div>
//         )}

//         {showForm && isOwner && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto z-50">
//             <div className="bg-white rounded-2xl p-6 max-w-2xl mx-auto my-10">
//               <h2 className="text-2xl font-bold mb-4">Post New Job</h2>
//               <form onSubmit={handleSubmit} className="space-y-3 max-h-96 overflow-y-auto">
//                 <input type="text" placeholder="Job Title *" className="w-full border rounded p-2" 
//                   value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} required />
//                 <input type="text" placeholder="Organization *" className="w-full border rounded p-2"
//                   value={form.organization} onChange={(e) => setForm({...form, organization: e.target.value})} required />
//                 <div className="grid grid-cols-2 gap-2">
//                   <input type="date" placeholder="App Start" className="border rounded p-2" 
//                     value={form.applicationStart} onChange={(e) => setForm({...form, applicationStart: e.target.value})} />
//                   <input type="date" placeholder="App Last" className="border rounded p-2"
//                     value={form.applicationLast} onChange={(e) => setForm({...form, applicationLast: e.target.value})} />
//                 </div>
//                 <textarea placeholder="Eligibility" rows="2" className="w-full border rounded p-2"
//                   value={form.eligibility} onChange={(e) => setForm({...form, eligibility: e.target.value})}></textarea>
//                 <div className="grid grid-cols-2 gap-2">
//                   <input placeholder="General Male Fee" className="border rounded p-2"
//                     value={form.genMaleFee} onChange={(e) => setForm({...form, genMaleFee: e.target.value})} />
//                   <input placeholder="General Female Fee" className="border rounded p-2"
//                     value={form.genFemaleFee} onChange={(e) => setForm({...form, genFemaleFee: e.target.value})} />
//                   <input placeholder="OBC Fee" className="border rounded p-2"
//                     value={form.obcFee} onChange={(e) => setForm({...form, obcFee: e.target.value})} />
//                   <input placeholder="SC/ST Fee" className="border rounded p-2"
//                     value={form.scStFee} onChange={(e) => setForm({...form, scStFee: e.target.value})} />
//                 </div>
//                 <input placeholder="Female Special Note" className="w-full border rounded p-2"
//                   value={form.femaleSpecialNote} onChange={(e) => setForm({...form, femaleSpecialNote: e.target.value})} />
//                 <input placeholder="Exam Date Info" className="w-full border rounded p-2"
//                   value={form.examDateInfo} onChange={(e) => setForm({...form, examDateInfo: e.target.value})} />
//                 <input placeholder="External Link (Apply Link)" className="w-full border rounded p-2"
//                   value={form.externalLink} onChange={(e) => setForm({...form, externalLink: e.target.value})} />
//                 <textarea placeholder="Extra Info" rows="2" className="w-full border rounded p-2"
//                   value={form.extraInfo} onChange={(e) => setForm({...form, extraInfo: e.target.value})}></textarea>
//                 <div className="flex gap-3">
//                   <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-lg">Post Job</button>
//                   <button type="button" onClick={() => setShowForm(false)} className="bg-gray-400 px-6 py-2 rounded-lg">Cancel</button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}

//         <div className="grid gap-6">
//           <h2 className="text-2xl font-bold">📢 Latest Job Notifications ({jobs.length})</h2>
//           {jobs.length === 0 && <p className="text-gray-400">No jobs posted yet.</p>}
          
//           {jobs.map(job => (
//             <div key={job._id} className="bg-white rounded-2xl shadow-md p-5">
//               <div className="flex justify-between">
//                 <div>
//                   <h3 className="text-xl font-bold">{job.title}</h3>
//                   <p className="text-blue-600">{job.organization}</p>
//                 </div>
//                 {isOwner && (
//                   <button onClick={() => deleteJob(job._id)} className="text-red-500 hover:text-red-700">
//                     <i className="fas fa-trash"></i> Delete
//                   </button>
//                 )}
//               </div>
//               <div className="grid md:grid-cols-2 gap-3 mt-3 text-sm">
//                 {job.applicationStart && <p>📅 Start: {job.applicationStart}</p>}
//                 {job.applicationLast && <p>⏰ Last: {job.applicationLast}</p>}
//                 {job.eligibility && <p>🎓 Eligibility: {job.eligibility}</p>}
//               </div>
//               <div className="bg-gray-50 p-3 rounded mt-2">
//                 <p className="font-semibold">💰 Fee Structure:</p>
//                 <div className="grid grid-cols-2 gap-1 text-sm">
//                   {job.genMaleFee && <span>Male Gen: {job.genMaleFee}</span>}
//                   {job.genFemaleFee && <span>Female Gen: {job.genFemaleFee}</span>}
//                   {job.obcFee && <span>OBC: {job.obcFee}</span>}
//                   {job.scStFee && <span>SC/ST: {job.scStFee}</span>}
//                 </div>
//                 {job.femaleSpecialNote && <p className="text-xs mt-1">👩 {job.femaleSpecialNote}</p>}
//               </div>
//               {job.examDateInfo && <p className="text-sm mt-1">📅 Exam: {job.examDateInfo}</p>}
//               {job.externalLink && (
//                 <a href={job.externalLink} target="_blank" rel="noopener noreferrer" className="inline-block mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
//                   Apply / Notification Link →
//                 </a>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;








// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const API_URL = 'http://localhost:5000/api';

// function App() {
//   const [jobs, setJobs] = useState([]);
//   const [isOwner, setIsOwner] = useState(false);
//   const [showLogin, setShowLogin] = useState(false);
//   const [showForm, setShowForm] = useState(false);
//   const [loginData, setLoginData] = useState({ username: '', password: '' });
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
//   // Form state
//   const [form, setForm] = useState({
//     title: '', organization: '', applicationStart: '', applicationLast: '',
//     eligibility: '', genMaleFee: '', genFemaleFee: '', obcFee: '',
//     scStFee: '', femaleSpecialNote: '', examDateInfo: '', externalLink: '', extraInfo: ''
//   });

//   const fetchJobs = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/jobs`);
//       setJobs(res.data);
//     } catch (err) {
//       console.error('Error fetching jobs:', err);
//     }
//   };

//   const verifyToken = async (token) => {
//     try {
//       await axios.get(`${API_URL}/verify`, { headers: { Authorization: token } });
//       setIsOwner(true);
//     } catch(err) {
//       localStorage.removeItem('token');
//       setIsOwner(false);
//     }
//   };

//   useEffect(() => {
//     (async () => {
//       await fetchJobs();
//       const token = localStorage.getItem('token');
//       if (token) {
//         await verifyToken(token);
//       }
//     })();
//   }, []);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(`${API_URL}/login`, loginData);
//       localStorage.setItem('token', res.data.token);
//       setIsOwner(true);
//       setShowLogin(false);
//       setMobileMenuOpen(false);
//       alert('✅ Login successful!');
//     } catch(err) {
//       alert('❌ Invalid username/password');
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     setIsOwner(false);
//     setShowForm(false);
//     setMobileMenuOpen(false);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem('token');
//     try {
//       await axios.post(`${API_URL}/jobs`, form, { 
//         headers: { Authorization: token } 
//       });
//       alert('✅ Job posted successfully!');
//       setShowForm(false);
//       setForm({
//         title: '', organization: '', applicationStart: '', applicationLast: '',
//         eligibility: '', genMaleFee: '', genFemaleFee: '', obcFee: '',
//         scStFee: '', femaleSpecialNote: '', examDateInfo: '', externalLink: '', extraInfo: ''
//       });
//       fetchJobs();
//     } catch(err) {
//       alert('❌ Failed to post job');
//     }
//   };

//   const deleteJob = async (id) => {
//     const token = localStorage.getItem('token');
//     try {
//       await axios.delete(`${API_URL}/jobs/${id}`, { 
//         headers: { Authorization: token } 
//       });
//       fetchJobs();
//     } catch(err) {
//       alert('❌ Failed to delete job');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Header */}
//       {/* Header */}
// <header className="bg-blue-800 text-white shadow-lg sticky top-0 z-20">
//   <div className="container mx-auto px-4 py-3 flex justify-between items-center">
//     {/* Logo Section */}
//     <div>
//       <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
//         <i className="fas fa-briefcase"></i> 
//         JobPost India
//       </h1>
//       <p className="text-blue-100 text-xs md:text-sm">Latest Govt Job Notifications</p>
//     </div>
    
//     {/* Desktop Buttons - Hidden on mobile */}
//     <div className="hidden md:block">
//       {!isOwner ? (
//         <button onClick={() => setShowLogin(!showLogin)} className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-lg">
//           <i className="fas fa-lock"></i> Owner Login
//         </button>
//       ) : (
//         <div className="flex gap-3">
//           <button onClick={() => setShowForm(!showForm)} className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-lg">
//             <i className="fas fa-plus"></i> Post New Job
//           </button>
//           <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg">
//             <i className="fas fa-sign-out-alt"></i> Logout
//           </button>
//         </div>
//       )}
//     </div>
    
//     {/* Hamburger Icon - Mobile only - VISIBLE NOW */}
//     <button 
//       onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//       className="md:hidden bg-blue-700 hover:bg-blue-600 rounded-lg p-2 transition-all"
//     >
//       <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl text-white`}></i>
//     </button>
//   </div>
  
//   {/* Mobile Menu Dropdown */}
//   {mobileMenuOpen && (
//     <div className="md:hidden bg-blue-900 border-t border-blue-700 py-3 px-4">
//       {!isOwner ? (
//         <button 
//           onClick={() => {
//             setShowLogin(!showLogin);
//             setMobileMenuOpen(false);
//           }} 
//           className="w-full bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-left"
//         >
//           <i className="fas fa-lock mr-2"></i> Owner Login
//         </button>
//       ) : (
//         <div className="space-y-2">
//           <button 
//             onClick={() => {
//               setShowForm(!showForm);
//               setMobileMenuOpen(false);
//             }} 
//             className="w-full bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-lg text-left"
//           >
//             <i className="fas fa-plus mr-2"></i> Post New Job
//           </button>
//           <button 
//             onClick={handleLogout} 
//             className="w-full bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-left"
//           >
//             <i className="fas fa-sign-out-alt mr-2"></i> Logout
//           </button>
//         </div>
//       )}
//     </div>
//   )}
// </header>

//       <div className="container mx-auto px-4 py-8">
//         {/* Login Modal */}
//         {showLogin && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white rounded-2xl p-6 w-96">
//               <h2 className="text-2xl font-bold mb-4">Owner Login</h2>
//               <form onSubmit={handleLogin}>
//                 <input type="text" placeholder="Username" className="w-full border rounded-lg p-2 mb-3" 
//                   value={loginData.username} onChange={(e) => setLoginData({...loginData, username: e.target.value})} />
//                 <input type="password" placeholder="Password" className="w-full border rounded-lg p-2 mb-4"
//                   value={loginData.password} onChange={(e) => setLoginData({...loginData, password: e.target.value})} />
//                 <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg">Login</button>
//                 <button type="button" onClick={() => setShowLogin(false)} className="w-full mt-2 text-gray-500">Cancel</button>
//               </form>
//             </div>
//           </div>
//         )}

//         {/* Job Post Form */}
//         {showForm && isOwner && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto z-50">
//             <div className="bg-white rounded-2xl p-6 max-w-2xl mx-auto my-10">
//               <h2 className="text-2xl font-bold mb-4">Post New Job</h2>
//               <form onSubmit={handleSubmit} className="space-y-3 max-h-96 overflow-y-auto">
//                 <input type="text" placeholder="Job Title *" className="w-full border rounded p-2" 
//                   value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} required />
//                 <input type="text" placeholder="Organization *" className="w-full border rounded p-2"
//                   value={form.organization} onChange={(e) => setForm({...form, organization: e.target.value})} required />
//                 <div className="grid grid-cols-2 gap-2">
//                   <input type="date" placeholder="App Start" className="border rounded p-2" 
//                     value={form.applicationStart} onChange={(e) => setForm({...form, applicationStart: e.target.value})} />
//                   <input type="date" placeholder="App Last" className="border rounded p-2"
//                     value={form.applicationLast} onChange={(e) => setForm({...form, applicationLast: e.target.value})} />
//                 </div>
//                 <textarea placeholder="Eligibility" rows="2" className="w-full border rounded p-2"
//                   value={form.eligibility} onChange={(e) => setForm({...form, eligibility: e.target.value})}></textarea>
//                 <div className="grid grid-cols-2 gap-2">
//                   <input placeholder="General Male Fee" className="border rounded p-2"
//                     value={form.genMaleFee} onChange={(e) => setForm({...form, genMaleFee: e.target.value})} />
//                   <input placeholder="General Female Fee" className="border rounded p-2"
//                     value={form.genFemaleFee} onChange={(e) => setForm({...form, genFemaleFee: e.target.value})} />
//                   <input placeholder="OBC Fee" className="border rounded p-2"
//                     value={form.obcFee} onChange={(e) => setForm({...form, obcFee: e.target.value})} />
//                   <input placeholder="SC/ST Fee" className="border rounded p-2"
//                     value={form.scStFee} onChange={(e) => setForm({...form, scStFee: e.target.value})} />
//                 </div>
//                 <input placeholder="Female Special Note" className="w-full border rounded p-2"
//                   value={form.femaleSpecialNote} onChange={(e) => setForm({...form, femaleSpecialNote: e.target.value})} />
//                 <input placeholder="Exam Date Info" className="w-full border rounded p-2"
//                   value={form.examDateInfo} onChange={(e) => setForm({...form, examDateInfo: e.target.value})} />
//                 <input placeholder="External Link (Apply Link)" className="w-full border rounded p-2"
//                   value={form.externalLink} onChange={(e) => setForm({...form, externalLink: e.target.value})} />
//                 <textarea placeholder="Extra Info" rows="2" className="w-full border rounded p-2"
//                   value={form.extraInfo} onChange={(e) => setForm({...form, extraInfo: e.target.value})}></textarea>
//                 <div className="flex gap-3">
//                   <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-lg">Post Job</button>
//                   <button type="button" onClick={() => setShowForm(false)} className="bg-gray-400 px-6 py-2 rounded-lg">Cancel</button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}

//         {/* Job List */}
//         <div className="grid gap-6">
//           <h2 className="text-2xl font-bold">📢 Latest Job Notifications ({jobs.length})</h2>
//           {jobs.length === 0 && <p className="text-gray-400">No jobs posted yet.</p>}
          
//           {jobs.map(job => (
//             <div key={job._id} className="bg-white rounded-2xl shadow-md p-5">
//               <div className="flex justify-between">
//                 <div>
//                   <h3 className="text-xl font-bold">{job.title}</h3>
//                   <p className="text-blue-600">{job.organization}</p>
//                 </div>
//                 {isOwner && (
//                   <button onClick={() => deleteJob(job._id)} className="text-red-500 hover:text-red-700">
//                     <i className="fas fa-trash"></i> Delete
//                   </button>
//                 )}
//               </div>
//               <div className="grid md:grid-cols-2 gap-3 mt-3 text-sm">
//                 {job.applicationStart && <p>📅 Start: {job.applicationStart}</p>}
//                 {job.applicationLast && <p>⏰ Last: {job.applicationLast}</p>}
//                 {job.eligibility && <p>🎓 Eligibility: {job.eligibility}</p>}
//               </div>
//               <div className="bg-gray-50 p-3 rounded mt-2">
//                 <p className="font-semibold">💰 Fee Structure:</p>
//                 <div className="grid grid-cols-2 gap-1 text-sm">
//                   {job.genMaleFee && <span>Male Gen: {job.genMaleFee}</span>}
//                   {job.genFemaleFee && <span>Female Gen: {job.genFemaleFee}</span>}
//                   {job.obcFee && <span>OBC: {job.obcFee}</span>}
//                   {job.scStFee && <span>SC/ST: {job.scStFee}</span>}
//                 </div>
//                 {job.femaleSpecialNote && <p className="text-xs mt-1">👩 {job.femaleSpecialNote}</p>}
//               </div>
//               {job.examDateInfo && <p className="text-sm mt-1">📅 Exam: {job.examDateInfo}</p>}
//               {job.externalLink && (
//                 <a href={job.externalLink} target="_blank" rel="noopener noreferrer" className="inline-block mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
//                   Apply / Notification Link →
//                 </a>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;











import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaBars, FaTimes, FaBriefcase, FaLock, FaPlus, FaSignOutAlt, FaTrash, FaCalendarAlt, FaGraduationCap, FaRupeeSign, FaClock, FaExternalLinkAlt, FaInfoCircle } from 'react-icons/fa';

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
  );
}

export default App;