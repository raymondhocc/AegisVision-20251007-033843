import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Alert } from '@/types';
const severityStyles: { [key in Alert['severity']]: string } = {
  Critical: 'border-red-500/50 bg-red-500/10 text-red-400 hover:bg-red-500/20',
  High: 'border-orange-500/50 bg-orange-500/10 text-orange-400 hover:bg-orange-500/20',
  Medium: 'border-yellow-500/50 bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20',
  Low: 'border-blue-500/50 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20',
};
export const getAlertsColumns = (
  onViewDetails: (alert: Alert) => void
): ColumnDef<Alert>[] => [
  {
    accessorKey: 'severity',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Severity
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const severity = row.getValue('severity') as Alert['severity'];
      return (
        <Badge variant="outline" className={cn('capitalize', severityStyles[severity])}>
          {severity}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => <div className="font-medium">{row.getValue('description')}</div>,
  },
  {
    accessorKey: 'streamName',
    header: 'Source Stream',
  },
  {
    accessorKey: 'location',
    header: 'Location',
  },
  {
    accessorKey: 'timestamp',
    header: 'Timestamp',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const alert = row.original;
      return (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => onViewDetails(alert)}>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];