import { useState, useEffect } from 'react'
import { Play, Pause, RotateCw } from 'lucide-react'

function ProcessingUnit() {
    const [isProcessing, setIsProcessing] = useState(true);
    const [progress, setProgress] = useState(68);

    useEffect(() => {
        if (!isProcessing) return;
        
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) return 0;
                return prev + Math.random() * 2;
            });
        }, 500);
        
        return () => clearInterval(interval);
    }, [isProcessing]);

    const materials = [
        { type: 'Plastics', amount: '2.3 kg', color: 'bg-blue-500' },
        { type: 'Metals', amount: '1.8 kg', color: 'bg-gray-400' },
        { type: 'Organics', amount: '3.2 kg', color: 'bg-green-500' },
        { type: 'Glass', amount: '1.1 kg', color: 'bg-cyan-400' },
    ];

    return (
        <div className="glass-panel p-4 h-full flex flex-col">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                <div className="flex items-center gap-2">
                    <RotateCw size={18} className="text-cyan-400" />
                    <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-wider">Processing Unit</h2>
                </div>
                <button
                    onClick={() => setIsProcessing(!isProcessing)}
                    className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-xs text-white flex items-center gap-2 transition-all"
                >
                    {isProcessing ? <Pause size={14} /> : <Play size={14} />}
                    {isProcessing ? 'PAUSE' : 'START'}
                </button>
            </div>

            {/* Progress Section */}
            <div className="mb-6">
                <div className="flex justify-between text-xs text-gray-400 mb-2">
                    <span>CURRENT BATCH</span>
                    <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-4 bg-white/5 rounded-full overflow-hidden border border-white/10">
                    <div 
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>

            {/* Processing Chambers */}
            <div className="flex-1">
                <div className="text-xs text-gray-400 mb-3 font-mono">ACTIVE CHAMBERS</div>
                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/5 p-3 rounded border border-cyan-500/50">
                        <div className="text-xs text-cyan-400 mb-1">THERMAL</div>
                        <div className="text-lg font-bold text-white">450°C</div>
                        <div className="text-xs text-gray-500 mt-1">Processing</div>
                    </div>
                    <div className="bg-white/5 p-3 rounded border border-green-500/50">
                        <div className="text-xs text-green-400 mb-1">MECHANICAL</div>
                        <div className="text-lg font-bold text-white">2.4 kN</div>
                        <div className="text-xs text-gray-500 mt-1">Active</div>
                    </div>
                    <div className="bg-white/5 p-3 rounded border border-yellow-500/50">
                        <div className="text-xs text-yellow-400 mb-1">CHEMICAL</div>
                        <div className="text-lg font-bold text-white">pH 7.2</div>
                        <div className="text-xs text-gray-500 mt-1">Standby</div>
                    </div>
                    <div className="bg-white/5 p-3 rounded border border-purple-500/50">
                        <div className="text-xs text-purple-400 mb-1">BIOLOGICAL</div>
                        <div className="text-lg font-bold text-white">35°C</div>
                        <div className="text-xs text-gray-500 mt-1">Processing</div>
                    </div>
                </div>
            </div>

            {/* Material Breakdown */}
            <div className="mt-6 pt-4 border-t border-white/10">
                <div className="text-xs text-gray-400 mb-3 font-mono">MATERIAL COMPOSITION</div>
                <div className="space-y-2">
                    {materials.map((material, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded ${material.color}`}></div>
                            <div className="flex-1 text-xs text-gray-300">{material.type}</div>
                            <div className="text-xs text-white font-mono">{material.amount}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProcessingUnit;
