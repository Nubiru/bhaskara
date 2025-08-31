# Design Tokens - MutualMetrics

**Version:** 1.0.0  
**Last Modified:** 2025-08-21  
**Author:** MutualMetrics Team  
**WCAG Compliance:** 2.1 AA  

## Overview

This document defines the design tokens used throughout MutualMetrics, ensuring consistent visual design and accessibility compliance. All tokens follow WCAG 2.1 AA standards for color contrast and user experience.

## Color System

### Primary Colors
```css
--color-primary: #3b82f6        /* Blue 500 - Primary actions */
--color-primary-hover: #2563eb  /* Blue 600 - Hover states */
--color-primary-active: #1d4ed8 /* Blue 700 - Active states */
--color-secondary: #8b5cf6      /* Violet 500 - Secondary actions */
--color-accent: #06b6d4        /* Cyan 500 - Accent elements */
```

### Semantic Colors
```css
--color-success: #10b981        /* Emerald 500 - Success states */
--color-warning: #f59e0b        /* Amber 500 - Warning states */
--color-error: #ef4444          /* Red 500 - Error states */
--color-info: #3b82f6           /* Blue 500 - Information states */
```

### Background Colors
```css
--color-background: #fefbf3     /* Light cream - Main background */
--color-surface: #faf8f0        /* Surface background */
--color-surface-elevated: #fefcf7 /* Elevated surface background */
--color-surface-hover: #f5f3eb  /* Hover state for surfaces */
```

### Text Colors
```css
--color-text: #1f2937           /* Gray 800 - Primary text */
--color-text-secondary: #6b7280 /* Gray 500 - Secondary text */
--color-text-muted: #9ca3af     /* Gray 400 - Muted text */
--color-text-inverse: #ffffff   /* White - Text on dark backgrounds */
```

### Border & Divider Colors
```css
--color-border: #e5e7eb         /* Gray 200 - Standard borders */
--color-border-focus: #3b82f6   /* Blue 500 - Focus borders */
--color-divider: #f3f4f6        /* Gray 100 - Subtle dividers */
```

### Dark Theme Colors
```css
--color-background-dark: #111827    /* Gray 900 - Dark background */
--color-surface-dark: #1f2937       /* Gray 800 - Dark surface */
--color-surface-elevated-dark: #374151 /* Gray 700 - Dark elevated */
--color-text-dark: #f9fafb          /* Gray 50 - Dark theme text */
--color-text-secondary-dark: #d1d5db /* Gray 300 - Dark secondary text */
```

## Typography

### Font Sizes
```css
--text-xs: 0.75rem      /* 12px - Captions, labels */
--text-sm: 0.875rem     /* 14px - Small text, secondary info */
--text-base: 1rem       /* 16px - Body text, default */
--text-lg: 1.125rem     /* 18px - Large body text */
--text-xl: 1.25rem      /* 20px - Subheadings */
--text-2xl: 1.5rem      /* 24px - Section headings */
--text-3xl: 1.875rem    /* 30px - Page titles */
--text-4xl: 2.25rem     /* 36px - Hero titles */
```

### Font Weights
```css
--font-light: 300       /* Light weight for subtle text */
--font-normal: 400      /* Normal weight for body text */
--font-medium: 500      /* Medium weight for emphasis */
--font-semibold: 600    /* Semibold for headings */
--font-bold: 700        /* Bold for strong emphasis */
```

### Line Heights
```css
--leading-tight: 1.25      /* Tight spacing for headings */
--leading-normal: 1.5      /* Normal spacing for body text */
--leading-relaxed: 1.75    /* Relaxed spacing for readability */
```

## Spacing

### Base Spacing Unit
```css
--spacing-unit: 0.25rem  /* 4px - Base spacing unit */
```

### Spacing Scale
```css
--spacing-0: 0           /* 0px - No spacing */
--spacing-1: 0.25rem     /* 4px - Minimal spacing */
--spacing-2: 0.5rem      /* 8px - Small spacing */
--spacing-3: 0.75rem     /* 12px - Medium spacing */
--spacing-4: 1rem        /* 16px - Standard spacing */
--spacing-5: 1.25rem     /* 20px - Large spacing */
--spacing-6: 1.5rem      /* 24px - Extra large spacing */
--spacing-8: 2rem        /* 32px - Section spacing */
--spacing-10: 2.5rem     /* 40px - Major section spacing */
--spacing-12: 3rem       /* 48px - Page spacing */
--spacing-16: 4rem       /* 64px - Hero spacing */
```

## Shadows & Elevation

### Shadow System
```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05)     /* Subtle shadows */
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1)   /* Medium shadows */
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1) /* Large shadows */
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1) /* Extra large shadows */
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25) /* Hero shadows */
```

