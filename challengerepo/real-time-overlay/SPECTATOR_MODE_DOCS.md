# Critical Spectator Mode - Complete Documentation

## Overview

The **Critical Spectator Mode** is an advanced debugging and monitoring interface integrated into the Avatar World application. It provides reviewers, developers, and scenario managers with comprehensive tools for:

- 🔍 Real-time console monitoring
- 📊 Scenario execution and testing
- 📁 File upload and analysis
- 🐛 Debugging and error tracking
- 📈 Performance monitoring

---

## Access

### Activation
- Click the **SPECTATOR** button in the bottom-right corner of the application
- A pulsing cyan dot indicates active monitoring
- Click again to close the spectator panel

### Keyboard Shortcut (Optional)
```javascript
// Can be extended with:
window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'S') {
        toggleSpectatorMode();
    }
});
```

---

## Features

### 1. Debug Console

#### Real-Time Log Capture
The console automatically captures all output:
- `console.log()` - Standard logs (green indicator)
- `console.error()` - Errors (red indicator)
- `console.warn()` - Warnings (yellow indicator)
- `console.info()` - Information messages (blue indicator)

#### Log Display Format
```
[HH:MM:SS] [LEVEL] Message content
```

Example:
```
[14:32:45] [ERROR] Network connection failed
[14:32:46] [INFO] Attempting reconnection
[14:32:47] [WARN] High latency detected: 150ms
[14:32:48] [LOG] System status: operational
```

#### Filtering
- **All Logs**: Show all captured output
- **Errors Only**: Only ERROR level messages
- **Warnings Only**: Only WARN level messages
- **Info Only**: Only INFO level messages
- **Logs Only**: Only LOG level messages

#### Log Management
- **Export**: Download all logs as `.txt` file
  - Filename: `debug-logs-[timestamp].txt`
  - Format: Plain text with timestamps
  - Use for post-incident analysis

- **Clear**: Remove all captured logs
  - Clears filtering
  - Resets counter
  - Does not affect file history

- **Expand/Collapse**: Toggle console panel height
  - Expand: Full screen dedicated to logs
  - Collapse: Show logs + scenario info

#### Log Statistics
- Total logs captured
- Error count
- File upload count
- Active scenarios

---

### 2. Scenario Management

#### Available Scenarios

**Scenario 01: Multi-Unit Coordination Test**
- Duration: 2h 30m
- Components: Unit-A, Unit-B, Unit-C
- Test Points:
  - Distributed decision-making
  - Resource negotiation
  - Conflict avoidance
  - Communication efficiency
- Status: Ready to run

**Scenario 02: Radiation Event Response**
- Duration: 45m
- Components: Sensors, Shields, Navigation
- Test Points:
  - Radiation detection <2 minutes
  - Shelter route planning
  - Critical system protection
  - Communication during event
- Status: Ready to run

**Scenario 03: Power Management Crisis**
- Duration: 3h
- Components: Battery, Solar, Motor Control
- Test Points:
  - Power budget adherence
  - Non-essential shutdown
  - Route optimization
  - Safe arrival at charging
- Status: Ready to run

**Scenario 04: Material Recognition AI**
- Duration: 4h
- Components: Sensors, AI Model, Spectroscopy
- Test Points:
  - >95% classification accuracy
  - <10s detection time
  - Contamination detection
  - Unknown material handling
- Status: Ready to run

#### Running a Scenario

1. **View Scenario Details**
   - Name and description
   - Duration estimate
   - Components involved
   - Success criteria

2. **Start Execution**
   - Click "▶ Run Scenario" button
   - System automatically logs scenario start
   - Console shows: "🚀 Starting scenario: [Name]"
   - Scenario details displayed in console footer

3. **Monitor Progress**
   - Watch real-time console output
   - Track component interactions
   - Note any errors or warnings
   - Compare against test points

4. **Review Results**
   - Export logs for analysis
   - Check error count
   - Verify all test points passed
   - Document findings

#### Scenario State Tracking
```
Pending → Running → Completed/Failed
```

Current scenario information:
- Name and description
- All active components
- Elapsed time
- Test points progress

