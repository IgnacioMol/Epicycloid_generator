export type VisualizationMode = 'curve' | 'lines';

export interface PatternParams {
  // Orbit geometry
  orbit1Radius: number;
  orbit2Radius: number;
  orbit1EllipseX: number;   // horizontal ellipse scale (1.0 = circle)
  orbit1EllipseY: number;
  orbit2EllipseX: number;
  orbit2EllipseY: number;

  // Angular speeds (radians per frame)
  orbit1Speed: number;
  orbit2Speed: number;

  // Initial absolute angles (degrees, 0-360)
  initialAngle1: number;
  initialAngle2: number;

  // Line visuals
  lineColor: string;       // hex e.g. '#ffffff'
  lineAlpha: number;       // 0-1
  strokeWeight: number;

  // Mode
  visualizationMode: VisualizationMode;
}
