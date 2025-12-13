import { Usb, HardDrive, Smartphone, Monitor, Check } from 'lucide-react'

function DeviceList() {
    const devices = [
        { 
            id: 'USB-A1', 
            name: 'Data Collection Module',
            type: 'Storage Device',
            icon: HardDrive,
            capacity: '256 GB',
            status: 'active',
            color: 'text-cyan-400'
        },
        { 
            id: 'USB-B2', 
            name: 'Sensor Array Interface',
            type: 'Control Device',
            icon: Monitor,
            capacity: 'N/A',
            status: 'active',
            color: 'text-green-400'
        },
        { 
            id: 'USB-C3', 
            name: 'Mobile Diagnostic Unit',
            type: 'Mobile Device',
            icon: Smartphone,
            capacity: '128 GB',
            status: 'standby',
            color: 'text-yellow-400'
        },
    ];

    const getStatusColor = (status) => {
        switch(status) {
            case 'active': return 'bg-green-500/20 text-green-400';
            case 'standby': return 'bg-yellow-500/20 text-yellow-400';
            case 'disconnected': return 'bg-gray-500/20 text-gray-400';
            default: return 'bg-gray-500/20 text-gray-400';
        }
    };

    return (
        <div className="glass-panel p-4 h-full flex flex-col">
            <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-4">
                <Usb size={18} className="text-purple-400" />
                <h2 className="text-sm font-bold text-purple-400 uppercase tracking-wider">Connected Devices</h2>
            </div>
            
            <div className="flex-1 space-y-3 overflow-y-auto pr-2">
                {devices.map((device, idx) => {
                    const Icon = device.icon;
                    return (
                        <div key={idx} className="bg-white/5 p-4 rounded border border-white/5 hover:border-purple-500/50 transition-all">
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-white/10 rounded">
                                    <Icon size={20} className={device.color} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm font-mono text-gray-400">{device.id}</span>
                                        <span className={`text-[10px] px-2 py-0.5 rounded uppercase ${getStatusColor(device.status)}`}>
                                            {device.status}
                                        </span>
                                    </div>
                                    <div className="text-base text-white font-medium mb-1">{device.name}</div>
                                    <div className="text-xs text-gray-400 mb-2">{device.type}</div>
                                    {device.capacity !== 'N/A' && (
                                        <div className="flex items-center gap-2 text-xs">
                                            <HardDrive size={12} className="text-gray-500" />
                                            <span className="text-gray-400">{device.capacity}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-4 pt-4 border-t border-white/10">
                <button className="w-full py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50 rounded text-sm text-purple-400 transition-all flex items-center justify-center gap-2">
                    <Check size={16} />
                    SCAN FOR DEVICES
                </button>
            </div>
        </div>
    );
}

export default DeviceList;
