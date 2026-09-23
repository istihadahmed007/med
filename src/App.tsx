import React, { useState, useEffect, lazy, Suspense } from 'react';
import { NavigationView, UserRole } from './types';
import { StorageService } from './services/storageService';
import { ApiService } from './services/apiService';
import { Navbar } from './components/navigation/Navbar';
import { Sidebar } from './components/navigation/Sidebar';
import { CommandPalette } from './components/navigation/CommandPalette';
import { GlobalSearch } from './components/navigation/GlobalSearch';
import { VoiceAssistantModal } from './components/ai/VoiceAssistantModal';
import { ErrorBoundary } from './components/common/ErrorBoundary';

// Core Navigation Hubs
import { DashboardView } from './components/home/DashboardView';
import { LearnSubjectLibrary } from './components/learn/LearnSubjectLibrary';

// Lazy-loaded heavy hubs to optimize initial dashboard bundle & performance
const VisualLabHub = lazy(() => import('./components/visual-lab/VisualLabHub').then(module => ({ default: module.VisualLabHub })));
const ClinicalCaseEngine = lazy(() => import('./components/cases/ClinicalCaseEngine').then(module => ({ default: module.ClinicalCaseEngine })));
const PracticeExamsHub = lazy(() => import('./components/practice/PracticeExamsHub').then(module => ({ default: module.PracticeExamsHub })));
const RevisionHub = lazy(() => import('./components/revision/RevisionHub').then(module => ({ default: module.RevisionHub })));
const PersonalizedProgress = lazy(() => import('./components/progress/PersonalizedProgress').then(module => ({ default: module.PersonalizedProgress })));

// Intelligence & Governance
const AiTutorChat = lazy(() => import('./components/ai/AiTutorChat').then(module => ({ default: module.AiTutorChat })));
const FacultyAdminPortal = lazy(() => import('./components/faculty/FacultyAdminPortal').then(module => ({ default: module.FacultyAdminPortal })));
const VideoStudioHub = lazy(() => import('./components/video-studio/VideoStudioHub').then(module => ({ default: module.VideoStudioHub })));

