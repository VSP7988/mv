import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import OurHistory from './pages/about/OurHistory';
import OurTeam from './pages/about/OurTeam';
import OurMission from './pages/about/OurMission';
import ChildrenHome from './pages/ChildrenHome';
import OldageHome from './pages/OldageHome';
import Medical from './pages/Medical';
import Relief from './pages/Relief';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Donate from './pages/Donate';
import Certifications from './pages/Certifications';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import HomePageManagement from './pages/admin/HomePageManagement';
import ProjectsManagement from './pages/admin/ProjectsManagement';
import CertificationsManagement from './pages/admin/CertificationsManagement';
import ReliefManagement from './pages/admin/ReliefManagement';
import ReliefGalleryManagement from './pages/admin/ReliefGalleryManagement';
import MedicalGalleryManagement from './pages/admin/MedicalGalleryManagement';
import MedicalManagement from './pages/admin/MedicalManagement';
import OldageGalleryManagement from './pages/admin/OldageGalleryManagement';
import OldageBannerManagement from './pages/admin/OldageBannerManagement';
import OldageContentManagement from './pages/admin/OldageContentManagement';
import ChildrenContentManagement from './pages/admin/ChildrenContentManagement';
import ChildrenBannerManagement from './pages/admin/ChildrenBannerManagement';
import ChildrenGalleryManagement from './pages/admin/ChildrenGalleryManagement';
import DonateManagement from './pages/admin/DonateManagement';
import LogoManagement from './pages/admin/LogoManagement';
import BoardStaffManagement from './pages/admin/BoardStaffManagement';
import HomeGalleryManagement from './pages/admin/HomeGalleryManagement';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/about/our-history" element={<OurHistory />} />
            <Route path="/about/our-team" element={<OurTeam />} />
            <Route path="/about/our-mission" element={<OurMission />} />
            <Route path="/children-home" element={<ChildrenHome />} />
            <Route path="/oldage-home" element={<OldageHome />} />
            <Route path="/medical" element={<Medical />} />
            <Route path="/relief" element={<Relief />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/certifications" element={<Certifications />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/home-management" element={<HomePageManagement />} />
            <Route path="/admin/projects-management" element={<ProjectsManagement />} />
            <Route path="/admin/certifications-management" element={<CertificationsManagement />} />
            <Route path="/admin/relief-management" element={<ReliefManagement />} />
            <Route path="/admin/relief-gallery-management" element={<ReliefGalleryManagement />} />
            <Route path="/admin/medical-gallery-management" element={<MedicalGalleryManagement />} />
            <Route path="/admin/medical-management" element={<MedicalManagement />} />
            <Route path="/admin/oldage-gallery-management" element={<OldageGalleryManagement />} />
            <Route path="/admin/oldage-banner-management" element={<OldageBannerManagement />} />
            <Route path="/admin/oldage-content-management" element={<OldageContentManagement />} />
            <Route path="/admin/children-content-management" element={<ChildrenContentManagement />} />
            <Route path="/admin/children-banner-management" element={<ChildrenBannerManagement />} />
            <Route path="/admin/children-gallery-management" element={<ChildrenGalleryManagement />} />
            <Route path="/admin/donate-management" element={<DonateManagement />} />
            <Route path="/admin/logo-management" element={<LogoManagement />} />
            <Route path="/admin/board-staff-management" element={<BoardStaffManagement />} />
            <Route path="/admin/home-gallery-management" element={<HomeGalleryManagement />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;