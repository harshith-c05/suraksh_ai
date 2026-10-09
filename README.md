# SURAKSH — AI-Powered Road Safety & Smart City Intelligence Platform

> **AI-Based High-Risk Road Location Identification and Visualization System**  
> *Detect Risk. Prioritize Action. Build Safer Roads.*

**Domain:** AI for Smart Cities and Sustainability | **Stack:** React 18 · TypeScript · Vite · Leaflet GIS · Recharts · Tailwind CSS

---

## 📌 Overview

**SURAKSH** bridges the gap between everyday **citizens** reporting road hazards and **government authorities** who need data-driven tools to identify dangerous corridors, prioritize interventions, and measure their impact.

- 🗺️ **Citizens** — Report hazards with GPS, photo evidence, and 9-category taxonomy. Track submissions in real-time.
- 🏛️ **Authorities** — Interactive GIS map, explainable AI priority queue, report triage, safety analytics, and intervention audit.
- 🤖 **AI Copilot** — Context-grounded floating assistant answering queries from the live dataset.

---

## 👥 Role-Based Access

| Role | Entry Point | Access |
|---|---|---|
| **Citizen** | `/citizen/dashboard` | Report hazards, track submissions, view map |
| **Authority** | `/authority/dashboard` | Full GIS console, hotspots, triage, analytics |

---

## 🌟 Feature Breakdown

### Citizen Portal
| Feature | Description |
|---|---|
| Hazard Reporting Form | 9-category taxonomy with GPS geolocation + Nominatim reverse geocoding |
| AI Image Classifier | Simulated confidence-scored visual hazard detection on upload |
| Anonymous Reporting | Submit without identity disclosure |
| My Reports Tracker | Filter/search submissions; view status timeline + official responses |
| Status Lifecycle | `Submitted → Under Review → Verified → In Progress → Resolved` |

### Authority Console
| Feature | Description |
|---|---|
| Live GIS Map | Leaflet + OpenStreetMap with risk-coded corridor markers, accident heatmap, hazard pins |
| Priority Queue (Hotspots) | Ranked corridors with explainable AI scores (0–100), interactive weight sliders, CSV export |
| Hazard Reports Triage | Verify, reject, assign teams, update status with official notes |
| Safety Analytics | Recharts: crash type pie chart, speed limit distribution, time-of-day histogram, weekly trend |
| Intervention Audit | Before-and-after records showing crash/fatality reductions |
| Notification Centre | Critical hazard alerts, cluster detections, overdue reviews, weekly summaries |

---

## 🗺️ Supported Cities

| City | Default | Corridors |
|---|---|---|
| **Bengaluru Metro** | ✅ | Silk Board, ORR Bellandur, Hebbal, Domlur, Mysuru Rd, Tin Factory... |
| **Delhi NCR** | Selectable | Select from city dropdown |
| **Basel City (Switzerland)** | Selectable | Reference UI pilot: Elisabethenanlage, Margarethenstrasse, Spalenring... |

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** ≥ 18.x · **npm** ≥ 9.x

```bash
git clone https://github.com/harshith-c05/SAMAI.git
cd SAMAI
npm install
npm run dev
```

Visit: **http://localhost:5173**

### Production Build
```bash
npm run build
npm run preview
```

---

## 🔑 Demo Credentials

The login page has **1-click demo buttons** for instant evaluation.

| Role | Identifier | Password |
|---|---|---|
| **Authority Official** | `TP-40218` | Any |
| **Citizen** | `ananya.sharma@community.org` | Any |

> Data is pre-seeded to `localStorage`. Use **Reset All Data** in Profile → System Tools to restore defaults.

---

## 🧪 Tests

```bash
npm test
```

Tests cover the deterministic **Priority Scoring Engine** (`src/utils/priorityScoring.test.ts`) — all risk category thresholds, weight normalization, and corridor re-ranking.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite 6 + TypeScript 5.6 |
| Routing | React Router DOM v6 |
| Styling | Tailwind CSS v3 + Custom Dark Token System + Inter (Google Fonts) |
| GIS / Maps | Leaflet 1.9 + React-Leaflet 4 + OpenStreetMap tiles |
| Charts | Recharts 2 |
| Icons | Lucide React |
| Persistence | React Context + Browser LocalStorage |
| Testing | Vitest |
| Build | Vite + Rollup (manual chunk splitting) |

---

## 📁 Project Structure

```
SAMAI/
├── index.html
├── vite.config.ts              # Build + chunk splitting
├── tailwind.config.js          # Design token system
├── src/
│   ├── App.tsx                 # Router + protected routes
│   ├── index.css               # Global styles + Leaflet dark overrides
│   ├── types/index.ts          # TypeScript interfaces
│   ├── data/mockData.ts        # Seeded corridors, reports, incidents, notifications
│   ├── context/                # AuthContext + DataContext (global state)
│   ├── services/               # LocalStorage CRUD abstraction
│   ├── utils/                  # Priority scoring engine + CSV export
│   ├── components/             # Navbar, Sidebar, GISMap, SafetyCopilot, Badges
│   └── pages/                  # 9 full pages (citizen + authority + login + profile)
```

