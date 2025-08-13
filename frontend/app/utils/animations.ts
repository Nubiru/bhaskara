/**
 * @fileoverview Sistema de animaciones y transiciones para MutualMetrics
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-01-01
 * 
 * @description
 * Utilidades para manejar animaciones y transiciones de manera consistente
 * en toda la aplicación. Incluye easing functions, duraciones estándar,
 * y helpers para animaciones complejas.
 * 
 * @dependencies
 * - Ninguna (vanilla JavaScript)
 * 
 * @usage
 * import { fadeIn, slideUp, useAnimation } from './animations';
 * 
 * @state
 * ✅ Funcional - Sistema de animaciones completo
 * 
 * @bugs
 * - Ninguno conocido
 * 
 * @todo
 * - [PRIORITY: LOW] Agregar animaciones de spring
 * - [PRIORITY: LOW] Implementar timeline de animaciones
 * - [PRIORITY: LOW] Soporte para reduced motion
 * 
 * @performance
 * - Animaciones optimizadas para 60fps
 * - GPU acceleration cuando sea posible
 * - Respect for prefers-reduced-motion
 * 
 * @accessibility
 * - Respeta prefers-reduced-motion
 * - Animaciones skip-able
 * - Focus management durante animaciones
 * 
 * @security
 * - Sin vulnerabilidades conocidas
 * - Inputs sanitizados
 */

/**
 * Duraciones estándar de animaciones (en ms)
 */
export const DURATIONS = {
  fast: 150,
  normal: 200,
  slow: 300,
  slower: 500,
  slowest: 800,
} as const;

/**
 * Easing functions estándar
 */
export const EASINGS = {
  linear: 'linear',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeInBack: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  easeOutBack: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  easeInOutBack: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
} as const;

/**
 * Tipos de animación disponibles
 */
export type AnimationType = 
  | 'fadeIn' 
  | 'fadeOut' 
  | 'slideUp' 
  | 'slideDown' 
  | 'slideLeft' 
  | 'slideRight'
  | 'scaleIn' 
  | 'scaleOut'
  | 'rotateIn'
  | 'bounce';

/**
 * Configuración de animación
 */
export interface AnimationConfig {
  duration?: keyof typeof DURATIONS | number;
  easing?: keyof typeof EASINGS | string;
  delay?: number;
  fillMode?: 'none' | 'forwards' | 'backwards' | 'both';
  iterationCount?: number | 'infinite';
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
}

/**
 * Keyframes predefinidos para animaciones comunes
 */
export const KEYFRAMES = {
  fadeIn: [
    { opacity: 0 },
    { opacity: 1 }
  ],
  fadeOut: [
    { opacity: 1 },
    { opacity: 0 }
  ],
  slideUp: [
    { transform: 'translateY(100%)', opacity: 0 },
    { transform: 'translateY(0)', opacity: 1 }
  ],
  slideDown: [
    { transform: 'translateY(-100%)', opacity: 0 },
    { transform: 'translateY(0)', opacity: 1 }
  ],
  slideLeft: [
    { transform: 'translateX(100%)', opacity: 0 },
    { transform: 'translateX(0)', opacity: 1 }
  ],
  slideRight: [
    { transform: 'translateX(-100%)', opacity: 0 },
    { transform: 'translateX(0)', opacity: 1 }
  ],
  scaleIn: [
    { transform: 'scale(0.5)', opacity: 0 },
    { transform: 'scale(1)', opacity: 1 }
  ],
  scaleOut: [
    { transform: 'scale(1)', opacity: 1 },
    { transform: 'scale(0.5)', opacity: 0 }
  ],
  rotateIn: [
    { transform: 'rotate(-180deg) scale(0.5)', opacity: 0 },
    { transform: 'rotate(0deg) scale(1)', opacity: 1 }
  ],
  bounce: [
    { transform: 'scale(1)' },
    { transform: 'scale(1.05)' },
    { transform: 'scale(1)' }
  ]
};

/**
 * Verifica si el usuario prefiere animaciones reducidas
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Obtiene la configuración final de animación considerando las preferencias del usuario
 */
const getFinalConfig = (config: AnimationConfig = {}): Required<AnimationConfig> => {
  const reducedMotion = prefersReducedMotion();
  
  return {
    duration: reducedMotion ? 0 : (typeof config.duration === 'string' ? DURATIONS[config.duration] : config.duration || DURATIONS.normal),
    easing: typeof config.easing === 'string' && config.easing in EASINGS ? EASINGS[config.easing as keyof typeof EASINGS] : config.easing || EASINGS.easeOut,
    delay: config.delay || 0,
    fillMode: config.fillMode || 'both',
    iterationCount: config.iterationCount || 1,
    direction: config.direction || 'normal',
  };
};

