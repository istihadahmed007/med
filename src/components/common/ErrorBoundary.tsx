import React, { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
  key?: React.Key;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 text-center">
          <div className="glass-panel p-8 rounded-2xl max-w-lg border border-rose-500/30 shadow-glow-rose space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-rose-500/20 flex items-center justify-center text-rose-400">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-white">
              {this.props.fallbackTitle || 'Component Encountered an Issue'}
            </h2>
            <p className="text-sm text-slate-300">
              An unexpected error occurred while rendering this section:
            </p>
            <div className="p-3 bg-slate-900/90 rounded-lg text-xs font-mono text-rose-300 text-left overflow-x-auto border border-rose-900/50">
              {this.state.error?.message || 'Unknown render error'}
            </div>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-medium text-xs shadow-lg inline-flex items-center gap-2 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
