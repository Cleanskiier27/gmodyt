import { useState, useRef, useEffect } from 'react';
import { FileUp, Console, Eye, EyeOff, Trash2, Download, AlertCircle, CheckCircle, Info } from 'lucide-react';

export default function SpectatorMode({ isOpen, onClose }) {
    const [debugLogs, setDebugLogs] = useState([]);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [scenarios, setScenarios] = useState([]);
    const [activeScenario, setActiveScenario] = useState(null);
    const [consoleExpanded, setConsoleExpanded] = useState(true);
    const [logFilter, setLogFilter] = useState('all');
    const [activeTab, setActiveTab] = useState('debug');
    const fileInputRef = useRef(null);
    const logsEndRef = useRef(null);

    // Auto-scroll logs to bottom
    useEffect(() => {
        logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [debugLogs]);

    // Capture console output
    useEffect(() => {
        if (!isOpen) return;

        const originalLog = console.log;
        const originalError = console.error;
        const originalWarn = console.warn;
        const originalInfo = console.info;

        const captureLog = (level, args) => {
            const message = args.map(arg => 
                typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
            ).join(' ');
            
            setDebugLogs(prev => [...prev, {
                id: Date.now() + Math.random(),
                timestamp: new Date().toLocaleTimeString(),
                level,
                message,
                details: args
            }]);
        };

        console.log = (...args) => {
            originalLog(...args);
            captureLog('LOG', args);
        };

        console.error = (...args) => {
            originalError(...args);
            captureLog('ERROR', args);
        };

        console.warn = (...args) => {
            originalWarn(...args);
            captureLog('WARN', args);
        };

        console.info = (...args) => {
            originalInfo(...args);
            captureLog('INFO', args);
        };

        return () => {
            console.log = originalLog;
            console.error = originalError;
            console.warn = originalWarn;
            console.info = originalInfo;
        };
    }, [isOpen]);

    // Sample scenarios for testing
    const defaultScenarios = [
        {
            id: 'scenario-01',
            name: 'Multi-Unit Coordination Test',
            description: 'Test 3 autonomous units working together',
            status: 'pending',
            duration: '2h 30m',
            components: ['Unit-A', 'Unit-B', 'Unit-C'],
            testPoints: [
                'Distributed decision-making',
                'Resource negotiation',
                'Conflict avoidance',
                'Communication efficiency'
            ]
        },
        {
            id: 'scenario-02',
            name: 'Radiation Event Response',
            description: 'Autonomous system response to radiation spike',
            status: 'pending',
            duration: '45m',
            components: ['Sensors', 'Shields', 'Navigation'],
            testPoints: [
                'Radiation detection <2min',
                'Shelter route planning',
                'Critical system protection',
                'Communication during event'
            ]
        },
        {
            id: 'scenario-03',
            name: 'Power Management Crisis',
            description: 'Extended operation on minimal power',
            status: 'pending',
            duration: '3h',
            components: ['Battery', 'Solar', 'Motor Control'],
            testPoints: [
                'Power budget adherence',
                'Non-essential shutdown',
                'Route optimization',
                'Safe arrival at charging'
            ]
        },
        {
            id: 'scenario-04',
            name: 'Material Recognition AI',
            description: 'Train AI to identify 10+ material types',
            status: 'pending',
            duration: '4h',
            components: ['Sensors', 'AI Model', 'Spectroscopy'],
            testPoints: [
                '>95% classification accuracy',
                '<10s detection time',
                'Contamination detection',
                'Unknown material handling'
            ]
        }
    ];

    useEffect(() => {
        setScenarios(defaultScenarios);
    }, []);

    const handleFileUpload = (event) => {
        const files = Array.from(event.target.files);
        
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const newFile = {
                    id: Date.now() + Math.random(),
                    name: file.name,
                    size: (file.size / 1024).toFixed(2) + ' KB',
                    type: file.type || 'unknown',
                    uploadedAt: new Date().toLocaleTimeString(),
                    content: e.target.result
                };
                
                setUploadedFiles(prev => [...prev, newFile]);
                
                // Log file upload
                console.info(`📁 File uploaded: ${file.name} (${newFile.size})`);
            };
            reader.readAsText(file);
        });
        
        // Reset input
        fileInputRef.current.value = '';
    };

    const runScenario = (scenario) => {
        setActiveScenario(scenario);
        setDebugLogs(prev => [...prev, {
            id: Date.now(),
            timestamp: new Date().toLocaleTimeString(),
            level: 'INFO',
            message: `🚀 Starting scenario: ${scenario.name}`,
            details: scenario
        }]);
    };

    const getLogColor = (level) => {
        switch(level) {
            case 'ERROR': return 'text-red-400';
            case 'WARN': return 'text-yellow-400';
            case 'INFO': return 'text-blue-400';
            default: return 'text-green-400';
        }
    };

    const getLogIcon = (level) => {
        switch(level) {
            case 'ERROR': return <AlertCircle size={14} className="text-red-400" />;
            case 'WARN': return <AlertCircle size={14} className="text-yellow-400" />;
            case 'INFO': return <Info size={14} className="text-blue-400" />;
            default: return <CheckCircle size={14} className="text-green-400" />;
        }
    };

    const filteredLogs = debugLogs.filter(log => 
        logFilter === 'all' || log.level === logFilter
    );

    const downloadLogs = () => {
        const content = debugLogs.map(log => 
            `[${log.timestamp}] ${log.level}: ${log.message}`
        ).join('\n');
        
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
        element.setAttribute('download', `debug-logs-${Date.now()}.txt`);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    const clearLogs = () => {
        setDebugLogs([]);
    };

    const deleteFile = (id) => {
        setUploadedFiles(prev => prev.filter(f => f.id !== id));
    };

    if (!isOpen) return null;

    const tabs = [
        { id: 'debug', label: 'Debug Console', icon: Console },
        { id: 'scenarios', label: 'Scenarios', icon: Eye },
        { id: 'files', label: 'File Upload', icon: FileUp }
    ];

    return (
        <div className="fixed inset-0 z-50 flex overflow-hidden">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

            {/* Spectator Panel */}
            <div className="relative ml-auto w-full max-w-2xl max-h-screen overflow-hidden flex flex-col bg-gradient-to-b from-slate-950 to-slate-900 border-l border-[#00f0ff]/20 shadow-2xl">
                
                {/* Header */}
                <div className="px-4 py-3 border-b border-[#00f0ff]/20 flex items-center justify-between bg-black/40">
                    <div className="flex items-center gap-2">
                        <Eye className="text-[#00f0ff]" size={20} />
                        <h2 className="text-lg font-bold text-[#00f0ff]">CRITICAL SPECTATOR MODE</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-[#ff003c]/20 rounded transition text-[#ff003c]"
                    >
                        <EyeOff size={18} />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 px-4 py-2 border-b border-[#00f0ff]/10 bg-black/20 overflow-x-auto">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-3 py-1 text-xs font-bold rounded transition whitespace-nowrap ${
                                activeTab === tab.id 
                                    ? 'bg-[#00f0ff]/20 text-[#00f0ff] border-b-2 border-[#00f0ff]'
                                    : 'text-gray-400 hover:text-[#00f0ff]'
                            }`}
                        >
                            <tab.icon size={14} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-hidden flex flex-col bg-black/20">
                    
                    {/* Debug Console Panel */}
                    {activeTab === 'debug' && (
                        <>
                            {/* Console Controls */}
                            <div className="px-3 py-2 flex gap-2 border-b border-[#00f0ff]/10 bg-black/40 flex-wrap">
                                <select
                                    value={logFilter}
                                    onChange={(e) => setLogFilter(e.target.value)}
                                    className="px-2 py-1 text-xs bg-slate-800 text-[#00f0ff] rounded border border-[#00f0ff]/30 cursor-pointer"
                                >
                                    <option value="all">All Logs</option>
                                    <option value="ERROR">Errors Only</option>
                                    <option value="WARN">Warnings Only</option>
                                    <option value="INFO">Info Only</option>
                                    <option value="LOG">Logs Only</option>
                                </select>

                                <div className="flex-1" />

                                <button
                                    onClick={downloadLogs}
                                    className="flex items-center gap-1 px-2 py-1 text-xs bg-blue-900/50 hover:bg-blue-900 text-blue-300 rounded transition whitespace-nowrap"
                                >
                                    <Download size={12} />
                                    Export
                                </button>

                                <button
                                    onClick={clearLogs}
                                    className="flex items-center gap-1 px-2 py-1 text-xs bg-red-900/50 hover:bg-red-900 text-red-300 rounded transition whitespace-nowrap"
                                >
                                    <Trash2 size={12} />
                                    Clear
                                </button>
                            </div>

                            {/* Logs Display */}
                            <div className="flex-1 overflow-y-auto font-mono text-xs space-y-0">
                                {filteredLogs.length === 0 ? (
                                    <div className="p-4 text-gray-500 text-center">
                                        No logs yet. Perform actions to see console output.
                                    </div>
                                ) : (
                                    filteredLogs.map(log => (
                                        <div
                                            key={log.id}
                                            className={`px-3 py-1 border-b border-white/5 flex gap-2 hover:bg-white/5 transition ${getLogColor(log.level)}`}
                                        >
                                            <span className="text-gray-500 flex-shrink-0 w-12">{log.timestamp}</span>
                                            <span className="flex-shrink-0">{getLogIcon(log.level)}</span>
                                            <span className="flex-shrink-0 w-12 font-bold">[{log.level}]</span>
                                            <span className="flex-1 break-words">{log.message}</span>
                                        </div>
                                    ))
                                )}
                                <div ref={logsEndRef} />
                            </div>

                            {/* Active Scenario Info */}
                            {activeScenario && (
                                <div className="px-3 py-2 bg-[#ff003c]/10 border-t border-[#ff003c]/20">
                                    <div className="text-xs text-[#ff003c] font-bold mb-1">
                                        🎯 Active Scenario: {activeScenario.name}
                                    </div>
                                    <div className="text-xs text-gray-400">
                                        Components: {activeScenario.components.join(', ')}
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    {/* Scenarios Panel */}
                    {activeTab === 'scenarios' && (
                        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2">
                            {scenarios.map(scenario => (
                                <div key={scenario.id} className="glass-panel p-3 text-xs space-y-2">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="text-[#00f0ff] font-bold">{scenario.name}</div>
                                            <div className="text-gray-400">{scenario.description}</div>
                                        </div>
                                        <span className="px-2 py-1 bg-gray-700 rounded text-xs whitespace-nowrap">
                                            {scenario.duration}
                                        </span>
                                    </div>
                                    <div className="text-gray-400">
                                        Components: {scenario.components.join(', ')}
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-[#ff003c] font-bold text-xs">Test Points:</div>
                                        <ul className="text-gray-300 space-y-1 ml-2">
                                            {scenario.testPoints.map((point, idx) => (
                                                <li key={idx} className="text-xs">• {point}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <button
                                        onClick={() => runScenario(scenario)}
                                        className="w-full px-2 py-1 bg-[#00f0ff]/20 hover:bg-[#00f0ff]/30 text-[#00f0ff] rounded text-xs font-bold transition"
                                    >
                                        ▶ Run Scenario
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* File Upload Panel */}
                    {activeTab === 'files' && (
                        <div className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-3">
                            {/* Upload Area */}
                            <div
                                className="border-2 border-dashed border-[#00f0ff]/30 rounded-lg p-6 text-center cursor-pointer hover:bg-[#00f0ff]/10 transition"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <FileUp size={32} className="text-[#00f0ff] mx-auto mb-2" />
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    multiple
                                    onChange={handleFileUpload}
                                    className="hidden"
                                    accept=".json,.txt,.log,.csv,.js,.jsx,.py"
                                />
                                <div className="text-xs text-[#00f0ff] font-bold mb-1">
                                    Click or drag files here
                                </div>
                                <div className="text-xs text-gray-400">
                                    Supported: JSON, TXT, LOG, CSV, JS, JSX, PY
                                </div>
                            </div>

                            {/* Uploaded Files List */}
                            {uploadedFiles.length > 0 && (
                                <div className="space-y-2 flex-1">
                                    <div className="text-xs text-[#00f0ff] font-bold sticky top-0 bg-black/40 py-1">
                                        📁 Uploaded Files ({uploadedFiles.length})
                                    </div>
                                    {uploadedFiles.map(file => (
                                        <div key={file.id} className="glass-panel p-2 flex items-center justify-between text-xs">
                                            <div className="flex-1 min-w-0">
                                                <div className="text-[#00f0ff] font-bold truncate">{file.name}</div>
                                                <div className="text-gray-400 text-xs">
                                                    {file.size} • {file.uploadedAt}
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => deleteFile(file.id)}
                                                className="p-1 hover:bg-red-900/50 text-red-400 rounded transition ml-2 flex-shrink-0"
                                            >
                                                <Trash2 size={12} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {uploadedFiles.length === 0 && (
                                <div className="text-center text-gray-500 text-xs py-8">
                                    No files uploaded yet
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer Stats */}
                <div className="px-4 py-2 border-t border-[#00f0ff]/20 bg-black/40 text-xs text-gray-400 flex justify-between flex-wrap gap-2">
                    <div>
                        📊 Logs: {filteredLogs.length} ({debugLogs.filter(l => l.level === 'ERROR').length} errors)
                    </div>
                    <div>
                        📁 Files: {uploadedFiles.length} | Scenarios: {scenarios.length}
                    </div>
                </div>
            </div>
        </div>
    );
}

    // Auto-scroll logs to bottom
    useEffect(() => {
        logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [debugLogs]);

    // Capture console output
    useEffect(() => {
        if (!isOpen) return;

        const originalLog = console.log;
        const originalError = console.error;
        const originalWarn = console.warn;
        const originalInfo = console.info;

        const captureLog = (level, args) => {
            const message = args.map(arg => 
                typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
            ).join(' ');
            
            setDebugLogs(prev => [...prev, {
                id: Date.now() + Math.random(),
                timestamp: new Date().toLocaleTimeString(),
                level,
                message,
                details: args
            }]);
        };

        console.log = (...args) => {
            originalLog(...args);
            captureLog('LOG', args);
        };

        console.error = (...args) => {
            originalError(...args);
            captureLog('ERROR', args);
        };

        console.warn = (...args) => {
            originalWarn(...args);
            captureLog('WARN', args);
        };

        console.info = (...args) => {
            originalInfo(...args);
            captureLog('INFO', args);
        };

        return () => {
            console.log = originalLog;
            console.error = originalError;
            console.warn = originalWarn;
            console.info = originalInfo;
        };
    }, [isOpen]);

    // Sample scenarios for testing
    const defaultScenarios = [
        {
            id: 'scenario-01',
            name: 'Multi-Unit Coordination Test',
            description: 'Test 3 autonomous units working together',
            status: 'pending',
            duration: '2h 30m',
            components: ['Unit-A', 'Unit-B', 'Unit-C'],
            testPoints: [
                'Distributed decision-making',
                'Resource negotiation',
                'Conflict avoidance',
                'Communication efficiency'
            ]
        },
        {
            id: 'scenario-02',
            name: 'Radiation Event Response',
            description: 'Autonomous system response to radiation spike',
            status: 'pending',
            duration: '45m',
            components: ['Sensors', 'Shields', 'Navigation'],
            testPoints: [
                'Radiation detection <2min',
                'Shelter route planning',
                'Critical system protection',
                'Communication during event'
            ]
        },
        {
            id: 'scenario-03',
            name: 'Power Management Crisis',
            description: 'Extended operation on minimal power',
            status: 'pending',
            duration: '3h',
            components: ['Battery', 'Solar', 'Motor Control'],
            testPoints: [
                'Power budget adherence',
                'Non-essential shutdown',
                'Route optimization',
                'Safe arrival at charging'
            ]
        },
        {
            id: 'scenario-04',
            name: 'Material Recognition AI',
            description: 'Train AI to identify 10+ material types',
            status: 'pending',
            duration: '4h',
            components: ['Sensors', 'AI Model', 'Spectroscopy'],
            testPoints: [
                '>95% classification accuracy',
                '<10s detection time',
                'Contamination detection',
                'Unknown material handling'
            ]
        }
    ];

    useEffect(() => {
        setScenarios(defaultScenarios);
    }, []);

    const handleFileUpload = (event) => {
        const files = Array.from(event.target.files);
        
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const newFile = {
                    id: Date.now() + Math.random(),
                    name: file.name,
                    size: (file.size / 1024).toFixed(2) + ' KB',
                    type: file.type || 'unknown',
                    uploadedAt: new Date().toLocaleTimeString(),
                    content: e.target.result
                };
                
                setUploadedFiles(prev => [...prev, newFile]);
                
                // Log file upload
                console.info(`File uploaded: ${file.name} (${newFile.size})`);
            };
            reader.readAsText(file);
        });
        
        // Reset input
        fileInputRef.current.value = '';
    };

    const runScenario = (scenario) => {
        setActiveScenario(scenario);
        setDebugLogs(prev => [...prev, {
            id: Date.now(),
            timestamp: new Date().toLocaleTimeString(),
            level: 'INFO',
            message: `🚀 Starting scenario: ${scenario.name}`,
            details: scenario
        }]);
    };

    const getLogColor = (level) => {
        switch(level) {
            case 'ERROR': return 'text-red-400';
            case 'WARN': return 'text-yellow-400';
            case 'INFO': return 'text-blue-400';
            default: return 'text-green-400';
        }
    };

    const getLogIcon = (level) => {
        switch(level) {
            case 'ERROR': return <AlertCircle size={14} className="text-red-400" />;
            case 'WARN': return <AlertCircle size={14} className="text-yellow-400" />;
            case 'INFO': return <Info size={14} className="text-blue-400" />;
            default: return <CheckCircle size={14} className="text-green-400" />;
        }
    };

    const filteredLogs = debugLogs.filter(log => 
        logFilter === 'all' || log.level === logFilter
    );

    const downloadLogs = () => {
        const content = debugLogs.map(log => 
            `[${log.timestamp}] ${log.level}: ${log.message}`
        ).join('\n');
        
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
        element.setAttribute('download', `debug-logs-${Date.now()}.txt`);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    const clearLogs = () => {
        setDebugLogs([]);
    };

    const deletefile = (id) => {
        setUploadedFiles(prev => prev.filter(f => f.id !== id));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex overflow-hidden">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

            {/* Spectator Panel */}
            <div className="relative ml-auto w-full max-w-2xl max-h-screen overflow-hidden flex flex-col bg-gradient-to-b from-slate-950 to-slate-900 border-l border-[#00f0ff]/20 shadow-2xl">
                
                {/* Header */}
                <div className="px-4 py-3 border-b border-[#00f0ff]/20 flex items-center justify-between bg-black/40">
                    <div className="flex items-center gap-2">
                        <Eye className="text-[#00f0ff]" size={20} />
                        <h2 className="text-lg font-bold text-[#00f0ff]">CRITICAL SPECTATOR MODE</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-[#ff003c]/20 rounded transition text-[#ff003c]"
                    >
                        <EyeOff size={18} />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 px-4 py-2 border-b border-[#00f0ff]/10 bg-black/20 overflow-x-auto">
                    {[
                        { id: 'debug', label: 'Debug Console', icon: Console },
                        { id: 'scenarios', label: 'Scenarios', icon: Eye },
                        { id: 'files', label: 'File Upload', icon: FileUp }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            className="flex items-center gap-2 px-3 py-1 text-xs font-bold rounded transition whitespace-nowrap"
                            style={{
                                background: tab.id === 'debug' ? 'rgba(0, 240, 255, 0.1)' : 'transparent',
                                color: tab.id === 'debug' ? '#00f0ff' : '#888',
                                borderBottom: tab.id === 'debug' ? '2px solid #00f0ff' : 'none'
                            }}
                        >
                            <tab.icon size={14} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-hidden flex flex-col">
                    
                    {/* Debug Console */}
                    <div className="flex-1 overflow-hidden flex flex-col bg-black/20">
                        
                        {/* Console Controls */}
                        <div className="px-3 py-2 flex gap-2 border-b border-[#00f0ff]/10 bg-black/40">
                            <select
                                value={logFilter}
                                onChange={(e) => setLogFilter(e.target.value)}
                                className="px-2 py-1 text-xs bg-slate-800 text-[#00f0ff] rounded border border-[#00f0ff]/30 cursor-pointer"
                            >
                                <option value="all">All Logs</option>
                                <option value="ERROR">Errors Only</option>
                                <option value="WARN">Warnings Only</option>
                                <option value="INFO">Info Only</option>
                                <option value="LOG">Logs Only</option>
                            </select>

                            <div className="flex-1" />

                            <button
                                onClick={downloadLogs}
                                className="flex items-center gap-1 px-2 py-1 text-xs bg-blue-900/50 hover:bg-blue-900 text-blue-300 rounded transition"
                            >
                                <Download size={12} />
                                Export
                            </button>

                            <button
                                onClick={clearLogs}
                                className="flex items-center gap-1 px-2 py-1 text-xs bg-red-900/50 hover:bg-red-900 text-red-300 rounded transition"
                            >
                                <Trash2 size={12} />
                                Clear
                            </button>

                            <button
                                onClick={() => setConsoleExpanded(!consoleExpanded)}
                                className="px-2 py-1 text-xs bg-[#00f0ff]/20 hover:bg-[#00f0ff]/30 text-[#00f0ff] rounded transition"
                            >
                                {consoleExpanded ? 'Collapse' : 'Expand'}
                            </button>
                        </div>

                        {/* Logs Display */}
                        <div className="flex-1 overflow-y-auto font-mono text-xs space-y-0">
                            {filteredLogs.length === 0 ? (
                                <div className="p-4 text-gray-500 text-center">
                                    No logs yet. Perform actions to see console output.
                                </div>
                            ) : (
                                filteredLogs.map(log => (
                                    <div
                                        key={log.id}
                                        className={`px-3 py-1 border-b border-white/5 flex gap-2 hover:bg-white/5 transition ${getLogColor(log.level)}`}
                                    >
                                        <span className="text-gray-500 flex-shrink-0 w-12">{log.timestamp}</span>
                                        <span className="flex-shrink-0">{getLogIcon(log.level)}</span>
                                        <span className="flex-shrink-0 w-12 font-bold">[{log.level}]</span>
                                        <span className="flex-1 break-words">{log.message}</span>
                                    </div>
                                ))
                            )}
                            <div ref={logsEndRef} />
                        </div>

                        {/* Active Scenario Info */}
                        {activeScenario && (
                            <div className="px-3 py-2 bg-[#ff003c]/10 border-t border-[#ff003c]/20">
                                <div className="text-xs text-[#ff003c] font-bold mb-1">
                                    🎯 Active Scenario: {activeScenario.name}
                                </div>
                                <div className="text-xs text-gray-400">
                                    Components: {activeScenario.components.join(', ')}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Scenarios Panel (Hidden by default, shown on tab click) */}
                    <div className="hidden flex-1 overflow-y-auto bg-black/20 px-3 py-3 space-y-2">
                        {scenarios.map(scenario => (
                            <div key={scenario.id} className="glass-panel p-3 text-xs space-y-2">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="text-[#00f0ff] font-bold">{scenario.name}</div>
                                        <div className="text-gray-400">{scenario.description}</div>
                                    </div>
                                    <span className="px-2 py-1 bg-gray-700 rounded text-xs whitespace-nowrap">
                                        {scenario.duration}
                                    </span>
                                </div>
                                <div className="text-gray-400">
                                    Components: {scenario.components.join(', ')}
                                </div>
                                <button
                                    onClick={() => runScenario(scenario)}
                                    className="w-full px-2 py-1 bg-[#00f0ff]/20 hover:bg-[#00f0ff]/30 text-[#00f0ff] rounded text-xs font-bold transition"
                                >
                                    ▶ Run Scenario
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* File Upload Panel (Hidden by default) */}
                    <div className="hidden flex-1 overflow-y-auto bg-black/20 px-3 py-3 flex flex-col gap-3">
                        {/* Upload Area */}
                        <div
                            className="border-2 border-dashed border-[#00f0ff]/30 rounded-lg p-6 text-center cursor-pointer hover:bg-[#00f0ff]/10 transition"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <FileUp size={32} className="text-[#00f0ff] mx-auto mb-2" />
                            <input
                                ref={fileInputRef}
                                type="file"
                                multiple
                                onChange={handleFileUpload}
                                className="hidden"
                                accept=".json,.txt,.log,.csv,.js,.jsx,.py"
                            />
                            <div className="text-xs text-[#00f0ff] font-bold mb-1">
                                Click or drag files here
                            </div>
                            <div className="text-xs text-gray-400">
                                Supported: JSON, TXT, LOG, CSV, JS, JSX, PY
                            </div>
                        </div>

                        {/* Uploaded Files List */}
                        {uploadedFiles.length > 0 && (
                            <div className="space-y-2">
                                <div className="text-xs text-[#00f0ff] font-bold">
                                    📁 Uploaded Files ({uploadedFiles.length})
                                </div>
                                {uploadedFiles.map(file => (
                                    <div key={file.id} className="glass-panel p-2 flex items-center justify-between text-xs">
                                        <div className="flex-1">
                                            <div className="text-[#00f0ff] font-bold truncate">{file.name}</div>
                                            <div className="text-gray-400 text-xs">
                                                {file.size} • {file.uploadedAt}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => deletefile(file.id)}
                                            className="p-1 hover:bg-red-900/50 text-red-400 rounded transition ml-2"
                                        >
                                            <Trash2 size={12} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {uploadedFiles.length === 0 && (
                            <div className="text-center text-gray-500 text-xs py-8">
                                No files uploaded yet
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer Stats */}
                <div className="px-4 py-2 border-t border-[#00f0ff]/20 bg-black/40 text-xs text-gray-400 flex justify-between">
                    <div>
                        📊 Logs: {filteredLogs.length} ({debugLogs.filter(l => l.level === 'ERROR').length} errors)
                    </div>
                    <div>
                        📁 Files: {uploadedFiles.length} | Scenarios: {scenarios.length}
                    </div>
                </div>
            </div>
        </div>
    );
}
