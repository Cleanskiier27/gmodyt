import { useState, useEffect } from 'react'
import SystemStatus from './components/SystemStatus'
import ProcessingUnit from './components/ProcessingUnit'
import MaterialQueue from './components/MaterialQueue'
import { Recycle, Zap, TrendingUp } from 'lucide-react'

function App() {
    const [systemTime, setSystemTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setSystemTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-screen h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3), transparent 50%), radial-gradient(circle at 80% 80%, rgba(74, 222, 128, 0.3), transparent 50%)',
                    animation: 'pulse 4s ease-in-out infinite'
                }}></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 p-6 flex flex-col h-full">
                
                {/* Header */}
                <header className="flex justify-between items-center mb-6">
                    <div className="glass-panel px-6 py-3 flex items-center gap-3">
                        <Recycle className="text-green-400" size={28} />
                        <div>
                            <h1 className="text-2xl font-bold tracking-widest text-white glow-text">NETWORKBUSTER</h1>
                            <p className="text-xs text-gray-400">Lunar Recycling System Control</p>
                        </div>
                    </div>
                    <div className="glass-panel px-6 py-3 text-center">
                        <div className="text-sm text-cyan-400 font-mono">SYSTEM TIME</div>
                        <div className="text-lg font-bold text-white">{systemTime.toLocaleTimeString()}</div>
                    </div>
                </header>

                {/* Main Grid */}
                <main className="flex-1 grid grid-cols-12 gap-6 overflow-hidden">
                    
                    {/* Left Column: System Status */}
                    <div className="col-span-4 flex flex-col gap-4">
                        <SystemStatus />
                    </div>

                    {/* Center Column: Processing Unit */}
                    <div className="col-span-5 flex flex-col gap-4">
                        <ProcessingUnit />
                    </div>

                    {/* Right Column: Material Queue */}
                    <div className="col-span-3 flex flex-col gap-4">
                        <MaterialQueue />
                    </div>

                </main>

                {/* Footer Stats */}
                <footer className="mt-6 grid grid-cols-3 gap-4">
                    <div className="glass-panel p-4 flex items-center gap-3">
                        <Zap className="text-yellow-400" size={24} />
                        <div>
                            <div className="text-xs text-gray-400">POWER USAGE</div>
                            <div className="text-xl font-bold text-white">342W</div>
                        </div>
                    </div>
                    <div className="glass-panel p-4 flex items-center gap-3">
                        <TrendingUp className="text-green-400" size={24} />
                        <div>
                            <div className="text-xs text-gray-400">EFFICIENCY</div>
                            <div className="text-xl font-bold text-white">94.2%</div>
                        </div>
                    </div>
                    <div className="glass-panel p-4 flex items-center gap-3">
                        <Recycle className="text-cyan-400" size={24} />
                        <div>
                            <div className="text-xs text-gray-400">TODAY PROCESSED</div>
                            <div className="text-xl font-bold text-white">8.4 kg</div>
                        </div>
                    </div>
                </footer>
            </div>

            {/* Scanline Effect */}
            <div className="scanline"></div>
        </div>
    )
}

export default App
