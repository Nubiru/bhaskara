# Testing Strategy - MutualMetrics

**Version:** 1.0.0  
**Last Modified:** 2025-08-21  
**Author:** MutualMetrics Team  
**Coverage Target:** ≥85%  
**Performance Target:** Lighthouse ≥90  

## Overview

This document outlines the comprehensive testing strategy for MutualMetrics, ensuring high quality, accessibility compliance, and optimal performance across all frontend components and features.

## Testing Pyramid

```
    E2E Tests (5%)
   ┌─────────────┐
   │ Integration │ (15%)
   └─────────────┘
   ┌─────────────┘
   │   Unit      │ (80%)
   └─────────────┘
```

## 1. Unit Testing

### Framework & Tools
- **Jest**: Test runner and assertion library
- **React Testing Library**: Component testing utilities
- **@testing-library/jest-dom**: Custom Jest matchers
- **@testing-library/user-event**: User interaction simulation

### Test Structure
```
__tests__/
├── components/
│   ├── layout/
│   ├── forms/
│   ├── charts/
│   └── ui/
├── hooks/
├── utils/
└── __mocks__/
```

### Component Testing Guidelines

#### Basic Component Test
```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ComponentName } from './ComponentName';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  );
};

describe('ComponentName', () => {
  it('renders correctly with default props', () => {
    renderWithTheme(<ComponentName />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('handles user interactions correctly', async () => {
    const user = userEvent.setup();
    renderWithTheme(<ComponentName />);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    expect(screen.getByText('Clicked!')).toBeInTheDocument();
  });

  it('applies theme tokens correctly', () => {
    renderWithTheme(<ComponentName />);
    const element = screen.getByTestId('component');
    
    expect(element).toHaveStyle({
      backgroundColor: 'var(--color-surface-elevated)',
      color: 'var(--color-text)'
    });
  });
});
```

#### Form Component Testing
```typescript
describe('FormComponent', () => {
  it('validates required fields', async () => {
    const user = userEvent.setup();
    renderWithTheme(<FormComponent />);
    
    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);
    
    expect(screen.getByText(/required/i)).toBeInTheDocument();
  });

  it('submits form with valid data', async () => {
    const mockSubmit = jest.fn();
    const user = userEvent.setup();
    renderWithTheme(<FormComponent onSubmit={mockSubmit} />);
    
    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.click(screen.getByRole('button', { name: /submit/i }));
    
    expect(mockSubmit).toHaveBeenCalledWith({ name: 'John Doe' });
  });
});
```

#### Hook Testing
```typescript
import { renderHook, act } from '@testing-library/react';
import { useCustomHook } from './useCustomHook';

describe('useCustomHook', () => {
  it('returns initial state', () => {
    const { result } = renderHook(() => useCustomHook());
    expect(result.current.value).toBe(0);
  });

  it('updates state correctly', () => {
    const { result } = renderHook(() => useCustomHook());
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.value).toBe(1);
  });
});
```

### Test Coverage Requirements
- **Statements**: ≥85%
- **Branches**: ≥80%
- **Functions**: ≥85%
- **Lines**: ≥85%

### Running Unit Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- ComponentName.test.tsx
```

## 2. Accessibility Testing

### Tools & Standards
- **axe-core**: Automated accessibility testing
- **WCAG 2.1 AA**: Compliance standard
- **React Testing Library**: Accessibility-focused testing
- **Manual testing**: Keyboard navigation and screen readers

### Automated Accessibility Tests

#### Basic Accessibility Test
```typescript
import { axe, toHaveNoViolations } from 'jest-axe';
import { render } from '@testing-library/react';

expect.extend(toHaveNoViolations);

