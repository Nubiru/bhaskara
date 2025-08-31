/**
 * @fileoverview Component Library Documentation for MutualMetrics Platform
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-08-31
 * 
 * @description
 * Complete guide to all reusable UI components in the MutualMetrics platform.
 * This document provides implementation details, usage examples, and design
 * specifications for the component library.
 * 
 * @dependencies
 * - React component library
 * - Design tokens and CSS variables
 * - Accessibility guidelines
 * 
 * @usage
 * Reference for developers implementing UI components
 * 
 * @state
 * ✅ Functional - Complete component library guide
 * 
 * @bugs
 * - None known
 * 
 * @todo
 * - [PRIORITY: LOW] Add Storybook integration
 * - [PRIORITY: LOW] Create component playground
 * 
 * @performance
 * - Optimized component rendering
 * - Efficient re-rendering strategies
 * - Bundle size optimization
 * 
 * @accessibility
 * - WCAG 2.1 AA compliance
 * - Screen reader support
 * - Keyboard navigation
 */

# 🧩 Component Library - MutualMetrics Platform

## 🎯 **Overview**

The MutualMetrics Component Library provides a comprehensive set of reusable UI components built with React and TypeScript. Each component follows our design principles and accessibility standards, ensuring consistency and quality across the platform.

## 🏗️ **Component Architecture**

### **Atomic Design Methodology**
Our component library follows the atomic design approach:

```
Atoms (Basic Building Blocks)
├── Button
├── Input
├── Label
├── Icon
└── Text

Molecules (Simple Combinations)
├── FormField
├── SearchBar
├── Card
├── Badge
└── Alert

Organisms (Complex Sections)
├── Header
├── Navigation
├── Form
├── DataTable
└── Chart

Templates (Page Layouts)
├── DashboardLayout
├── FormLayout
├── AnalysisLayout
└── ResultsLayout

Pages (Complete Interfaces)
├── Dashboard
├── Analysis
├── Results
└── Settings
```

### **Component Categories**
1. **Form Components** - Input fields, buttons, and form controls
2. **Layout Components** - Containers, grids, and spacing
3. **Data Components** - Tables, charts, and data displays
4. **Navigation Components** - Menus, breadcrumbs, and pagination
5. **Feedback Components** - Alerts, notifications, and loading states
6. **Utility Components** - Icons, badges, and decorative elements

## 🔘 **Form Components**

### **Button Component**
```tsx
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}
```

**Usage Examples:**
```tsx
// Primary button
<Button variant="primary" size="md" onClick={handleSubmit}>
  Calculate Results
</Button>

// Secondary button with loading state
<Button variant="secondary" size="lg" loading={isCalculating}>
  Process Data
</Button>

// Danger button
<Button variant="danger" size="sm" onClick={handleDelete}>
  Delete Analysis
</Button>
```

**Design Specifications:**
- **Primary**: Blue background with white text
- **Secondary**: Gray background with dark text
- **Outline**: Transparent with colored border
- **Ghost**: Transparent with colored text
- **Danger**: Red background with white text

### **Input Component**
```tsx
interface InputProps {
  type: 'text' | 'number' | 'email' | 'password' | 'search';
  label?: string;
  placeholder?: string;
  value: string | number;
  onChange: (value: string | number) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}
```

**Usage Examples:**
```tsx
// Text input with label
<Input
  type="text"
  label="Product Name"
  placeholder="Enter product name"
  value={productName}
  onChange={setProductName}
  required
/>

// Number input with error
<Input
  type="number"
  label="Quantity"
  value={quantity}
  onChange={setQuantity}
  error="Quantity must be greater than 0"
/>
```

**Design Specifications:**
- **Border**: 1px solid with focus state
- **Padding**: 0.75rem (12px) vertical, 1rem (16px) horizontal
- **Border Radius**: 0.375rem (6px)
- **Focus State**: Blue border with subtle shadow

### **FormField Component**
```tsx
interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  helpText?: string;
  children: React.ReactNode;
}
```

**Usage Examples:**
```tsx
<FormField
  label="Revenue Amount"
  required
  helpText="Enter the total revenue for the period"
  error={revenueError}
>
  <Input
    type="number"
    value={revenue}
    onChange={setRevenue}
    placeholder="0.00"
  />
</FormField>
```

## 📱 **Layout Components**

### **Container Component**
```tsx
interface ContainerProps {
  size: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}
```

**Usage Examples:**
```tsx
// Standard container
<Container size="lg" padding="md">
  <h1>Analysis Results</h1>
  <p>Your analysis has been completed successfully.</p>
</Container>

// Full-width container
<Container size="full" padding="none">
  <Header />
</Container>
```

