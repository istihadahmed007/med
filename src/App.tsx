import React, { useState, useEffect } from 'react';
import { NavigationView, UserRole } from './types';
import { StorageService } from './services/storageService';
import { Navbar } from './components/navigation/Navbar';
import { Sidebar } from './components/navigation/Sidebar';
import { CommandPalette } from './components/navigation/CommandPalette';
import { VoiceAssistantModal } from './components/ai/VoiceAssistantModal';
import { ErrorBoundary } from './components/common/ErrorBoundary';

// Views
import { HeroCinematic } from './components/home/HeroCinematic';
import { LearnSubjectLibrary } from './components/learn/LearnSubjectLibrary';
import { TopicUniverseView } from './components/knowledge/TopicUniverseView';
import { VisualMedicineEngine } from './components/knowledge/VisualMedicineEngine';
import { AnatomyCanvas } from './components/anatomy/AnatomyCanvas';
import { CardiacCycleLab } from './components/physiology/CardiacCycleLab';
import { AtherosclerosisSlider } from './components/pathology/AtherosclerosisSlider';
import { HistologyLab } from './components/histology/HistologyLab';
import { NormalVsAbnormalSlider } from './components/comparison/NormalVsAbnormalSlider';
import { MedicalDiagramEngine } from './components/diagrams/MedicalDiagramEngine';
import { SurgeryProcedureViewer } from './components/surgery/SurgeryProcedureViewer';
import { DrugJourneyVisualizer } from './components/pharmacology/DrugJourneyVisualizer';
import { ClinicalExamSimulator } from './components/clinical-exam/ClinicalExamSimulator';
import { OspeEngine } from './components/practical/OspeEngine';
import { OsceEngine } from './components/practical/OsceEngine';
import { ClinicalCaseEngine } from './components/cases/ClinicalCaseEngine';
import { EcgViewer } from './components/investigation/EcgViewer';
import { XrayViewer } from './components/investigation/XrayViewer';
import { RadiologyWorkstation } from './components/radiology/RadiologyWorkstation';
import { TreatmentAlgorithmViewer } from './components/treatment/TreatmentAlgorithmViewer';
import { TextbookReader } from './components/textbook/TextbookReader';
import { QuestionBankView } from './components/questions/QuestionBankView';
import { AiVivaExaminer } from './components/ai/AiVivaExaminer';
import { AiTutorChat } from './components/ai/AiTutorChat';
import { PersonalizedProgress } from './components/progress/PersonalizedProgress';
import { FacultyAdminPortal } from './components/faculty/FacultyAdminPortal';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<NavigationView>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '');
      if (hash) return hash as NavigationView;
      const params = new URLSearchParams(window.location.search);
      const view = params.get('view');
      if (view) return view as NavigationView;
    }
    return '3d-anatomy';
  });
  const [role, setRole] = useState<UserRole>(StorageService.getRole());
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isVoiceOpen, setIsVoiceOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [investigationSubTab, setInvestigationSubTab] = useState<'workstation' | 'ecg' | 'xray'>('workstation');
  const [isTopicUniverseOpen, setIsTopicUniverseOpen] = useState<boolean>(false);

  // Global Ctrl + K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (view: NavigationView) => {
    setCurrentView(view);
    setIsTopicUniverseOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    StorageService.setRole(newRole);
  };

  return (
    <div className="min-h-screen bg-med-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-white">
      {/* Top Navigation Bar */}
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
        {/* Left Sidebar */}
        <Sidebar
          currentView={currentView}
          onNavigate={handleNavigate}
          mobileOpen={mobileMenuOpen}
          onCloseMobile={() => setMobileMenuOpen(false)}
        />

        {/* Dynamic Main View Area */}
        <main className="flex-1 lg:pl-64 w-full min-w-0 min-h-[calc(100vh-4rem)] overflow-x-hidden p-4 sm:p-6 lg:p-8">
          <ErrorBoundary key={currentView}>
          {currentView === 'home' && (
            <HeroCinematic onNavigate={handleNavigate} />
          )}

          {currentView === 'visual-engine' && (
            <VisualMedicineEngine onNavigate={handleNavigate} />
          )}

          {currentView === 'learn' && (
            isTopicUniverseOpen ? (
              <div className="space-y-4">
                <div className="max-w-6xl mx-auto px-4 pt-4">
                  <button
                    onClick={() => setIsTopicUniverseOpen(false)}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-white transition-colors"
                  >
                    ← Back to Subject Library
                  </button>
                </div>
                <TopicUniverseView onNavigateToView={handleNavigate} />
              </div>
            ) : (
              <LearnSubjectLibrary
                onSelectTopic={() => setIsTopicUniverseOpen(true)}
                onNavigateView={handleNavigate}
              />
            )
          )}

          {currentView === '3d-anatomy' && (
            <AnatomyCanvas
              onNavigateToCase={() => handleNavigate('cases')}
              onStartViva={() => handleNavigate('ai-viva')}
            />
          )}

          {currentView === 'histology' && (
            <HistologyLab />
          )}

          {currentView === 'physiology' && (
            <CardiacCycleLab />
          )}

          {currentView === 'pathology' && (
            <AtherosclerosisSlider />
          )}

          {currentView === 'comparison' && (
            <NormalVsAbnormalSlider />
          )}

          {currentView === 'diagrams' && (
            <MedicalDiagramEngine />
          )}

          {currentView === 'surgery' && (
            <SurgeryProcedureViewer />
          )}

          {currentView === 'pharmacology' && (
            <DrugJourneyVisualizer />
          )}

          {currentView === 'clinical-exam' && (
            <ClinicalExamSimulator />
          )}

          {currentView === 'ospe' && (
            <OspeEngine />
          )}

          {currentView === 'osce' && (
            <OsceEngine />
          )}

          {currentView === 'cases' && (
            <ClinicalCaseEngine />
          )}

          {currentView === 'investigations' && (
            <div className="space-y-6">
              {/* Investigation sub-tab switcher */}
              <div className="max-w-6xl mx-auto flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setInvestigationSubTab('workstation')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                    investigationSubTab === 'workstation'
                      ? 'bg-sky-600 text-white border-sky-400 shadow-glow-cyan'
                      : 'bg-slate-900/80 text-slate-300 border-slate-800'
                  }`}
                >
                  Radiology Workstation & Abnormality Challenge
                </button>
                <button
                  onClick={() => setInvestigationSubTab('ecg')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                    investigationSubTab === 'ecg'
                      ? 'bg-rose-600 text-white border-rose-400 shadow-glow-rose'
                      : 'bg-slate-900/80 text-slate-300 border-slate-800'
                  }`}
                >
                  12-Lead ECG Calibrated Viewer
                </button>
                <button
                  onClick={() => setInvestigationSubTab('xray')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                    investigationSubTab === 'xray'
                      ? 'bg-cyan-500 text-black border-cyan-400 font-bold shadow-glow-cyan'
                      : 'bg-slate-900/80 text-slate-300 border-slate-800'
                  }`}
                >
                  Digital Chest Radiograph (CXR)
                </button>
              </div>

              {investigationSubTab === 'workstation' && <RadiologyWorkstation />}
              {investigationSubTab === 'ecg' && <EcgViewer />}
              {investigationSubTab === 'xray' && <XrayViewer />}
            </div>
          )}

          {currentView === 'treatment' && (
            <TreatmentAlgorithmViewer />
          )}

          {currentView === 'textbook' && (
            <TextbookReader />
          )}

          {currentView === 'questions' && (
            <QuestionBankView />
          )}

          {currentView === 'ai-viva' && (
            <AiVivaExaminer />
          )}

          {currentView === 'ai-tutor' && (
            <AiTutorChat />
          )}

          {currentView === 'progress' && (
            <PersonalizedProgress
              onNavigateToView={handleNavigate}
              onNavigateToTopic={() => {
                setIsTopicUniverseOpen(true);
                handleNavigate('learn');
              }}
            />
          )}

          {currentView === 'faculty-admin' && (
            <FacultyAdminPortal />
          )}
          </ErrorBoundary>
        </main>
      </div>

      {/* Global Modals */}
      <CommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectView={handleNavigate}
      />

      <VoiceAssistantModal
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
        onNavigate={handleNavigate}
      />
    </div>
  );
};
