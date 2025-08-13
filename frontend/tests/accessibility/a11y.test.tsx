/**
 * @fileoverview Accessibility smoke tests with axe-core
 */

import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
// axe is ESM; use dynamic import to avoid config issues

import Home from '../../app/routes/home';
import RevenuePage from '../../app/routes/analysis/revenue';
import CostsPage from '../../app/routes/analysis/costs';
import ProfitPage from '../../app/routes/analysis/profit';
import BreakEvenPage from '../../app/routes/analysis/break-even';

async function runAxe(container: HTMLElement) {
  const axe = await import('axe-core');
  const results = await axe.run(container, {
    rules: {
      region: { enabled: false },
    },
  } as any);
  return results;
}

describe('Accessibility (axe) smoke tests', () => {
  test('Home has no serious a11y violations', async () => {
    const { container } = render(<Home />);
    const { violations } = await runAxe(container);
    const serious = violations.filter(v => v.impact === 'serious' || v.impact === 'critical');
    expect(serious).toHaveLength(0);
  });

  test('Revenue page baseline', async () => {
    const { container } = render(<RevenuePage />);
    const { violations } = await runAxe(container);
    const serious = violations.filter(v => v.impact === 'serious' || v.impact === 'critical');
    expect(serious).toHaveLength(0);
  });

  test('Costs page baseline', async () => {
    const { container } = render(<CostsPage />);
    const { violations } = await runAxe(container);
    const serious = violations.filter(v => v.impact === 'serious' || v.impact === 'critical');
    expect(serious).toHaveLength(0);
  });

  test('Profit page baseline', async () => {
    const { container } = render(<ProfitPage />);
    const { violations } = await runAxe(container);
    const serious = violations.filter(v => v.impact === 'serious' || v.impact === 'critical');
    expect(serious).toHaveLength(0);
  });

  test('Break-even page baseline', async () => {
    const { container } = render(<BreakEvenPage />);
    const { violations } = await runAxe(container);
    const serious = violations.filter(v => v.impact === 'serious' || v.impact === 'critical');
    expect(serious).toHaveLength(0);
  });
});