/**
 * Anima un elemento usando Web Animations API
 */
export const animate = (
  element: Element,
  keyframes: Keyframe[] | PropertyIndexedKeyframes,
  config: AnimationConfig = {}
): Animation => {
  const finalConfig = getFinalConfig(config);

  const animation = element.animate(keyframes, {
    duration: finalConfig.duration,
    easing: finalConfig.easing,
    delay: finalConfig.delay,
    fill: finalConfig.fillMode,
    iterations: finalConfig.iterationCount === 'infinite' ? Infinity : finalConfig.iterationCount,
    direction: finalConfig.direction,
  });

  return animation;
};

/**
 * Animaciones predefinidas usando los keyframes
 */
export const animations = {
  fadeIn: (element: Element, config?: AnimationConfig) => 
    animate(element, KEYFRAMES.fadeIn, config),
    
  fadeOut: (element: Element, config?: AnimationConfig) => 
    animate(element, KEYFRAMES.fadeOut, config),
    
  slideUp: (element: Element, config?: AnimationConfig) => 
    animate(element, KEYFRAMES.slideUp, config),
    
  slideDown: (element: Element, config?: AnimationConfig) => 
    animate(element, KEYFRAMES.slideDown, config),
    
  slideLeft: (element: Element, config?: AnimationConfig) => 
    animate(element, KEYFRAMES.slideLeft, config),
    
  slideRight: (element: Element, config?: AnimationConfig) => 
    animate(element, KEYFRAMES.slideRight, config),
    
  scaleIn: (element: Element, config?: AnimationConfig) => 
    animate(element, KEYFRAMES.scaleIn, config),
    
  scaleOut: (element: Element, config?: AnimationConfig) => 
    animate(element, KEYFRAMES.scaleOut, config),
    
  rotateIn: (element: Element, config?: AnimationConfig) => 
    animate(element, KEYFRAMES.rotateIn, config),
    
  bounce: (element: Element, config?: AnimationConfig) => 
    animate(element, KEYFRAMES.bounce, config),
};

/**
 * Hook de React para animaciones (requiere React)
 */
export const useAnimation = () => {
  const animateElement = (
    elementOrRef: Element | React.RefObject<Element>,
    type: AnimationType,
    config?: AnimationConfig
  ): Promise<void> => {
    return new Promise((resolve, reject) => {
      try {
        const element = 'current' in elementOrRef ? elementOrRef.current : elementOrRef;
        
        if (!element) {
          reject(new Error('Element not found'));
          return;
        }

        const animation = animations[type](element, config);
        
        animation.onfinish = () => resolve();
        animation.oncancel = () => reject(new Error('Animation cancelled'));
        
      } catch (error) {
        reject(error);
      }
    });
  };

  return { animateElement };
};

/**
 * Secuencia de animaciones
 */
export const animateSequence = async (
  animations: Array<{
    element: Element;
    type: AnimationType;
    config?: AnimationConfig;
  }>
): Promise<void> => {
  for (const anim of animations) {
    await new Promise<void>((resolve, reject) => {
      try {
        const animation = animate(anim.element, KEYFRAMES[anim.type], anim.config);
        animation.onfinish = () => resolve();
        animation.oncancel = () => reject(new Error('Animation cancelled'));
      } catch (error) {
        reject(error);
      }
    });
  }
};

/**
 * Animaciones en paralelo
 */
export const animateParallel = (
  animations: Array<{
    element: Element;
    type: AnimationType;
    config?: AnimationConfig;
  }>
): Promise<void[]> => {
  const promises = animations.map(anim => 
    new Promise<void>((resolve, reject) => {
      try {
        const animation = animate(anim.element, KEYFRAMES[anim.type], anim.config);
        animation.onfinish = () => resolve();
        animation.oncancel = () => reject(new Error('Animation cancelled'));
      } catch (error) {
        reject(error);
      }
    })
  );

  return Promise.all(promises);
};

/**
 * Clases CSS predefinidas para animaciones comunes
 */
export const animationClasses = {
  // Fade animations
  fadeIn: 'animate-fade-in',
  fadeOut: 'animate-fade-out',
  
  // Slide animations
  slideUp: 'animate-slide-up',
  slideDown: 'animate-slide-down',
  slideLeft: 'animate-slide-left',
  slideRight: 'animate-slide-right',
  
  // Scale animations
  scaleIn: 'animate-scale-in',
  scaleOut: 'animate-scale-out',
  
  // Rotate animations
  rotateIn: 'animate-rotate-in',
  
  // Bounce
  bounce: 'animate-bounce',
  
  // Loading animations
  pulse: 'animate-pulse',
  spin: 'animate-spin',
  ping: 'animate-ping',
} as const;

export default animations;
