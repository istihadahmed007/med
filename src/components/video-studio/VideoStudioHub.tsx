import React from 'react';
import { MedicalVideoLibrary } from './MedicalVideoLibrary';
import { ErrorBoundary } from '../common/ErrorBoundary';

/**
 * Video Studio Hub:
 * Replaced the broken AI generation endpoint with the official Medical Animation & Surgery Video Library.
 * Features 33 accredited topics across Organ Function, Surgical Animations, and Pathology & Disease.
 */
export const VideoStudioHub: React.FC = () => {
  return (
    <div className="w-full">
      <ErrorBoundary fallbackTitle="Medical Animation & Surgery Video Library">
        <MedicalVideoLibrary />
      </ErrorBoundary>
    </div>
  );
};

export default VideoStudioHub;