---

### 3. File Upload & Management

#### Supported File Types
- **`.json`** - Configuration files, test data, scenarios
- **`.txt`** - Text logs, documentation, notes
- **`.log`** - System logs, debug output
- **`.csv`** - Tabular data, metrics, results
- **`.js`** - JavaScript code, test scripts
- **`.jsx`** - React components, utilities
- **`.py`** - Python scripts, data analysis

#### Upload Methods

**Method 1: Click Upload Area**
- Click the dashed border upload zone
- Select files from system dialog
- Multiple files supported

**Method 2: Drag and Drop**
- Drag files from file explorer
- Drop into upload area
- Automatic processing

#### File Information Display
```
File Name: config-test-01.json
Size: 45.23 KB
Type: application/json
Uploaded: 14:32:45
```

#### File Operations

**View Content**
- Click file to expand content preview
- JSON files display with syntax highlighting
- Text files show raw content
- Large files have scrollable preview

**Delete File**
- Click trash icon (🗑️)
- File removed from upload list
- Does not affect exported logs

**Download File**
- Right-click file
- Select "Save As" to re-download
- Useful for archival

#### Use Cases

**Test Scenario Upload**
```json
{
  "scenario": "test-01",
  "components": ["Unit-A", "Unit-B"],
  "testPoints": 4,
  "expectedDuration": "2.5h"
}
```

**Log Analysis**
Upload previous session logs:
```
[14:22:01] [INFO] Session started
[14:22:05] [ERROR] Connection timeout
[14:22:10] [WARN] Retry attempt 1
[14:22:15] [LOG] Reconnected
```

**Configuration Testing**
Upload system configuration for validation:
```json
{
  "network": { "latency": 45 },
  "battery": { "capacity": 100 },
  "sensors": { "calibrated": true }
}
```

---

## Log Types & Interpretation

### Error Logs (🔴 Red)
```
[14:32:45] [ERROR] Network connection failed
```
**Action**: Investigate immediately, review system state

### Warning Logs (🟡 Yellow)
```
[14:32:46] [WARN] High latency detected: 150ms
```
**Action**: Monitor closely, may indicate degradation

### Info Logs (🔵 Blue)
```
[14:32:47] [INFO] Switching to backup power system
```
**Action**: Standard operational message, for awareness

### Success Logs (🟢 Green)
```
[14:32:48] [LOG] System recovered successfully
```
**Action**: Confirms successful operation

---

## Workflow Examples

### Example 1: Debugging a Failed Scenario

**Steps:**
1. Click SPECTATOR button to open panel
2. Click "Run Scenario" for "Radiation Event Response"
3. Monitor console for ERROR logs
4. If errors appear:
   - Note timestamp
   - Copy error message
   - Click Export to save logs
   - Upload problematic files

**Analysis:**
```
[14:32:01] [INFO] 🚀 Starting scenario: Radiation Event Response
[14:32:05] [ERROR] Radiation sensor timeout
[14:32:06] [WARN] Attempting sensor recalibration
[14:32:10] [LOG] Sensor recovered
[14:32:15] [ERROR] Navigation system unresponsive
→ System failed test point: "Shelter route planning"
```

### Example 2: Analyzing Performance

**Steps:**
1. Run Multi-Unit Coordination Test
2. Let scenario complete
3. Filter logs to show all messages
4. Export logs with specific timestamp
5. Upload scenario configuration file
6. Compare with baseline

**Analysis:**
```
Total Logs: 247
Errors: 3
Warnings: 12
Duration: 2h 31m (expected: 2h 30m)
Success Rate: 95.8%
```

### Example 3: Configuration Testing

**Steps:**
1. Create test configuration (JSON)
2. Upload configuration file
3. Review system status in console
4. Note any warnings or errors
5. Document results

**Configuration:**
```json
{
  "units": 3,
  "coordination": "distributed",
  "timeLimit": "2.5h",
  "criticalTests": [
    "decision_making",
    "resource_negotiation",
    "communication"
  ]
}
```

---

## Technical Details

