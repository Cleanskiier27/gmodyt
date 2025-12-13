import { useState, useEffect } from 'react'
import { Download, Upload, Activity, FileText } from 'lucide-react'

function DataTransfer() {
    const [downloadSpeed, setDownloadSpeed] = useState(120);
    const [uploadSpeed, setUploadSpeed] = useState(45);

    useEffect(() => {
        const interval = setInterval(() => {
            setDownloadSpeed(100 + Math.random() * 80);
            setUploadSpeed(30 + Math.random() * 30);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const recentTransfers = [
        { 
            name: 'sensor-data-2025-12.log',
            size: '45.2 MB',
            type: 'download',
            status: 'complete',
            time: '2 min ago'
        },
        { 
            name: 'system-config.json',
            size: '1.8 MB',
            type: 'upload',
            status: 'complete',
            time: '5 min ago'
        },
        { 
            name: 'telemetry-batch-142.dat',
            size: '128 MB',
            type: 'download',
            status: 'processing',
            time: 'now',
            progress: 67
        },
    ];

    return (
        <div className="glass-panel p-4 h-full flex flex-col">
            <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-4">
                <Activity size={18} className="text-cyan-400" />
                <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-wider">Data Transfer</h2>
            </div>

            {/* Transfer Speeds */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-br from-green-500/20 to-transparent p-4 rounded border border-green-500/30">
                    <div className="flex items-center gap-2 mb-2">
                        <Download size={16} className="text-green-400" />
                        <span className="text-xs text-green-400">DOWNLOAD</span>
                    </div>
                    <div className="text-2xl font-bold text-white">{downloadSpeed.toFixed(1)} MB/s</div>
                </div>
                <div className="bg-gradient-to-br from-blue-500/20 to-transparent p-4 rounded border border-blue-500/30">
                    <div className="flex items-center gap-2 mb-2">
                        <Upload size={16} className="text-blue-400" />
                        <span className="text-xs text-blue-400">UPLOAD</span>
                    </div>
                    <div className="text-2xl font-bold text-white">{uploadSpeed.toFixed(1)} MB/s</div>
                </div>
            </div>

            {/* Recent Transfers */}
            <div className="flex-1 overflow-y-auto">
                <div className="text-xs text-gray-400 mb-3 font-mono">RECENT TRANSFERS</div>
                <div className="space-y-2">
                    {recentTransfers.map((transfer, idx) => (
                        <div key={idx} className="bg-white/5 p-3 rounded border border-white/5">
                            <div className="flex items-start gap-3">
                                <FileText size={16} className="text-gray-400 mt-0.5" />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs text-white truncate">{transfer.name}</span>
                                        <span className="text-[10px] text-gray-500 ml-2">{transfer.time}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                                        <span>{transfer.size}</span>
                                        <span className="uppercase">{transfer.type}</span>
                                    </div>
                                    {transfer.status === 'processing' ? (
                                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                            <div 
                                                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                                                style={{ width: `${transfer.progress}%` }}
                                            ></div>
                                        </div>
                                    ) : (
                                        <div className="text-[10px] text-green-400">✓ COMPLETE</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Transfer Stats */}
            <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 gap-4">
                <div>
                    <div className="text-xs text-gray-400 mb-1">TOTAL SENT</div>
                    <div className="text-lg font-mono text-white">2.8 GB</div>
                </div>
                <div>
                    <div className="text-xs text-gray-400 mb-1">TOTAL RECEIVED</div>
                    <div className="text-lg font-mono text-white">4.2 GB</div>
                </div>
            </div>
        </div>
    );
}

export default DataTransfer;
