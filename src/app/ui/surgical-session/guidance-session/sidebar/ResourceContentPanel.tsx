import React from "react";
import CapturedImagesList from "@/app/ui/surgical-session/sidepanel/CapturedImagesList";
import CapturedVideosList from "@/app/ui/surgical-session/sidepanel/CapturedVideosList";
import { ImageMetadata } from "@/app/types/imageTypes";
import { VideoMetadata } from "@/app/types/videoTypes";
import { CameraFeed } from "./CameraFeed";

interface ResourceContentProps {
    activeResource: string;
    videoContentRef: any;
}

const ResourceContentPanel: React.FC<ResourceContentProps> = ({
    activeResource,
    videoContentRef
}) => {

    console.log("resourcePanel", videoContentRef);

    const renderContent = () => {
        switch (activeResource) {
            case "cameras":
                return (
                    <>
                        <CameraFeed
                            id="endo-camera"
                            cameraType="LIVE Endo Camera"
                            isLive
                            onSelect={() => { }}
                            videoContentRef={videoContentRef}
                        />
                        {/* <CameraFeed
                            id="ot-camera"
                            cameraType="OT Room Camera"
                            onSelect={() => { }}
                        />
                        <CameraFeed
                            id="monitoring"
                            cameraType="Patient Monitoring System"
                            onSelect={() => { }}
                        />
                        <CameraFeed
                            id="mobile"
                            cameraType="Mobile Camera"
                            onSelect={() => { }}
                        /> */}
                    </>

                );
            case "Videos":
                return (
                    <div>
                        This is the video content
                    </div>
                );
            case "DICOM":
                return <p>This is the DICOM content.</p>;
            case "Patient":
                return <p>This is the Patient content.</p>;
            case "Notes":
                return <p>This is the Notes content.</p>;
            default:
                return <p>Select a tab to see the content.</p>;
        }
    };

    return renderContent();
};

export default ResourceContentPanel;
