import { useState } from 'react';
import { Eye } from 'lucide-react';
import SpectatorMode from './SpectatorMode';

export default function SpectatorButton() {
    const [isSpectatorOpen, setIsSpectatorOpen] = useState(false);

    const toggleSpectator = () => {
        setIsSpectatorOpen(!isSpectatorOpen);
        if (!isSpectatorOpen) {
            console.info('🔍 Spectator Mode enabled - Ready to monitor');
        }
    };

    return (
        <>
            <button
                onClick={toggleSpectator}
                className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#00f0ff]/20 to-[#ff003c]/20 hover:from-[#00f0ff]/30 hover:to-[#ff003c]/30 border border-[#00f0ff]/40 rounded-lg transition-all duration-300 transform hover:scale-105"
                title="Open Spectator Mode (Debug Console, Scenarios, File Upload)"
            >
                <Eye size={18} className="text-[#00f0ff]" />
                <span className="text-xs font-bold text-white">SPECTATOR</span>
                {isSpectatorOpen && (
                    <span className="ml-1 w-2 h-2 bg-[#00f0ff] rounded-full animate-pulse" />
                )}
            </button>

            <SpectatorMode isOpen={isSpectatorOpen} onClose={() => setIsSpectatorOpen(false)} />
        </>
    );
}
