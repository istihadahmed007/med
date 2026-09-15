export class SpeechService {
  private static synth: SpeechSynthesis | null = typeof window !== 'undefined' ? window.speechSynthesis : null;
  private static recognition: any = null;

  public static speak(text: string, onEnd?: () => void) {
    if (!this.synth) return;
    this.synth.cancel(); // cancel any active utterance

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    const voices = this.synth.getVoices();
    // Prefer natural British/US medical sounding voice
    const medicalVoice = voices.find(
      (v) => v.name.includes('Natural') || v.name.includes('Google UK English Male') || v.lang === 'en-GB' || v.lang === 'en-US'
    );
    if (medicalVoice) {
      utterance.voice = medicalVoice;
    }

    if (onEnd) {
      utterance.onend = onEnd;
    }

    this.synth.speak(utterance);
  }

  public static stopSpeaking() {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  public static isRecognitionSupported(): boolean {
    if (typeof window === 'undefined') return false;
    return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
  }

  public static startListening(
    onResult: (transcript: string) => void,
    onError: (error: string) => void,
    onEnd: () => void
  ): () => void {
    if (!this.isRecognitionSupported()) {
      onError('Speech recognition not supported in this browser.');
      return () => {};
    }

    const SpeechRecognitionClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognitionClass();
    this.recognition = recognition;

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    };

    recognition.onerror = (event: any) => {
      onError(event.error || 'Speech recognition error');
    };

    recognition.onend = () => {
      onEnd();
    };

    try {
      recognition.start();
    } catch (e) {
      onError('Could not start microphone');
    }

    return () => {
      try {
        recognition.stop();
      } catch {}
    };
  }
}
