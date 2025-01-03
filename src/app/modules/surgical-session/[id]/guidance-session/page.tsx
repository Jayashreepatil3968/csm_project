"use client"

import { FC, useRef, useState } from 'react';
import { TopBar } from '@/app/ui/surgical-session/guidance-session/topbar/TopBar';
import { ResourceList, Resource } from '@/app/ui/surgical-session/guidance-session/sidebar/ResourceList';
import { CameraFeed } from '@/app/ui/surgical-session/guidance-session/sidebar/CameraFeed'
import { CentralPanel } from '@/app/ui/surgical-session/guidance-session/central-panel/CentralPanel';
import BottomBar from '@/app/ui/surgical-session/guidance-session/bottombar/BottomBar';
import { LayoutType, PanelContent } from '@/app/types/guidance-session';
import {
    VideoCameraIcon,
    UserIcon,
    FilmIcon,
    PhotoIcon,
    DocumentDuplicateIcon,
    ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';
import ResourceContentPanel from '@/app/ui/surgical-session/guidance-session/sidebar/ResourceContentPanel';




const resources: Resource[] = [
    { id: 'cameras', icon: VideoCameraIcon, label: 'Cameras', badge: '4' },
    { id: 'users', icon: UserIcon, label: 'Users' },
    { id: 'recordings', icon: FilmIcon, label: 'Recordings' },
    { id: 'photos', icon: PhotoIcon, label: 'Photos' },
    { id: 'documents', icon: DocumentDuplicateIcon, label: 'Documents' },
    { id: 'chat', icon: ChatBubbleLeftRightIcon, label: 'Chat' },
];

const GuidanceSession: FC = () => {
    const [layout, setLayout] = useState<LayoutType>('single');
    const [activeResource, setActiveResource] = useState('cameras');
    const [activePanelId, setActivePanelId] = useState<string>('main');
    const [panels, setPanels] = useState<PanelContent[]>([
        {
            panelId: 'main',
            type: 'camera',
            id: 'endo-cam',
            content: {
                type: 'cameras',
                id: 'endo-cam',
                cameraType: 'endo',
                isLive: true,
                onSelect: () => { }
            },
        },
    ]);

    const videoContentRef = useRef<HTMLVideoElement>(null);

    const handleLayoutChange = (newLayout: LayoutType) => {
        setLayout(newLayout);
        // Update panels based on new layout
    };

    return (
        <div className="flex flex-col h-screen">
            <TopBar activeLayout={layout} onLayoutChange={handleLayoutChange} />

            <div className="flex flex-1 pt-12">
                <div className="flex fixed left-0 top-12 bottom-14 transition-all duration-300">
                    <ResourceList
                        resources={resources}
                        activeResource={activeResource}
                        onResourceSelect={setActiveResource}
                    />
                    <div className="bg-[#F4F8F7] w-[220px] py-4 px-7 space-y-9 overflow-y-auto">
                        <ResourceContentPanel activeResource={activeResource} videoContentRef={videoContentRef} />
                    </div>
                </div>

                <div className={`flex-1 bg-white h-[calc(100vh-48px-56px)] transition-all duration-300 
          ${activeResource === 'cameras' ? 'ml-[300px]' : 'ml-20'}`}
                >
                    <CentralPanel
                        layout={layout}
                        panels={panels}
                        activePanelId={activePanelId}
                        onPanelSelect={setActivePanelId}
                        videoContentRef={videoContentRef}
                    />
                </div>
            </div>

            <BottomBar onCameraClick={() => { }} onMicrophoneToggle={() => { }} onVideoToggle={() => { }} onScreenShare={() => { }} onAnnotate={() => { }} onStopSession={() => { }} isRecording={false} recordingTime={'00:00'} />
        </div>
    );
}
export default GuidanceSession;
