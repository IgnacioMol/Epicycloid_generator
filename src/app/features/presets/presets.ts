import { PatternParams } from '../../models/pattern-params.model';

/**
 * Un "ejemplo" predefinido (RF7): una configuración de parámetros con nombre que el
 * usuario puede recuperar desde el desplegable de ejemplos del panel de control.
 *
 * `params` solo contiene los valores que difieren de DEFAULT_PARAMS; al aplicarlo se
 * fusiona sobre los valores por defecto, de modo que cada ejemplo deja el panel en un
 * estado completo y reproducible. Al pulsar "Play" se dibuja el patrón guardado.
 */
export interface PatternPreset {
  /** Identificador estable usado como valor del <select> y como clave i18n del nombre. */
  id: string;
  /** Parámetros que sobrescriben a DEFAULT_PARAMS. */
  params: Partial<PatternParams>;
}

/**
 * Catálogo de ejemplos integrados. El nombre visible se traduce con la clave
 * `controls.presets.<id>` (ver es.json / en.json). El desplegable arranca vacío
 * (lienzo en blanco con los parámetros por defecto); estos son los patrones
 * seleccionables.
 */
export const PATTERN_PRESETS: PatternPreset[] = [
  {
    id: 'fiveRose',
    params: {
      visualizationMode: 'lines',
      orbit1Radius: 220,
      orbit2Radius: 220,
      orbit1SpeedRpm: 7,
      orbit2SpeedRpm: 2,
      lineColor: '#4fc3f7',
      lineAlpha: 0.5,
    },
  },
  {
    id: 'eightStar',
    params: {
      visualizationMode: 'lines',
      orbit1Radius: 200,
      orbit2Radius: 200,
      orbit1SpeedRpm: 9,
      orbit2SpeedRpm: 1,
      lineColor: '#ff7043',
      lineAlpha: 0.45,
    },
  },
  {
    id: 'epiFlower',
    params: {
      visualizationMode: 'curve',
      orbit1Radius: 160,
      orbit2Radius: 70,
      orbit1SpeedRpm: 3,
      orbit2SpeedRpm: 17,
      lineColor: '#ba68c8',
      lineAlpha: 0.7,
    },
  },
  {
    id: 'ellipticMandala',
    params: {
      visualizationMode: 'lines',
      orbit1Radius: 240,
      orbit2Radius: 180,
      orbit1SpeedRpm: 8,
      orbit2SpeedRpm: 5,
      orbit1EllipseX: 1.4,
      orbit1EllipseY: 0.7,
      orbit2EllipseX: 0.8,
      orbit2EllipseY: 1.3,
      orbit1Angle: 30,
      lineColor: '#ffd54f',
      lineAlpha: 0.4,
    },
  },
  {
    id: 'hypnoticSpiral',
    params: {
      visualizationMode: 'curve',
      orbit1Radius: 120,
      orbit2Radius: 110,
      orbit1SpeedRpm: 5,
      orbit2SpeedRpm: 5.3,
      lineColor: '#4db6ac',
      lineAlpha: 0.6,
    },
  },
  {
    id: 'crown',
    params: {
      visualizationMode: 'lines',
      orbit1Radius: 190,
      orbit2Radius: 285,
      orbit1EllipseX: 0.2,
      orbit1EllipseY: 1.95,
      orbit2EllipseX: 1.3,
      orbit2EllipseY: 1.25,
      orbit1Angle: 109,
      orbit2Angle: 28,
      orbit1SpeedRpm: 18.5,
      orbit2SpeedRpm: 44,
      initialAngle1: 208,
      initialAngle2: 340,
      lineColor: '#ffd700',
      lineAlpha: 0.1,
      strokeWeight: 0,
    },
  },
];