---

## 🧠 AI Priority Scoring Formula

```
Score = (Severity × 0.40) + (Frequency × 0.25) + (Recency × 0.20) + (Evidence × 0.15)
```

| Sub-score | Based On |
|---|---|
| Severity | Fatal × 5 + Severe × 3 + Slight × 1 (normalized) |
| Frequency | Total incident count (normalized) |
| Recency | Trend: increasing=90, stable=60, decreasing=30 |
| Evidence | Verified citizen report count (normalized) |

Weights are user-adjustable live on the Hotspots page. Formula is **fully transparent** — each corridor shows a human-readable explanation of its score.

---

## 📦 Bundle Chunks (Code-Split)

| Chunk | Contents | Gzip |
|---|---|---|
| `leaflet-vendor` | leaflet + react-leaflet | ~45 KB |
| `react-vendor` | react + react-dom + react-router | ~54 KB |
| `recharts-vendor` | recharts | ~114 KB |
| `lucide-vendor` | lucide-react | ~7 KB |
| `index` | All app code | ~45 KB |

---

## 📜 License

MIT License — Free for educational and non-commercial use.

---

## 🏆 Built For

**Inter-College Hackathon** — Domain: *AI for Smart Cities and Sustainability*  
Team: SURAKSH | GitHub: [harshith-c05/SAMAI](https://github.com/harshith-c05/SAMAI)


---

## 🌟 Key Features

### 1. Citizen Hazard Reporting Portal (Reference Image 1)
- **Photo Upload & Simulated AI Classifier**: Drag-and-drop or snap road damage photos with automatic visual hazard confidence scoring.
- **GPS Pinpointing & Geocoding**: One-tap current location acquisition with OpenStreetMap Nominatim reverse address resolution.
- **Road Safety Taxonomies**: Potholes, damaged signs, dark streetlights, dangerous junctions, unsafe construction zones, damaged pedestrian crossings, road obstructions, and recurring near-miss collision spots.
- **Lifecycle Tracking**: Real-time progress tickets (`Submitted` → `Under Review` → `Verified` → `In Progress` → `Resolved`).

### 2. Authority GIS Analytics Console (Reference Image 2)
- **Full-Screen Interactive Map**: Leaflet + OpenStreetMap engine with color-coded risk markers and accident heatmap buffer zones.
- **Top High-Risk Corridors Panel**: Ranked list with cyan risk bars, incident counts, and single-click map zoom synchronization.
- **Telemetry Charts**: Collision severity breakdown (Slight, Severe, Fatal), speed limit distributions, and road types.
- **Corridor Detail Popups**: Overall Rank, Braking percentile, Collision percentile, Overspeeding frequency, and VRU density.
- **GIS Layers Widget**: Independent toggles for hazard reports, accident heatmaps, corridors, and live filters.

### 3. Authority Gateway (Reference Image 3)
- **Sleek Deep Navy Interface**: Dark cybernetic glassmorphism card with glowing status indicators.
- **Dual-Role Switcher**: Seamless switching between **Public Citizen** and **Government Official** modes.
- **1-Click Hackathon Evaluator Logins**: Pre-authenticated buttons for instant judge testing.

### 4. Road Safety Priority Queue (Main Differentiating Feature)
- **Explainable Multi-Factor Formula**: Deterministic, transparent scoring (0–100) combining crash severity, crash volume, recency trends, and verified citizen reports.
- **Interactive AI Weight Tuner**: Live sliders to calibrate weights and observe real-time priority rank re-ordering.
- **CSV Data Export**: One-click export for official municipal reporting.

### 5. SURAKSH Safety Copilot (AI Assistant)
- **Floating AI Assistant**: Anchored bottom-right on all screens.
- **Grounded Responses**: Answers questions on top corridors, unresolved hazards, and inspection recommendations using the live dataset.

### 6. Safety Analytics & Before-and-After Audit
- **Empirical Before & After Tracking**: Monitors crash and fatality reductions following physical interventions (e.g., speed tables, LED luminaires, signal retiming).
- **Daily Operations Digest & Weekly Reports**: Exportable and printable.

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js** (v18.0.0 or higher recommended)
- **npm** (v9.0.0 or higher)

### Installation & Run

1. Clone or navigate to the project directory:
```bash
cd c:/SAMAI
```

2. Install dependencies (if not already installed):
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5173
```

---

## 🧪 Running Automated Tests

Run the test suite for the deterministic scoring engine and priority queue algorithm:
```bash
npm test
```

---

## 🛠 Technology Stack

- **Framework**: React 18 + Vite + TypeScript
- **Styling**: Tailwind CSS + Custom Dark Theme Tokens
- **Mapping & GIS**: Leaflet + React-Leaflet + CARTO Positron / OpenStreetMap
- **Data Visualization**: Recharts
- **Icons**: Lucide React
- **Persistence**: Reactive Browser LocalStorage with pre-seeded Smart City dataset
- **Testing**: Vitest
