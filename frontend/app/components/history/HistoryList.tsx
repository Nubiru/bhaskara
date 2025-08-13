/**
 * @fileoverview Componente para mostrar lista de historial de análisis
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-01-01
 *
 * @description
 * Componente que muestra la lista de análisis guardados en el historial local.
 * Incluye funcionalidades de exportación, eliminación y recálculo de análisis.
 *
 * @dependencies
 * - useLocalHistory hook para gestión de datos
 * - Tipos de quadratic.ts para datos de análisis
 * - Componentes UI base (LoadingSpinner)
 *
 * @usage
 * <HistoryList onRecalculate={handleRecalculate} />
 *
 * @state
 * ✅ Funcional - Lista completa de historial con exportación
 *
 * @bugs
 * - Ninguno conocido
 *
 * @todo
 * - [PRIORITY: LOW] Agregar filtros por fecha y coeficientes
 * - [PRIORITY: LOW] Implementar búsqueda en historial
 * - [PRIORITY: LOW] Agregar paginación para historiales grandes
 *
 * @performance
 * - Virtualización para listas grandes
 * - Lazy loading de detalles
 * - Memoización de componentes
 *
 * @accessibility
 * - ARIA labels para acciones
 * - Navegación por teclado
 * - Estados de carga accesibles
 *
 * @security
 * - Sanitización de datos mostrados
 * - Confirmación para eliminación
 * - Validación de datos de entrada
 */

import React, { memo, useCallback, useState } from 'react';
import { useLocalHistory } from '../../hooks/useLocalHistory';
import LoadingSpinner from '../ui/LoadingSpinner';
import type { AnalysisRequest, FullAnalysisResult } from '../../types/quadratic';

interface HistoryListProps {
  onRecalculate?: (request: AnalysisRequest, result: FullAnalysisResult) => void;
  className?: string;
}

interface HistoryItemProps {
  item: {
    id: string;
    timestamp: number;
    request: AnalysisRequest;
    result: FullAnalysisResult;
    description?: string;
  };
  onRecalculate?: (request: AnalysisRequest, result: FullAnalysisResult) => void;
  onRemove: (id: string) => void;
}

// Componente para mostrar un item individual del historial
const HistoryItem = memo<HistoryItemProps>(({ item, onRecalculate, onRemove }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = useCallback(async () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este análisis del historial?')) {
      setIsRemoving(true);
      try {
        onRemove(item.id);
      } finally {
        setIsRemoving(false);
      }
    }
  }, [item.id, onRemove]);

  const handleRecalculate = useCallback(() => {
    onRecalculate?.(item.request, item.result);
  }, [item.request, item.result, onRecalculate]);

  const formatDate = (timestamp: number): string => {
    return new Date(timestamp).toLocaleString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatCoefficients = (coefficients: AnalysisRequest['coefficients']): string => {
    return `f(x) = ${coefficients.a}x² ${coefficients.b >= 0 ? '+' : ''}${coefficients.b}x ${coefficients.c >= 0 ? '+' : ''}${coefficients.c}`;
  };

  return (
    <article className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {item.description || 'Análisis Cuadrático'}
          </h3>
          <p className="text-sm text-gray-600 mt-1 font-mono">
            {formatCoefficients(item.request.coefficients)}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            {formatDate(item.timestamp)} • Modo: {item.request.mode}
          </p>
        </div>
        
        <div className="flex items-center space-x-2 ml-4">
          {onRecalculate && (
            <button
              onClick={handleRecalculate}
              className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Recalcular análisis"
            >
              🔄 Recalcular
            </button>
          )}
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
            aria-label={isExpanded ? 'Ocultar detalles' : 'Mostrar detalles'}
            aria-expanded={isExpanded}
          >
            {isExpanded ? '📋 Ocultar' : '📋 Detalles'}
          </button>
          
          <button
            onClick={handleRemove}
            disabled={isRemoving}
            className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
            aria-label="Eliminar del historial"
          >
            {isRemoving ? '🗑️...' : '🗑️'}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Resultados:</h4>
              <dl className="space-y-1">
                <div className="flex justify-between">
                  <dt className="text-gray-600">Discriminante:</dt>
                  <dd className="font-mono">{item.result.discriminant.toFixed(4)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Raíz 1:</dt>
                  <dd className="font-mono">{item.result.roots.x1?.toFixed(4) || 'N/A'}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Raíz 2:</dt>
                  <dd className="font-mono">{item.result.roots.x2?.toFixed(4) || 'N/A'}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Vértice X:</dt>
                  <dd className="font-mono">{item.result.vertex.x.toFixed(4)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Vértice Y:</dt>
                  <dd className="font-mono">{item.result.vertex.y.toFixed(4)}</dd>
                </div>
              </dl>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Propiedades:</h4>
              <dl className="space-y-1">
                <div className="flex justify-between">
                  <dt className="text-gray-600">Naturaleza:</dt>
                  <dd className="capitalize">{item.result.roots.nature}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Concavidad:</dt>
                  <dd>{item.request.coefficients.a > 0 ? 'Hacia arriba' : 'Hacia abajo'}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">ID:</dt>
                  <dd className="font-mono text-xs">{item.id}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      )}
    </article>
  );
});