import { MobileBottomNav } from './components/navigation/MobileBottomNav';
const AcrossBooksWorkspace = lazy(() => import('./components/across-books/AcrossBooksWorkspace').then(module => ({ default: module.AcrossBooksWorkspace })));
const TextbookLibraryHub = lazy(() => import('./components/textbook/TextbookLibraryHub').then(module => ({ default: module.TextbookLibraryHub })));
const DrugReferenceHub = lazy(() => import('./components/drug-reference/DrugReferenceHub').then(module => ({ default: module.DrugReferenceHub })));
const StudyMaterialsHub = lazy(() => import('./components/study/StudyMaterialsHub').then(module => ({ default: module.StudyMaterialsHub })));

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<NavigationView>(() => {
    if (typeof window !== 'undefined') {
      const rawHash = window.location.hash.replace('#', '');
      const parts = rawHash.split('?')[0].split('/');
      const hash = parts[0];
      if (hash === 'drugs' || hash === 'drug-reference') {
        if (parts[1] === 'brand' && parts[2]) {
          // deep link support: #drugs/brand/:slug -> query param brand
          const newUrl = `#drug-reference?brand=${encodeURIComponent(parts[2])}`;
          window.history.replaceState(null, '', newUrl);
        }
        return 'drug-reference';
      }
      if (hash === 'study-materials') return 'study-materials';
      if (hash) return hash as NavigationView;
      const params = new URLSearchParams(window.location.search);
      const view = params.get('view');
      if (view === 'drugs' || view === 'drug-reference') return 'drug-reference';
      if (view) return view as NavigationView;
    }
    return 'dashboard';
  });

  const [role, setRole] = useState<UserRole>(StorageService.getRole());
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isCommandOpen, setIsCommandOpen] = useState<boolean>(false);
  const [isVoiceOpen, setIsVoiceOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);

  const isHomepage = currentView === 'dashboard' || currentView === 'home';

  // Hash links support shareable topic URLs and browser back/forward navigation.
  useEffect(() => {
    const syncView = () => {
      const rawHash = window.location.hash.slice(1);
      const parts = rawHash.split('?')[0].split('/');
      let hash = parts[0];
      if (hash === 'drugs' || hash === 'drug-reference') {
        if (parts[1] === 'brand' && parts[2]) {
          const newUrl = `#drug-reference?brand=${encodeURIComponent(parts[2])}`;
          window.history.replaceState(null, '', newUrl);
        }
        hash = 'drug-reference';
      }
      if (hash === 'study-materials') hash = 'study-materials';
      setCurrentView((hash || 'dashboard') as NavigationView);
      setMobileMenuOpen(false);
    };
    window.addEventListener('hashchange', syncView);
    return () => window.removeEventListener('hashchange', syncView);
  }, []);

  // Global Ctrl + K listener for Global Search and Ctrl + Shift + P for Command Palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (view: NavigationView) => {
    setCurrentView(view);
    if (typeof window !== 'undefined') {
      window.location.hash = view;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenLesson = (lessonId: string) => {
    setSelectedLessonId(lessonId);
    setCurrentView('learn');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRoleChange = async (newRole: UserRole) => {
    setRole(newRole);
    await ApiService.setRole(newRole);
  };

  return (
    <div className="min-h-screen bg-[#040d21] bg-royal-mesh text-[#F5F9FF] flex flex-col font-sans selection:bg-[#08AFC1]/30 selection:text-white relative">
      {/* Universal Fixed Silk Wave Backdrop across all pages */}
      <div 
        className="fixed inset-0 -z-50 pointer-events-none bg-[#040d21]"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(4, 13, 33, 0.30), rgba(4, 13, 33, 0.10) 45%, rgba(4, 13, 33, 0.40)), url('/anatomy/medx_silk_bg.jpg')`,
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Top Floating Glass Navigation Bar */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenVoice={() => setIsVoiceOpen(true)}
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
        role={role}
        onRoleChange={handleRoleChange}
      />

      {/* Main Layout Container */}
      <div className="flex-1 flex w-full relative">
        {/* Left Sidebar (Only shown on inner study pages or via mobile drawer) */}
        {!isHomepage && (
          <Sidebar
            currentView={currentView}
            onNavigate={handleNavigate}
            mobileOpen={mobileMenuOpen}
            onCloseMobile={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Mobile drawer when on homepage */}
        {isHomepage && mobileMenuOpen && (
          <Sidebar
            currentView={currentView}
            onNavigate={handleNavigate}
            mobileOpen={mobileMenuOpen}
            onCloseMobile={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Dynamic Main View Area - Full width on homepage, offset on study hubs */}
        <main className={`flex-1 w-full min-w-0 min-h-[calc(100vh-5rem)] overflow-x-hidden ${isHomepage ? 'px-2 sm:px-4' : 'p-3 sm:p-6 lg:p-8 lg:pl-64'}`}>
          <ErrorBoundary key={currentView}>
            {/* 1. Dashboard / Command Center */}
            {isHomepage && (
              <DashboardView 
                onNavigate={handleNavigate} 
                onOpenLesson={handleOpenLesson} 
              />
            )}

            {/* Study Materials (Medical Textbook Reference) */}
            {currentView === 'study-materials' && (
              <Suspense fallback={<p role="status" className="p-6 text-slate-300">Loading Study Materials…</p>}>
                <StudyMaterialsHub onNavigate={handleNavigate} />
              </Suspense>
            )}

            {/* 2. Learn (Curriculum & 5-Stage Lesson System) */}
            {currentView === 'learn' && (
              <LearnSubjectLibrary
                onSelectTopic={() => {}}
                onNavigateView={handleNavigate}
                selectedLessonId={selectedLessonId}
              />
            )}

            {currentView === 'across-books' && (
              <Suspense fallback={<p role="status" className="p-6 text-slate-300">Opening your study workspace…</p>}>
                <AcrossBooksWorkspace onNavigate={handleNavigate} />
              </Suspense>
            )}

            {(currentView === 'textbook-library' || currentView === 'textbook') && (
              <Suspense fallback={<p role="status" className="p-6 text-slate-300">Opening MBBS Textbook Library…</p>}>
                <TextbookLibraryHub onNavigateAcrossBooks={(topicId) => {
                  if (topicId) {
                    window.location.hash = `across-books/${topicId}`;
                  } else {
                    handleNavigate('across-books');
                  }
                }} />
              </Suspense>
            )}

            {(currentView === 'drug-reference' || currentView === 'drugs') && (
              <Suspense fallback={<p role="status" className="p-6 text-slate-300">Opening Bangladesh Drug Reference…</p>}>
                <DrugReferenceHub onOpenAcrossBooksTopic={(topicId) => {
                  if (topicId) {
                    window.location.hash = `across-books/${topicId}`;
                  } else {
                    handleNavigate('across-books');
                  }
                }} />
              </Suspense>
            )}

            {/* 3. Visual Lab (Simulation Hub) */}
            {(currentView === 'visual-lab' || 
              currentView === 'visual-engine' ||
              currentView === '3d-anatomy' ||
              currentView === 'physiology' ||
              currentView === 'pathology' ||
              currentView === 'histology' ||
              currentView === 'comparison' ||
              currentView === 'diagrams' ||
              currentView === 'surgery' ||
              currentView === 'pharmacology' ||
              currentView === 'investigations' ||
              currentView === 'treatment'
            ) && (
              <Suspense fallback={<p role="status" className="p-8 text-center text-slate-300 font-mono text-xs">Loading 3D Visual Lab…</p>}>
                <VisualLabHub
                  initialSubTab={
                    currentView === 'physiology' ? 'cardiac-cycle' :
                    currentView === 'pathology' ? 'pathology-slider' :
                    currentView === 'histology' ? 'histology' :
                    currentView === 'comparison' ? 'normal-vs-abnormal' :
                    currentView === 'diagrams' ? 'diagrams' :
                    currentView === 'surgery' ? 'surgery' :
                    currentView === 'pharmacology' ? 'pharmacology' :
                    currentView === 'investigations' ? 'radiology-dicom' :
                    '3d-anatomy'
                  }
                  onNavigateToCase={() => handleNavigate('cases')}
                  onStartViva={() => handleNavigate('ai-viva')}
                />
              </Suspense>
            )}

            {/* 4. Clinical Cases */}
            {currentView === 'cases' && (
              <Suspense fallback={<p role="status" className="p-8 text-center text-slate-300 font-mono text-xs">Loading Clinical Case Engine…</p>}>
                <ClinicalCaseEngine />
              </Suspense>
            )}

            {/* 5. Practice & Exams */}
            {(currentView === 'practice' ||
              currentView === 'questions' ||
              currentView === 'ospe' ||
              currentView === 'osce' ||
              currentView === 'ai-viva' ||
              currentView === 'clinical-exam'
            ) && (
              <Suspense fallback={<p role="status" className="p-8 text-center text-slate-300 font-mono text-xs">Loading Practice & Exam Hub…</p>}>
                <PracticeExamsHub
                  initialSubTab={
                    currentView === 'ospe' ? 'ospe' :
                    currentView === 'osce' ? 'osce' :
                    currentView === 'ai-viva' ? 'ai-viva' :
                    'questions'
                  }
                />
              </Suspense>
            )}

            {/* 6. Revision Hub (Spaced Flashcards & Mistakes) */}
            {currentView === 'revision' && (
              <Suspense fallback={<p role="status" className="p-8 text-center text-slate-300 font-mono text-xs">Loading Revision Deck…</p>}>
                <RevisionHub
                  onNavigateToLesson={handleOpenLesson}
                  onNavigateView={handleNavigate}
                />
              </Suspense>
            )}

            {/* 7. Progress Radar */}
            {currentView === 'progress' && (
              <Suspense fallback={<p role="status" className="p-8 text-center text-slate-300 font-mono text-xs">Loading Student Progress Radar…</p>}>
                <PersonalizedProgress
                  onNavigateToView={handleNavigate}
                  onNavigateToTopic={() => handleNavigate('learn')}
                />
              </Suspense>
            )}

            {/* Intelligence & Faculty */}
            {currentView === 'ai-tutor' && (
              <Suspense fallback={<p role="status" className="p-8 text-center text-slate-300 font-mono text-xs">Loading AI Tutor…</p>}>
                <AiTutorChat />
              </Suspense>
            )}

            {currentView === 'faculty-admin' && (
              <Suspense fallback={<p role="status" className="p-8 text-center text-slate-300 font-mono text-xs">Loading Faculty Portal…</p>}>
                <FacultyAdminPortal />
              </Suspense>
            )}

            {currentView === 'video-studio' && (
              <Suspense fallback={<p role="status" className="p-8 text-center text-slate-300 font-mono text-xs">Loading Video Studio…</p>}>
                <VideoStudioHub />
              </Suspense>
            )}
          </ErrorBoundary>
        </main>
      </div>

      {/* Global Modals */}
      <GlobalSearch
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={(view, params) => {
          setIsSearchOpen(false);
          handleNavigate(view as NavigationView);
        }}
      />

      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        onSelectView={handleNavigate}
      />

      <VoiceAssistantModal
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Mobile Floating Glass Bottom Navigation */}
      <MobileBottomNav
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
      />
    </div>
  );
};
export default App;
