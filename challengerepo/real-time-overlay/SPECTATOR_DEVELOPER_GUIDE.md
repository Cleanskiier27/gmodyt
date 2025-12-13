# Spectator Mode - Developer Guide

## Architecture

### Component Structure

```
SpectatorButton
├── Toggle button (bottom-right)
└── Manages spectator open/close state

SpectatorMode
├── Header (title + close button)
├── Tabs Navigation
│   ├── Debug Console
│   ├── Scenarios
│   └── File Upload
├── Content Area (tab-specific)
│   ├── Console: Logs + filters + controls
│   ├── Scenarios: List of test scenarios
│   └── Files: Upload area + file list
└── Footer (statistics)
```

### Data Flow

```
App.jsx
  ↓
SpectatorButton (state management)
  ↓
SpectatorMode (core UI & logic)
  ├→ Console Capture (console hooks)
  ├→ File Upload (FileReader API)
  └→ Scenario Management (local state)
```

---

## Integration with App

### 1. Import Components
```javascript
import SpectatorButton from './components/SpectatorButton'
```

### 2. Add to JSX
```jsx
<div className="relative w-screen h-screen overflow-hidden">
    <AvatarWorld />
    <SpectatorButton />  {/* Add this */}
    {/* Rest of app */}
</div>
```

### 3. Verify Console Output
```javascript
// Anywhere in app, these are now captured:
console.log('Standard log');
console.error('Error message');
console.warn('Warning!');
console.info('Info message');
```

---

## Core Features Implementation

### 1. Console Capturing

```javascript
// Hooks into native console methods
const originalLog = console.log;
console.log = (...args) => {
    originalLog(...args);  // Still show in dev tools
    captureLog('LOG', args);  // Also capture in spectator
};
```

