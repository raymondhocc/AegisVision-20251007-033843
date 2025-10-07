import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { Card, CardContent } from '@/components/ui/card';
import type { Stream, PerimeterAlert } from '@/types';
import L from 'leaflet';
import { cn } from '@/lib/utils';
interface InteractiveMapProps {
  streams: Stream[];
  alerts: PerimeterAlert[];
}
const getStatusColor = (status: Stream['status']) => {
  switch (status) {
    case 'Online': return '#22c55e'; // green-500
    case 'Offline': return '#ef4444'; // red-500
    case 'Warning': return '#eab308'; // yellow-500
    default: return '#64748b'; // slate-500
  }
};
const createMarkerIcon = (status: Stream['status']) => {
  const color = getStatusColor(status);
  return L.divIcon({
    html: `<span style="background-color: ${color}; width: 1rem; height: 1rem; border-radius: 9999px; display: block; border: 2px solid white;"></span>`,
    className: 'bg-transparent border-none',
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
};
export function InteractiveMap({ streams, alerts }: InteractiveMapProps) {
  const center: [number, number] = [34.0522, -118.2437];
  return (
    <Card className="h-[400px] lg:h-auto">
      <CardContent className="p-0 h-full">
        <MapContainer center={center} zoom={14} scrollWheelZoom={false} className="h-full w-full rounded-lg z-0">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          {streams.map((stream) => (
            <Marker key={stream.id} position={stream.coords} icon={createMarkerIcon(stream.status)}>
              <Popup>
                <div className="font-sans">
                  <h3 className="font-bold">{stream.name}</h3>
                  <p>{stream.location}</p>
                  <p>Status: <span className={cn('font-semibold',
                    stream.status === 'Online' && 'text-green-500',
                    stream.status === 'Offline' && 'text-red-500',
                    stream.status === 'Warning' && 'text-yellow-500'
                  )}>{stream.status}</span></p>
                </div>
              </Popup>
            </Marker>
          ))}
          {alerts.map((alert) => (
            <Circle
              key={alert.id}
              center={alert.location}
              pathOptions={{ color: 'red', fillColor: 'red', fillOpacity: 0.2 }}
              radius={50}
            >
              <Popup>
                <div className="font-sans">
                  <h3 className="font-bold text-red-500">{alert.type} Alert!</h3>
                  <p>Source: {alert.streamName}</p>
                  <p>Time: {alert.timestamp}</p>
                </div>
              </Popup>
            </Circle>
          ))}
        </MapContainer>
      </CardContent>
    </Card>
  );
}