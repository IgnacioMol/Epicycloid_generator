export type VisualizationMode = 'curve' | 'lines';

export interface PatternParams {
  // Orbit geometry
  orbit1Radius: number;
  orbit2Radius: number;
  orbit1EllipseX: number;   // horizontal ellipse scale (1.0 = circle)
  orbit1EllipseY: number;
  orbit2EllipseX: number;
  orbit2EllipseY: number;
  orbit1Angle: number;      // orbit tilt in degrees (0-360)
  orbit2Angle: number;

  // Angular speeds in RPM (converted to rad/frame inside canvas)
  orbit1SpeedRpm: number;
  orbit2SpeedRpm: number;

  // Initial absolute angles (degrees, 0-360)
  initialAngle1: number;
  initialAngle2: number;

  // Line visuals
  lineColor: string;       // hex e.g. '#ffffff'
  lineAlpha: number;       // 0-1
  strokeWeight: number;

  // Seconds between drawn lines in 'lines' mode (0 = every frame)
  lineInterval: number;

  // Mode
  visualizationMode: VisualizationMode;
}
