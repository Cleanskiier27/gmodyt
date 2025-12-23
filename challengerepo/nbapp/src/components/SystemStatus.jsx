import { Activity, Thermometer, Battery, Cpu } from 'lucide-react'

function SystemStatus() {
    const statusItems = [
        { 
            label: 'TEMPERATURE', 
            value: '23°C', 
            icon: Thermometer, 
            color: 'text-blue-400',
            status: 'OPTIMAL'
        },
        { 
            label: 'BATTERY', 
            value: '87%', 
            icon: Battery, 
            color: 'text-green-400',
            status: 'CHARGING'
        },
        { 
            label: 'CPU LOAD', 
            value: '42%', 
            icon: Cpu, 
            color: 'text-cyan-400',
            status: 'NORMAL'
        },
        { 
            label: 'SYSTEM', 
            value: 'ONLINE', 
            icon: Activity, 
            color: 'text-green-400',
            status: 'ACTIVE'
        },
    ];

    return (
        <div className="glass-panel p-4 h-full flex flex-col">
            <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-4">
                <Activity size={18} className="text-green-400" />
                <h2 className="text-sm font-bold text-green-400 uppercase tracking-wider">System Status</h2>
            </div>
            
            <div className="flex-1 space-y-3">
                {statusItems.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                        <div key={idx} className="bg-white/5 p-3 rounded border border-white/5 hover:border-white/20 transition-all">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <Icon size={16} className={item.color} />
                                    <span className="text-xs text-gray-400 font-mono">{item.label}</span>
                                </div>
                                <span className="text-xs text-gray-500">{item.status}</span>
                            </div>
                            <div className="text-2xl font-bold text-white">{item.value}</div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-4 pt-4 border-t border-white/10">
                <div className="text-xs text-gray-400 mb-2">UPTIME</div>
                <div className="text-lg font-mono text-white">142d 08h 23m</div>
            </div>
        </div>
    );
}

export default SystemStatus;
