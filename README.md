# Pet Name Finder

A React + TypeScript application for browsing and filtering pet names by category, gender, and alphabet letter.

---

## Overview

Pet Name Finder allows users to:

- Browse pet names alphabetically
- Filter names by category groups
- Filter by gender
- View detailed preview of selected pet names
- Explore names efficiently with virtualized scrolling for performance

This project was built as part of a frontend test assessment.

---

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Storybook
- React Window (virtualization)
- Vitest
- React Testing Library
- ESLint
- Prettier

---

## Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/JiraldLaurea/pet-name-finder.git
cd pet-name-finder
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

### 4. Run Tests

```bash
npm run test
```

### 5. Run Storybook

```bash
npm run storybook
```

## Project Structure

```bash
src/
├── components/
│   ├── common/
│   ├── filters/
│   ├── layout/
│   └── names/
├── hooks/
├── pages/
├── services/
├── test/
├── types/
└── utils/
```

## Architecture Design

### Component-Based Structure

- UI is divided into reusable components such as FilterBar, FilterDropdown, AlphabetBar, NameList, and NamePreview.

### Separation of Concerns

- UI rendering is handled in components.
- API communication is centralized in services/api.ts.
- Shared interfaces and types are stored in types/index.ts.

### Performance Optimization

- react-window is used to virtualize long pet-name lists for efficient rendering.

### State Management

- React hooks (useState, useEffect, useMemo) manage filters, selections, and fetched data.

### Scalable Folder Organization

- The structure supports easy expansion for future features like pagination, caching, or advanced search.

## Additional Implemented Features

### Animations (Framer Motion)

- Smooth animated dropdown transitions for filter panels.

### Storybook Integration

- Storybook added for isolated UI component development and testing.
- Includes reusable component stories such as FilterDropdown.

### Error Boundaries

- Global React Error Boundary implemented.
- Prevents full application crashes and displays fallback UI gracefully.

### Accessibility

- ARIA labels for filter toggle buttons
- aria-expanded support for dropdown states
- Accessible checkbox labeling
- Screen-reader-friendly dropdown regions

### Linting / Formatting

- ESLint configured for code quality enforcement
- Prettier configured for consistent formatting

## Assumptions Made

- API endpoints always return valid structured data.
- Each filter group references valid category IDs.
- Pet name datasets may grow large, which is why virtualization is implemented.
- Filters reset after page refresh (no persistent storage required).
- No authentication is required for this assessment.
- Backend services are assumed to remain available during runtime.

## Testing

The project includes testing using:

- Vitest
- React Testing Library

### Current coverage includes:

- HomePage filtering behavior
- Category selection interaction validation

Example tested flow:

- Open “Funny” filter
- Select “Unusual”
- Verify filtered pet name appears
