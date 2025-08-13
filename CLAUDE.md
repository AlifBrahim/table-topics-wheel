# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Table Topics Wheel is a Next.js application for displaying interactive conversation starter cards. Users can click cards to flip between front and back sides, customize questions through a modal interface, and persist their custom questions in localStorage.

## Development Commands

- `npm run dev` - Start development server on http://localhost:3000
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality checks

## Architecture

### Core Components
- **TableTopicsCard**: Flippable card component with CSS modules for 3D animations
- **QuestionModal**: Full-screen modal for editing questions with keyboard shortcuts (ESC to close)
- **QuestionForm**: Form component within modal for question management
- **BriefcaseIcon**: Interactive briefcase that opens/closes to trigger the modal

### State Management
- **useQuestions hook**: Manages question state, localStorage persistence, and validation
  - Enforces 1-50 question limit
  - Validates non-empty questions
  - Handles save/reset/update operations

### Data Flow
- Questions start from `src/data/questions.ts` (21 default questions)
- Persisted to/from localStorage using `src/utils/localStorage.ts`
- Cards display questions with flip animations
- Modal allows bulk editing with form validation

### Key Features
- Card flipping with CSS 3D transforms
- Custom question persistence
- Responsive horizontal scrolling layout
- Modal accessibility (keyboard navigation, backdrop clicks)
- Question validation and error handling

## File Structure

```
src/
├── components/          # React components
├── data/questions.ts    # Default question dataset
├── hooks/useQuestions.ts # Question state management
├── pages/              # Next.js pages (using pages router)
├── styles/             # CSS and styling
└── utils/localStorage.ts # Browser storage utilities
```

## Technical Stack

- Next.js 15.4.6 with Pages Router
- React 19.1.0 with TypeScript
- Tailwind CSS 4.x (Oxide engine)
- CSS Modules for component-specific styling
- ESLint with Next.js configuration

## Development Notes

- Uses Pages Router (not App Router)
- CSS Modules for card animations in `TableTopicsCard.module.css`
- Custom SVG assets for card designs in `/public`
- Responsive design with horizontal scrolling card layout
- No external state management library - uses React hooks