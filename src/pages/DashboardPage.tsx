import { useEffect, useState, useCallback } from 'react';
import { getKpis, getStreams, getAlerts, getZoneCounts, getLicensePlateRecognitions, getDemographicsData, getDangerousBehaviorAlerts, getDetectedObjects, getPerimeterAlerts } from '@/lib/mockApi';
import { KpiCard } from '@/components/dashboard/KpiCard';
import { VideoFeedCard } from '@/components/dashboard/VideoFeedCard';
import { AlertsFeed } from '@/components/dashboard/AlertsFeed';
import { ZonePeopleCount } from '@/components/dashboard/ZonePeopleCount';
import { AnprFeed } from '@/components/dashboard/AnprFeed';
import { DemographicsWidget } from '@/components/dashboard/DemographicsWidget';
import { DangerousBehaviorFeed } from '@/components/dashboard/DangerousBehaviorFeed';
import { ObjectDetectionFeed } from '@/components/dashboard/ObjectDetectionFeed';
import { InteractiveMap } from '@/components/dashboard/InteractiveMap';
import { VideoFeedModal } from '@/components/dashboard/VideoFeedModal';
import type { Kpi, Stream, Alert, ZoneCount, LicensePlateRecognition, DemographicsData, GenderDistribution, DangerousBehaviorAlert, DetectedObject, PerimeterAlert } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
export function DashboardPage() {
  const [kpis, setKpis] = useState<Kpi[]>([]);
  const [streams, setStreams] = useState<Stream[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [zoneCounts, setZoneCounts] = useState<ZoneCount[]>([]);
  const [anprData, setAnprData] = useState<LicensePlateRecognition[]>([]);
  const [demographicsData, setDemographicsData] = useState<DemographicsData[]>([]);
  const [genderDistribution, setGenderDistribution] = useState<GenderDistribution[]>([]);
  const [dangerousAlerts, setDangerousAlerts] = useState<DangerousBehaviorAlert[]>([]);
  const [detectedObjects, setDetectedObjects] = useState<DetectedObject[]>([]);
  const [perimeterAlerts, setPerimeterAlerts] = useState<PerimeterAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStream, setSelectedStream] = useState<Stream | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fetchData = useCallback(async (isInitialLoad = false) => {
    try {
      if (isInitialLoad) setLoading(true);
      const [kpisData, streamsData, alertsData, zonesData, anprData, demoData, dangerData, objectsData, perimeterData] = await Promise.all([
        getKpis(),
        getStreams(),
        getAlerts(),
        getZoneCounts(),
        getLicensePlateRecognitions(),
        getDemographicsData(),
        getDangerousBehaviorAlerts(),
        getDetectedObjects(),
        getPerimeterAlerts(),
      ]);
      setKpis(kpisData);
      setStreams(streamsData);
      setAlerts(alertsData);
      setZoneCounts(zonesData);
      setAnprData(anprData);
      setDemographicsData(demoData);
      setDangerousAlerts(dangerData);
      setDetectedObjects(objectsData);
      setPerimeterAlerts(perimeterData);
      const totalMale = demoData.reduce((sum, item) => sum + item.male, 0);
      const totalFemale = demoData.reduce((sum, item) => sum + item.female, 0);
      setGenderDistribution([
        { name: 'Male', value: totalMale },
        { name: 'Female', value: totalFemale },
      ]);
    } catch (error) {
      console.error("Failed to fetch dashboard data", error);
    } finally {
      if (isInitialLoad) setLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchData(true); // Initial fetch
    const intervalId = setInterval(() => fetchData(false), 5000); // Poll every 5 seconds
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [fetchData]);
  const handleMaximizeFeed = (stream: Stream) => {
    setSelectedStream(stream);
    setIsModalOpen(true);
  };
  return (
    <>
      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold">Mission Control</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-[118px]" />)
          ) : (
            kpis.map((kpi) => <KpiCard key={kpi.title} kpi={kpi} />)
          )}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-6">
            {loading ? <Skeleton className="h-[400px] w-full" /> : <InteractiveMap streams={streams} alerts={perimeterAlerts} />}
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {loading ? (
                Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="aspect-video" />)
              ) : (
                streams.slice(0, 6).map((stream) => <VideoFeedCard key={stream.id} stream={stream} onMaximize={handleMaximizeFeed} />)
              )}
            </div>
          </div>
          <div className="lg:col-span-4 space-y-6">
            {loading ? (
              <>
                <Skeleton className="h-[240px]" />
                <Skeleton className="h-[220px]" />
                <Skeleton className="h-[250px]" />
                <Skeleton className="h-[280px]" />
                <Skeleton className="h-[380px]" />
                <Skeleton className="h-[400px]" />
              </>
            ) : (
              <>
                <DangerousBehaviorFeed alerts={dangerousAlerts} />
                <ObjectDetectionFeed objects={detectedObjects} />
                <ZonePeopleCount zones={zoneCounts} />
                <AnprFeed recognitions={anprData} />
                <DemographicsWidget ageData={demographicsData} genderData={genderDistribution} />
                <AlertsFeed alerts={alerts} />
              </>
            )}
          </div>
        </div>
      </div>
      <VideoFeedModal stream={selectedStream} isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
}