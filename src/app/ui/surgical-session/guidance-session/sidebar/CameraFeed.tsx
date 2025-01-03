import { FC, useRef, useEffect } from 'react';

interface CameraFeedProps {
    id: string;
    cameraType: string;
    isLive?: boolean;
    onSelect: (id: string) => void;
    videoContentRef: any;
}

export const CameraFeed: FC<CameraFeedProps> = ({
    id,
    cameraType,
    isLive,
    onSelect,
    videoContentRef
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    console.log(videoContentRef);


    useEffect(() => {
        let stream: MediaStream | null = null;

        const startStream = async () => {
            try {
                stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: false,
                });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoContentRef.current.srcObject = stream;
                }
            } catch (err) {
                console.error(`Error accessing camera ${id}:`, err);
            }
        };

        startStream();

        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [id]);

    return (
        <div>
            <div
                className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm h-24 cursor-pointer"
                onClick={() => onSelect(id)}
            >
                <div className="aspect-video relative">
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-24 object-cover"
                    />
                </div>
            </div>
            <div className="text-xs font-normal p-0.5 h-2 text-center">
                {cameraType}
            </div>
        </div>
    );
};