import { LucideIcon } from "lucide-react";
export interface Kpi {
  title: string;
  value: string;
  icon: LucideIcon;
  change: string;
  changeType: 'increase' | 'decrease';
}
export type StreamStatus = 'Online' | 'Offline' | 'Warning';
export interface Stream {
  id: string;
  name: string;
  status: StreamStatus;
  location: string;
  thumbnailUrl: string;
  resolution: string;
  rtspUrl:string;
  coords: [number, number];
}
export interface Alert {
  id: string;
  timestamp: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  description: string;
  streamName: string;
  location: string;
  clipUrl: string;
}
// New types for Phase 3
export interface TrafficDataPoint {
  time: string;
  people: number;
}
export interface DemographicsData {
  age: string;
  male: number;
  female: number;
}
export interface AlertsBySeverity {
  name: 'Critical' | 'High' | 'Medium' | 'Low';
  value: number;
}
export interface ZoneCount {
  id: string;
  name: string;
  count: number;
  capacity: number;
}
export interface LicensePlateRecognition {
  id: string;
  plateNumber: string;
  timestamp: string;
  location: string;
  vehicleImageUrl: string;
}
export interface GenderDistribution {
  name: 'Male' | 'Female';
  value: number;
}
export interface DangerousBehaviorAlert {
  id: string;
  type: 'Fall Detected' | 'Fight Detected' | 'Anomalous Behavior';
  timestamp: string;
  streamName: string;
  location: string;
}
export interface DetectedObject {
  id: string;
  type: 'Backpack' | 'Package' | 'Weapon' | 'Tool';
  timestamp: string;
  streamName: string;
  location: string;
}
export interface PerimeterAlert {
  id: string;
  type: 'Tripwire' | 'Area Breach';
  timestamp: string;
  location: [number, number];
  streamName: string;
}