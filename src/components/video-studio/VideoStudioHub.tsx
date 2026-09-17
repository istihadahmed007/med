import React from 'react';
import { MedicalVideoLibrary } from './MedicalVideoLibrary';

/**
 * Video Studio Hub:
 * Replaced the broken AI generation endpoint with the official Medical Animation & Surgery Video Library.
 * Features 33 accredited topics across Organ Function, Surgical Animations, and Pathology & Disease.
 */
export const VideoStudioHub: React.FC = () => {
  return (
    <div className="w-full">
      <MedicalVideoLibrary />
    </div>
  );
};

export default VideoStudioHub;