**Design Specifications:**
- **Small**: max-width 640px
- **Medium**: max-width 768px
- **Large**: max-width 1024px
- **Extra Large**: max-width 1280px
- **Full**: 100% width

### **Grid Component**
```tsx
interface GridProps {
  cols: 1 | 2 | 3 | 4 | 6 | 12;
  gap: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}
```

**Usage Examples:**
```tsx
<Grid cols={3} gap="md">
  <Card title="Revenue Analysis" />
  <Card title="Cost Analysis" />
  <Card title="Profit Analysis" />
</Grid>
```

**Design Specifications:**
- **Gap Small**: 1rem (16px)
- **Gap Medium**: 1.5rem (24px)
- **Gap Large**: 2rem (32px)
- **Responsive**: Automatically adjusts columns for mobile

### **Card Component**
```tsx
interface CardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  padding?: 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
}
```

**Usage Examples:**
```tsx
<Card
  title="Revenue Analysis"
  subtitle="Monthly revenue breakdown"
  padding="lg"
  shadow="md"
>
  <Chart data={revenueData} />
  <div className="mt-4">
    <Button variant="primary">Export Results</Button>
  </div>
</Card>
```

**Design Specifications:**
- **Border Radius**: 0.5rem (8px)
- **Shadow**: Subtle shadows for depth
- **Padding**: Configurable internal spacing
- **Background**: White with subtle borders

## 📊 **Data Components**

### **DataTable Component**
```tsx
interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  sortable?: boolean;
  pagination?: boolean;
  searchable?: boolean;
}
```

**Usage Examples:**
```tsx
const columns = [
  { key: 'month', label: 'Month', sortable: true },
  { key: 'revenue', label: 'Revenue', sortable: true },
  { key: 'growth', label: 'Growth %', sortable: true }
];

<DataTable
  data={monthlyData}
  columns={columns}
  sortable
  pagination
  searchable
/>
```

**Design Specifications:**
- **Striped Rows**: Alternating row colors for readability
- **Hover Effects**: Subtle hover states for interactive rows
- **Sort Indicators**: Clear visual indicators for sortable columns
- **Responsive**: Horizontal scrolling on mobile devices

### **Chart Component**
```tsx
interface ChartProps {
  type: 'line' | 'bar' | 'pie' | 'doughnut';
  data: ChartData;
  options?: ChartOptions;
  height?: number;
}
```

**Usage Examples:**
```tsx
<Chart
  type="line"
  data={revenueChartData}
  options={{
    responsive: true,
    maintainAspectRatio: false
  }}
  height={300}
/>
```

**Design Specifications:**
- **Chart.js Integration**: Built on Chart.js for reliability
- **Theme Aware**: Automatically adapts to light/dark themes
- **Responsive**: Scales appropriately for all screen sizes
- **Accessibility**: Proper ARIA labels and descriptions

## 🧭 **Navigation Components**

### **Header Component**
```tsx
interface HeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  navigation?: React.ReactNode;
}
```

**Usage Examples:**
```tsx
<Header
  title="MutualMetrics"
  subtitle="Mathematical & Business Analytics"
  actions={
    <div className="flex gap-2">
      <Button variant="outline">Settings</Button>
      <Button variant="primary">New Analysis</Button>
    </div>
  }
  navigation={<MainNavigation />}
/>
```

**Design Specifications:**
- **Height**: 4rem (64px) for compact design
- **Background**: Subtle background with border
- **Actions**: Right-aligned action buttons
- **Navigation**: Bottom-aligned navigation menu

### **Navigation Component**
```tsx
interface NavigationProps {
  items: NavigationItem[];
  activeItem?: string;
  orientation: 'horizontal' | 'vertical';
}
```

**Usage Examples:**
```tsx
const navigationItems = [
  { key: 'dashboard', label: 'Dashboard', icon: 'home' },
  { key: 'analysis', label: 'Analysis', icon: 'chart' },
  { key: 'results', label: 'Results', icon: 'file' }
];

<Navigation
  items={navigationItems}
  activeItem="analysis"
  orientation="horizontal"
/>
```

**Design Specifications:**
- **Active State**: Clear visual indication of current page
- **Hover Effects**: Subtle hover states for interactive feedback
- **Icon Support**: Optional icons for visual enhancement
- **Responsive**: Adapts to mobile and desktop layouts

## 🔔 **Feedback Components**

### **Alert Component**
```tsx
interface AlertProps {
  type: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  children: React.ReactNode;
  dismissible?: boolean;
}
```