describe('ComponentName Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { container } = renderWithTheme(<ComponentName />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has proper heading structure', () => {
    renderWithTheme(<ComponentName />);
    const headings = screen.getAllByRole('heading');
    expect(headings).toHaveLength(2);
    expect(headings[0]).toHaveTextContent('Main Title');
  });

  it('supports keyboard navigation', async () => {
    const user = userEvent.setup();
    renderWithTheme(<ComponentName />);
    
    const firstButton = screen.getByRole('button', { name: /first/i });
    const secondButton = screen.getByRole('button', { name: /second/i });
    
    firstButton.focus();
    expect(firstButton).toHaveFocus();
    
    await user.tab();
    expect(secondButton).toHaveFocus();
  });
});
```

#### Color Contrast Testing
```typescript
import { validateColorContrast } from '@/utils/accessibility';

describe('Color Contrast', () => {
  it('meets WCAG AA standards', () => {
    const contrastResults = validateColorContrast();
    expect(contrastResults.overall).toBe('pass');
    expect(contrastResults.violations).toHaveLength(0);
  });

  it('has sufficient contrast for text elements', () => {
    const textContrast = validateColorContrast(['text', 'text-secondary']);
    expect(textContrast.ratio).toBeGreaterThanOrEqual(4.5);
  });
});
```

#### Screen Reader Testing
```typescript
describe('Screen Reader Support', () => {
  it('has proper ARIA labels', () => {
    renderWithTheme(<ComponentName />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Submit form');
  });

  it('announces dynamic content changes', () => {
    renderWithTheme(<ComponentName />);
    
    const liveRegion = screen.getByRole('status');
    expect(liveRegion).toHaveAttribute('aria-live', 'polite');
  });
});
```

### Manual Accessibility Testing Checklist

#### Keyboard Navigation
- [ ] Tab order follows logical document flow
- [ ] All interactive elements are reachable via keyboard
- [ ] Focus indicators are clearly visible
- [ ] Escape key closes modals and dropdowns
- [ ] Arrow keys work for select components

#### Screen Reader Testing
- [ ] NVDA (Windows) - All content announced correctly
- [ ] JAWS (Windows) - Navigation and content reading
- [ ] VoiceOver (macOS) - Gesture and keyboard navigation
- [ ] TalkBack (Android) - Touch navigation

#### Color and Contrast
- [ ] Text meets 4.5:1 contrast ratio (normal text)
- [ ] Large text meets 3:1 contrast ratio
- [ ] UI components meet 3:1 contrast ratio
- [ ] Color is not the only way to convey information

## 3. Visual Testing

### Tools & Approach
- **Storybook**: Component development and visual testing
- **Chromatic**: Visual regression testing
- **Manual visual inspection**: Theme switching and responsive design

### Storybook Stories
```typescript
// ComponentName.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from './ComponentName';

const meta: Meta<typeof ComponentName> = {
  title: 'Components/ComponentName',
  component: ComponentName,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Button',
  },
};

