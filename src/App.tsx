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
  prayer: "https://script.google.com/macros/s/AKfycbzUhV7fdCpyMPyEIACM6AL4UdyRG4U8QRsPKEW0hMVelB1vkHUHRijqmA02tjrCGUHR/exec",
  contact: "https://script.google.com/macros/s/AKfycbzUhV7fdCpyMPyEIACM6AL4UdyRG4U8QRsPKEW0hMVelB1vkHUHRijqmA02tjrCGUHR/exec",
  attendance: "https://script.google.com/macros/s/AKfycbzUhV7fdCpyMPyEIACM6AL4UdyRG4U8QRsPKEW0hMVelB1vkHUHRijqmA02tjrCGUHR/exec",
  reimbursement: "https://script.google.com/macros/s/AKfycbzUhV7fdCpyMPyEIACM6AL4UdyRG4U8QRsPKEW0hMVelB1vkHUHRijqmA02tjrCGUHR/exec",
  titheReceipt: "https://script.google.com/macros/s/AKfycbzUhV7fdCpyMPyEIACM6AL4UdyRG4U8QRsPKEW0hMVelB1vkHUHRijqmA02tjrCGUHR/exec"
};

const EMAILS = {
  experience: "slexperienceteam@gmail.com",
  finance: "slfinanceteam1@gmail.com",
  pastoral: "slpastors@gmail.com",
  media: "superlifemediateam@gmail.com",
  leadership: "slcchurchleadership@gmail.com"
};

const DEVOTIONAL_URL = "PLACEHOLDER_DEVOTIONAL_URL";
const DEVOTIONAL_TITLE = "Today's Devotional";
const DEVOTIONAL_DESCRIPTION = "Click below to access today's devotional resource.";

type Section = 'home' | 'general' | 'experience' | 'finance';

// --- COMPONENTS ---

const ReturnToDashboard = ({ onNavigate }: { onNavigate: () => void }) => (
  <button 
    onClick={onNavigate}
    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-text-dim/60 hover:text-crimson transition-colors mb-6 group"
  >
    <ChevronRight className="w-3 h-3 rotate-180 group-hover:-translate-x-1 transition-transform" />
    Dashboard
  </button>
);

const SuccessModal = ({ isOpen, onClose, message }: { isOpen: boolean, onClose: () => void, message: string }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed bottom-0 md:bottom-10 left-0 right-0 md:left-auto md:right-10 z-[100] p-4 md:p-0 pointer-events-none">
          <motion.div 
            initial={{ y: 30, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.9 }}
            className="bg-void text-white p-6 rounded-[24px] flex items-center gap-5 shadow-[0_30px_60px_rgba(192,19,42,0.1)] border border-crimson/20 w-full md:w-[380px] pointer-events-auto relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-crimson/5 pointer-events-none" />
            <div className="w-12 h-12 bg-crimson rounded-xl flex items-center justify-center shrink-0 shadow-lg relative z-10">
              <CheckCircle2 className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 relative z-10">
              <h4 className="font-display font-bold text-base leading-tight italic">Confirmed</h4>
              <p className="text-[12px] text-text-dim leading-relaxed italic">{message}</p>
            </div>
            <button 
              onClick={onClose}
              className="text-text-dim hover:text-white transition-colors p-2 relative z-10"
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
  const [generalTab, setGeneralTab] = useState<'newMember' | 'testimony' | 'prayer' | 'contact'>('newMember');

  const closeSuccessModal = () => setSuccessModal({ ...successModal, isOpen: false });
  const openSuccessModal = (message: string) => setSuccessModal({ isOpen: true, message });

  const navigateTo = (section: Section, tab?: any) => {
    setActiveSection(section);
    if (tab && section === 'general') setGeneralTab(tab);
    if (window.innerWidth < 768) setIsSidebarOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-void font-sans">
      {/* Slide-out Menu Trigger */}
      <button 
        onClick={() => setIsSidebarOpen(true)}
        className={`fixed left-0 top-1/2 -translate-y-1/2 z-[100] transition-all duration-500 ${isSidebarOpen ? '-translate-x-full opacity-0' : 'translate-x-0 opacity-100'}`}
      >
        <div className="bg-crimson text-white py-6 px-1.5 rounded-r-full shadow-[10px_0_30px_rgba(192,19,42,0.2)] flex items-center justify-center hover:px-2.5 transition-all">
          <Menu className="w-4 h-4" />
        </div>
      </button>

      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ 
          x: isSidebarOpen ? 0 : -320,
          opacity: isSidebarOpen ? 1 : 0
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 200 }}
        className="fixed top-0 left-0 h-screen w-full max-w-[320px] bg-void border-r border-white/5 flex flex-col p-8 md:p-10 z-[120] shadow-2xl"
      >
        <div className="mb-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-crimson rounded-xl shadow-[0_0_20px_rgba(192,19,42,0.3)] flex items-center justify-center">
              <span className="font-display text-2xl font-black italic text-white leading-none">S</span>
            </div>
            <h1 className="logo-text text-xl">SuperPortal</h1>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="text-text-dim hover:text-white transition-colors p-2">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 space-y-2">
          {[
            { id: 'home', title: 'Dashboard', icon: Home },
            { id: 'general', title: 'General Ops', icon: FileText },
            { id: 'experience', title: 'Experience', icon: Users },
            { id: 'finance', title: 'Finance', icon: DollarSign }
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => navigateTo(item.id as Section)}
              className={`sidebar-link w-full ${activeSection === item.id ? 'active' : ''}`}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.title}</span>
              {activeSection === item.id && <motion.div layoutId="nav-dot" className="ml-auto w-1 h-1 rounded-full bg-white" />}
            </button>
          ))}
        </nav>

        <div className="pt-8 border-t border-white/5 mt-auto">
          <button className="sidebar-link w-full opacity-40 hover:opacity-100 transition-opacity">
            <LogOut className="w-4 h-4" />
            <span>End Session</span>
          </button>
        </div>
      </motion.aside>

      <main className={`flex-1 min-h-screen relative transition-all duration-500 overflow-hidden ${isSidebarOpen ? 'md:pl-[320px]' : 'md:pl-0'}`}>
        <div className="max-w-[1440px] mx-auto p-6 md:px-24 md:py-24 relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {activeSection === 'home' && <HomeSection navigateTo={navigateTo} openSuccessModal={openSuccessModal} />}
              {activeSection === 'general' && <GeneralSection openSuccessModal={openSuccessModal} activeTab={generalTab} setActiveTab={setGeneralTab} navigateTo={navigateTo} />}
              {activeSection === 'experience' && <ExperienceSection openSuccessModal={openSuccessModal} navigateTo={navigateTo} />}
              {activeSection === 'finance' && <FinanceSection openSuccessModal={openSuccessModal} navigateTo={navigateTo} />}
            </motion.div>
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

