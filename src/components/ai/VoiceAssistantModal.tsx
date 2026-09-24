import React, { useState, useEffect } from 'react';
import { Mic, MicOff, X, Sparkles, Activity, ArrowRight } from 'lucide-react';
import { SpeechService } from '../../services/speechService';
import { audioService } from '../../services/audioService';

interface VoiceAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: any) => void;
}

export const VoiceAssistantModal: React.FC<VoiceAssistantModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [recognizedCommand, setRecognizedCommand] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setIsListening(false);
      setTranscript('');
      setRecognizedCommand(null);
      return;
    }

    // Auto-start listening on open
    const stop = startVoiceListener();
    return () => {
      if (stop) {
        stop();
      }
    };
  }, [isOpen]);

  const startVoiceListener = () => {
    setIsListening(true);
    setTranscript('Listening for medical command...');
    setRecognizedCommand(null);

    const stop = SpeechService.startListening(
      (text) => {
        setTranscript(text);
        processCommand(text);
      },
      (err) => {
        setTranscript(`Speech recognition error: ${err}`);
        setIsListening(false);
      },
      () => {
        setIsListening(false);
      }
    );

    return stop;
  };

  const processCommand = (cmd: string) => {
    const lower = cmd.toLowerCase();

    if (lower.includes('heart') || lower.includes('anatomy') || lower.includes('3d')) {
      setRecognizedCommand('Opening 3D Anatomy Viewer...');
      audioService.playSuccessTone();
      setTimeout(() => {
        onNavigate('3d-anatomy');
        onClose();
      }, 1000);
    } else if (lower.includes('cardiac cycle') || lower.includes('physiology') || lower.includes('wiggers')) {
      setRecognizedCommand('Launching Living Physiology: Cardiac Cycle Lab...');
      audioService.playSuccessTone();
      setTimeout(() => {
        onNavigate('physiology');
        onClose();
      }, 1000);
    } else if (lower.includes('ecg') || lower.includes('xray') || lower.includes('investigation')) {
      setRecognizedCommand('Opening Investigation Lab...');
      audioService.playSuccessTone();
      setTimeout(() => {
        onNavigate('investigations');
        onClose();
      }, 1000);
    } else if (lower.includes('ospe') || lower.includes('practical')) {
      setRecognizedCommand('Launching OSPE Practical Exam Station...');
      audioService.playSuccessTone();
      setTimeout(() => {
        onNavigate('ospe');
        onClose();
      }, 1000);
    } else if (lower.includes('case') || lower.includes('patient') || lower.includes('stemi') || lower.includes('asthma')) {
      setRecognizedCommand('Opening Virtual Patient Clinical Case Engine...');
      audioService.playSuccessTone();
      setTimeout(() => {
        onNavigate('cases');
        onClose();
      }, 1000);
    } else if (lower.includes('viva') || lower.includes('oral')) {
      setRecognizedCommand('Starting AI Viva Voce Examiner...');
      audioService.playSuccessTone();
      setTimeout(() => {
        onNavigate('ai-viva');
        onClose();
      }, 1000);
    } else if (lower.includes('treatment') || lower.includes('protocol') || lower.includes('guideline')) {
      setRecognizedCommand('Opening Treatment Decision Engine...');
      audioService.playSuccessTone();
      setTimeout(() => {
        onNavigate('treatment');
        onClose();
      }, 1000);
    } else if (lower.includes('progress') || lower.includes('weak') || lower.includes('score')) {
      setRecognizedCommand('Opening Personalized Learning Analytics...');
      audioService.playSuccessTone();
      setTimeout(() => {
        onNavigate('progress');
        onClose();
      }, 1000);
    } else {
      setRecognizedCommand('Command not recognized. Try saying "Show heart", "Open ECG", or "Start viva".');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-lg glass-panel-elevated rounded-3xl p-6 border border-cyan-500/40 shadow-glow-cyan space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-cyan-950 flex items-center justify-center text-cyan-400 border border-cyan-500/30">
              <Sparkles className="w-4 h-4" />
            </div>
            <h2 className="text-base font-bold text-white">
              MEDX Voice Medical Assistant
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pulsing Mic Graphic */}
        <div className="flex flex-col items-center justify-center py-6 space-y-4">
          <button
            onClick={startVoiceListener}
            className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
              isListening
                ? 'bg-gradient-to-r from-rose-500 to-red-600 shadow-glow-rose animate-pulse'
                : 'bg-gradient-to-r from-blue-600 to-cyan-600 shadow-glow-cyan'
            }`}
          >
            {isListening ? <Mic className="w-8 h-8 text-white" /> : <MicOff className="w-8 h-8 text-white" />}
          </button>
          <span className="text-xs font-semibold text-slate-300">
            {isListening ? 'Listening for your command...' : 'Tap microphone to speak'}
          </span>
        </div>

        {/* Transcript Box */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center min-h-[4rem] flex flex-col items-center justify-center">
          <p className="text-sm text-slate-200 font-medium">
            "{transcript || 'Say a command...'}"
          </p>
          {recognizedCommand && (
            <p className="text-xs text-cyan-400 font-bold mt-2 animate-in fade-in">
              {recognizedCommand}
            </p>
          )}
        </div>

        {/* Example Commands */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Example Voice Commands:
          </span>
          <div className="flex flex-wrap gap-1.5 text-xs">
            {['Show heart in 3D', 'Start cardiac cycle', 'Open 12-lead ECG', 'Take asthma case', 'Start AI viva', 'Review weak areas'].map((cmd, i) => (
              <button
                key={i}
                onClick={() => processCommand(cmd)}
                className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-[11px]"
              >
                "{cmd}"
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