### Console Hooking
The spectator mode intercepts all console methods:
```javascript
console.log() → Captured as LOG level
console.error() → Captured as ERROR level
console.warn() → Captured as WARN level
console.info() → Captured as INFO level
```

### Log Object Structure
```javascript
{
  id: timestamp + random,           // Unique identifier
  timestamp: "HH:MM:SS",            // Human readable time
  level: "LOG|ERROR|WARN|INFO",     // Message level
  message: "string",                // Formatted message
  details: [...args]                // Original arguments
}
```

### Auto-Scroll Behavior
- Console automatically scrolls to latest log
- Smooth scrolling enabled
- Maintains scroll position on pause

### Memory Management
- Logs stored in component state
- Memory usage ~1-5MB for 1000 logs
- Export and clear regularly for long sessions

---

## Best Practices

### ✅ DO:
- Export logs before clearing
- Label uploaded files with timestamps
- Run scenarios sequentially
- Monitor error count regularly
- Document findings after each test

### ❌ DON'T:
- Leave spectator mode open unnecessarily (slight performance impact)
- Upload extremely large files (>10MB)
- Keep thousands of logs without export
- Run multiple scenarios simultaneously
- Ignore warning logs

---

## Troubleshooting

### Issue: Console Logs Not Appearing
**Solution**: 
- Check filter selection
- Ensure spectator mode is open
- Verify page JavaScript is executing
- Check browser console (F12) for errors

### Issue: File Upload Failed
**Solution**:
- Verify file format is supported
- Check file size (<10MB recommended)
- Ensure file is not corrupted
- Try uploading from different location

### Issue: Scenario Stuck/Not Running
**Solution**:
- Check console for ERROR logs
- Verify all components are active
- Close other applications consuming resources
- Reload page and try again

### Issue: Export File Empty
**Solution**:
- Ensure logs exist before export
- Check file permissions
- Try exporting to different location
- Check browser download settings

---

## Performance Impact

### CPU Usage
- Minimal: <2% when idle
- Moderate: 2-5% while logging
- Active monitoring may impact real-time performance

### Memory Usage
- Base: ~2MB for UI
- Per 100 logs: ~0.5MB
- Recommended: Export and clear every 500 logs

### Network Impact
- Zero network overhead
- File uploads: Uses user's bandwidth
- Scenario monitoring: No extra network traffic

---

## Integration Examples

### Custom Scenario Upload
```javascript
const customScenario = {
  id: 'scenario-custom-01',
  name: 'Custom Test',
  description: 'User-defined test scenario',
  duration: '1h',
  components: ['Component-1', 'Component-2'],
  testPoints: ['Test 1', 'Test 2', 'Test 3']
};

// Upload via file or directly call:
console.info('Custom scenario loaded', customScenario);
```

### Error Logging
```javascript
try {
  // Risky operation
  riskyFunction();
} catch (error) {
  console.error('Operation failed:', error.message, error.stack);
  // Automatically captured by spectator mode
}
```

### Performance Monitoring
```javascript
const startTime = performance.now();
// Perform operation
const endTime = performance.now();
console.info(`Operation completed in ${endTime - startTime}ms`);
```

---

## Keyboard Shortcuts (Future Enhancement)

```
Ctrl+Shift+S    Open/Close Spectator Mode
Ctrl+L          Clear Logs
Ctrl+E          Export Logs
Ctrl+F          Filter Logs
Tab             Switch Panels (Debug/Scenarios/Files)
```

---

## Support & Feedback

For issues or feature requests:
1. Check troubleshooting section
2. Export all relevant logs
3. Document reproduction steps
4. Upload scenario file if applicable
5. Contact support with documentation

---

## Version History

**v1.0 (Current)**
- Debug console with filtering
- 4 pre-built scenarios
- File upload support
- Log export functionality
- Automatic console capturing

**Future Enhancements**
- Video recording of scenarios
- Real-time collaboration
- Automated test execution
- Performance profiling
- Scenario templates library

---

**Critical Spectator Mode v1.0**
*Advanced debugging and monitoring for Avatar World Challenge*
