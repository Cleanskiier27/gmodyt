# Spectator Mode - Quick Start Guide

## 🚀 Getting Started

### 1. Open Spectator Mode
- Click the **SPECTATOR** button in bottom-right corner
- A pulsing cyan dot shows it's active
- The side panel slides in from the right

### 2. Three Main Tabs

#### 📊 Debug Console
- **See**: All `console.log()`, `console.error()`, `console.warn()`, `console.info()` messages
- **Filter**: Choose log type (All, Errors, Warnings, Info, Logs)
- **Export**: Download logs as `.txt` file
- **Clear**: Remove all logs from memory

#### 🎯 Scenarios
- **4 Built-in Scenarios**: Ready to run tests
- **Click ▶ Run Scenario**: Start the test
- **Monitor**: Watch console as scenario runs
- **Test Points**: See what's being validated

#### 📁 File Upload
- **Click Zone**: Upload JSON, TXT, LOG, CSV, JS, JSX, PY files
- **Drag & Drop**: Supported for quick uploads
- **Manage**: Delete unwanted files
- **Track**: All uploads logged automatically

---

## 🎯 Common Workflows

### Debugging a Failed Test
```
1. Click "Run Scenario" for test
2. Watch for ERROR messages in console
3. Note timestamp when error occurred
4. Click "Export" to save logs
5. Upload relevant config files
6. Review findings
```

### Testing Configuration
```
1. Create JSON test file
2. Click File Upload tab
3. Upload config file
4. Check console for any warnings
5. Review system status
6. Export logs if needed
```

### Monitoring Performance
```
1. Run scenario
2. Filter to "Info Only"
3. Monitor timing messages
4. Check error count at bottom
5. Export final logs
6. Analyze offline
```

---

## 💡 Pro Tips

✅ **Export regularly** - Don't lose important logs
✅ **Use filters** - Focus on relevant messages
✅ **Read timestamps** - Correlate events precisely
✅ **Upload configs** - Keep test parameters on record
✅ **Label files** - Add timestamps to filenames
✅ **Clear often** - Keep memory usage down

---

## 🔍 Understanding Log Colors

| Color | Level | Meaning |
|-------|-------|---------|
| 🟢 Green | LOG | Standard information |
| 🔵 Blue | INFO | System events |
| 🟡 Yellow | WARN | Potential issues |
| 🔴 Red | ERROR | Critical problems |

---

## 📊 Stats Display

Bottom bar shows:
- **Logs**: Total count + error count
- **Files**: Uploaded file count
- **Scenarios**: Available scenarios

---

## 📱 Mobile Friendly

- Tabs stack nicely on smaller screens
- Touch-friendly buttons
- Scrollable content areas
- Responsive layout

---

## ⚡ Keyboard Navigation

```
Tab           - Switch panels
Enter/Space   - Run scenario / Upload file
Delete        - Remove file
Ctrl+L        - Clear logs (future feature)
Ctrl+E        - Export logs (future feature)
```

---

## 🐛 Troubleshooting

**Q: Logs not appearing?**
A: Check filter isn't set to wrong type. Ensure JavaScript is executing.

**Q: File upload failed?**
A: Verify file is <10MB and format is supported.

**Q: Console messages mixed with app output?**
A: That's normal! Spectator captures ALL console output.

**Q: Export file is empty?**
A: Run some actions first to generate logs. Then export.

---

## 🎮 Example Scenario Run

```
1. Click Scenarios tab
2. Find "Radiation Event Response"
3. Read description and test points
4. Click "▶ Run Scenario"
5. Console shows: "🚀 Starting scenario: Radiation Event Response"
6. Watch for ERROR logs
7. Check components: Sensors, Shields, Navigation
8. After ~45 minutes (or simulation), review results
9. Export logs showing all outcomes
10. Document findings
```

---

## 📈 Performance Notes

- Viewing: Minimal impact
- Logging: ~2-5% CPU for active scenarios
- Memory: ~0.5MB per 100 logs
- Recommendation: Export every 500 logs

---

## 🔐 Privacy & Data

- All logs stay in browser memory
- No data sent to servers
- Export to keep permanent records
- Clearing removes logs from memory only
- Uploads are temporary unless saved

---

**Need more help? See SPECTATOR_MODE_DOCS.md for complete documentation**
