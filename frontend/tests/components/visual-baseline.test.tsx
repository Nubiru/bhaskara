/**
 * @fileoverview Simple visual baseline tests (DOM snapshots) for key routes
 */

import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Home from '../../app/routes/home';
import RevenuePage from '../../app/routes/analysis/revenue';
import CostsPage from '../../app/routes/analysis/costs';
import ProfitPage from '../../app/routes/analysis/profit';
import BreakEvenPage from '../../app/routes/analysis/break-even';

describe('Visual baseline snapshots', () => {
  it('Home snapshot', () => {
    const { container } = render(<Home />);
    expect(container.firstChild).toMatchSnapshot();
  });
  it('Revenue snapshot', () => {
    const { container } = render(<RevenuePage />);
    expect(container.firstChild).toMatchSnapshot();
  });
  it('Costs snapshot', () => {
    const { container } = render(<CostsPage />);
    expect(container.firstChild).toMatchSnapshot();
  });
  it('Profit snapshot', () => {
    const { container } = render(<ProfitPage />);
    expect(container.firstChild).toMatchSnapshot();
  });
  it('Break-even snapshot', () => {
    const { container } = render(<BreakEvenPage />);
    expect(container.firstChild).toMatchSnapshot();
  });
});


