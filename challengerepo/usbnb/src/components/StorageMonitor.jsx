import { Database, HardDrive, Trash2 } from 'lucide-react'

function StorageMonitor() {
    const storageDevices = [
        { name: 'Main Storage', used: 156, total: 256, unit: 'GB', color: 'bg-cyan-500' },
        { name: 'Backup Drive', used: 89, total: 512, unit: 'GB', color: 'bg-purple-500' },
        { name: 'Cache', used: 24, total: 64, unit: 'GB', color: 'bg-green-500' },
    ];

    const getPercentage = (used, total) => ((used / total) * 100).toFixed(1);
    
    const getUsageColor = (percentage) => {
        if (percentage > 85) return 'text-red-400';
        if (percentage > 70) return 'text-yellow-400';
        return 'text-green-400';
    };

    return (
        <div className="glass-panel p-4 h-full flex flex-col">
            <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-4">
                <Database size={18} className="text-indigo-400" />
                <h2 className="text-sm font-bold text-indigo-400 uppercase tracking-wider">Storage Monitor</h2>
            </div>

            <div className="flex-1 space-y-4">
                {storageDevices.map((device, idx) => {
                    const percentage = getPercentage(device.used, device.total);
                    return (
                        <div key={idx} className="bg-white/5 p-4 rounded border border-white/5">
                            <div className="flex items-center gap-2 mb-3">
                                <HardDrive size={14} className="text-gray-400" />
                                <span className="text-sm text-white font-medium">{device.name}</span>
                            </div>
                            
                            <div className="mb-2">
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-gray-400">
                                        {device.used} / {device.total} {device.unit}
                                    </span>
                                    <span className={getUsageColor(percentage)}>
                                        {percentage}%
                                    </span>
                                </div>
                                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                    <div 
                                        className={`h-full ${device.color} transition-all duration-500`}
                                        style={{ width: `${percentage}%` }}
                                    ></div>
                                </div>
                            </div>
                            
                            <div className="text-xs text-gray-500">
                                {(device.total - device.used)} {device.unit} free
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Storage Management */}
            <div className="mt-4 pt-4 border-t border-white/10">
                <div className="text-xs text-gray-400 mb-3 font-mono">QUICK ACTIONS</div>
                <div className="space-y-2">
                    <button className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-xs text-white transition-all flex items-center justify-center gap-2">
                        <Database size={14} />
                        OPTIMIZE STORAGE
                    </button>
                    <button className="w-full py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 rounded text-xs text-red-400 transition-all flex items-center justify-center gap-2">
                        <Trash2 size={14} />
                        CLEAR CACHE
                    </button>
                </div>
            </div>

            {/* Total Storage Summary */}
            <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">TOTAL CAPACITY</span>
                    <span className="text-sm font-mono text-white">832 GB</span>
                </div>
            </div>
        </div>
    );
}

export default StorageMonitor;
