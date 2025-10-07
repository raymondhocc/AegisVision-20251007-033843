import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Stream } from '@/types';
const statusVariantMap: { [key in Stream['status']]: 'default' | 'destructive' | 'secondary' } = {
  Online: 'default',
  Offline: 'destructive',
  Warning: 'secondary',
};
const statusColorMap: { [key in Stream['status']]: string } = {
  Online: 'bg-green-500',
  Offline: 'bg-red-500',
  Warning: 'bg-yellow-500',
};
export const getColumns = (
  onEdit: (stream: Stream) => void,
  onDelete: (stream: Stream) => void
): ColumnDef<Stream>[] => [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="font-medium">{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as Stream['status'];
      return (
        <Badge variant={statusVariantMap[status]} className="capitalize">
          <span className={cn('h-2 w-2 rounded-full mr-2', statusColorMap[status])} />
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'location',
    header: 'Location',
  },
  {
    accessorKey: 'resolution',
    header: 'Resolution',
  },
  {
    accessorKey: 'rtspUrl',
    header: 'RTSP URL',
    cell: ({ row }) => <div className="font-mono text-xs">{row.getValue('rtspUrl')}</div>,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const stream = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => onEdit(stream)}>Edit</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500" onClick={() => onDelete(stream)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];