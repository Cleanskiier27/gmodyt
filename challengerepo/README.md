# NetworkBuster Challenge Repository

This directory contains interactive web applications for the NetworkBuster Lunar Recycling System.

## Applications

### 1. nbapp - NetworkBuster Control Dashboard

The main control interface for the Lunar Recycling System.

**Features:**
- Real-time system status monitoring (temperature, battery, CPU load, uptime)
- Processing unit control with live progress tracking
- Material queue management with priority handling
- Active chamber monitoring (Thermal, Mechanical, Chemical, Biological)
- Live performance metrics (power usage, efficiency, processed materials)

**Running the app:**
```bash
cd nbapp
npm install
npm run dev
```

**Building for production:**
```bash
npm run build
```

### 2. usbnb - USB NetworkBuster Device Manager

A comprehensive USB device management interface for data transfer and storage monitoring.

**Features:**
- Connected device list with real-time status
- Live data transfer monitoring (download/upload speeds)
- Storage usage visualization across multiple devices
- Recent transfer history tracking
- Quick actions for storage optimization

**Running the app:**
```bash
cd usbnb
npm install
npm run dev
```

**Building for production:**
```bash
npm run build
```

### 3. real-time-overlay

An existing real-time data overlay application with satellite mapping and camera feeds.

## Technology Stack

All applications are built with:
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Lucide React** - Icon library
- **Recharts** - Data visualization
- **Framer Motion** - Animations
- **TailwindCSS** - Styling (via classes)

## Development

Each application is independent and can be developed separately:

1. Navigate to the app directory
2. Install dependencies: `npm install`
3. Start dev server: `npm run dev`
4. Build for production: `npm run build`

## Design Theme

All apps follow a consistent design language:
- Dark, futuristic glassmorphism UI
- Color-coded status indicators
- Smooth animations and transitions
- Responsive layouts
- Sci-fi inspired aesthetics

## NetworkBuster.net

These applications are part of the NetworkBuster initiative for advancing space technology and sustainable systems.

**Website**: [networkbuster.net](https://networkbuster.net) (conceptual)
