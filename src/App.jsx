import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import ThemeSwitcher from './components/ThemeSwitcher';
import LandingPage from './pages/landing';
import ReadingSettings from './pages/ReadingSettings';
import PracticePage from './pages/PracticePage';
import ResultsPage from './pages/ResultsPage';
import SynonymsSettings from './pages/SynonymsSettings';
import SynonymsPractice from './pages/SynonymsPractice';
import SynonymsResults from './pages/SynonymsResults';
import ComingSoon from './components/ComingSoon';
import './App.css';

function AppContent() {
  const { currentTheme } = useTheme();
  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentTheme.gradient} transition-colors duration-300`}>
      <div className="flex justify-end items-center p-4 gap-4 space-x-2">
        <ThemeSwitcher />
      </div>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/reading-settings" element={<ReadingSettings />} />
          <Route path="/practice" element={<PracticePage />} />
          <Route path="/results" element={<ResultsPage />} />
          
          {/* Synonyms & Antonyms Routes */}
          <Route path="/synonyms-settings" element={<SynonymsSettings />} />
          <Route path="/synonyms-practice" element={<SynonymsPractice />} />
          <Route path="/synonyms-results" element={<SynonymsResults />} />
          
          {/* Legacy route - redirect to settings page */}
          <Route path="/synonyms" element={<SynonymsSettings />} />
          
          {/* Coming soon routes */}
          <Route path="/vocabulary" element={<ComingSoon title="Vocabulary Builder" />} />
          <Route path="/analytics" element={<ComingSoon title="Performance Analytics" />} />
        </Routes>
      </Router>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