### Elevation Levels
```css
--elevation-0: none              /* No elevation */
--elevation-1: var(--shadow-sm)  /* Cards, buttons */
--elevation-2: var(--shadow-md)  /* Modals, dropdowns */
--elevation-3: var(--shadow-lg)  /* Tooltips, popovers */
--elevation-4: var(--shadow-xl)  /* Sidebars, navigation */
--elevation-5: var(--shadow-2xl) /* Hero sections */
```

## Border Radius

### Radius Scale
```css
--radius-none: 0           /* No radius */
--radius-sm: 0.125rem      /* 2px - Small radius */
--radius-md: 0.375rem      /* 6px - Medium radius */
--radius-lg: 0.5rem        /* 8px - Large radius */
--radius-xl: 0.75rem       /* 12px - Extra large radius */
--radius-2xl: 1rem         /* 16px - Hero radius */
--radius-full: 9999px      /* Full radius for circles */
```

## Transitions & Animations

### Transition Durations
```css
--duration-75: 75ms        /* Fast transitions */
--duration-100: 100ms      /* Quick transitions */
--duration-150: 150ms      /* Standard transitions */
--duration-200: 200ms      /* Smooth transitions */
--duration-300: 300ms      /* Comfortable transitions */
--duration-500: 500ms      /* Slow transitions */
--duration-700: 700ms      /* Very slow transitions */
```

### Transition Timing Functions
```css
--ease-linear: linear                    /* Linear transitions */
--ease-in: cubic-bezier(0.4, 0, 1, 1)  /* Ease in */
--ease-out: cubic-bezier(0, 0, 0.2, 1) /* Ease out */
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1) /* Ease in-out */
```

## Accessibility Guidelines

### Color Contrast Requirements
- **Normal Text**: Minimum 4.5:1 contrast ratio
- **Large Text (18px+ or 14px+ bold)**: Minimum 3:1 contrast ratio
- **UI Components**: Minimum 3:1 contrast ratio
- **Focus Indicators**: Minimum 3:1 contrast ratio

### Focus Management
- All interactive elements must have visible focus indicators
- Focus indicators should use `--color-border-focus` with 2px minimum thickness
- Focus order should follow logical document flow

### Text Readability
- Minimum font size: 16px for body text
- Line height: Minimum 1.5 for body text
- Letter spacing: Normal (0) for most text, increased for small text

## Usage Examples

### Button Component
```css
.btn-primary {
  background-color: var(--color-primary);
  color: var(--color-text-inverse);
  padding: var(--spacing-3) var(--spacing-4);
  border-radius: var(--radius-md);
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  transition: all var(--duration-200) var(--ease-out);
  box-shadow: var(--elevation-1);
}

.btn-primary:hover {
  background-color: var(--color-primary-hover);
  box-shadow: var(--elevation-2);
  transform: translateY(-1px);
}
```

### Card Component
```css
.card {
  background-color: var(--color-surface-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-6);
  box-shadow: var(--elevation-1);
  transition: box-shadow var(--duration-200) var(--ease-out);
}

.card:hover {
  box-shadow: var(--elevation-2);
}
```

### Form Input
```css
.form-input {
  background-color: var(--color-surface);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--spacing-3);
  font-size: var(--text-base);
  color: var(--color-text);
  transition: border-color var(--duration-150) var(--ease-out);
}

.form-input:focus {
  outline: none;
  border-color: var(--color-border-focus);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
```

## Theme Switching

### Light Theme
- Primary background: `--color-background`
- Surface colors: `--color-surface` and `--color-surface-elevated`
- Text colors: `--color-text` and `--color-text-secondary`

### Dark Theme
- Primary background: `--color-background-dark`
- Surface colors: `--color-surface-dark` and `--color-surface-elevated-dark`
- Text colors: `--color-text-dark` and `--color-text-secondary-dark`

### Theme Transition
```css
* {
  transition: 
    background-color var(--duration-300) var(--ease-in-out),
    color var(--duration-300) var(--ease-in-out),
    border-color var(--duration-300) var(--ease-in-out);
}
```

## Best Practices

1. **Always use tokens**: Never hardcode colors, spacing, or other design values
2. **Test contrast**: Use tools like WebAIM's contrast checker to verify accessibility
3. **Maintain consistency**: Use the same token for similar purposes across components
4. **Consider themes**: Ensure all components work in both light and dark themes
5. **Document changes**: Update this file when adding new tokens or modifying existing ones

## Tools & Resources

- **Color Contrast Checker**: [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- **WCAG Guidelines**: [Web Content Accessibility Guidelines 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
- **Design Token Validator**: [Style Dictionary](https://amzn.github.io/style-dictionary/)
- **Accessibility Testing**: [axe-core](https://github.com/dequelabs/axe-core)

## Version History

- **1.0.0** (2025-08-21): Initial design token system with WCAG 2.1 AA compliance
