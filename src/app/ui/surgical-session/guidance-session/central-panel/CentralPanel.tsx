// src/components/panels/CentralPanel.tsx
import { FC } from 'react';
import { LayoutType, PanelContent } from '@/app/types/guidance-session';
import { PanelContainer } from './PanelContainer';

interface CentralPanelProps {
    layout: LayoutType;
    panels: PanelContent[];
    activePanelId?: string;
    onPanelSelect: (panelId: string) => void;
    videoContentRef: any;
}

export const CentralPanel: FC<CentralPanelProps> = ({
    layout,
    panels,
    activePanelId,
    onPanelSelect,
    videoContentRef
}) => {
    const getLayoutClass = () => {
        switch (layout) {
            case 'single':
                return 'grid-cols-1';
            case 'split':
                return 'grid-cols-2';
            case 'quad':
                return 'grid-cols-2 grid-rows-2';
        }
    };

    return (
        <div className={`grid gap-4 h-full ${getLayoutClass()}`}>
            {panels.map((panel) => (
                <PanelContainer
                    key={panel.panelId}
                    content={panel}
                    isActive={panel.panelId === activePanelId}
                    onSelect={() => onPanelSelect(panel.panelId)}
                >
                    {/* Render panel content based on type */}
                    {panel.content.type === 'camera' && (
                        <video
                            ref={videoContentRef}
                            autoPlay
                            playsInline
                            muted
                            className="w-full h-full object-cover"
                        />
                    )}
                    {panel.content.type === 'whiteboard' && (
                        <div className="w-full h-full bg-white" />
                    )}
                </PanelContainer>
            ))}
        </div>
    );
};