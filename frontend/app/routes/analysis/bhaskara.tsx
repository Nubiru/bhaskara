/**
 * @fileoverview Redirects to main Bhaskara analysis (home page)
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-01-01
 * 
 * @description
 * Simple redirect component since Bhaskara analysis is already implemented
 * in the home route. This maintains URL consistency for the analysis layout.
 */

import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export default function BhaskaraAnalysis() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to main page since Bhaskara is already implemented there
    navigate('/', { replace: true });
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-64">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Redirigiendo al análisis Bhaskara...
        </p>
      </div>
    </div>
  );
}