**Advantages:**
- Non-invasive (doesn't modify app code)
- Captures stack traces
- Preserves original behavior
- Works with any console output

### 2. Log Storage

```javascript
const [debugLogs, setDebugLogs] = useState([]);

// Each log entry:
{
    id: timestamp + random,    // Unique ID
    timestamp: "14:32:45",     // Human readable
    level: "ERROR|WARN|INFO|LOG",
    message: "Formatted string",
    details: [...originalArgs]
}
```

**Storage Limits:**
- Browser memory: ~50-100MB available
- 1 log entry: ~0.5KB average
- Capacity: ~100,000 logs before slowdown
- Recommendation: Export every 500 logs

### 3. File Upload Handler

```javascript
const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    
    files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const fileContent = e.target.result;
            // Process file content
        };
        reader.readAsText(file);  // Text-based files
    });
};
```

**Supported Formats:**
- JSON: Parse and validate
- TXT: Display as-is
- LOG: Show with timestamps
- CSV: Tabular display
- JS/JSX: Show code with syntax
- PY: Show Python code

### 4. Scenario Management

```javascript
const scenarios = [
    {
        id: 'scenario-01',
        name: 'Test Name',
        description: 'What it tests',
        duration: 'Estimated time',
        components: ['Component1', 'Component2'],
        testPoints: ['Point 1', 'Point 2']
    }
];

const runScenario = (scenario) => {
    setActiveScenario(scenario);
    console.info(`🚀 Starting: ${scenario.name}`);
    // Scenario execution logic
};
```

---

## Adding Custom Scenarios

### Step 1: Create Scenario Object
```javascript
const myScenario = {
    id: 'scenario-custom-01',
    name: 'Custom Test Name',
    description: 'What this scenario tests',
    status: 'pending',
    duration: '2h',
    components: ['Component-A', 'Component-B'],
    testPoints: [
        'First success criterion',
        'Second success criterion',
        'Third success criterion'
    ]
};
```

### Step 2: Add to Scenarios Array
In `SpectatorMode.jsx`:
```javascript
const defaultScenarios = [
    // ... existing scenarios ...
    myScenario  // Add your custom scenario
];
```

### Step 3: Implement Scenario Logic
Add logic in the scenario execution:
```javascript
const runScenario = (scenario) => {
    setActiveScenario(scenario);
    
    if (scenario.id === 'scenario-custom-01') {
        // Your custom logic
        console.info('Starting custom test');
        // Call functions, trigger tests, etc.
    }
};
```

### Example: Custom Test Scenario
```javascript
{
    id: 'scenario-performance-test',
    name: 'Performance Benchmarking',
    description: 'Test system performance under load',
    duration: '30m',
    components: ['CPU', 'Memory', 'Network'],
    testPoints: [
        'CPU usage <80%',
        'Memory usage <500MB',
        'Latency <100ms',
        'Throughput >100 Mbps'
    ]
}
```

---

## Adding File Type Support

### Step 1: Update Accept Attribute
```javascript
<input
    accept=".json,.txt,.log,.csv,.js,.jsx,.py,.xml,.yaml"
    multiple
/>
```

### Step 2: Create Parser Function
```javascript
const parseFile = (file, content) => {
    switch(file.type) {
        case 'application/json':
            return JSON.parse(content);
        case 'text/plain':
            return content;
        // Add more types...
    }
};
```

### Step 3: Display Parsed Content
```javascript
const displayFile = (file) => {
    const parsed = parseFile(file, file.content);
    return (
        <pre className="font-mono text-xs overflow-auto">
            {JSON.stringify(parsed, null, 2)}
        </pre>
    );
};
```

---

## Extending Features

### Feature: Log Search
```javascript
const [searchTerm, setSearchTerm] = useState('');

const searchLogs = (logs, term) => {
    return logs.filter(log => 
        log.message.toLowerCase().includes(term.toLowerCase())
    );
};
```

Add to controls:
```jsx
<input
    type="text"
    placeholder="Search logs..."
    onChange={(e) => setSearchTerm(e.target.value)}
/>
```

### Feature: Log Grouping
```javascript
const groupLogs = (logs, groupBy = 'level') => {
    return logs.reduce((groups, log) => {
        const key = log[groupBy];
        if (!groups[key]) groups[key] = [];
        groups[key].push(log);
        return groups;
    }, {});
};
```

### Feature: Scenario Scheduling
```javascript
const [scheduledScenarios, setScheduledScenarios] = useState([]);

const scheduleScenario = (scenario, delay) => {
    setTimeout(() => runScenario(scenario), delay * 1000);
    console.info(`Scheduled: ${scenario.name} in ${delay}s`);
};
```

### Feature: Export Options
```javascript
const exportLogs = (format = 'txt') => {
    let content;
    
    switch(format) {
        case 'csv':
            content = debugLogs.map(log => 
                `"${log.timestamp}","${log.level}","${log.message}"`
            ).join('\n');
            break;
        case 'json':
            content = JSON.stringify(debugLogs, null, 2);
            break;
        default: // txt
            content = debugLogs.map(log =>
                `[${log.timestamp}] ${log.level}: ${log.message}`
            ).join('\n');
    }
    
    downloadAs(content, `logs-${Date.now()}.${format}`);
};
```

---

## Performance Optimization

### 1. Virtual Scrolling (for large logs)
```javascript
import { FixedSizeList } from 'react-window';

<FixedSizeList
    height={600}
    itemCount={logs.length}
    itemSize={35}
    width="100%"
>
    {({ index, style }) => (
        <div style={style}>{logs[index].message}</div>
    )}
</FixedSizeList>
```

### 2. Log Pagination
```javascript
const itemsPerPage = 50;
const [currentPage, setCurrentPage] = useState(1);

const paginatedLogs = debugLogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
);
```

### 3. Web Workers for Log Processing
```javascript
// In worker.js
self.onmessage = (e) => {
    const filteredLogs = filterLogs(e.data);
    self.postMessage(filteredLogs);
};

// In component
const worker = new Worker('worker.js');
worker.postMessage(debugLogs);
```

---

## Testing Spectator Mode

### Unit Tests
```javascript
// Test log capture
test('captures console.log', () => {
    console.log('test message');
    expect(debugLogs).toContain(expect.objectContaining({
        level: 'LOG',
        message: 'test message'
    }));
});

// Test filtering
test('filters by error level', () => {
    const filtered = debugLogs.filter(l => l.level === 'ERROR');
    expect(filtered).toHaveLength(3);
});
```

### Integration Tests
```javascript
// Test scenario execution
test('runs scenario correctly', async () => {
    renderSpectatorMode();
    clickButton('▶ Run Scenario');
    await waitFor(() => {
        expect(console.info).toHaveBeenCalledWith(
            expect.stringContaining('🚀 Starting')
        );
    });
});

// Test file upload
test('uploads file successfully', async () => {
    const file = new File(['test'], 'test.json');
    await uploadFile(file);
    expect(uploadedFiles).toHaveLength(1);
});
```

### E2E Tests
```javascript
// Test full workflow
test('complete debug workflow', async () => {
    // 1. Open spectator
    clickButton('.spectator-button');
    
    // 2. Run scenario
    clickButton('▶ Run Scenario');
    
    // 3. Monitor logs
    expect(debugLogs.length).toBeGreaterThan(0);
    
    // 4. Export logs
    clickButton('Export');
    expectDownload('debug-logs-*.txt');
});
```

---

## Best Practices

✅ **DO:**
- Export logs regularly during long sessions
- Use meaningful console messages
- Label uploaded files with timestamps
- Document custom scenarios thoroughly
- Test scenarios in isolation first

❌ **DON'T:**
- Leave spectator open unnecessarily (small performance impact)
- Upload files >10MB
- Run all scenarios simultaneously
- Log sensitive data
- Keep thousands of logs without cleanup

---

## API Reference

### SpectatorMode Props
```javascript
<SpectatorMode 
    isOpen={boolean}      // Controls visibility
    onClose={function}    // Called when closed
/>
```

### Available Methods
```javascript
console.log(message)    // LOG level
console.error(message)  // ERROR level
console.warn(message)   // WARN level
console.info(message)   // INFO level
```

### State Variables
```javascript
debugLogs[]         // Array of captured logs
uploadedFiles[]     // Array of uploaded files
scenarios[]         // Array of scenarios
activeScenario      // Currently running scenario
activeTab           // Current tab (debug/scenarios/files)
logFilter           // Current log filter
```

---

## Troubleshooting for Developers

**Console hooks not working?**
- Check that SpectatorMode is mounted
- Verify isOpen prop is true
- Check for conflicting console mocking

**Files not uploading?**
- Check file size (<10MB)
- Verify MIME type is supported
- Check browser permissions
- Check for CORS issues

**Scenarios not running?**
- Verify scenario object structure
- Check console for error messages
- Ensure components exist in app
- Review test points carefully

---

**Happy Debugging! 🐛**
