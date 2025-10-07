import { useEffect, useState } from 'react';
import { getTrafficData, getDemographicsData, getAlertsBySeverity } from '@/lib/mockApi';
import type { TrafficDataPoint, DemographicsData, AlertsBySeverity } from '@/types';
import { ChartCard } from '@/components/analytics/ChartCard';
import { TrafficChart } from '@/components/analytics/TrafficChart';
import { DemographicsChart } from '@/components/analytics/DemographicsChart';
import { AlertsBySeverityChart } from '@/components/analytics/AlertsBySeverityChart';
export function AnalyticsPage() {
  const [trafficData, setTrafficData] = useState<TrafficDataPoint[]>([]);
  const [demographicsData, setDemographicsData] = useState<DemographicsData[]>([]);
  const [alertsBySeverity, setAlertsBySeverity] = useState<AlertsBySeverity[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [traffic, demographics, alerts] = await Promise.all([
          getTrafficData(),
          getDemographicsData(),
          getAlertsBySeverity(),
        ]);
        setTrafficData(traffic);
        setDemographicsData(demographics);
        setAlertsBySeverity(alerts);
      } catch (error) {
        console.error("Failed to fetch analytics data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Analytics & Reports</h1>
      <p className="text-muted-foreground">
        Explore historical trends and gain insights from your video streams.
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Foot Traffic Over Time"
          description="People detected per 2-hour interval over the last 24 hours."
          loading={loading}
          className="lg:col-span-2"
        >
          <TrafficChart data={trafficData} />
        </ChartCard>
        <ChartCard
          title="Demographics Distribution"
          description="Distribution of detected people by age group and gender."
          loading={loading}
        >
          <DemographicsChart data={demographicsData} />
        </ChartCard>
        <ChartCard
          title="Alerts by Severity"
          description="Distribution of all historical alerts by their severity level."
          loading={loading}
        >
          <AlertsBySeverityChart data={alertsBySeverity} />
        </ChartCard>
      </div>
    </div>
  );
}