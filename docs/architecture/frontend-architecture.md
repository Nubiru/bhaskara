# 🏗️ Landing Page Architecture - MutualMetrics

**Version:** 1.0.0  
**Last Updated:** 2025-08-21  
**Author:** Software Engineer  
**Status:** ✅ Production Ready

## 🎯 Overview

The MutualMetrics landing page implements a **dynamic content switching system** that transforms from a presentation page to an analysis workspace without page navigation. This document explains the architecture, component structure, and layout system.

## 🏛️ Architecture Principles

### **Single Page Application (SPA)**
- **No page reloads** - Content switches dynamically
- **State-driven rendering** - `currentView` controls what's displayed
- **Unified layout** - Consistent header, sidebar, and footer across all views

### **Component Composition Pattern**
- **Separation of concerns** - Each component has a single responsibility
- **Props drilling** - State flows from parent to child components
- **Memoization** - Components are optimized to prevent unnecessary re-renders

## 📁 File Structure

```
frontend/app/
├── routes/
│   └── home.tsx                    # Main route component (entry point)
├── components/
│   ├── layout/
│   │   ├── LandingPage.tsx         # Landing page content
│   │   ├── AnalysisPanel.tsx       # Form + Results wrapper
│   │   └── ToolContentRenderer.tsx # Dynamic content switcher
│   ├── navigation/
│   │   └── Sidebar.tsx             # Left navigation (200px width)
│   └── forms/                      # Individual tool forms
├── hooks/
│   └── useAnalysisHandlers.ts      # Centralized analysis logic
├── types/
│   └── tools.ts                    # Tool configuration types
└── constants/
    └── tools.ts                    # Tool definitions
```

## 🎨 Layout System

### **Y-Axis Division (Vertical Layout)**
```
┌─────────────────────────────────────────────────────────┐
│                    HEADER (100% width)                  │
│                     Fixed height                        │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  SIDEBAR    │           MAIN CONTENT AREA               │
│  (200px)    │           (flex-1, dynamic height)        │
│  Fixed      │                                           │
│  height     │                                           │
│             │                                           │
├─────────────┼───────────────────────────────────────────┤
│                    FOOTER (100% width)                  │
│                     Fixed height                        │
└─────────────────────────────────────────────────────────┘
```

### **X-Axis Division (Horizontal Layout)**
```
┌─────────────┬───────────────────────────────────────────┐
│             │                                           │
│   SIDEBAR   │              MAIN CONTENT                 │
│   200px     │              flex-1                       │
│   Fixed     │                                           │
│   Width     │                                           │
│             │                                           │
└─────────────┴───────────────────────────────────────────┘
```

## 🔄 Content Switching System

### **State Management**
```typescript
// Main state in home.tsx
const [currentView, setCurrentView] = useState<ViewType>('landing');

// Content rendering logic
const renderContent = useMemo(() => {
  if (currentView === 'landing') {
    return <LandingPage />;
  }
  
  return (
    <ToolContentRenderer
      currentView={currentView}
      analysisState={analysisState}
      handlers={handlers}
      t={translateFunction}
    />
  );
}, [currentView, analysisState, handlers, translateFunction]);
```

### **View Types**
```typescript
type ViewType = 
  | 'landing'           // Landing page
  | 'bhaskara'          // Quadratic analysis
  | 'break-even'        // Break-even analysis
  | 'revenue'           // Revenue analysis
  | 'costs'             // Cost analysis
  | 'profit'            // Profit analysis
  | 'compound-interest' // Compound interest calculator
  | 'currency-converter' // Currency converter
  | 'number-converter'; // Number system converter
```

## 🧩 Component Architecture

### **1. HomePage (Main Container)**
- **Responsibility**: Layout orchestration and state management
- **Layout**: Flexbox with sidebar + main content
- **State**: Manages `currentView` and renders appropriate content

### **2. Sidebar (Navigation)**
- **Width**: Fixed 200px
- **Position**: Left side, fixed height
- **Content**: Tool navigation with tooltips
- **Behavior**: Clicking changes `currentView`

