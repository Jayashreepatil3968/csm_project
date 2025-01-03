import { FC } from 'react';
import { UserIcon } from '@heroicons/react/24/solid';
import { LayoutButton } from './LayoutButton';
import { LayoutType } from '@/app/types/guidance-session';

interface TopBarProps {
    activeLayout: LayoutType;
    onLayoutChange: (layout: LayoutType) => void;
}

export const TopBar: FC<TopBarProps> = ({ activeLayout, onLayoutChange }) => (
    <div className="h-12 bg-[#D9D9D9] flex justify-between items-center px-4 fixed top-0 left-0 right-0 z-50">
        <div className="flex-1" />
        <div className="flex items-center space-x-2">
            <LayoutButton layout="single" activeLayout={activeLayout} onClick={onLayoutChange} />
            <LayoutButton layout="split" activeLayout={activeLayout} onClick={onLayoutChange} />
            <LayoutButton layout="quad" activeLayout={activeLayout} onClick={onLayoutChange} />
        </div>
        <button className="ml-8 p-0.5 hover:bg-[#E7ECEB] rounded-full border border-gray-500">
            <UserIcon className="w-6 h-6 text-gray-600" />
        </button>
    </div>
);