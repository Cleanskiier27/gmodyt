import { useState, useEffect } from 'react'
import AvatarWorld from './components/AvatarWorld'
import SatelliteMap from './components/SatelliteMap'
import CameraFeed from './components/CameraFeed'
import ConnectionGraph from './components/ConnectionGraph'
import SpectatorButton from './components/SpectatorButton'
import { Monitor, Cpu, Map as MapIcon, Video, Smartphone, Globe } from 'lucide-react'

function App() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Detect mobile device
        const checkMobile = () => {
            const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
            setIsMobile(mobileRegex.test(navigator.userAgent) || window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <div className="relative w-screen h-screen overflow-hidden">
            {/* 3D Background with Global Avatar Network */}
            <AvatarWorld />

            {/* Spectator Mode Button */}
            <SpectatorButton />

            {/* Mobile-Optimized UI */}
            {isMobile ? (
                <MobileInterface activeTab={activeTab} setActiveTab={setActiveTab} />
            ) : (
                <DesktopInterface activeTab={activeTab} setActiveTab={setActiveTab} />
            )}
        </div>
    );
}

function MobileInterface({ activeTab, setActiveTab }) {
    return (
        <div className="absolute inset-0 z-10 flex flex-col pointer-events-none">
            {/* Mobile Header */}
            <header className="flex justify-between items-center px-4 py-3 pointer-events-auto glass-panel m-2">
                <div className="flex items-center gap-2">
                    <Smartphone className="text-[#00f0ff]" size={18} />
                    <h1 className="text-sm font-bold text-white glow-text">AVATAR WORLD</h1>
                </div>
                <div className="text-xs text-[#00f0ff]">
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
            </header>

            {/* Mobile Tab Navigation */}
            <nav className="flex gap-2 px-2 py-2 overflow-x-auto pointer-events-auto">
                {[
                    { id: 'dashboard', label: 'Dashboard', icon: Monitor },
                    { id: 'network', label: 'Network', icon: Globe },
                    { id: 'feeds', label: 'Feeds', icon: Video },
                ].map(tab => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-1 px-3 py-2 rounded text-xs font-bold whitespace-nowrap transition-all ${
                                activeTab === tab.id
                                    ? 'glass-panel text-[#00f0ff] border-b-2 border-[#00f0ff]'
                                    : 'glass-panel text-gray-400 hover:text-[#00f0ff]'
                            }`}
                        >
                            <Icon size={14} />
                            {tab.label}
                        </button>
                    );
                })}
            </nav>

            {/* Mobile Content Area */}
            <main className="flex-1 overflow-y-auto px-2 py-2 pointer-events-auto space-y-3">
                {activeTab === 'dashboard' && (
                    <div className="space-y-3">
                        <div className="glass-panel p-3">
                            <div className="text-xs text-[#ff003c] font-bold mb-2">SYSTEM STATUS</div>
                            <div className="space-y-1 text-xs text-gray-300">
                                <div className="flex justify-between">
                                    <span>Network:</span>
                                    <span className="text-[#00f0ff]">● Connected</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Global Users:</span>
                                    <span className="text-[#00f0ff]">2.4M+</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Uptime:</span>
                                    <span className="text-[#00f0ff]">99.8%</span>
                                </div>
                            </div>
                        </div>
                        <div className="glass-panel p-3">
                            <div className="text-xs text-[#ff003c] font-bold mb-2">YOUR LOCATION</div>
                            <div className="text-xs text-[#00f0ff]">
                                🌍 Connected from your region • Mobile-Optimized Experience
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'network' && (
                    <div className="space-y-3">
                        <div className="glass-panel p-3">
                            <div className="text-xs text-[#ff003c] font-bold mb-2">GLOBAL REGIONS</div>
                            <div className="space-y-2 text-xs text-gray-300">
                                {['🇺🇸 North America', '🇪🇺 Europe', '🇨🇳 Asia', '🇧🇷 South America', '🇿🇦 Africa', '🇦🇺 Oceania'].map(region => (
                                    <div key={region} className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-[#00f0ff] rounded-full animate-pulse"></div>
                                        <span>{region}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="glass-panel p-3">
                            <div className="text-xs text-[#ff003c] font-bold mb-2">ACTIVE PORTALS</div>
                            <div className="text-xs text-[#00f0ff]">
                                6 Mobile Avatar Portals Active • Real-time Sync Enabled
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'feeds' && (
                    <div className="space-y-3">
                        <CameraFeed id="01" fps={30} quality="Mobile HD" />
                        <CameraFeed id="02" fps={30} quality="Mobile SD" />
                    </div>
                )}
            </main>

            {/* Mobile Footer */}
            <footer className="px-2 py-2 pointer-events-auto glass-panel m-2 text-center text-xs text-gray-500">
                Avatar World v1.0 • Mobile Experience • Swipe to interact
            </footer>
        </div>
    );
}

function DesktopInterface({ activeTab, setActiveTab }) {
    return (
        <div className="absolute inset-0 z-10 p-6 flex flex-col pointer-events-none">

            {/* Header */}
            <header className="flex justify-between items-center mb-6 pointer-events-auto">
                <div className="glass-panel px-4 py-2 flex items-center gap-2">
                    <Monitor className="text-[#00f0ff]" size={20} />
                    <h1 className="text-xl font-bold tracking-widest text-white glow-text">AVATAR WORLD // V.1.0</h1>
                </div>
                <div className="glass-panel px-4 py-2 flex items-center gap-3">
                    <div className="flex items-center gap-2 text-xs text-[#00f0ff]">
                        <Globe size={14} />
                        <span>Global Mobile Network Active</span>
                    </div>
                    <div className="text-xs text-[#00f0ff]">
                        {new Date().toLocaleTimeString()}
                    </div>
                </div>
            </header>

            {/* Main Content Grid */}
            <main className="flex-1 grid grid-cols-12 gap-6 pointer-events-auto">

                {/* Left Column: Camera Feeds */}
                <div className="col-span-3 flex flex-col gap-4">
                    <div className="glass-panel p-2 flex-1 flex flex-col gap-4">
                        <div className="flex items-center gap-2 border-b border-white/10 pb-2 mb-2">
                            <Video size={16} className="text-[#ff003c]" />
                            <h2 className="text-sm font-bold text-[#ff003c]">LIVE FEEDS</h2>
                        </div>

                        <div className="grid grid-rows-2 gap-4 flex-1">
                            <CameraFeed id="01" fps={30} quality="SD" />
                            <CameraFeed id="02" fps={60} quality="HD" />
                        </div>
                        <div className="grid grid-rows-2 gap-4 flex-1">
                            <CameraFeed id="03" fps={30} quality="IR" />
                            <CameraFeed id="04" fps={60} quality="HD-AUX" />
                        </div>
                    </div>
                </div>

                {/* Center Column: Primary Analytics */}
                <div className="col-span-6 flex flex-col gap-4">
                    <div className="glass-panel p-4 flex-1">
                        <div className="flex items-center gap-2 border-b border-white/10 pb-2 mb-4">
                            <Cpu size={16} className="text-[#ff003c]" />
                            <h2 className="text-sm font-bold text-[#ff003c]">GLOBAL AVATAR NETWORK</h2>
                        </div>
                        <div className="space-y-3 text-xs text-gray-300">
                            <div className="flex justify-between items-center">
                                <span>🌍 Active Regions:</span>
                                <span className="text-[#00f0ff]">6 Global Portals</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>📱 Mobile Users Connected:</span>
                                <span className="text-[#00f0ff]">2.4M+</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>🔗 Network Latency:</span>
                                <span className="text-[#00f0ff]">~45ms Average</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>⚡ Data Throughput:</span>
                                <span className="text-[#00f0ff]">3.2 Gbps</span>
                            </div>
                        </div>
                    </div>

                    <div className="glass-panel p-4 flex-1">
                        <div className="flex items-center gap-2 border-b border-white/10 pb-2 mb-4">
                            <Smartphone size={16} className="text-[#ff003c]" />
                            <h2 className="text-sm font-bold text-[#ff003c]">MOBILE PORTAL STATUS</h2>
                        </div>
                        <div className="space-y-2 text-xs">
                            {[
                                { region: '🇺🇸 North America', status: 'Active', users: '648K' },
                                { region: '🇪🇺 Europe', status: 'Active', users: '524K' },
                                { region: '🇨🇳 Asia', status: 'Active', users: '892K' },
                                { region: '🇧🇷 South America', status: 'Active', users: '156K' },
                                { region: '🇿🇦 Africa', status: 'Active', users: '98K' },
                                { region: '🇦🇺 Oceania', status: 'Active', users: '86K' },
                            ].map((portal, idx) => (
                                <div key={idx} className="flex justify-between items-center">
                                    <span className="text-gray-400">{portal.region}</span>
                                    <span className="text-[#00f0ff]">● {portal.status}</span>
                                    <span className="text-[#ff003c]">{portal.users}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Graphs and Info */}
                <div className="col-span-3 flex flex-col gap-4">
                    <div className="glass-panel p-4 flex-1">
                        <div className="flex items-center gap-2 border-b border-white/10 pb-2 mb-4">
                            <MapIcon size={16} className="text-[#ff003c]" />
                            <h2 className="text-sm font-bold text-[#ff003c]">NETWORK MAP</h2>
                        </div>
                        <SatelliteMap />
                    </div>

                    <div className="glass-panel p-4 flex-1">
                        <h2 className="text-sm font-bold text-[#ff003c] mb-4">CONNECTION GRAPH</h2>
                        <ConnectionGraph />
                    </div>
                </div>

            </main>

            {/* Footer */}
            <footer className="mt-4 glass-panel px-4 py-2 flex justify-between items-center text-xs text-gray-500 pointer-events-auto">
                <span>Avatar World | Global Mobile Experience for Challenge Participants Worldwide</span>
                <span>Bonus Feature: Real-time 3D Network Visualization</span>
            </footer>
        </div>
    );
}

export default App
