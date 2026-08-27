import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdvancedCosmicBackground from './components/AdvancedCosmicBackground';
import MeditationBreath from './components/MeditationBreath';
import Home from './pages/Home';
import About from './pages/About';
import Journey from './pages/Journey';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import RetailAnalytics from './pages/RetailAnalytics';
import ImageProcessing from './pages/ImageProcessing';
import Analytics from './pages/Analytics';
import AI from './pages/AI';
import Philosophy from './pages/Philosophy';
import Resume from './pages/Resume';
import Contact from './pages/Contact';
import './App.css';

function AppContent() {
  const location = useLocation();

  const getBackgroundType = () => {
    switch (location.pathname) {
      case '/':
        return 'home';
      case '/about':
        return 'about';
      case '/journey':
        return 'journey';
      case '/skills':
        return 'skills';
      case '/projects':
      case '/projects/retail-analytics':
      case '/projects/image-processing':
        return 'projects';
      case '/analytics':
        return 'analytics';
      case '/ai':
        return 'ai';
      case '/philosophy':
        return 'philosophy';
      case '/resume':
        return 'education';
      case '/contact':
        return 'contact';
      default:
        return 'home';
    }
  };

  const backgroundType = getBackgroundType() as any;
  const isPhilosophyPage = backgroundType === 'philosophy';

  return (
    <div className="min-h-screen bg-cosmic-black flex flex-col relative">
      {/* Advanced cosmic background */}
      <AdvancedCosmicBackground type={backgroundType} intensity={1} />

      {/* Meditation breath effect (subtle always present) */}
      {isPhilosophyPage && <MeditationBreath />}

      <Navbar />
      <main className="flex-grow relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/journey" element={<Journey />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/retail-analytics" element={<RetailAnalytics />} />
          <Route path="/projects/image-processing" element={<ImageProcessing />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/ai" element={<AI />} />
          <Route path="/philosophy" element={<Philosophy />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
