import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  FileText, 
  Users, 
  DollarSign, 
  Menu, 
  X, 
  CheckCircle2, 
  ChevronRight, 
  LogOut,
  Calendar,
  BookOpen,
  Send,
  Loader2
} from 'lucide-react';

// --- TECHNICAL CONSTANTS ---
const APPS_SCRIPT_URLS = {
  newMember: "https://script.google.com/macros/s/AKfycbzUhV7fdCpyMPyEIACM6AL4UdyRG4U8QRsPKEW0hMVelB1vkHUHRijqmA02tjrCGUHR/exec",
  testimony: "https://script.google.com/macros/s/AKfycbzUhV7fdCpyMPyEIACM6AL4UdyRG4U8QRsPKEW0hMVelB1vkHUHRijqmA02tjrCGUHR/exec",
  prayer: "PLACEHOLDER_PRAYER_URL",
  contact: "PLACEHOLDER_CONTACT_URL",
  attendance: "https://script.google.com/macros/s/AKfycbzUhV7fdCpyMPyEIACM6AL4UdyRG4U8QRsPKEW0hMVelB1vkHUHRijqmA02tjrCGUHR/exec",
  reimbursement: "PLACEHOLDER_REIMBURSEMENT_URL",
  titheReceipt: "PLACEHOLDER_TITHE_RECEIPT_URL"
};

const EMAILS = {
  experience: "slexperienceteam@gmail.com",
  finance: "PLACEHOLDER_FINANCE_EMAIL",
  pastoral: "PLACEHOLDER_PASTORAL_EMAIL",
  media: "PLACEHOLDER_MEDIA_EMAIL",
  leadership: "PLACEHOLDER_LEADERSHIP_EMAIL"
};

const DEVOTIONAL_URL = "PLACEHOLDER_DEVOTIONAL_URL";
const DEVOTIONAL_TITLE = "Today's Devotional";
const DEVOTIONAL_DESCRIPTION = "Click below to access today's devotional resource.";

type Section = 'home' | 'general' | 'experience' | 'finance';

// --- COMPONENTS ---