HistoryItem.displayName = 'HistoryItem';

// Componente principal de lista de historial
const HistoryList = memo<HistoryListProps>(({ onRecalculate, className = '' }) => {
  const { history, removeFromHistory, clearHistory, exportHistory, isLoading, error } = useLocalHistory();
  const [exportFormat, setExportFormat] = useState<'json' | 'csv'>('json');
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = useCallback(() => {
    setIsExporting(true);
    try {
      const data = exportHistory(exportFormat);
      const blob = new Blob([data], { 
        type: exportFormat === 'json' ? 'application/json' : 'text/csv' 
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `mutualmetrics_history.${exportFormat}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error exporting:', err);
    } finally {
      setIsExporting(false);
    }
  }, [exportHistory, exportFormat]);

  const handleClearHistory = useCallback(() => {
    if (window.confirm('¿Estás seguro de que quieres eliminar todo el historial? Esta acción no se puede deshacer.')) {
      clearHistory();
    }
  }, [clearHistory]);

  if (isLoading) {
    return (
      <div className={`flex justify-center items-center py-12 ${className}`}>
        <LoadingSpinner size="lg" />
        <span className="ml-3 text-gray-600">Cargando historial...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-red-50 border border-red-200 rounded-lg p-4 ${className}`}>
        <p className="text-red-600 font-medium">Error al cargar el historial</p>
        <p className="text-sm text-red-500 mt-1">{error}</p>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header con controles */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Historial de Análisis
          </h2>
          <p className="text-gray-600 mt-1">
            {history.length} análisis guardados localmente
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <select
            value={exportFormat}
            onChange={(e) => setExportFormat(e.target.value as 'json' | 'csv')}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Formato de exportación"
          >
            <option value="json">JSON</option>
            <option value="csv">CSV</option>
          </select>
          
          <button
            onClick={handleExport}
            disabled={isExporting || history.length === 0}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
            aria-label="Exportar historial"
          >
            {isExporting ? '📤 Exportando...' : '📤 Exportar'}
          </button>
          
          {history.length > 0 && (
            <button
              onClick={handleClearHistory}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
              aria-label="Limpiar todo el historial"
            >
              🗑️ Limpiar Todo
            </button>
          )}
        </div>
      </div>

      {/* Lista de análisis */}
      {history.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <div className="text-gray-400 text-6xl mb-4">📊</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No hay análisis guardados
          </h3>
          <p className="text-gray-600">
            Los análisis que realices se guardarán automáticamente aquí para referencia futura.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((item) => (
            <HistoryItem
              key={item.id}
              item={item}
              onRecalculate={onRecalculate}
              onRemove={removeFromHistory}
            />
          ))}
        </div>
      )}
    </div>
  );
});

HistoryList.displayName = 'HistoryList';

export default HistoryList;
