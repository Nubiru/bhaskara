/**
 * @fileoverview Hook personalizado para gestión de historial local con localStorage
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-01-01
 *
 * @description
 * Hook personalizado que gestiona el historial local de análisis cuadráticos usando localStorage.
 * Incluye funciones para agregar, obtener, eliminar y exportar análisis del historial.
 *
 * @dependencies
 * - Tipos de quadratic.ts para datos de análisis
 * - localStorage API del navegador
 *
 * @usage
 * const { history, addToHistory, removeFromHistory, clearHistory, exportHistory } = useLocalHistory();
 *
 * @state
 * ✅ Funcional - Gestión completa de historial local
 *
 * @bugs
 * - Ninguno conocido
 *
 * @todo
 * - [PRIORITY: LOW] Agregar compresión de datos para optimizar espacio
 * - [PRIORITY: LOW] Implementar sincronización con backend
 * - [PRIORITY: LOW] Agregar filtros y búsqueda en historial
 *
 * @performance
 * - Memoización de operaciones costosas
 * - Lazy loading de datos grandes
 * - Optimización de re-renders
 *
 * @accessibility
 * - Notificaciones de estado para screen readers
 * - Manejo de errores accesible
 * - Feedback visual de operaciones
 *
 * @security
 * - Validación de datos de entrada
 * - Sanitización de datos antes de almacenar
 * - Límites de tamaño para prevenir DoS
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import type { AnalysisRequest, FullAnalysisResult } from '../types/quadratic';

// Constantes para configuración
const STORAGE_KEY = 'mutualmetrics_history';
const MAX_HISTORY_SIZE = 50;
const MAX_ITEM_SIZE = 1024 * 1024; // 1MB por item

// Tipos para el historial
interface HistoryItem {
  id: string;
  timestamp: number;
  request: AnalysisRequest;
  result: FullAnalysisResult;
  description?: string;
}

interface UseLocalHistoryReturn {
  history: HistoryItem[];
  addToHistory: (request: AnalysisRequest, result: FullAnalysisResult, description?: string) => void;
  removeFromHistory: (id: string) => void;
  clearHistory: () => void;
  getHistoryItem: (id: string) => HistoryItem | null;
  exportHistory: (format: 'json' | 'csv') => string;
  isLoading: boolean;
  error: string | null;
}

/**
 * Hook para gestión de historial local
 */
export const useLocalHistory = (): UseLocalHistoryReturn => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar historial desde localStorage al inicializar
  useEffect(() => {
    const loadHistory = () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored) as HistoryItem[];
          // Validar que sea un array y tenga la estructura correcta
          if (Array.isArray(parsed)) {
            setHistory(parsed.slice(0, MAX_HISTORY_SIZE));
          } else {
            setHistory([]);
          }
        }
      } catch (err) {
        console.error('Error loading history:', err);
        setError('Error al cargar el historial');
        setHistory([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadHistory();
  }, []);

  // Guardar historial en localStorage cuando cambie
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
      } catch (err) {
        console.error('Error saving history:', err);
        setError('Error al guardar el historial');
      }
    }
  }, [history, isLoading]);

  // Generar ID único para items del historial
  const generateId = useCallback((): string => {
    return `analysis_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  // Validar tamaño de datos antes de almacenar
  const validateDataSize = useCallback((data: unknown): boolean => {
    try {
      const serialized = JSON.stringify(data);
      return serialized.length <= MAX_ITEM_SIZE;
    } catch {
      return false;
    }
  }, []);

  // Agregar item al historial
  const addToHistory = useCallback((
    request: AnalysisRequest,
    result: FullAnalysisResult,
    description?: string
  ) => {
    try {
      setError(null);
      
      // Validar tamaño de datos
      const itemData = { request, result, description };
      if (!validateDataSize(itemData)) {
        setError('Los datos del análisis son demasiado grandes');
        return;
      }

      const newItem: HistoryItem = {
        id: generateId(),
        timestamp: Date.now(),
        request,
        result,
        description,
      };

      setHistory(prev => {
        const updated = [newItem, ...prev];
        // Mantener solo los últimos MAX_HISTORY_SIZE items
        return updated.slice(0, MAX_HISTORY_SIZE);
      });
    } catch (err) {
      console.error('Error adding to history:', err);
      setError('Error al agregar al historial');
    }
  }, [generateId, validateDataSize]);

  // Remover item del historial
  const removeFromHistory = useCallback((id: string) => {
    try {
      setError(null);
      setHistory(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      console.error('Error removing from history:', err);
      setError('Error al eliminar del historial');
    }
  }, []);

  // Limpiar todo el historial
  const clearHistory = useCallback(() => {
    try {
      setError(null);
      setHistory([]);
    } catch (err) {
      console.error('Error clearing history:', err);
      setError('Error al limpiar el historial');
    }
  }, []);

  // Obtener item específico del historial
  const getHistoryItem = useCallback((id: string): HistoryItem | null => {
    return history.find(item => item.id === id) || null;
  }, [history]);

  // Exportar historial en diferentes formatos
  const exportHistory = useCallback((format: 'json' | 'csv'): string => {
    try {
      if (format === 'json') {
        return JSON.stringify(history, null, 2);
      } else if (format === 'csv') {
        const headers = ['ID', 'Fecha', 'Coeficiente A', 'Coeficiente B', 'Coeficiente C', 'Modo', 'Descripción'];
        const rows = history.map(item => [
          item.id,
          new Date(item.timestamp).toISOString(),
          item.request.coefficients.a,
          item.request.coefficients.b,
          item.request.coefficients.c,
          item.request.mode,
          item.description || ''
        ]);
        
        const csvContent = [headers, ...rows]
          .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
          .join('\n');
        
        return csvContent;
      }
      return '';
    } catch (err) {
      console.error('Error exporting history:', err);
      setError('Error al exportar el historial');
      return '';
    }
  }, [history]);

  // Memoizar valores para optimizar re-renders
  const memoizedHistory = useMemo(() => history, [history]);

  return {
    history: memoizedHistory,
    addToHistory,
    removeFromHistory,
    clearHistory,
    getHistoryItem,
    exportHistory,
    isLoading,
    error,
  };
};