const SuccessModal = ({ isOpen, onClose, message }: { isOpen: boolean, onClose: () => void, message: string }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed bottom-10 right-10 z-[100] p-0 pointer-events-none">
          <motion.div 
            initial={{ y: 30, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="bg-surface text-white p-6 rounded-3xl flex items-center gap-5 shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-surface-border w-[380px] pointer-events-auto"
          >
            <div className="w-12 h-12 bg-brand-red rounded-full flex items-center justify-center shrink-0 shadow-lg">
              <CheckCircle2 className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-display font-bold text-base leading-tight italic">Submission Successful</h4>
              <p className="text-[12px] text-white/70 leading-relaxed italic">{message}</p>
            </div>
            <button 
              onClick={onClose}
              className="text-white/40 hover:text-white transition-colors p-2"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// --- APP COMPONENT ---

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [successModal, setSuccessModal] = useState<{isOpen: boolean, message: string}>({ isOpen: false, message: '' });

  const closeSuccessModal = () => setSuccessModal({ ...successModal, isOpen: false });
  const openSuccessModal = (message: string) => setSuccessModal({ isOpen: true, message });

  const navigateTo = (section: Section) => {
    setActiveSection(section);
    if (window.innerWidth < 768) setIsSidebarOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-void">
      {/* Sidebar Toggle for Desktop */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className={`hidden md:flex fixed top-10 left-10 z-[60] p-3 bg-surface/80 backdrop-blur-xl text-white rounded-2xl border border-surface-border shadow-2xl transition-all duration-300 ${isSidebarOpen ? 'translate-x-[260px]' : 'translate-x-0'}`}
      >
        {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Moble Menu Trigger */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden fixed top-6 right-6 z-[60] p-4 bg-vibrant-purple text-white rounded-2xl shadow-2xl"
      >
        {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ 
          width: isSidebarOpen ? (window.innerWidth < 768 ? '100vw' : 320) : 0,
          x: isSidebarOpen ? 0 : (window.innerWidth < 768 ? 0 : -320),
          opacity: isSidebarOpen ? 1 : 0
        }}
        className={`fixed md:sticky top-0 h-screen bg-void border-r border-surface-border flex-col p-12 z-50 overflow-hidden flex`}
      >
        <div className="mb-14 whitespace-nowrap">
          <h1 className="logo-text text-[28px] leading-tight">
            SUPERPORTAL
          </h1>
          <p className="font-sans text-[9px] text-text-dim uppercase tracking-[0.2em] mt-1 italic font-bold">
            Supernatural Life Church
          </p>
          <div className="h-1 bg-gradient-to-r from-brand-red to-vibrant-purple w-12 mt-6 rounded-full" />
        </div>

        <nav className="flex-1 space-y-1.5">
          <button 
            onClick={() => navigateTo('home')}
            className={`sidebar-link w-full whitespace-nowrap ${activeSection === 'home' ? 'active' : ''}`}
          >
            <Home className="w-4 h-4" />
            <span className="font-bold text-[13px] tracking-wide">SuperPortal</span>
          </button>
          <button 
            onClick={() => navigateTo('general')}
            className={`sidebar-link w-full whitespace-nowrap ${activeSection === 'general' ? 'active' : ''}`}
          >
            <FileText className="w-4 h-4" />
            <span className="font-bold text-[13px] tracking-wide">General Ops</span>
          </button>
          <button 
            onClick={() => navigateTo('experience')}
            className={`sidebar-link w-full whitespace-nowrap ${activeSection === 'experience' ? 'active' : ''}`}
          >
            <Users className="w-4 h-4" />
            <span className="font-bold text-[13px] tracking-wide">Experience</span>
          </button>
          <button 
            onClick={() => navigateTo('finance')}
            className={`sidebar-link w-full whitespace-nowrap ${activeSection === 'finance' ? 'active' : ''}`}
          >
            <DollarSign className="w-4 h-4" />
            <span className="font-bold text-[13px] tracking-wide">Finance</span>
          </button>
        </nav>

        <div className="pt-8 border-t border-surface-border mt-auto whitespace-nowrap">
          <p className="text-[10px] text-text-dim/40 uppercase tracking-[0.2em] text-center font-bold">
            &copy; 2026 Supernatural Life
          </p>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 relative pb-24 md:pb-0 overflow-hidden bg-void">
        <div className="max-w-7xl mx-auto p-10 md:px-24 md:py-24 relative z-10 transition-all duration-300">
          <AnimatePresence mode="wait">
            {activeSection === 'home' && (
              <HomeSection key="home" navigateTo={navigateTo} openSuccessModal={openSuccessModal} />
            )}
            {activeSection === 'general' && (
              <GeneralSection key="general" openSuccessModal={openSuccessModal} />
            )}
            {activeSection === 'experience' && (
              <ExperienceSection key="experience" openSuccessModal={openSuccessModal} />
            )}
            {activeSection === 'finance' && (
              <FinanceSection key="finance" openSuccessModal={openSuccessModal} />
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Success Modal */}
      <SuccessModal 
        isOpen={successModal.isOpen} 
        onClose={closeSuccessModal} 
        message={successModal.message} 
      />
      <div className="noise-overlay" />
    </div>
  );
}

// --- SECTION: HOME ---

function HomeSection({ navigateTo, openSuccessModal }: { navigateTo: (s: Section) => void, openSuccessModal: (m: string) => void, key?: any }) {
  const [activeForm, setActiveForm] = useState<'testimony' | 'prayer' | 'contact' | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  if (activeForm) {
    return (
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="max-w-xl mx-auto"
      >
        <button 
          onClick={() => setActiveForm(null)}
          className="flex items-center gap-2 text-text-dim hover:text-white mb-8 group transition-colors italic font-bold text-xs uppercase tracking-widest"
        >
          <ChevronRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
          Back to Overview
        </button>

        <div className="card-surface bg-gradient-to-br from-surface to-void border-vibrant-purple/10">
          <h3 className="text-3xl font-display mb-8 italic">
            {activeForm === 'testimony' && "Share Your Testimony"}
            {activeForm === 'prayer' && "Prayer & Requests"}
            {activeForm === 'contact' && "Inquiry & Feedback"}
          </h3>
          
          {activeForm === 'testimony' && <TestimonyForm onSuccess={() => { openSuccessModal('Your testimony has been shared.'); setActiveForm(null); }} />}
          {activeForm === 'prayer' && <PrayerForm onSuccess={() => { openSuccessModal('Your prayer request has been received.'); setActiveForm(null); }} />}
          {activeForm === 'contact' && <ContactForm onSuccess={() => { openSuccessModal('Your feedback has been submitted.'); setActiveForm(null); }} />}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-16 md:space-y-24 py-10"
    >
      <motion.div variants={itemVariants} className="text-center max-w-4xl mx-auto">
        <h2 className="text-6xl md:text-[9rem] lg:text-[10rem] font-display mb-6 md:mb-10 leading-[0.9] bg-gradient-to-b from-white via-white to-white/20 bg-clip-text text-transparent">
          Super<span className="italic">Portal</span>
        </h2>
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px bg-brand-red/30 flex-1 max-w-[60px]" />
          <p className="text-[10px] md:text-sm text-brand-red uppercase tracking-[0.4em] italic font-black">
            Supernatural Life Church
          </p>
          <div className="h-px bg-brand-red/30 flex-1 max-w-[60px]" />
        </div>
        <p className="text-text-dim/60 text-sm md:text-lg max-w-2xl mx-auto italic leading-relaxed">
          serving internal operations and connecting our community with faith, prayer, and purpose.
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 max-w-6xl mx-auto">
        {[
          { 
            id: 'testimony', 
            title: 'Share Your Testimony', 
            icon: CheckCircle2, 
            color: 'divine-gold',
            bg: 'from-divine-gold/15 to-void',
            border: 'border-divine-gold/20',
            glow: 'rgba(255,215,0,0.15)'
          },
          { 
            id: 'prayer', 
            title: 'Prayer & Requests', 
            icon: Send, 
            color: 'faith-blue',
            bg: 'from-faith-blue/15 to-void',
            border: 'border-faith-blue/20',
            glow: 'rgba(59,130,246,0.15)'
          },
          { 
            id: 'contact', 
            title: 'Inquiry & Feedback', 
            icon: FileText, 
            color: 'healing-emerald',
            bg: 'from-healing-emerald/10 to-void',
            border: 'border-healing-emerald/15',
            glow: 'rgba(16,185,129,0.1)'
          }
        ].map((item) => (
          <button 
            key={item.id}
            onClick={() => setActiveForm(item.id as any)}
            className={`group relative flex flex-col items-center justify-center p-8 md:p-10 bg-void border ${item.border} rounded-[2rem] transition-all duration-700 hover:-translate-y-3 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] h-full min-h-[180px] md:min-h-[240px]`}
          >
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none bg-gradient-to-br from-white/[0.03] to-transparent z-0"
            />
            <div 
              className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-700 pointer-events-none"
              style={{ background: `radial-gradient(circle at center, ${item.glow} 0%, transparent 80%)` }}
            />
            
            <div className={`p-4 bg-${item.color}/5 rounded-full mb-6 group-hover:scale-110 transition-transform duration-700 relative z-10 border border-${item.color}/20 group-hover:border-${item.color}/40 shadow-[0_0_30px_rgba(0,0,0,0.2)]`}>
              <item.icon className={`w-9 h-9 text-${item.color} filter drop-shadow-[0_0_8px_rgba(var(--color-${item.color}),0.5)]`} />
            </div>
            
            <h3 className="text-xl md:text-3xl font-display italic font-bold relative z-10 leading-tight group-hover:text-white transition-all tracking-tight">
              {item.title}
            </h3>

            <div className={`absolute bottom-6 right-8 flex items-center gap-2 text-${item.color} font-bold text-[9px] uppercase tracking-[0.4em] italic opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0`}>
              Open Portal <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
            
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </button>
        ))}
      </motion.div>
      
      {/* Quick Action Navigation Links */}
      <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-6 pt-10 border-t border-white/5">
        {[
          { id: 'general', title: 'New Member Registry', icon: Users },
          { id: 'experience', title: 'Attendance Tracker', icon: Calendar },
          { id: 'finance', title: 'Finance Vouchers', icon: DollarSign },
        ].map((item) => (
          <button 
            key={item.id}
            onClick={() => navigateTo(item.id as Section)}
            className="flex items-center gap-3 py-2 px-6 rounded-full bg-void border border-surface-border hover:border-vibrant-purple transition-all group scale-95"
          >
            <item.icon className="w-4 h-4 text-text-dim group-hover:text-vibrant-purple transition-colors" />
            <span className="font-display text-sm italic font-bold text-text-dim group-hover:text-white tracking-wide">{item.title}</span>
          </button>
        ))}
      </motion.div>
    </motion.div>
  );
}

// --- SECTION: GENERAL ---

function GeneralSection({ openSuccessModal }: { openSuccessModal: (m: string) => void, key?: any }) {
  const [activeTab, setActiveTab] = useState<'newMember' | 'testimony' | 'prayer' | 'contact'>('newMember');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-4xl md:text-5xl mb-8 md:mb-12 italic">General Operations</h2>
      
      <div className="flex flex-wrap gap-3 mb-8 md:mb-12 pb-6 border-b border-white/5">
        <button onClick={() => setActiveTab('newMember')} className={`tab-pill ${activeTab === 'newMember' ? 'active' : ''}`}>New Member</button>
        <button onClick={() => setActiveTab('testimony')} className={`tab-pill ${activeTab === 'testimony' ? 'active' : ''}`}>Testimony</button>
        <button onClick={() => setActiveTab('prayer')} className={`tab-pill ${activeTab === 'prayer' ? 'active' : ''}`}>Prayer Request</button>
        <button onClick={() => setActiveTab('contact')} className={`tab-pill ${activeTab === 'contact' ? 'active' : ''}`}>Inquiry & Feedback</button>
      </div>

      <AnimatePresence mode="wait">
        <div className="max-w-xl">
          {activeTab === 'newMember' && <NewMemberForm key="nm" onSuccess={() => openSuccessModal('Your registration has been submitted successfully.')} />}
          {activeTab === 'testimony' && <TestimonyForm key="test" onSuccess={() => openSuccessModal('Thank you for sharing your testimony with us.')} />}
          {activeTab === 'prayer' && <PrayerForm key="pray" onSuccess={() => openSuccessModal('Your prayer request has been received and sent to the pastoral team.')} />}
          {activeTab === 'contact' && <ContactForm key="contact" onSuccess={() => openSuccessModal('Your message has been sent. We will get back to you shortly.')} />}
        </div>
      </AnimatePresence>
    </motion.div>
  );
}

// --- SECTION: EXPERIENCE ---

function ExperienceSection({ openSuccessModal }: { openSuccessModal: (m: string) => void, key?: any }) {
  const [activeTab, setActiveTab] = useState<'attendance' | 'devotional'>('attendance');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-4xl md:text-5xl mb-8 md:mb-12 italic">Experience</h2>
      
      <div className="flex flex-wrap gap-3 mb-8 md:mb-12 pb-6 border-b border-white/5">
        <button onClick={() => setActiveTab('attendance')} className={`tab-pill ${activeTab === 'attendance' ? 'active' : ''}`}>Attendance</button>
        <button onClick={() => setActiveTab('devotional')} className={`tab-pill ${activeTab === 'devotional' ? 'active' : ''}`}>Devotional</button>
      </div>

      <AnimatePresence mode="wait">
        <div className="max-w-2xl">
          {activeTab === 'attendance' && <AttendanceForm key="att" onSuccess={() => openSuccessModal('Service metrics have been logged.')} />}
          {activeTab === 'devotional' && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="card-surface">
              <BookOpen className="w-16 h-16 text-brand-red mb-8" />
              <h3 className="text-4xl font-display mb-6 italic">{DEVOTIONAL_TITLE}</h3>
              <p className="text-text-dim text-lg mb-10 leading-relaxed italic">{DEVOTIONAL_DESCRIPTION}</p>
              <button 
                onClick={() => window.open(DEVOTIONAL_URL, '_blank')}
                className="btn-primary w-full text-xl"
              >
                Enter Devotional
              </button>
          <div className="p-6 bg-brand-red/5 border border-brand-red/20 rounded-2xl mt-8">
            <p className="text-center text-[10px] text-text-dim/60 uppercase tracking-[0.2em] italic font-bold">
              Contact the Media team for updates
            </p>
          </div>
            </motion.div>
          )}
        </div>
      </AnimatePresence>
    </motion.div>
  );
}

// --- SECTION: FINANCE ---

function FinanceSection({ openSuccessModal }: { openSuccessModal: (m: string) => void, key?: any }) {
  const [activeTab, setActiveTab] = useState<'reimbursement' | 'tithe'>('reimbursement');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-4xl md:text-5xl mb-8 md:mb-12 italic">Finance</h2>
      
      <div className="flex flex-wrap gap-3 mb-8 md:mb-12 pb-6 border-b border-white/5">
        <button onClick={() => setActiveTab('reimbursement')} className={`tab-pill ${activeTab === 'reimbursement' ? 'active' : ''}`}>Reimbursement</button>
        <button onClick={() => setActiveTab('tithe')} className={`tab-pill ${activeTab === 'tithe' ? 'active' : ''}`}>Receipt</button>
      </div>

      <AnimatePresence mode="wait">
        <div>
          {activeTab === 'reimbursement' && <ReimbursementForm key="reimb" onSuccess={() => openSuccessModal('Your reimbursement request has been submitted to Finance.')} />}
          {activeTab === 'tithe' && <TitheReceiptForm key="tithe" onSuccess={() => openSuccessModal('Your request for a tithe receipt has been received.')} />}
        </div>
      </AnimatePresence>
    </motion.div>
  );
}

// --- FORM HANDLER UTILITY ---

async function submitForm(url: string, data: any) {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'no-cors', // Apps Script web apps often need no-cors or JSONP, but 'no-cors' wont give us the response body. 
    // Usually for Apps Script we might use 'cors' if defined in the script.
    // However, the instructions say "fetch with method POST and Content-Type application/json"
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });
  // Since we're using no-cors for a placeholder URL, this will resolve but might not have data.
  // In a real scenario, the Apps Script should handle CORS or return a status.
  return response;
}