function HomeSection({ navigateTo }: { navigateTo: (s: Section, t?: any) => void, openSuccessModal: (m: string) => void, key?: any }) {
  return (
    <div className="min-h-[80vh] flex flex-col justify-between pt-[10vh] pb-[60px] relative overflow-hidden">
      {/* Background Elements */}
      <div className="geo-bg" />
      <div className="grid-bg" />

      {/* Hero Section */}
      <div className="relative z-10 max-w-[720px] text-center mx-auto">
        <div className="fade-up-1 flex items-center justify-center gap-4 mb-6">
          <span className="w-5 h-[1px] bg-crimson" />
          <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-text-dim font-bold">SuperPortal</span>
          <span className="w-5 h-[1px] bg-crimson" />
        </div>
        
        <h2 className="home-hero-title fade-up-2 mb-6">
          Super<span className="italic">Portal</span>
        </h2>
        
        <p className="fade-up-3 text-sm md:text-base text-text-dim font-sans font-light italic leading-relaxed">
          Serving internal operations at Supernatural Life Church.
        </p>
      </div>

      {/* Quick Access Actions */}
      <div className="fade-up-4 relative z-10 flex flex-row gap-2 md:gap-4 max-w-[800px] mt-12 md:mt-16 text-center mx-auto px-2 md:px-4 w-full">
        <button 
          onClick={() => navigateTo('general', 'testimony')}
          className="flex-1 bg-crimson border border-crimson/50 rounded-[40px] py-4 md:py-8 px-2 md:px-10 group transition-all hover:bg-crimson-dark hover:-translate-y-1 shadow-2xl shadow-crimson/20 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6"
        >
          <div className="card-icon-wrap bg-white/10 border-white/20 w-8 h-8 md:w-10 md:h-10 mb-0">
            <Send className="w-4 h-4 md:w-5 md:h-5 text-white" />
          </div>
          <h3 className="text-[11px] sm:text-[14px] md:text-[22px] italic text-white font-bold leading-tight">Testimony</h3>
        </button>

        <button 
          onClick={() => navigateTo('general', 'prayer')}
          className="flex-1 bg-crimson border border-crimson/50 rounded-[40px] py-4 md:py-8 px-2 md:px-10 group transition-all hover:bg-crimson-dark hover:-translate-y-1 shadow-2xl shadow-crimson/20 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6"
        >
          <div className="card-icon-wrap bg-white/10 border-white/20 w-8 h-8 md:w-10 md:h-10 mb-0">
            <Users className="w-4 h-4 md:w-5 md:h-5 text-white" />
          </div>
          <h3 className="text-[11px] sm:text-[14px] md:text-[22px] italic text-white font-bold leading-tight">Prayer</h3>
        </button>
      </div>

      {/* Cards Grid */}
      <div className="fade-up-4 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 max-w-[800px] mt-6 md:mt-8 lg:mt-10 mx-auto">
        <button 
          onClick={() => navigateTo('general', 'newMember')}
          className="home-card text-left group min-h-[140px]"
        >
          <div className="card-icon-wrap">
            <FileText className="w-4 h-4 text-text-dim group-hover:text-white transition-colors" />
          </div>
          <h3 className="text-[22px] italic mb-2">General Ops</h3>
          <p className="text-[12px] text-text-dim font-sans">Member registration, testimonies, prayer and contact.</p>
          <ChevronRight className="card-arrow w-5 h-5 transition-all" />
        </button>

        <button 
          onClick={() => navigateTo('experience')}
          className="home-card text-left group"
        >
          <div className="card-icon-wrap">
            <Users className="w-4 h-4 text-text-dim group-hover:text-white transition-colors" />
          </div>
          <h3 className="text-[22px] italic mb-2">Experience</h3>
          <p className="text-[12px] text-text-dim font-sans">Attendance tracking and devotional resources.</p>
          <ChevronRight className="card-arrow w-5 h-5 transition-all" />
        </button>

        <button 
          onClick={() => navigateTo('finance')}
          className="home-card text-left group"
        >
          <div className="card-icon-wrap">
            <DollarSign className="w-4 h-4 text-text-dim group-hover:text-white transition-colors" />
          </div>
          <h3 className="text-[22px] italic mb-2">Finance</h3>
          <p className="text-[12px] text-text-dim font-sans">Reimbursements and tithe receipt requests.</p>
          <ChevronRight className="card-arrow w-5 h-5 transition-all" />
        </button>

        <button 
          onClick={() => window.open(DEVOTIONAL_URL, '_blank')}
          className="home-card home-card-devotional text-left group"
        >
          <div className="card-icon-wrap">
            <BookOpen className="w-4 h-4 text-text-dim group-hover:text-white transition-colors" />
          </div>
          <h3 className="text-[22px] italic mb-2">Daily Devotional</h3>
          <p className="text-[12px] text-text-dim font-sans">Access today's devotional resource.</p>
          <ChevronRight className="card-arrow w-5 h-5 transition-all" />
        </button>
      </div>

      {/* Bottom Footer Section */}
      <div className="fade-up-5 relative z-10 mt-12 md:mt-16 pt-8 border-t border-white/5 flex flex-wrap justify-center gap-3">
        <button onClick={() => navigateTo('general')} className="quick-link group">
          New Member <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </button>
        <button onClick={() => navigateTo('experience')} className="quick-link group">
          Attendance <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </button>
        <button onClick={() => navigateTo('finance')} className="quick-link group">
          Reimbursement <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}

// --- SECTION: GENERAL ---

function GeneralSection({ openSuccessModal, activeTab, setActiveTab, navigateTo }: { 
  openSuccessModal: (m: string) => void, 
  activeTab: 'newMember' | 'testimony' | 'prayer' | 'contact',
  setActiveTab: (t: any) => void,
  navigateTo: (s: any) => void,
  key?: any 
}) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-[80vh]"
    >
      <div className="geo-bg opacity-30" />
      <div className="grid-bg" />

      <div className="relative z-10">
        <ReturnToDashboard onNavigate={() => navigateTo('home')} />
        <div className="fade-up-1 flex items-center gap-4 mb-6">
          <span className="w-5 h-[1px] bg-crimson" />
          <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-text-dim font-bold">Portal / General</span>
        </div>
        
        <h2 className="section-title fade-up-2 mb-10">
          General<span className="italic">Ops</span>
        </h2>
        
        <div className="fade-up-3 flex flex-wrap gap-2 mb-12 pb-8 border-b border-white/5">
          <button onClick={() => setActiveTab('newMember')} className={`tab-pill ${activeTab === 'newMember' ? 'active' : ''}`}>New Member</button>
          <button onClick={() => setActiveTab('testimony')} className={`tab-pill ${activeTab === 'testimony' ? 'active' : ''}`}>Testimony</button>
          <button onClick={() => setActiveTab('prayer')} className={`tab-pill ${activeTab === 'prayer' ? 'active' : ''}`}>Prayer Request</button>
          <button onClick={() => setActiveTab('contact')} className={`tab-pill ${activeTab === 'contact' ? 'active' : ''}`}>Feedback</button>
        </div>

        <AnimatePresence mode="wait">
          <div className="fade-up-4 max-w-xl">
            {activeTab === 'newMember' && <NewMemberForm key="nm" onSuccess={() => openSuccessModal('Your registration has been submitted successfully.')} />}
            {activeTab === 'testimony' && <TestimonyForm key="test" onSuccess={() => openSuccessModal('Thank you for sharing your testimony with us.')} />}
            {activeTab === 'prayer' && <PrayerForm key="pray" onSuccess={() => openSuccessModal('Your prayer request has been received and sent to the pastoral team.')} />}
            {activeTab === 'contact' && <ContactForm key="contact" onSuccess={() => openSuccessModal('Your message has been sent. We will get back to you shortly.')} />}
          </div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// --- SECTION: EXPERIENCE ---

function ExperienceSection({ openSuccessModal, navigateTo }: { openSuccessModal: (m: string) => void, navigateTo: (s: any) => void, key?: any }) {
  const [activeTab, setActiveTab] = useState<'attendance' | 'devotional'>('attendance');

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-[80vh]"
    >
      <div className="geo-bg opacity-30" />
      <div className="grid-bg" />

      <div className="relative z-10">
        <ReturnToDashboard onNavigate={() => navigateTo('home')} />
        <div className="fade-up-1 flex items-center gap-4 mb-6">
          <span className="w-5 h-[1px] bg-crimson" />
          <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-text-dim font-bold">Portal / Experience</span>
        </div>
        
        <h2 className="section-title fade-up-2 mb-10">
          Experi<span className="italic">ence</span>
        </h2>
        
        <div className="fade-up-3 flex flex-wrap gap-2 mb-12 pb-8 border-b border-white/5">
          <button onClick={() => setActiveTab('attendance')} className={`tab-pill ${activeTab === 'attendance' ? 'active' : ''}`}>Attendance</button>
          <button onClick={() => setActiveTab('devotional')} className={`tab-pill ${activeTab === 'devotional' ? 'active' : ''}`}>Devotional</button>
        </div>

        <AnimatePresence mode="wait">
          <div className="fade-up-4 max-w-2xl">
            {activeTab === 'attendance' && <AttendanceForm key="att" onSuccess={() => openSuccessModal('Service metrics have been logged.')} />}
            {activeTab === 'devotional' && (
              <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="card-surface p-10">
                <div className="card-icon-wrap w-14 h-14 bg-vibrant-purple/10 border-vibrant-purple/20 mb-8">
                  <BookOpen className="w-6 h-6 text-vibrant-purple" />
                </div>
                <h3 className="text-3xl font-display mb-4 italic">{DEVOTIONAL_TITLE}</h3>
                <p className="text-text-dim text-base mb-10 leading-relaxed italic">{DEVOTIONAL_DESCRIPTION}</p>
                <button 
                  onClick={() => window.open(DEVOTIONAL_URL, '_blank')}
                  className="btn-primary w-full"
                >
                  Enter Devotional
                </button>
                <div className="mt-10 pt-6 border-t border-white/5">
                  <p className="text-center text-[9px] text-text-dim/40 uppercase tracking-[0.3em] italic font-black">
                    Contact the Media team for access support
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// --- SECTION: FINANCE ---

function FinanceSection({ openSuccessModal, navigateTo }: { openSuccessModal: (m: string) => void, navigateTo: (s: any) => void, key?: any }) {
  const [activeTab, setActiveTab] = useState<'reimbursement' | 'tithe'>('reimbursement');

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-[80vh]"
    >
      <div className="geo-bg opacity-30" />
      <div className="grid-bg" />

      <div className="relative z-10">
        <ReturnToDashboard onNavigate={() => navigateTo('home')} />
        <div className="fade-up-1 flex items-center gap-4 mb-6">
          <span className="w-5 h-[1px] bg-crimson" />
          <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-text-dim font-bold">Portal / Finance</span>
        </div>
        
        <h2 className="section-title fade-up-2 mb-10">
          Fin<span className="italic">ance</span>
        </h2>
        
        <div className="fade-up-3 flex flex-wrap gap-2 mb-12 pb-8 border-b border-white/5">
          <button onClick={() => setActiveTab('reimbursement')} className={`tab-pill ${activeTab === 'reimbursement' ? 'active' : ''}`}>Reimbursement</button>
          <button onClick={() => setActiveTab('tithe')} className={`tab-pill ${activeTab === 'tithe' ? 'active' : ''}`}>Receipt</button>
        </div>

        <AnimatePresence mode="wait">
          <div className="fade-up-4">
            {activeTab === 'reimbursement' && <ReimbursementForm key="reimb" onSuccess={() => openSuccessModal('Your request has been submitted to Finance.')} />}
            {activeTab === 'tithe' && <TitheReceiptForm key="tithe" onSuccess={() => openSuccessModal('Your request has been submitted to Finance.')} />}
          </div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// --- FORM HANDLER UTILITY ---

async function submitForm(url: string, data: any) {
  const params = new URLSearchParams();
  
  Object.keys(data).forEach(key => {
    const value = data[key];
    if (Array.isArray(value)) {
      params.set(key, value.join(', '));
    } else {
      params.set(key, value);
    }
  });

  return await fetch(url, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString()
  });
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
      const submissionData = {
        ...formData,
        formType: "newMember",
        source: formData.source === 'Other' ? formData.sourceOther : formData.source
      };
      await submitForm(APPS_SCRIPT_URLS.newMember, submissionData);
      onSuccess();
      setFormData({ firstName: '', lastNameInitial: '', email: '', phone: '', source: '', sourceOther: '', visitStatus: '' });
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      onSubmit={handleSubmit} 
      className="card-surface space-y-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="form-label">First Name *</label>
          <input required placeholder="Enter first name" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} className="form-input" />
        </div>
        <div>
          <label className="form-label">Last Initial *</label>
          <input required maxLength={1} placeholder="X" value={formData.lastNameInitial} onChange={e => setFormData({...formData, lastNameInitial: e.target.value.toUpperCase()})} className="form-input" />
        </div>
      </div>
      <div>
        <label className="form-label">Email Address *</label>
        <input required type="email" placeholder="email@address.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="form-input" />
      </div>
      <div>
        <label className="form-label">Phone Number</label>
        <p className="text-[10px] text-text-dim italic mb-2 leading-relaxed">
          Please add phone number if you would like to be contacted and/or added to our online community group.
        </p>
        <input type="tel" placeholder="+1 (000) 000-0000" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="form-input" />
      </div>

      <div className="space-y-4">
        <label className="form-label">Engagement Status *</label>
        <div className="flex flex-col gap-2">
          {[
            'I am just visiting',
            'I would like to return',
            'I want to make this my church home'
          ].map(opt => (
            <button 
              key={opt}
              type="button"
              onClick={() => setFormData({...formData, visitStatus: opt})}
              className={`px-5 py-3 rounded-xl text-left transition-all italic font-bold border text-[13px] ${formData.visitStatus === opt ? 'bg-crimson border-crimson text-white shadow-lg' : 'bg-void border-white/5 text-text-dim hover:text-white hover:border-white/10'}`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="form-label">Please tell us how you heard about us *</label>
          <select required value={formData.source} onChange={e => setFormData({...formData, source: e.target.value})} className="form-input">
            <option value="">Select discovery method</option>
            <option>Friend or Family</option>
            <option>Social Media</option>
            <option>Walk-in</option>
            <option>Other</option>
          </select>
        </div>
        
        {formData.source === 'Other' && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <label className="form-label">Specify Source *</label>
            <input required placeholder="How did you find us?" value={formData.sourceOther} onChange={e => setFormData({...formData, sourceOther: e.target.value})} className="form-input" />
          </motion.div>
        )}
      </div>
      
      {error && <p className="text-crimson text-[12px] italic font-bold uppercase tracking-wider">{error}</p>}
      
      <button disabled={loading} type="submit" className="btn-primary w-full">
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-4 h-4" /> Register</>}
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
    <motion.form initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleSubmit} className="card-surface space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="form-label">Full Name *</label>
          <input required placeholder="Enter name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="form-input" />
        </div>
        <div>
          <label className="form-label">Contact Email *</label>
          <input required type="email" placeholder="email@address.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="form-input" />
        </div>
      </div>
      
      <div className="space-y-4">
        <label className="form-label">Delivery Preference *</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { id: 'Share live', label: 'Share it live' },
            { id: 'Read in church', label: 'Prefer it to be read' }
          ].map(opt => (
            <button 
              key={opt.id}
              type="button"
              onClick={() => setFormData({...formData, delivery: opt.id})}
              className={`px-5 py-3 rounded-xl border text-left italic transition-all text-[13px] font-bold ${formData.delivery === opt.id ? 'bg-crimson border-crimson text-white shadow-lg' : 'bg-void border-white/5 text-text-dim hover:text-white hover:border-white/10'}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="form-label">Your Testimony *</label>
        <textarea required rows={5} placeholder="Describe your experience..." value={formData.testimony} onChange={e => setFormData({...formData, testimony: e.target.value})} className="form-input min-h-[160px] resize-none" />
      </div>

      <button disabled={loading} type="submit" className="btn-primary w-full">
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-4 h-4" /> Share Testimony</>}
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
    await submitForm(APPS_SCRIPT_URLS.prayer, { ...formData, formType: "prayer" });
    onSuccess();
    setFormData({ name: '', email: '', request: '', private: 'No' });
    setLoading(false);
  };

  return (
    <motion.form 
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} 
      onSubmit={handleSubmit} className="card-surface space-y-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="form-label">Full Name</label>
          <input placeholder="Optional" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="form-input" />
        </div>
        <div>
          <label className="form-label">Email Address</label>
          <input type="email" placeholder="Optional" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="form-input" />
        </div>
      </div>
      <div>
        <label className="form-label">Prayer Request *</label>
        <textarea required rows={5} placeholder="Describe your request..." value={formData.request} onChange={e => setFormData({...formData, request: e.target.value})} className="form-input min-h-[160px] resize-none" />
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
    await submitForm(APPS_SCRIPT_URLS.contact, { ...formData, formType: "contact" });
    onSuccess();
    setFormData({ name: '', email: '', subject: '', message: '' });
    setLoading(false);
  };

  return (
    <motion.form 
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} 
      onSubmit={handleSubmit} className="card-surface space-y-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="form-label">Full Name</label>
          <input placeholder="Optional" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="form-input" />
        </div>
        <div>
          <label className="form-label">Email Address</label>
          <input type="email" placeholder="Optional" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="form-input" />
        </div>
      </div>
      <div>
        <label className="form-label">Please select your subject *</label>
        <select required value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} className="form-input">
          <option value="">Select subject</option>
          <option>General Inquiry</option>
          <option>Feedback</option>
          <option>Suggestion</option>
          <option>Other</option>
        </select>
      </div>
      <div>
        <label className="form-label">Inquiry Message *</label>
        <textarea required rows={5} placeholder="How can we assist?" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="form-input min-h-[160px] resize-none" />
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
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} 
      onSubmit={handleSubmit} className="card-surface space-y-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="form-label">Event Assignment *</label>
          <select required value={formData.eventType} onChange={e => setFormData({...formData, eventType: e.target.value})} className="form-input">
            <option value="">Select service type</option>
            <option>Sunday Service</option>
            <option>Midweek Service</option>
            <option>Special Event</option>
            <option>Other</option>
          </select>
        </div>
        {formData.eventType === 'Other' && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <label className="form-label">Event Specification *</label>
            <input required value={formData.customEvent} onChange={e => setFormData({...formData, customEvent: e.target.value})} className="form-input" />
          </motion.div>
        )}
        <div>
          <label className="form-label">Mission Date *</label>
          <input required type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="form-input" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/5">
        <div>
          <label className="form-label">Total Attendance *</label>
          <input required type="number" min="0" placeholder="0" value={formData.total} onChange={e => setFormData({...formData, total: e.target.value})} className="form-input" />
        </div>
        <div>
          <label className="form-label">First-time Visitors *</label>
          <input required type="number" min="0" placeholder="0" value={formData.firstTimers} onChange={e => setFormData({...formData, firstTimers: e.target.value})} className="form-input" />
        </div>
      </div>
      <div>
        <label className="form-label">Deployment Notes</label>
        <textarea rows={3} placeholder="Additional context..." value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} className="form-input resize-none" />
      </div>
      <button disabled={loading} type="submit" className="btn-primary w-full">
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-4 h-4" /> Save Attendance</>}
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
    await submitForm(APPS_SCRIPT_URLS.reimbursement, { ...formData, formType: "reimbursement" });
    onSuccess();
    setLoading(false);
  };

  const toggleItem = (list: string[], item: string, field: string) => {
    const newList = list.includes(item) ? list.filter(i => i !== item) : [...list, item];
    setFormData({...formData, [field]: newList});
  };

  return (
    <motion.form 
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} 
      onSubmit={handleSubmit} 
      className="space-y-16"
    >
      {/* Section 1 */}
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-lg bg-crimson/10 border border-crimson/20 flex items-center justify-center">
            <span className="font-display font-bold italic text-crimson text-xs">01</span>
          </div>
          <h4 className="text-xl font-display font-bold italic border-b border-white/5 flex-1 pb-2">Voucher Protocol</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="form-label">Submission Date *</label>
            <input required type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="form-input" />
          </div>
          <div>
            <label className="form-label">Accounting Period *</label>
            <input required placeholder="e.g. Q2 2026" value={formData.accountingPeriod} onChange={e => setFormData({...formData, accountingPeriod: e.target.value})} className="form-input" />
          </div>
          <div className="md:col-span-2">
            <label className="form-label">Budget Allocation / Cost Center *</label>
            <input required placeholder="e.g. Media Infrastructure Maintenance" value={formData.budgetCenter} onChange={e => setFormData({...formData, budgetCenter: e.target.value})} className="form-input" />
          </div>
          <div className="md:col-span-2">
            <label className="form-label">Transaction Method *</label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {['Cash', 'Cheque', 'E-Transfer', 'Direct Deposit', 'Other'].map(type => (
                <button 
                  key={type} 
                  type="button" 
                  onClick={() => setFormData({...formData, paymentType: type})} 
                  className={`px-3 py-2.5 rounded-xl text-[10px] font-bold border transition-all italic ${
                    formData.paymentType === type ? 'bg-crimson border-crimson text-white shadow-lg' : 'bg-void border-white/5 text-text-dim hover:border-white/10'
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
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-lg bg-crimson/10 border border-crimson/20 flex items-center justify-center">
            <span className="font-display font-bold italic text-crimson text-xs">02</span>
          </div>
          <h4 className="text-xl font-display font-bold italic border-b border-white/5 flex-1 pb-2">Payee Identification</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="form-label">Legal Name of Recipient *</label>
            <input required placeholder="Full legal name" value={formData.payeeName} onChange={e => setFormData({...formData, payeeName: e.target.value})} className="form-input" />
          </div>
          <div>
            <label className="form-label">Associated Entity</label>
            <input placeholder="Organization (Optional)" value={formData.payeeOrg} onChange={e => setFormData({...formData, payeeOrg: e.target.value})} className="form-input" />
          </div>
          <div>
            <label className="form-label">Mobile Contact *</label>
            <input required type="tel" placeholder="+1 (000) 000-0000" value={formData.payeePhone} onChange={e => setFormData({...formData, payeePhone: e.target.value})} className="form-input" />
          </div>
          <div className="md:col-span-2">
            <label className="form-label">Communication Access (Email) *</label>
            <input required type="email" placeholder="email@address.com" value={formData.payeeEmail} onChange={e => setFormData({...formData, payeeEmail: e.target.value})} className="form-input" />
          </div>
          <div className="md:col-span-2">
            <label className="form-label">Correspondence Address *</label>
            <textarea required rows={2} placeholder="Full mailing address" value={formData.payeeAddress} onChange={e => setFormData({...formData, payeeAddress: e.target.value})} className="form-input resize-none" />
          </div>
        </div>
      </div>

      {/* Section 3 */}
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-lg bg-crimson/10 border border-crimson/20 flex items-center justify-center">
            <span className="font-display font-bold italic text-crimson text-xs">03</span>
          </div>
          <h4 className="text-xl font-display font-bold italic border-b border-white/5 flex-1 pb-2">Fiscal Deployment</h4>
        </div>
        <div className="grid grid-cols-1 gap-8">
          <div>
            <label className="form-label">Requested Amount (CAD) *</label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-text-dim/60 font-bold">$</span>
              <input required type="number" step="0.01" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} className="form-input pl-10 text-xl font-display" placeholder="0.00" />
            </div>
          </div>
          <div>
            <label className="form-label">Statement of Purpose *</label>
            <textarea required rows={3} placeholder="Detailed justification of expense..." value={formData.purpose} onChange={e => setFormData({...formData, purpose: e.target.value})} className="form-input resize-none" />
          </div>
          
          <div>
            <label className="form-label">Operational Department *</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-void p-5 rounded-2xl border border-white/5">
              {['Administration', 'Worship/Music', 'Outreach/Evangelism', 'Youth Ministry', 'Welfare/Benevolence', 'Media/Technical', 'Building Maintenance', 'Events/Conferences', 'Other'].map(min => (
                <label key={min} className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={formData.ministries.includes(min)} 
                    onChange={() => toggleItem(formData.ministries, min, 'ministries')}
                    className="hidden"
                  />
                  <div className={`w-5 h-5 rounded-lg border ${formData.ministries.includes(min) ? 'bg-crimson border-crimson shadow-[0_0_15px_rgba(192,19,42,0.3)]' : 'border-white/10'} flex items-center justify-center transition-all`}>
                    {formData.ministries.includes(min) && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                  </div>
                  <span className={`text-[12px] ${formData.ministries.includes(min) ? 'text-white font-bold italic' : 'text-text-dim'} group-hover:text-white transition-colors`}>{min}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="form-label">Expense Classification *</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-void p-5 rounded-2xl border border-white/5">
              {['Supplies', 'Honorarium', 'Utilities', 'Equipment', 'Transportation', 'Program Expense', 'Other'].map(cat => (
                <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={formData.categories.includes(cat)} 
                    onChange={() => toggleItem(formData.categories, cat, 'categories')}
                    className="hidden"
                  />
                  <div className={`w-5 h-5 rounded-lg border ${formData.categories.includes(cat) ? 'bg-crimson border-crimson shadow-[0_0_15px_rgba(192,19,42,0.3)]' : 'border-white/10'} flex items-center justify-center transition-all`}>
                    {formData.categories.includes(cat) && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                  </div>
                  <span className={`text-[12px] ${formData.categories.includes(cat) ? 'text-white font-bold italic' : 'text-text-dim'} group-hover:text-white transition-colors`}>{cat}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Section 4 */}
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-lg bg-crimson/10 border border-crimson/20 flex items-center justify-center">
            <span className="font-display font-bold italic text-crimson text-xs">04</span>
          </div>
          <h4 className="text-xl font-display font-bold italic border-b border-white/5 flex-1 pb-2">Verification</h4>
        </div>
        <div className="space-y-6">
          <p className="text-[12px] text-text-dim italic font-medium leading-relaxed">Please select all supporting documents being provided.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {['Invoice', 'Receipt', 'Contract/Agreement', 'Event Budget Approval', 'Ministry Approval', 'Other'].map(docType => (
              <label key={docType} className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={formData.documents.includes(docType)} 
                  onChange={() => toggleItem(formData.documents, docType, 'documents')}
                  className="hidden"
                />
                <div className={`w-5 h-5 rounded-lg border ${formData.documents.includes(docType) ? 'bg-crimson border-crimson shadow-[0_0_15px_rgba(192,19,42,0.3)]' : 'border-white/10'} flex items-center justify-center transition-all`}>
                  {formData.documents.includes(docType) && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                </div>
                <span className={`text-[12px] ${formData.documents.includes(docType) ? 'text-white font-bold italic' : 'text-text-dim'} group-hover:text-white transition-colors`}>{docType}</span>
              </label>
            ))}
          </div>

          <div className="p-6 bg-crimson/5 border border-crimson/10 rounded-[20px] text-center">
            <p className="text-[11px] text-crimson font-bold uppercase tracking-[0.1em] leading-relaxed italic">
              * Please be reminded that original transaction receipts may be required for processing.
            </p>
          </div>
        </div>
      </div>

      <button disabled={loading} type="submit" className="btn-primary w-full py-5 text-lg">
        {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <><Send className="w-5 h-5" /> Submit Request</>}
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
    await submitForm(APPS_SCRIPT_URLS.titheReceipt, { ...formData, formType: "titheReceipt" });
    onSuccess();
    setFormData({ name: '', email: '', phone: '', year: currentYear.toString(), method: 'Email' });
    setLoading(false);
  };

  return (
    <motion.form 
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} 
      onSubmit={handleSubmit} className="card-surface space-y-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="form-label">Full Name *</label>
          <input required placeholder="Enter legal name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="form-input" />
        </div>
        <div>
          <label className="form-label">Contact Mobile *</label>
          <input required type="tel" placeholder="+1 (000) 000-0000" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="form-input" />
        </div>
      </div>
      <div>
        <label className="form-label">Digital Address (Email) *</label>
        <input required type="email" placeholder="email@address.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="form-input" />
      </div>
      <div>
        <label className="form-label">Fiscal Year *</label>
        <select required value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} className="form-input">
          <option>{currentYear}</option>
          <option>{currentYear - 1}</option>
          <option>{currentYear - 2}</option>
        </select>
      </div>
      <div className="space-y-4">
        <label className="form-label">Logistics Method *</label>
        <div className="flex gap-3">
          {['Email', 'In-person Pickup'].map(method => (
            <label key={method} className="flex-1 flex items-center gap-3 cursor-pointer group p-4 rounded-xl border border-white/5 bg-void hover:border-white/10 transition-all">
              <input 
                type="radio" 
                name="delivery" 
                checked={formData.method === method} 
                onChange={() => setFormData({...formData, method: method})}
                className="hidden"
              />
              <div className={`w-5 h-5 rounded-full border ${formData.method === method ? 'border-crimson border-[6px] shadow-[0_0_15px_rgba(192,19,42,0.3)]' : 'border-white/10'} transition-all`} />
              <span className={`text-[12px] font-bold italic ${formData.method === method ? 'text-white' : 'text-text-dim'}`}>{method === 'Email' ? 'Digital Delivery' : 'Direct Pickup'}</span>
            </label>
          ))}
        </div>
      </div>
      <button disabled={loading} type="submit" className="btn-primary w-full">
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-5 h-5" /> Submit Request</>}
      </button>
    </motion.form>
  );
}