export const WithTheme: Story = {
  args: {
    label: 'Themed Button',
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export const Responsive: Story = {
  args: {
    label: 'Responsive Button',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
```

### Visual Regression Testing
```typescript
describe('Visual Regression', () => {
  it('matches design specifications', () => {
    renderWithTheme(<ComponentName />);
    const element = screen.getByTestId('component');
    
    // Test dimensions
    expect(element).toHaveStyle({
      width: '200px',
      height: '48px',
    });
    
    // Test spacing
    expect(element).toHaveStyle({
      padding: '12px 16px',
      margin: '8px',
    });
  });

  it('applies theme tokens consistently', () => {
    renderWithTheme(<ComponentName />);
    const element = screen.getByTestId('component');
    
    expect(element).toHaveStyle({
      backgroundColor: 'var(--color-surface-elevated)',
      borderColor: 'var(--color-border)',
      color: 'var(--color-text)',
    });
  });
});
```

### Theme Testing
```typescript
describe('Theme Switching', () => {
  it('applies light theme correctly', () => {
    renderWithTheme(<ComponentName />);
    const element = screen.getByTestId('component');
    
    expect(element).toHaveStyle({
      backgroundColor: 'var(--color-surface-elevated)',
      color: 'var(--color-text)',
    });
  });

  it('transitions smoothly between themes', async () => {
    const { rerender } = renderWithTheme(<ComponentName />);
    const element = screen.getByTestId('component');
    
    // Change theme
    rerender(
      <ThemeProvider initialTheme="dark">
        <ComponentName />
      </ThemeProvider>
    );
    
    // Check transition properties
    expect(element).toHaveStyle({
      transition: expect.stringContaining('300ms'),
    });
  });
});
```

## 4. Performance Testing

### Tools & Metrics
- **Lighthouse**: Performance, accessibility, best practices
- **Web Vitals**: Core Web Vitals measurement
- **Bundle analyzer**: Bundle size optimization
- **React DevTools**: Component performance profiling

### Performance Test Setup
```typescript
import { getLighthouseScore } from '@/utils/performance';

describe('Performance', () => {
  it('meets performance budget', async () => {
    const scores = await getLighthouseScore('/');
    
    expect(scores.performance).toBeGreaterThanOrEqual(90);
    expect(scores.accessibility).toBeGreaterThanOrEqual(90);
    expect(scores.bestPractices).toBeGreaterThanOrEqual(90);
    expect(scores.seo).toBeGreaterThanOrEqual(90);
  });

  it('loads within acceptable time', async () => {
    const startTime = performance.now();
    renderWithTheme(<ComponentName />);
    const endTime = performance.now();
    
    const loadTime = endTime - startTime;
    expect(loadTime).toBeLessThan(100); // 100ms threshold
  });
});
```

### Bundle Size Testing
```typescript
describe('Bundle Size', () => {
  it('stays within size limits', () => {
    const bundleStats = require('../../bundle-stats.json');
    
    expect(bundleStats.totalSize).toBeLessThan(1024 * 1024); // 1MB
    expect(bundleStats.gzippedSize).toBeLessThan(300 * 1024); // 300KB
  });

  it('implements code splitting correctly', () => {
    const bundleStats = require('../../bundle-stats.json');
    
    expect(bundleStats.chunks).toBeGreaterThan(1);
    expect(bundleStats.lazyChunks).toBeGreaterThan(0);
  });
});
```

### Core Web Vitals Testing
```typescript
describe('Core Web Vitals', () => {
  it('meets LCP requirements', async () => {
    const lcp = await measureLCP();
    expect(lcp).toBeLessThan(2500); // 2.5 seconds
  });

  it('meets FID requirements', async () => {
    const fid = await measureFID();
    expect(fid).toBeLessThan(100); // 100 milliseconds
  });

  it('meets CLS requirements', async () => {
    const cls = await measureCLS();
    expect(cls).toBeLessThan(0.1); // 0.1 threshold
  });
});
```

## 5. Integration Testing

### API Integration Testing
```typescript
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, waitFor } from '@testing-library/react';

const server = setupServer(
  rest.get('/api/analysis', (req, res, ctx) => {
    return res(
      ctx.json({
        result: 'success',
        data: { value: 42 }
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('API Integration', () => {
  it('fetches and displays data correctly', async () => {
    renderWithTheme(<DataComponent />);
    
    await waitFor(() => {
      expect(screen.getByText('42')).toBeInTheDocument();
    });
  });

  it('handles API errors gracefully', async () => {
    server.use(
      rest.get('/api/analysis', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    
    renderWithTheme(<DataComponent />);
    
    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });
});
```

### Router Integration Testing
```typescript
import { MemoryRouter } from 'react-router-dom';

const renderWithRouter = (component: React.ReactElement, initialEntries = ['/']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <ThemeProvider>
        {component}
      </ThemeProvider>
    </MemoryRouter>
  );
};

describe('Routing', () => {
  it('navigates to correct routes', async () => {
    const user = userEvent.setup();
    renderWithRouter(<App />);
    
    const link = screen.getByRole('link', { name: /about/i });
    await user.click(link);
    
    expect(screen.getByText(/about mutualmetrics/i)).toBeInTheDocument();
  });
});
```

## 6. E2E Testing

### Tools & Framework
- **Playwright**: Cross-browser E2E testing
- **Test scenarios**: Critical user journeys
- **Visual regression**: Screenshot comparison

### E2E Test Structure
```typescript
// e2e/critical-flows.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Critical User Flows', () => {
  test('complete analysis workflow', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to analysis tool
    await page.click('[data-testid="sidebar-bhaskara"]');
    
    // Fill form
    await page.fill('[data-testid="coefficient-a"]', '1');
    await page.fill('[data-testid="coefficient-b"]', '0');
    await page.fill('[data-testid="coefficient-c"]', '-4');
    
    // Submit and verify results
    await page.click('[data-testid="analyze-button"]');
    await expect(page.locator('[data-testid="results-panel"]')).toBeVisible();
    await expect(page.locator('text=x = 2')).toBeVisible();
  });

  test('theme switching works correctly', async ({ page }) => {
    await page.goto('/');
    
    const themeToggle = page.locator('[data-testid="theme-toggle"]');
    const body = page.locator('body');
    
    // Check initial theme
    await expect(body).toHaveAttribute('data-theme', 'light');
    
    // Switch to dark theme
    await themeToggle.click();
    await expect(body).toHaveAttribute('data-theme', 'dark');
    
    // Verify theme persistence
    await page.reload();
    await expect(body).toHaveAttribute('data-theme', 'dark');
  });
});
```

## 7. Test Environment Setup

### Configuration Files

#### Jest Configuration
```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/main.tsx',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 85,
      lines: 85,
      statements: 85,
    },
  },
};
```

#### Playwright Configuration
```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
});
```

## 8. Continuous Integration

### GitHub Actions Workflow
```yaml
# .github/workflows/test.yml
name: Test Suite

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '20'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run unit tests
      run: npm test -- --coverage --watchAll=false
    
    - name: Run accessibility tests
      run: npm run test:a11y
    
    - name: Run E2E tests
      run: npm run test:e2e
    
    - name: Upload coverage
      uses: codecov/codecov-action@v3
```

## 9. Testing Commands

### Package.json Scripts
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:a11y": "jest --testPathPattern=accessibility",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:visual": "storybook test",
    "test:performance": "lighthouse http://localhost:5173",
    "test:all": "npm run test && npm run test:a11y && npm run test:e2e"
  }
}
```

## 10. Quality Gates

### Pre-commit Requirements
- [ ] All unit tests pass
- [ ] Accessibility tests pass
- [ ] Code coverage meets thresholds
- [ ] No TypeScript errors
- [ ] ESLint passes
- [ ] Prettier formatting applied

### Release Requirements
- [ ] All test suites pass
- [ ] E2E tests pass on all browsers
- [ ] Performance benchmarks met
- [ ] Accessibility compliance verified
- [ ] Bundle size within limits
- [ ] Documentation updated

## 11. Troubleshooting

### Common Issues

#### Test Environment Problems
```bash
# Clear Jest cache
npm run test -- --clearCache

# Reset Playwright browsers
npx playwright install
```

#### Coverage Issues
```bash
# Generate coverage report
npm run test:coverage

# Open coverage in browser
open coverage/lcov-report/index.html
```

#### Performance Test Failures
```bash
# Run Lighthouse locally
npm run test:performance

# Check bundle size
npm run build && npm run analyze
```

## 12. Resources & References

- **Testing Library**: https://testing-library.com/
- **Jest Documentation**: https://jestjs.io/docs/getting-started
- **Playwright**: https://playwright.dev/
- **WCAG Guidelines**: https://www.w3.org/WAI/WCAG21/quickref/
- **Lighthouse**: https://developers.google.com/web/tools/lighthouse
- **Storybook Testing**: https://storybook.js.org/docs/react/writing-tests/introduction

## Version History

- **1.0.0** (2025-08-21): Initial testing strategy with comprehensive coverage