// --- INDIVIDUAL FORMS ---

function NewMemberForm({ onSuccess }: { onSuccess: () => void, key?: any }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastNameInitial: '',
    email: '',
    phone: '',
    source: '',
    sourceOther: '',
    visitStatus: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.lastNameInitial.length !== 1) {
      setError('Last Name Initial must be exactly one character.');
      setLoading(false);
      return;
    }

    try {
      await submitForm(APPS_SCRIPT_URLS.newMember, { ...formData, formType: "newMember" });
      onSuccess();
      setFormData({ firstName: '', lastNameInitial: '', email: '', phone: '', source: '', visitStatus: '' });
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form 
      initial={{ opacity: 0, x: -20 }} 
      animate={{ opacity: 1, x: 0 }} 
      onSubmit={handleSubmit} 
      className="space-y-8"
    >
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="form-label">First Name *</label>
          <input required value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} className="form-input" />
        </div>
        <div>
          <label className="form-label">Last Initial *</label>
          <input required maxLength={1} value={formData.lastNameInitial} onChange={e => setFormData({...formData, lastNameInitial: e.target.value.toUpperCase()})} className="form-input" />
        </div>
      </div>
      <div>
        <label className="form-label">Email Address *</label>
        <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="form-input" />
      </div>
      <div>
        <label className="form-label">Phone Number</label>
        <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="form-input" />
      </div>

      <div className="p-8 bg-void border border-surface-border rounded-3xl space-y-4">
        <label className="form-label mb-0 text-white">Your Intent *</label>
        <p className="text-text-dim text-sm italic mb-4">Are you just visiting us today, or would you like to return and learn more?</p>
        <div className="flex flex-col gap-3">
          {[
            'I am just visiting',
            'I would like to return',
            'I want to make this my church home'
          ].map(opt => (
            <button 
              key={opt}
              type="button"
              onClick={() => setFormData({...formData, visitStatus: opt})}
              className={`px-4 py-3 rounded-lg text-left transition-all italic font-bold border text-sm ${formData.visitStatus === opt ? 'bg-vibrant-purple border-vibrant-purple text-white shadow-lg' : 'bg-surface border-surface-border text-text-dim hover:text-white'}`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="form-label">How did you hear about us? *</label>
          <select required value={formData.source} onChange={e => setFormData({...formData, source: e.target.value})} className="form-input">
            <option value="">Select an option</option>
            <option>Friend or Family</option>
            <option>Social Media</option>
            <option>Walk-in</option>
            <option>Other</option>
          </select>
        </div>
        
        {formData.source === 'Other' && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <label className="form-label">Please specify *</label>
            <input required value={formData.sourceOther} onChange={e => setFormData({...formData, sourceOther: e.target.value})} className="form-input" placeholder="Tell us more..." />
          </motion.div>
        )}
      </div>
      
      {error && <p className="text-brand-red text-sm italic">{error}</p>}
      
      <button disabled={loading} type="submit" className="btn-primary w-full">
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-4 h-4" /> Submit</>}
      </button>
    </motion.form>
  );
}

function TestimonyForm({ onSuccess }: { onSuccess: () => void, key?: any }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', testimony: '', public: 'No', delivery: 'Read in church' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await submitForm(APPS_SCRIPT_URLS.testimony, { ...formData, formType: "testimony" });
    onSuccess();
    setFormData({ name: '', email: '', testimony: '', public: 'No', delivery: 'Read in church' });
    setLoading(false);
  };

  return (
    <motion.form 
      initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} 
      onSubmit={handleSubmit} className="space-y-6"
    >
      <div>
        <label className="form-label">Full Name *</label>
        <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="form-input" />
      </div>
      <div>
        <label className="form-label">Email *</label>
        <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="form-input" />
      </div>
      <div className="space-y-4">
        <label className="form-label">Testimony Preference *</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { id: 'Share live', label: 'Share it live' },
            { id: 'Read in church', label: 'Prefer it to be read' }
          ].map(opt => (
            <button 
              key={opt.id}
              type="button"
              onClick={() => setFormData({...formData, delivery: opt.id})}
              className={`px-4 py-3 rounded-xl border text-left italic transition-all text-xs font-bold ${formData.delivery === opt.id ? 'bg-vibrant-purple border-vibrant-purple text-white shadow-lg' : 'bg-void border-surface-border text-text-dim hover:text-white'}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="form-label">Your Testimony *</label>
        <textarea required rows={5} value={formData.testimony} onChange={e => setFormData({...formData, testimony: e.target.value})} className="form-input" />
      </div>
      <div className="flex items-center justify-between gap-4 p-4 bg-void border border-surface-border rounded-xl">
        <label className="form-label mb-0">Share publicly?</label>
        <div className="flex gap-2">
          {['Yes', 'No'].map(opt => (
            <button key={opt} type="button" onClick={() => setFormData({...formData, public: opt})} className={`tab-pill ${formData.public === opt ? 'active' : ''}`}>{opt}</button>
          ))}
        </div>
      </div>
      <button disabled={loading} type="submit" className="btn-primary w-full">
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Send className="w-4 h-4" /> Submit Testimony</>}
      </button>
    </motion.form>
  );
}

function PrayerForm({ onSuccess }: { onSuccess: () => void, key?: any }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', request: '', private: 'No' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await submitForm(APPS_SCRIPT_URLS.prayer, formData);
    onSuccess();
    setFormData({ name: '', email: '', request: '', private: 'No' });
    setLoading(false);
  };

  return (
    <motion.form 
      initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} 
      onSubmit={handleSubmit} className="space-y-6"
    >
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="form-label">Full Name (Optional)</label>
          <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="form-input" />
        </div>
        <div>
          <label className="form-label">Email (Optional)</label>
          <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="form-input" />
        </div>
      </div>
      <div>
        <label className="form-label">Prayer Request *</label>
        <textarea required rows={5} value={formData.request} onChange={e => setFormData({...formData, request: e.target.value})} className="form-input" />
      </div>
      <div className="flex items-center gap-4">
        <label className="form-label mb-0">Private request? *</label>
        <div className="flex gap-2">
          {['Yes', 'No'].map(opt => (
            <button key={opt} type="button" onClick={() => setFormData({...formData, private: opt})} className={`tab-pill ${formData.private === opt ? 'active' : ''}`}>{opt}</button>
          ))}
        </div>
      </div>
      <button disabled={loading} type="submit" className="btn-primary w-full">
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-4 h-4" /> Submit Request</>}
      </button>
    </motion.form>
  );
}

function ContactForm({ onSuccess }: { onSuccess: () => void, key?: any }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await submitForm(APPS_SCRIPT_URLS.contact, formData);
    onSuccess();
    setFormData({ name: '', email: '', subject: '', message: '' });
    setLoading(false);
  };

  return (
    <motion.form 
      initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} 
      onSubmit={handleSubmit} className="space-y-6"
    >
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="form-label">Full Name</label>
          <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="form-input" placeholder="Optional" />
        </div>
        <div>
          <label className="form-label">Email Address</label>
          <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="form-input" placeholder="Optional" />
        </div>
      </div>
      <div>
        <label className="form-label">Subject *</label>
        <select required value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} className="form-input">
          <option value="">Select subject</option>
          <option>General Inquiry</option>
          <option>Feedback</option>
          <option>Suggestion</option>
          <option>Other</option>
        </select>
      </div>
      <div>
        <label className="form-label">Message *</label>
        <textarea required rows={5} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="form-input" />
      </div>
      <button disabled={loading} type="submit" className="btn-primary w-full">
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-4 h-4" /> Send Message</>}
      </button>
    </motion.form>
  );
}

function AttendanceForm({ onSuccess }: { onSuccess: () => void, key?: any }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ 
    eventType: '', 
    customEvent: '', 
    date: new Date().toISOString().split('T')[0], 
    total: '', 
    firstTimers: '', 
    notes: '' 
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await submitForm(APPS_SCRIPT_URLS.attendance, { ...formData, formType: "attendance" });
    onSuccess();
    setFormData({ eventType: '', customEvent: '', date: new Date().toISOString().split('T')[0], total: '', firstTimers: '', notes: '' });
    setLoading(false);
  };

  return (
    <motion.form 
      initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} 
      onSubmit={handleSubmit} className="space-y-6"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="form-label">Event Type *</label>
          <select required value={formData.eventType} onChange={e => setFormData({...formData, eventType: e.target.value})} className="form-input">
            <option value="">Select event</option>
            <option>Sunday Service</option>
            <option>Midweek Service</option>
            <option>Special Event</option>
            <option>Other</option>
          </select>
        </div>
        {formData.eventType === 'Other' && (
          <div>
            <label className="form-label">Event Name *</label>
            <input required value={formData.customEvent} onChange={e => setFormData({...formData, customEvent: e.target.value})} className="form-input" />
          </div>
        )}
        <div>
          <label className="form-label">Date *</label>
          <input required type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="form-input" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="form-label">Total Attendance *</label>
          <input required type="number" min="0" value={formData.total} onChange={e => setFormData({...formData, total: e.target.value})} className="form-input" />
        </div>
        <div>
          <label className="form-label">First-time Visitors *</label>
          <input required type="number" min="0" value={formData.firstTimers} onChange={e => setFormData({...formData, firstTimers: e.target.value})} className="form-input" />
        </div>
      </div>
      <div>
        <label className="form-label">Notes</label>
        <textarea rows={3} value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} className="form-input" />
      </div>
      <button disabled={loading} type="submit" className="btn-primary w-full">
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-4 h-4" /> Log Attendance</>}
      </button>
    </motion.form>
  );
}

function ReimbursementForm({ onSuccess }: { onSuccess: () => void, key?: any }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    paymentType: 'E-Transfer',
    accountingPeriod: '',
    budgetCenter: '',
    payeeName: '',
    payeeOrg: '',
    payeeAddress: '',
    payeePhone: '',
    payeeEmail: '',
    amount: '',
    purpose: '',
    ministries: [] as string[],
    categories: [] as string[],
    documents: [] as string[]
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await submitForm(APPS_SCRIPT_URLS.reimbursement, formData);
    onSuccess();
    setLoading(false);
  };

  const toggleItem = (list: string[], item: string, field: string) => {
    const newList = list.includes(item) ? list.filter(i => i !== item) : [...list, item];
    setFormData({...formData, [field]: newList});
  };

  return (
    <motion.form 
      initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} 
      onSubmit={handleSubmit} 
      className="space-y-12"
    >
      {/* Section 1 */}
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-2">
          <span className="bg-brand-red/20 text-brand-red text-xs font-bold px-3 py-1.5 rounded-full italic">PART I</span>
          <h4 className="text-2xl font-display font-bold uppercase tracking-widest border-b border-brand-red/30 flex-1 pb-2 italic">Voucher Information</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="form-label">Date of Request *</label>
            <input required type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="form-input" />
          </div>
          <div>
            <label className="form-label">Accounting Period *</label>
            <input required placeholder="e.g. April 2026" value={formData.accountingPeriod} onChange={e => setFormData({...formData, accountingPeriod: e.target.value})} className="form-input" />
          </div>
          <div className="md:col-span-2">
            <label className="form-label">Budget Line / Cost Center *</label>
            <input required placeholder="e.g. Media Equipment Repairs" value={formData.budgetCenter} onChange={e => setFormData({...formData, budgetCenter: e.target.value})} className="form-input" />
          </div>
          <div className="md:col-span-2">
            <label className="form-label">Payment Type *</label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {['Cash', 'Cheque', 'E-Transfer', 'Direct Deposit', 'Other'].map(type => (
                <button 
                  key={type} 
                  type="button" 
                  onClick={() => setFormData({...formData, paymentType: type})} 
                  className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all italic ${
                    formData.paymentType === type ? 'bg-vibrant-purple border-vibrant-purple text-white shadow-lg' : 'bg-void border-surface-border text-text-dim hover:border-vibrant-purple/50'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-2">
          <span className="bg-brand-red/20 text-brand-red text-xs font-bold px-3 py-1.5 rounded-full italic">PART II</span>
          <h4 className="text-2xl font-display font-bold uppercase tracking-widest border-b border-brand-red/30 flex-1 pb-2 italic">Payee Information</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="form-label">Full Name of Payee *</label>
            <input required value={formData.payeeName} onChange={e => setFormData({...formData, payeeName: e.target.value})} className="form-input" />
          </div>
          <div>
            <label className="form-label">Organization (Optional)</label>
            <input value={formData.payeeOrg} onChange={e => setFormData({...formData, payeeOrg: e.target.value})} className="form-input" />
          </div>
          <div>
            <label className="form-label">Phone Number *</label>
            <input required type="tel" value={formData.payeePhone} onChange={e => setFormData({...formData, payeePhone: e.target.value})} className="form-input" />
          </div>
          <div className="md:col-span-2">
            <label className="form-label">Email Address *</label>
            <input required type="email" value={formData.payeeEmail} onChange={e => setFormData({...formData, payeeEmail: e.target.value})} className="form-input" />
          </div>
          <div className="md:col-span-2">
            <label className="form-label">Address *</label>
            <textarea required rows={2} value={formData.payeeAddress} onChange={e => setFormData({...formData, payeeAddress: e.target.value})} className="form-input" />
          </div>
        </div>
      </div>

      {/* Section 3 */}
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-2">
          <span className="bg-brand-red/20 text-brand-red text-xs font-bold px-3 py-1.5 rounded-full italic">PART III</span>
          <h4 className="text-2xl font-display font-bold uppercase tracking-widest border-b border-brand-red/30 flex-1 pb-2 italic">Payment Details</h4>
        </div>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="form-label">Amount Requested (CAD) *</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dim font-bold">$</span>
              <input required type="number" step="0.01" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} className="form-input pl-8" placeholder="0.00" />
            </div>
          </div>
          <div>
            <label className="form-label">Purpose / Description of Expense *</label>
            <textarea required rows={3} value={formData.purpose} onChange={e => setFormData({...formData, purpose: e.target.value})} className="form-input" />
          </div>
          
          <div>
            <label className="form-label">Ministry / Department *</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-void p-4 rounded-xl border border-surface-border">
              {['Administration', 'Worship/Music', 'Outreach/Evangelism', 'Youth Ministry', 'Welfare/Benevolence', 'Media/Technical', 'Building Maintenance', 'Events/Conferences', 'Other'].map(min => (
                <label key={min} className="flex items-center gap-2 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={formData.ministries.includes(min)} 
                    onChange={() => toggleItem(formData.ministries, min, 'ministries')}
                    className="hidden"
                  />
                  <div className={`w-5 h-5 rounded border ${formData.ministries.includes(min) ? 'bg-brand-red border-brand-red shadow-lg' : 'border-surface-border'} flex items-center justify-center transition-colors`}>
                    {formData.ministries.includes(min) && <CheckCircle2 className="w-3 h-3 text-white" />}
                  </div>
                  <span className={`text-sm ${formData.ministries.includes(min) ? 'text-white font-bold italic' : 'text-text-dim'} group-hover:text-white transition-colors`}>{min}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="form-label">Expense Category *</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-void p-4 rounded-xl border border-surface-border">
              {['Supplies', 'Honorarium', 'Utilities', 'Equipment', 'Transportation', 'Program Expense', 'Other'].map(cat => (
                <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={formData.categories.includes(cat)} 
                    onChange={() => toggleItem(formData.categories, cat, 'categories')}
                    className="hidden"
                  />
                  <div className={`w-5 h-5 rounded border ${formData.categories.includes(cat) ? 'bg-brand-red border-brand-red shadow-lg' : 'border-surface-border'} flex items-center justify-center transition-colors`}>
                    {formData.categories.includes(cat) && <CheckCircle2 className="w-3 h-3 text-white" />}
                  </div>
                  <span className={`text-sm ${formData.categories.includes(cat) ? 'text-white font-bold italic' : 'text-text-dim'} group-hover:text-white transition-colors`}>{cat}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Section 4 */}
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-2">
          <span className="bg-brand-red/20 text-brand-red text-xs font-bold px-3 py-1.5 rounded-full italic">PART IV</span>
          <h4 className="text-2xl font-display font-bold uppercase tracking-widest border-b border-brand-red/30 flex-1 pb-2 italic">Supporting Documents</h4>
        </div>
        <div className="space-y-4">
          <p className="text-sm text-text-dim italic font-medium">Check all that apply. Physical copies must be submitted to the finance office.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {['Invoice', 'Receipt', 'Contract/Agreement', 'Event Budget Approval', 'Ministry Approval', 'Other'].map(docType => (
              <label key={docType} className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={formData.documents.includes(docType)} 
                  onChange={() => toggleItem(formData.documents, docType, 'documents')}
                  className="hidden"
                />
                <div className={`w-5 h-5 rounded border ${formData.documents.includes(docType) ? 'bg-brand-red border-brand-red shadow-lg' : 'border-surface-border'} flex items-center justify-center transition-colors`}>
                  {formData.documents.includes(docType) && <CheckCircle2 className="w-3 h-3 text-white" />}
                </div>
                <span className={`text-sm ${formData.documents.includes(docType) ? 'text-white font-bold italic' : 'text-text-dim'} group-hover:text-white transition-colors`}>{docType}</span>
              </label>
            ))}
          </div>

          <div className="p-4 bg-brand-red/10 border border-brand-red/30 rounded-2xl mt-8 shadow-[0_0_20px_rgba(239,68,68,0.1)] text-center">
            <p className="text-[10px] text-brand-red font-bold uppercase tracking-[0.15em] leading-relaxed italic">
              * Note: Receipts would be submitted in person if requested by the Finance Lead.
            </p>
          </div>
        </div>
      </div>

      <button disabled={loading} type="submit" className="btn-primary w-full py-5 text-lg">
        {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <><Send className="w-5 h-5" /> Submit Reimbursement Request</>}
      </button>
    </motion.form>
  );
}

function TitheReceiptForm({ onSuccess }: { onSuccess: () => void, key?: any }) {
  const [loading, setLoading] = useState(false);
  const currentYear = new Date().getFullYear();
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    year: currentYear.toString(), 
    method: 'Email' 
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await submitForm(APPS_SCRIPT_URLS.titheReceipt, formData);
    onSuccess();
    setFormData({ name: '', email: '', phone: '', year: currentYear.toString(), method: 'Email' });
    setLoading(false);
  };

  return (
    <motion.form 
      initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} 
      onSubmit={handleSubmit} className="space-y-6"
    >
      <div>
        <label className="form-label">Full Name *</label>
        <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="form-input" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="form-label">Email Address *</label>
          <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="form-input" />
        </div>
        <div>
          <label className="form-label">Phone Number *</label>
          <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="form-input" />
        </div>
      </div>
      <div>
        <label className="form-label">Year of Tithe *</label>
        <select required value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} className="form-input">
          <option>{currentYear}</option>
          <option>{currentYear - 1}</option>
          <option>{currentYear - 2}</option>
        </select>
      </div>
      <div className="space-y-3">
        <label className="form-label">Preferred Delivery Method *</label>
        <div className="flex gap-4">
          {['Email', 'In-person Pickup'].map(method => (
            <label key={method} className="flex items-center gap-2 cursor-pointer group">
              <input 
                type="radio" 
                name="delivery" 
                checked={formData.method === method} 
                onChange={() => setFormData({...formData, method: method})}
                className="hidden"
              />
              <div className={`w-5 h-5 rounded-full border ${formData.method === method ? 'border-brand-red border-[5px] shadow-lg' : 'border-surface-border'} transition-all`} />
              <span className={`text-sm font-bold italic ${formData.method === method ? 'text-white' : 'text-text-dim'}`}>{method}</span>
            </label>
          ))}
        </div>
      </div>
      <button disabled={loading} type="submit" className="btn-primary w-full">
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-5 h-5" /> Submit</>}
      </button>
    </motion.form>
  );
}
