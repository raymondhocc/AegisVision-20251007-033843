import '@/lib/errorReporter';
import { enableMapSet } from "immer";
enableMapSet();
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary';
import '@/index.css'
import App from '@/App';
import { DashboardPage } from '@/pages/DashboardPage';
import { StreamManagementPage } from '@/pages/StreamManagementPage';
import { AnalyticsPage } from '@/pages/AnalyticsPage';
import { AlertsHistoryPage } from '@/pages/AlertsHistoryPage';
import { SettingsPage } from '@/pages/SettingsPage';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "streams",
        element: <StreamManagementPage />,
      },
      {
        path: "analytics",
        element: <AnalyticsPage />,
      },
      {
        path: "alerts",
        element: <AlertsHistoryPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
    ],
  },
]);
// Do not touch this code
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </StrictMode>,
)