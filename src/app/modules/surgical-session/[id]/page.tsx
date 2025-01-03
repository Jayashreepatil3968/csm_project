"use client";
import { useState, useEffect } from "react";
import TopBar from "@/app/ui/surgical-session/topbar/topbar";
import CenterPanel from "@/app/ui/surgical-session/centerpanel/centerpanel";
import ResourceContentPanel from "@/app/ui/surgical-session/sidepanel/resourcecontentpanel";
import ResourceListPanel from "@/app/ui/surgical-session/sidepanel/resourcelistpanel";
import BottomBar from "@/app/ui/surgical-session/bottombar/bottombar";
import { ImageMetadata } from "@/app/types/imageTypes";
import { VideoMetadata } from "@/app/types/videoTypes";
import { ResourceType } from "@/app/types/resourceTypes";
import { SessionData } from "@/app/types/sessionData";
import { useNotification } from "@/app/context/NotificationContext";
import { useConfirmation } from "@/app/context/ConfirmationContext";

import {
  ArrowLeftStartOnRectangleIcon,
  CameraIcon,
  VideoCameraIcon,
  ChatBubbleBottomCenterTextIcon,
  DocumentDuplicateIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

export default function SurgerySessionManager() {
  // Mock data; replace with API integration
  const [viewMode, setViewMode] = useState("Capture"); // Capture, Guidance, or Broadcast
  const [selectedResourceTab, setSelectedResourceTab] = useState("Images"); // Resource Tabs
  const [showContentPanel, setShowContentPanel] = useState<boolean>(true);
  const [capturedImages, setCapturedImages] = useState<ImageMetadata[]>([]);
  const [capturedVideos, setCapturedVideos] = useState<VideoMetadata[]>([]);
  const [resources, setResouces] = useState<ResourceType[]>([]);
  const [selectedImage, setSelectedImage] = useState<ImageMetadata | null>(
    null
  );
  const [selectedVideo, setSelectedVideo] = useState<VideoMetadata | null>(
    null
  );
  const { showNotification } = useNotification();
  const { requestConfirmation } = useConfirmation();

  const toggleContentPanel = () => {
    setShowContentPanel((prev) => !prev);
  };

  const sessionData: SessionData = {
    id: "surgery123",
    deviceID: "device123",
    surgeon: "Dr. John Doe",
    startDateTime: new Date(),
    participants: ["Dr. Alice Brown", "Dr. Mark Smith"],
  };

  const modes: string[] = ["Capture", "Guidance", "Broadcast"];

  const handleImageSelection = (image: ImageMetadata) => {
    console.log("Selected image: " + image.filename);
    setSelectedImage(image);
  };

  const handleVideoSelection = (video: VideoMetadata) => {
    console.log("Selected video: " + video.filename);
    setSelectedVideo(video);
  };

  const updateResource = (name: string, count: number) => {
    setResouces((prevResources) =>
      prevResources.map((resource) =>
        resource.name === name ? { ...resource, count } : resource
      )
    );
  };

  function initResources(): void {
    setResouces([
      { name: "Images", count: 0, icon: CameraIcon },
      { name: "Videos", count: 0, icon: VideoCameraIcon },
      { name: "Notes", count: 0, icon: ChatBubbleBottomCenterTextIcon },
      { name: "DICOM", count: 0, icon: DocumentDuplicateIcon },
      { name: "Patient", count: 0, icon: UserCircleIcon },
      { name: "Source", count: 0, icon: ArrowLeftStartOnRectangleIcon },
    ]);
  }

  // Fetch captured images from the server on initial load
  useEffect(() => {
    console.log("Initializing resources...");
    initResources();
    console.log("Fetching captured images...");
    refreshCapturedImages();
    console.log("Fetching captured videos...");
    refreshCapturedVideos();
  }, []);

  // Fetch captured images from the server on initial load
  useEffect(() => { }, []);

  // Function to refresh captured images by fetching from the server
  const refreshCapturedImages = async () => {
    const response = await fetch(
      `/api/surgical-session/${sessionData.id}/images`
    );
    if (response.ok) {
      const data = await response.json();
      setCapturedImages(data.metadata || []);
      console.log("Captured images count : " + data.metadata.length);
      updateResource("Images", data.metadata.length);
    } else {
      console.error("Failed to fetch captured images");
    }
  };

  const refreshCapturedVideos = async () => {
    console.log(
      "Refreshing captured videos with session id : " + sessionData.id
    );
    const response = await fetch(
      `/api/surgical-session/${sessionData.id}/videos`
    );
    if (response.ok) {
      const data = await response.json();
      setCapturedVideos(data.metadata || []);
      console.log("Captured videos count : " + data.metadata.length);
      updateResource("Videos", data.metadata.length);
    } else {
      console.error("Failed to fetch captured videos");
    }
  };

  const handleDeleteImage = async (filename: string) => {
    requestConfirmation({
      message: "Delete selected image?",
      onConfirm: async () => {
        try {
          const response = await fetch(
            `/api/surgical-session/${sessionData.id}/images/${filename}`,
            { method: "DELETE" }
          );

          if (response.ok) {
            showNotification("Image deleted successfully", "success");
            refreshCapturedImages(); // Refresh the list after deletion
          } else {
            showNotification("Failed to delete image", "error");
          }
        } catch (error) {
          console.error("Error while deleting image", error);
          showNotification("Error while deleting image", "error");
        }
      },
    });
  };

  const handleDeleteVideo = async (filename: string) => {
    requestConfirmation({
      message: "Delete selected video?",
      onConfirm: async () => {
        try {
          const response = await fetch(
            `/api/surgical-session/${sessionData.id}/videos/${filename}`,
            { method: "DELETE" }
          );

          if (response.ok) {
            showNotification("Video deleted successfully", "success");
            refreshCapturedVideos(); // Refresh the list after deletion
          } else {
            showNotification("Failed to delete video", "error");
          }
        } catch (error) {
          console.error("Error while deleting video", error);
          showNotification("Error while deleting video", "error");
        }
      },
    });
  };

  const handleViewClose = () => {
    setSelectedImage(null);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Top Bar */}
      <TopBar
        modes={["Capture", "Guidance", "Broadcast"]}
        viewMode={viewMode}
        setViewMode={setViewMode}
        sessionData={sessionData}
      />
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        <ResourceListPanel
          selectedResourceTab={selectedResourceTab}
          setSelectedResourceTab={setSelectedResourceTab}
          resources={resources}
          toggleContentPanel={toggleContentPanel}
        />
        {showContentPanel && (
          <ResourceContentPanel
            selectedTab={selectedResourceTab}
            selectedImage={selectedImage}
            capturedImages={capturedImages}
            onDelete={handleDeleteImage}
            onSelectImage={handleImageSelection}
            capturedVideos={capturedVideos}
            onSelectVideo={handleVideoSelection}
            onDeleteVideo={handleDeleteVideo}
            selectedVideo={selectedVideo}
          />
        )}
        <CenterPanel
          viewMode={viewMode}
          imageToAnnotate={selectedImage}
          sessionData={sessionData}
          onAnnotationSave={refreshCapturedImages}
          onAnnotationClose={handleViewClose}
        />
      </div>
      {/* Bottom Bar */}
      <BottomBar
        modes={modes}
        viewMode={viewMode}
        setViewMode={setViewMode}
        sessionData={sessionData}
        selectedImage={selectedImage}
        //selectedVideo={selectedVideo}
        onCapture={refreshCapturedImages}
        onRecord={refreshCapturedVideos}
      />
    </div>
  );
}
