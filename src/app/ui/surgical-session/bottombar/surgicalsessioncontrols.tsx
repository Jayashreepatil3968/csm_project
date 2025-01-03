import React from "react";
import CaptureButton from "@/app/ui/surgical-session/bottombar/capturebutton";

const SurgicalSessionControls: React.FC<{ viewMode: string }> = ({
  viewMode,
}) => {
  function handleClick() {
    console.log("Capture button clicked");
  }
  return (
    <div className="space-x-4">
      <button className="bg-red-600 hover:bg-red-700 px-4 p-2 rounded">
        End Session
      </button>
      <button className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded">
        Pause Session
      </button>
    </div>
  );
};

export default SurgicalSessionControls;