### **3. LandingPage (Presentation)**
- **Display**: Hero section, description, team info
- **Trigger**: Shown when `currentView === 'landing'`
- **Layout**: Centered content with background effects

### **4. ToolContentRenderer (Dynamic Content)**
- **Responsibility**: Renders tool-specific forms and results
- **Pattern**: Switch statement based on `currentView`
- **Components**: Uses `AnalysisPanel` wrapper for consistency

### **5. AnalysisPanel (Form + Results)**
- **Structure**: Two-panel layout (form left, results right)
- **Responsiveness**: Adapts to content height
- **Theming**: Uses CSS variables for consistent appearance

## 🎯 Key Design Decisions

### **Fixed Sidebar Width (200px)**
- **Rationale**: Consistent navigation experience
- **Implementation**: `width: 200px` + `marginLeft: 200px` on main content
- **Benefits**: Predictable layout, easy tooltip positioning

### **Dynamic Content Height**
- **Approach**: Content determines height, sidebar follows
- **Implementation**: Flexbox with `flex-1` on main content
- **Benefits**: Adapts to different tool complexities

### **Background Effects**
- **Implementation**: CSS radial gradients with CSS variables
- **Positioning**: Fixed attachment for parallax-like effect
- **Theming**: Adapts to light/dark themes automatically

## 🔧 Layout Implementation

### **CSS Classes Used**
```css
/* Main container */
.min-h-screen          /* Full viewport height */
.flex                  /* Flexbox layout */
.flex-1               /* Main content takes remaining space */

/* Sidebar */
.w-50                 /* 200px width (50 * 4px) */
.fixed                /* Fixed positioning */

/* Main content */
.ml-50                /* 200px left margin */
.p-6                  /* 24px padding */
.max-w-7xl            /* Maximum width constraint */
.mx-auto              /* Center horizontally */
```

### **Responsive Considerations**
- **Sidebar**: Fixed width on desktop, collapsible on mobile
- **Content**: Adapts to available space
- **Typography**: Scales appropriately for different screen sizes

## 🚀 Performance Optimizations

### **Memoization Strategy**
```typescript
// Component memoization
const HomePage = memo<HomePageProps>(({ className = '' }) => {
  // Component implementation
});

// Content memoization
const renderContent = useMemo(() => {
  // Content rendering logic
}, [currentView, analysisState, handlers, translateFunction]);
```

### **Lazy Loading**
- **Forms**: Loaded only when tool is selected
- **Charts**: Rendered only when results are available
- **Translations**: Loaded on-demand

## 🎨 Theming System

### **CSS Variables Integration**
```css
/* Background colors */
background-color: var(--color-background);
background-image: var(--color-surface-elevated);

/* Text colors */
color: var(--color-text);
color: var(--color-text-secondary);

/* Surface colors */
background: var(--color-surface-elevated);
border-color: var(--color-divider);
```

### **Theme Switching**
- **Automatic**: Detects system preference
- **Manual**: User toggle available
- **Persistence**: Saves preference in localStorage

## 🔍 Accessibility Features

### **Navigation**
- **Keyboard**: Full keyboard navigation support
- **ARIA**: Proper labels and descriptions
- **Focus**: Clear focus management between views

### **Content**
- **Semantics**: Proper heading hierarchy
- **Contrast**: WCAG 2.1 AA compliance
- **Screen Readers**: Compatible with assistive technologies

## 🐛 Common Issues & Solutions

### **Layout Problems**
1. **Sidebar overlap**: Ensure `marginLeft: 200px` on main content
2. **Height issues**: Use `min-h-screen` for full viewport coverage
3. **Content overflow**: Implement proper scrolling containers

### **Performance Issues**
1. **Re-renders**: Use `memo` and `useMemo` appropriately
2. **Large bundles**: Implement code splitting for tools
3. **Memory leaks**: Clean up event listeners and subscriptions

## 📚 Related Documentation

- [Component Library](./component-library.md)
- [Theme System](./theme-system.md)
- [State Management](./state-management.md)
- [Performance Guidelines](./performance-guidelines.md)

---

**Built with ❤️ by the MutualMetrics Team**
