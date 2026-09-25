export interface TelemetryMetric {
  id: string;
  timestamp: number;
  angle: number;
  status: 'stable' | 'warning' | 'critical';
}