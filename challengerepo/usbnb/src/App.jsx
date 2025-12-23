import { useState } from 'react'
import DeviceList from './components/DeviceList'
import DataTransfer from './components/DataTransfer'
import StorageMonitor from './components/StorageMonitor'
import { Usb, HardDrive, Wifi } from 'lucide-react'

function App() {
    const [connectedDevices, setConnectedDevices] = useState(3);

    return (
        <div className="relative w-screen h-screen overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900">
            
            {/* Animated Background Orbs */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-96 h-96 bg-purple-500/30 rounded-full blur-3xl top-1/4 left-1/4 animate-pulse"></div>
                <div className="absolute w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl bottom-1/4 right-1/4 animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 p-6 flex flex-col h-full">
                
                {/* Header */}
                <header className="flex justify-between items-center mb-6">
                    <div className="glass-panel px-6 py-3 flex items-center gap-3">
                        <Usb className="text-purple-400" size={28} />
                        <div>
                            <h1 className="text-2xl font-bold tracking-widest text-white glow-text">USB NETWORKBUSTER</h1>
                            <p className="text-xs text-gray-400">Universal Device Manager</p>
                        </div>
                    </div>
                    <div className="glass-panel px-6 py-3 flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full pulse-ring"></div>
                            <span className="text-sm text-green-400">ONLINE</span>
                        </div>
                        <div className="text-sm text-gray-400">|</div>
                        <div className="text-sm text-white font-mono">{connectedDevices} DEVICES</div>
                    </div>
                </header>

                {/* Main Grid */}
                <main className="flex-1 grid grid-cols-12 gap-6 overflow-hidden">
                    
                    {/* Left Column: Device List */}
                    <div className="col-span-4 flex flex-col gap-4">
                        <DeviceList />
                    </div>

                    {/* Center Column: Data Transfer */}
                    <div className="col-span-5 flex flex-col gap-4">
                        <DataTransfer />
                    </div>

                    {/* Right Column: Storage Monitor */}
                    <div className="col-span-3 flex flex-col gap-4">
                        <StorageMonitor />
                    </div>

                </main>

                {/* Footer Stats */}
                <footer className="mt-6 grid grid-cols-3 gap-4">
                    <div className="glass-panel p-4 flex items-center gap-3">
                        <HardDrive className="text-cyan-400" size={24} />
                        <div>
                            <div className="text-xs text-gray-400">TOTAL STORAGE</div>
                            <div className="text-xl font-bold text-white">2.4 TB</div>
                        </div>
                    </div>
                    <div className="glass-panel p-4 flex items-center gap-3">
                        <Wifi className="text-green-400" size={24} />
                        <div>
                            <div className="text-xs text-gray-400">TRANSFER RATE</div>
                            <div className="text-xl font-bold text-white">480 MB/s</div>
                        </div>
                    </div>
                    <div className="glass-panel p-4 flex items-center gap-3">
                        <Usb className="text-purple-400" size={24} />
                        <div>
                            <div className="text-xs text-gray-400">USB PROTOCOL</div>
                            <div className="text-xl font-bold text-white">USB 3.2</div>
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
