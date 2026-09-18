import React from "react";
import { MedicalVideoLibrary } from "./MedicalVideoLibrary";
import { ErrorBoundary } from "../common/ErrorBoundary";

export const VideoStudioHub: React.FC = () => {
  return (
    <div className="w-full">
      <ErrorBoundary fallbackTitle="Medical Videos">
        <MedicalVideoLibrary />
      </ErrorBoundary>
    </div>
  );
};

export default VideoStudioHub;
