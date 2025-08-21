/**
 * @fileoverview Simple visual baseline tests (DOM snapshots) for key components
 * Updated to reflect the new refactored architecture with sidebar navigation
 */

import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Home from '../../app/routes/home';
import Sidebar from '../../app/components/navigation/Sidebar';
import LandingPage from '../../app/components/layout/LandingPage';
import AnalysisPanel from '../../app/components/layout/AnalysisPanel';

describe('Visual baseline snapshots', () => {
  it('Home page snapshot', () => {
    const { container } = render(<Home />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('Sidebar component snapshot', () => {
    const mockToolsConfig = [
      {
        id: 'bhaskara' as const,
        label: 'Análisis Cuadrático',
        description: 'Análisis completo de funciones cuadráticas',
        icon: '📐',
        category: 'math' as const,
        isImplemented: true,
        translationKey: 'home.sidebar.tools.bhaskara',
        descriptionKey: 'home.sidebar.descriptions.bhaskara'
      }
    ];

    const { container } = render(
      <Sidebar
        currentView="landing"
        onViewChange={() => {}}
        toolsConfig={mockToolsConfig}
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('Landing page component snapshot', () => {
    const { container } = render(<LandingPage />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('Analysis panel component snapshot', () => {
    const { container } = render(
      <AnalysisPanel
        title="Test Analysis"
        subtitle="Test subtitle"
        formComponent={<div>Test Form</div>}
        resultsComponent={<div>Test Results</div>}
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});


