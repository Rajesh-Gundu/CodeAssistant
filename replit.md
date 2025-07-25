# Your GitHub Story App

## Overview

This is a full-stack web application called "Your GitHub Story" that creates beautiful, shareable infographics from GitHub user data. The app takes a GitHub username, fetches public activity data via the GitHub API, and displays it as an engaging visual story with charts, statistics, and repository information.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a modern full-stack architecture with a clear separation between client and server:

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for fast development and building
- **Styling**: Tailwind CSS with a custom GitHub-themed dark design system
- **UI Components**: Comprehensive component library using Radix UI primitives with shadcn/ui styling
- **State Management**: React Query (TanStack Query) for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Charts**: Chart.js with react-chartjs-2 for data visualizations

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ESM modules
- **API Design**: RESTful API with a single main endpoint `/api/github/:username`
- **Development Server**: Custom Vite integration for seamless full-stack development

## Key Components

### Client-Side Components

1. **Core Pages**
   - `Home`: Main application page handling the complete user flow
   - `NotFound`: 404 error page

2. **Feature Components**
   - `UsernameForm`: Input form for GitHub username submission
   - `StoryDisplay`: Main container for displaying the generated GitHub story
   - `LoadingSkeleton`: Loading state with animated skeletons
   - `UserProfile`: Displays user's basic GitHub profile information
   - `StatCard`: Reusable component for displaying key statistics
   - `LanguageChart`: Doughnut chart showing programming language distribution
   - `ProductivityChart`: Bar charts for commit activity patterns
   - `TopRepos`: List of user's most starred repositories

### Server-Side Architecture

1. **API Routes** (`server/routes.ts`)
   - Single main endpoint that orchestrates multiple GitHub API calls
   - Fetches user profile, repositories, and language statistics
   - Processes and aggregates data into a structured format

2. **Storage Layer** (`server/storage.ts`)
   - In-memory storage implementation for potential user data caching
   - Interface-based design allowing for future database integration

3. **Development Infrastructure** (`server/vite.ts`)
   - Custom Vite middleware integration
   - Hot module replacement support
   - Development-specific logging and error handling

## Data Flow

1. **User Input**: User enters GitHub username in the form
2. **API Request**: Frontend makes request to `/api/github/:username`
3. **GitHub API Integration**: Server fetches data from multiple GitHub endpoints:
   - User profile (`/users/:username`)
   - User repositories (`/users/:username/repos`)
   - Language statistics for each repository (`/repos/:owner/:repo/languages`)
4. **Data Processing**: Server aggregates and calculates:
   - Total stars and forks across all repositories
   - Top 5 repositories by star count
   - Programming language distribution
   - Repository statistics
5. **Response**: Structured data returned to frontend
6. **Visualization**: Frontend renders interactive charts and statistics
7. **Sharing**: Users can share results via Twitter integration

## External Dependencies

### GitHub API Integration
- **Authentication**: Uses GitHub Personal Access Token via `VITE_GITHUB_TOKEN` environment variable
- **Rate Limiting**: Implements basic rate limiting awareness by limiting language fetching to first 20 repositories
- **Error Handling**: Graceful handling of API failures and user not found scenarios

### Key Third-Party Libraries
- **@neondatabase/serverless**: Database connectivity (prepared for future use)
- **drizzle-orm**: Type-safe database ORM with PostgreSQL dialect
- **axios**: HTTP client for API requests
- **zod**: Runtime type validation for API responses and data schemas
- **chart.js**: Charting library for data visualizations
- **@radix-ui/***: Accessible UI component primitives
- **@tanstack/react-query**: Server state management and caching

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds optimized React bundle to `dist/public`
- **Backend**: esbuild compiles TypeScript server code to `dist/index.js`
- **Combined**: Single deployment package with static assets and API server

### Environment Configuration
- **Development**: Uses `NODE_ENV=development` with Vite dev server integration
- **Production**: Serves static files and API from single Express server
- **Database**: Configured for PostgreSQL via Drizzle ORM (ready for production scaling)

### Database Schema
The application includes Drizzle configuration for PostgreSQL with shared schema definitions, allowing for future features like:
- User data caching
- Story sharing and persistence
- Analytics and usage tracking

The current implementation uses in-memory storage but is architected to easily transition to persistent database storage when needed.