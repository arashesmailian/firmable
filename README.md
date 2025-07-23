# Firmable Demo - Australian Business Search Platform

A modern, responsive web application built with Next.js that allows users to search and filter through a comprehensive database of Australian businesses. This project demonstrates advanced search capabilities, clean architecture, and real-time data filtering.

## 🌐 Live Demo

**Project URL:** [https://firmable-demo-arash.vercel.app/](https://firmable-demo-arash.vercel.app/)

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Data Pipeline](#-data-pipeline)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Custom Hooks](#-custom-hooks)
- [Components](#-components)
- [Database Schema](#-database-schema)
- [Performance Optimizations](#-performance-optimizations)

## 🔍 Overview

This application provides a user-friendly interface to search through 77,000+ Australian business records. Users can filter businesses by name, GST status, state, and postcode with real-time search capabilities and pagination.

The project was built as a take-home assessment, focusing on creating a production-ready application that demonstrates:

- Clean data extraction and normalization
- Modern React patterns with TypeScript
- Responsive design with Tailwind CSS
- Real-time search with debouncing
- Scalable architecture

## ✨ Features

- **Advanced Search & Filtering**

  - Real-time search with 400ms debouncing for text inputs
  - Dropdown filters for GST status and Australian states
  - Postcode validation and filtering
  - Clear all filters functionality

- **Responsive Design**

  - Mobile-first approach
  - Dark/Light theme toggle
  - Adaptive layouts for all screen sizes
  - Smooth animations and transitions

- **Performance Optimized**

  - Pagination with 30 items per page
  - Memoized components and hooks
  - Efficient database queries with Supabase
  - Debounced search to reduce API calls

- **User Experience**
  - Loading states and error handling
  - Search result counters
  - Intuitive filter interface
  - Accessible design patterns

## 🛠 Tech Stack

### Frontend

- **Next.js 15.3.5** - React framework with App Router
- **React 19** - UI library with latest features
- **TypeScript** - Type safety and developer experience
- **Tailwind CSS** - Utility-first CSS framework

### Backend & Database

- **Supabase** - PostgreSQL database with real-time capabilities
- **Python** - Data extraction and processing script

### Development Tools

- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📁 Project Structure

```
firmable-demo/
├── public/                     # Static assets
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── globals.css         # Global styles and theme variables
│   │   ├── layout.tsx          # Root layout component
│   │   └── page.tsx           # Home page
│   ├── components/             # Reusable UI components
│   │   ├── CompaniesClient.tsx # Main client component
│   │   ├── TextInput.tsx       # Debounced text input
│   │   ├── DropDownInput.tsx   # Dropdown filter component
│   │   ├── ResultList.tsx      # Business results table
│   │   ├── LoadMoreButton.tsx  # Pagination component
│   │   ├── ThemeToggle.tsx     # Dark/Light theme switcher
│   │   └── ...                # Other UI components
│   ├── hooks/                  # Custom React hooks
│   │   ├── useCompanies.ts     # Business data fetching logic
│   │   ├── useCompanySearch.ts # Search state management
│   │   ├── useDebounce.ts      # Debouncing utility
│   │   ├──  usePagination.ts    # Pagination logic
│   │   └── usePagination.ts    # Detecting Device
│   ├── lib/                    # Utility functions and configurations
│   │   ├── supabase/          # Supabase client configuration
│   │   └── handlers.ts        # Data transformation utilities
│   ├── types/                  # TypeScript type definitions
│   │   ├── Company.ts         # Business entity types
│   │   ├── Filters.ts         # Search filter types
│   │   └── PaginationInfo.ts  # Pagination types
│   └── constants/             # Application constants
│       ├── au_states.ts       # Australian states data
│       ├── gst_status.ts      # GST status options
│       └── pagination.ts      # Pagination settings
├── import_to_supabase.py      # Data extraction script
└── ...configuration files
```

## 🔄 Data Pipeline

### Data Extraction Process

The project includes a custom Python script (`import_to_supabase.py`) that handles the complete data extraction and normalization pipeline:

#### 1. **XML Data Processing**

```python
# Extracts data from Australian government XML files
# Handles both MainEntity and LegalEntity structures
# Processes NonIndividualName and IndividualName formats
```

#### 2. **Data Transformation**

- **Business Names**: Extracts and combines given names and family names for individuals
- **ABN Numbers**: Validates and stores Australian Business Numbers
- **GST Status**: Normalizes status codes (ACT, CAN, NON)
- **Addresses**: Extracts state and postcode information
- **Timestamps**: Preserves record update dates

#### 3. **Database Import**

- Connects to Supabase PostgreSQL database
- Generates UUID primary keys for each record
- Implements error handling and logging
- Processes 77,000+ business records efficiently

#### 4. **Data Schema**

```sql
businesses (
  id: UUID PRIMARY KEY,
  abn: TEXT,
  name: TEXT,
  gst: TEXT,
  address_state: TEXT,
  address_postcode: TEXT,
  record_last_updated: TIMESTAMP
)
```

## 🏗 Architecture

### Component Architecture

The application follows a clean, modular architecture with clear separation of concerns:

#### **Presentation Layer**

- Reusable UI components with consistent styling
- Theme-aware components supporting dark/light modes
- Responsive design patterns

#### **Business Logic Layer**

- Custom hooks for data fetching and state management
- Debounced search implementation
- Pagination and filtering logic

#### **Data Layer**

- Supabase client configuration
- Type-safe database queries
- Error handling and loading states

### State Management Strategy

The application uses React's built-in state management with custom hooks:

- **Local State**: Component-specific UI state
- **Shared State**: Search filters and pagination via custom hooks
- **Server State**: Business data fetched from Supabase

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account and project

### Installation

1. **Clone the repository**

```bash
git clone [repository-url]
cd firmable-demo
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

```bash
cp .env.example .env.local
# Edit .env.local with your Supabase credentials
```

4. **Run the development server**

```bash
npm run dev
```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔐 Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🎣 Custom Hooks

### `useCompanies`

Manages business data fetching, pagination, and error states.

- Integrates with Supabase for real-time data
- Handles complex filtering logic
- Manages loading and error states

### `useCompanySearch`

Handles search state management and filter coordination.

- Manages filter state with type safety
- Coordinates debounced and immediate filters
- Provides search trigger functionality

### `useDebounce`

Implements debouncing for performance optimization.

- 400ms delay for text inputs
- Prevents excessive API calls
- Improves user experience

### `usePagination`

Manages pagination state and navigation.

- Configurable page sizes
- Load more functionality
- Total count tracking

### `useDeviceDetect`

Provides responsive behavior based on screen size.

- Detects mobile vs desktop environments
- Enables conditional rendering for different screen sizes

## 🧩 Components

### Core Components

#### `CompaniesClient`

Main orchestrator component that coordinates all search functionality.

- Manages filter state integration
- Handles data fetching coordination
- Provides user feedback and error handling

#### `TextInput`

Reusable input component with debouncing capabilities.

- Built-in debouncing for search optimization
- Validation for postcode inputs
- Accessible design with proper labeling

#### `DropDownInput`

Standardized dropdown component for filter options.

- Consistent styling across the application
- Type-safe option handling
- Responsive design

#### `ResultList`

Displays business data in a responsive table format.

- Mobile-optimized table design
- Consistent data formatting
- Loading and empty states

## 🗄 Database Schema

```sql
CREATE TABLE businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  abn TEXT,
  name TEXT NOT NULL,
  gst TEXT,
  address_state TEXT,
  address_postcode TEXT,
  record_last_updated TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_businesses_name ON businesses USING gin(to_tsvector('english', name));
CREATE INDEX idx_businesses_gst ON businesses(gst);
CREATE INDEX idx_businesses_state ON businesses(address_state);
CREATE INDEX idx_businesses_postcode ON businesses(address_postcode);
```

## ⚡ Performance Optimizations

### Frontend Optimizations

- **Debouncing**: 400ms delay on text inputs to reduce API calls
- **Memoization**: React.memo and useMemo for expensive computations
- **Code Splitting**: Dynamic imports for non-critical components
- **Image Optimization**: Next.js automatic image optimization

### Backend Optimizations

- **Database Indexes**: Strategic indexing on frequently queried columns
- **Query Optimization**: Efficient Supabase queries with proper filtering
- **Pagination**: Server-side pagination to limit data transfer
- **Caching**: Browser caching for static assets

### Bundle Optimizations

- **Tree Shaking**: Automatic removal of unused code
- **Minification**: Production bundle compression
- **Modern JavaScript**: ES2017+ features for better performance

## 📱 Responsive Design

The application implements a mobile-first responsive design:

- **Breakpoints**: Tailwind CSS responsive utilities
- **Touch Optimization**: Larger touch targets on mobile
- **Navigation**: Adaptive layouts for different screen sizes
- **Typography**: Responsive font scaling

## 🔮 Future Enhancements

- **Advanced Search**: Full-text search capabilities
- **Data Visualization**: Charts and analytics dashboards
- **Export Functionality**: CSV/PDF export options
- **User Authentication**: User accounts and saved searches
- **Real-time Updates**: Live data synchronization
- **API Rate Limiting**: Enhanced performance controls

## 📄 License

This project is created for assessment purposes and demonstrates modern web development practices with real Australian business data.

---

**Built with ❤️ by Arash** | [LinkedIn](https://www.linkedin.com/in/arash-esmailian/)
