import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Video, BarChart2, Bell, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useAppStore } from '@/stores/appStore';
const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/streams', icon: Video, label: 'Stream Management' },
  { to: '/analytics', icon: BarChart2, label: 'Analytics' },
  { to: '/alerts', icon: Bell, label: 'Alerts History' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];
export function Sidebar() {
  const isSidebarOpen = useAppStore((state) => state.isSidebarOpen);
  return (
    <aside className={cn(
      "flex flex-col bg-card border-r transition-all duration-300 ease-in-out",
      isSidebarOpen ? "w-64" : "w-20"
    )}>
      <div className="flex items-center justify-center h-16 px-6 border-b flex-shrink-0">
        <div className="text-2xl font-bold text-primary tracking-widest flex-shrink-0">
          NTT
        </div>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        <TooltipProvider delayDuration={0}>
          {navItems.map((item) => (
            <Tooltip key={item.to}>
              <TooltipTrigger asChild>
                <NavLink
                  to={item.to}
                  end
                  className={({ isActive }) => cn(
                    "flex items-center p-3 rounded-lg transition-colors",
                    "hover:bg-accent hover:text-accent-foreground",
                    isActive ? "bg-primary/10 text-primary" : "text-muted-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {isSidebarOpen && <span className="ml-4 font-medium whitespace-nowrap">{item.label}</span>}
                </NavLink>
              </TooltipTrigger>
              {!isSidebarOpen && (
                <TooltipContent side="right" className="bg-card text-foreground">
                  {item.label}
                </TooltipContent>
              )}
            </Tooltip>
          ))}
        </TooltipProvider>
      </nav>
    </aside>
  );
}