**Usage Examples:**
```tsx
<Alert type="success" title="Analysis Complete">
  Your revenue analysis has been completed successfully. 
  You can now view and export your results.
</Alert>

<Alert type="error" dismissible>
  There was an error processing your request. Please try again.
</Alert>
```

**Design Specifications:**
- **Info**: Blue background with information icon
- **Success**: Green background with checkmark icon
- **Warning**: Yellow background with warning icon
- **Error**: Red background with error icon

### **Loading Component**
```tsx
interface LoadingProps {
  size: 'sm' | 'md' | 'lg';
  text?: string;
  overlay?: boolean;
}
```

**Usage Examples:**
```tsx
// Inline loading
<Loading size="md" text="Calculating results..." />

// Overlay loading
<Loading size="lg" text="Processing data..." overlay />
```

**Design Specifications:**
- **Spinner**: Smooth rotating animation
- **Text**: Optional loading message
- **Sizes**: Small (16px), Medium (24px), Large (32px)
- **Overlay**: Optional full-screen overlay for page-level loading

## 🎨 **Theme Integration**

### **CSS Custom Properties**
All components use CSS custom properties for theme switching:

```css
:root {
  /* Light theme */
  --color-primary: #3b82f6;
  --color-background: #ffffff;
  --color-text: #1f2937;
  --color-border: #e5e7eb;
}

[data-theme="dark"] {
  /* Dark theme */
  --color-primary: #60a5fa;
  --color-background: #1f2937;
  --color-text: #f9fafb;
  --color-border: #374151;
}
```

### **Theme Switching**
Components automatically adapt to theme changes:

```tsx
const { theme, toggleTheme } = useTheme();

<Button onClick={toggleTheme}>
  Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
</Button>
```

## ♿ **Accessibility Features**

### **Built-in Accessibility**
- **ARIA Labels**: Proper ARIA attributes for screen readers
- **Keyboard Navigation**: Full keyboard accessibility
- **Focus Management**: Clear focus indicators and logical tab order
- **Color Contrast**: WCAG 2.1 AA compliant color ratios

### **Screen Reader Support**
```tsx
// Proper labeling
<Input
  aria-label="Revenue amount in dollars"
  aria-describedby="revenue-help"
  aria-required="true"
/>

// Help text association
<div id="revenue-help">
  Enter the total revenue for the current period
</div>
```

## 📱 **Responsive Behavior**

### **Mobile-First Design**
- **Touch Targets**: Minimum 44px touch targets
- **Responsive Grids**: Automatic column adjustment
- **Mobile Navigation**: Collapsible navigation for small screens
- **Touch Gestures**: Support for swipe and pinch gestures

### **Breakpoint System**
```css
/* Mobile first */
.component { /* Base styles */ }

/* Tablet */
@media (min-width: 768px) {
  .component { /* Tablet styles */ }
}

/* Desktop */
@media (min-width: 1024px) {
  .component { /* Desktop styles */ }
}
```

## 🚀 **Performance Optimization**

### **Rendering Optimization**
- **React.memo**: Prevents unnecessary re-renders
- **useCallback**: Optimizes function references
- **useMemo**: Memoizes expensive calculations
- **Lazy Loading**: Loads components on demand

### **Bundle Optimization**
- **Tree Shaking**: Removes unused code
- **Code Splitting**: Loads components as needed
- **Dynamic Imports**: Lazy loads heavy components

## 📋 **Component Development Guidelines**

### **Before Creating a Component**
1. **Check Existing**: Look for similar components first
2. **Plan API**: Design a clean, intuitive interface
3. **Consider Reuse**: Make components flexible and reusable
4. **Plan Accessibility**: Include accessibility from the start

### **During Development**
1. **Follow Patterns**: Use established component patterns
2. **Test Thoroughly**: Test all states and variations
3. **Document Well**: Include comprehensive documentation
4. **Optimize Performance**: Ensure efficient rendering

### **After Development**
1. **Code Review**: Get feedback from team members
2. **Update Library**: Add to component library
3. **Share Knowledge**: Document usage patterns
4. **Monitor Usage**: Track component adoption

## 📚 **Related Documentation**

### **Design System**
- **[Design System Overview](README.md)** - Complete design system guide
- **[Visual Principles](visual-principles.md)** - Design philosophy and guidelines
- **[Design Tokens](design-tokens.md)** - CSS variables and design values

### **Development Integration**
- **[Frontend Development](../development/frontend-development.md)** - React implementation
- **[Testing Strategy](../development/testing-strategy.md)** - Component testing
- **[Code Standards](../../../code-standard.md)** - Development standards

---

**Component Library - MutualMetrics v1.0.0**  
**Last Updated**: 2025-08-31  
**Status**: ✅ Complete - Ready for component implementation
