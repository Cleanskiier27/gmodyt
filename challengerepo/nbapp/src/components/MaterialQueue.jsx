import { Package, Clock } from 'lucide-react'

function MaterialQueue() {
    const queueItems = [
        { id: 'MT-001', type: 'Plastic Bottles', weight: '0.8 kg', priority: 'HIGH', eta: '5 min' },
        { id: 'MT-002', type: 'Aluminum Cans', weight: '1.2 kg', priority: 'NORMAL', eta: '12 min' },
        { id: 'MT-003', type: 'Food Waste', weight: '2.1 kg', priority: 'LOW', eta: '18 min' },
        { id: 'MT-004', type: 'Electronic Parts', weight: '0.4 kg', priority: 'HIGH', eta: '25 min' },
        { id: 'MT-005', type: 'Glass Containers', weight: '1.5 kg', priority: 'NORMAL', eta: '32 min' },
    ];

    const getPriorityColor = (priority) => {
        switch(priority) {
            case 'HIGH': return 'text-red-400 bg-red-500/20';
            case 'NORMAL': return 'text-yellow-400 bg-yellow-500/20';
            case 'LOW': return 'text-green-400 bg-green-500/20';
            default: return 'text-gray-400 bg-gray-500/20';
        }
    };

    return (
        <div className="glass-panel p-4 h-full flex flex-col">
            <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-4">
                <Package size={18} className="text-purple-400" />
                <h2 className="text-sm font-bold text-purple-400 uppercase tracking-wider">Material Queue</h2>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-2">
                {queueItems.map((item, idx) => (
                    <div key={idx} className="bg-white/5 p-3 rounded border border-white/5 hover:border-purple-500/50 transition-all">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-mono text-gray-400">{item.id}</span>
                            <span className={`text-[10px] px-2 py-0.5 rounded ${getPriorityColor(item.priority)}`}>
                                {item.priority}
                            </span>
                        </div>
                        <div className="text-sm text-white font-medium mb-1">{item.type}</div>
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-400">{item.weight}</span>
                            <div className="flex items-center gap-1 text-cyan-400">
                                <Clock size={10} />
                                <span>{item.eta}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex justify-between text-xs">
                    <span className="text-gray-400">TOTAL QUEUED</span>
                    <span className="text-white font-mono">6.0 kg</span>
                </div>
            </div>
        </div>
    );
}

export default MaterialQueue;
