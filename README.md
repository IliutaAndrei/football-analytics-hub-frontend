# Football Analytics Hub - Frontend

A modern, responsive web application for exploring football statistics, leagues, teams, and player data. Built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Country & League Browser**: Explore football leagues organized by country
- **Season Statistics**: View detailed standings, team rankings, and performance metrics
- **Team Analytics**: Access comprehensive team statistics, squad information, and match history
- **Player Profiles**: Detailed player statistics including goals, assists, discipline, and match performance
- **Match Statistics**: In-depth fixture analysis with possession, shots, passes, and player-by-player data
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional interface with smooth animations and transitions

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **React Query (TanStack Query)** - Data fetching and caching
- **React Router** - Client-side routing
- **Axios** - HTTP client

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Backend API running (see [backend repository](https://github.com/IliutaAndrei/football-analytics-hub))

## 🔧 Installation

1. Clone the repository

```bash
git clone https://github.com/IliutaAndrei/football-analytics-hub-frontend.git
cd football-analytics-hub-frontend
```

2. Install dependencies

```bash
npm install
```

3. Create `.env` file in root directory

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

4. Start development server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📦 Build

Create production build:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

Built files will be in the `dist/` directory.

## 🏗️ Project Structure

src/
├── features/ # Feature-based modules
│ ├── countries/ # Countries listing
│ ├── leagues/ # Leagues by country
│ ├── seasons/ # Season selection
│ ├── teams/ # Teams listing
│ ├── standings/ # League standings
│ ├── fixtures/ # Match fixtures and statistics
│ └── players/ # Player profiles and statistics
├── shared/ # Shared components
│ └── components/ # Navbar, Layout
├── pages/ # Page components
├── App.tsx # Main app component
└── main.tsx # Entry point

## 🎨 Key Pages

- **Home** (`/`) - Landing page with feature overview
- **Countries** (`/countries`) - Browse countries with football leagues
- **Leagues** (`/leagues/:countryCode`) - View leagues by country
- **Seasons** (`/leagues/:leagueId/seasons`) - Select season to explore
- **Teams** (`/leagues/:leagueId/seasons/:seasonYear/teams`) - Browse teams
- **Standings** (`/leagues/:leagueId/seasons/:seasonYear/standings`) - League table
- **Fixtures** (`/leagues/:leagueId/seasons/:seasonYear/teams/:teamId/fixtures`) - Team fixtures
- **Team Details** (`/leagues/:leagueId/seasons/:seasonYear/teams/:teamId`) - Team overview
- **Squad** (`/teams/:teamId/squad`) - Team squad by position
- **Player Profile** (`/players/:playerId/profile`) - Player information
- **Player Statistics** (`/players/:playerId/statistics`) - Season performance stats

## 🎨 Design Features

- **Tailwind CSS** for rapid, consistent styling
- **Responsive design** with mobile-first approach
- **Gradient accents** and smooth transitions
- **Empty states** with helpful messaging
- **Loading states** with spinners
- **Error handling** with user-friendly messages
- **Search functionality** across all list views
- **Alphabetical grouping** for countries
- **Type-based grouping** for leagues
- **Position-based grouping** for squad players

## 🔗 Related Repositories

- [Backend API](https://github.com/IliutaAndrei/football-analytics-hub) - Spring Boot REST API

## 🖼️ Screenshots

_Add screenshots here after deployment_

## 👨‍💻 Author

**Iliuta Andrei**

- GitHub: [@IliutaAndrei](https://github.com/IliutaAndrei)

## 📄 License

This project is part of a university thesis project.

---

Made with ⚽ and ❤️
