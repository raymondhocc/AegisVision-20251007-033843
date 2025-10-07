import * as React from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useStreamStore } from '@/stores/streamStore';
import { getColumns } from './StreamDataTableColumns';
import { StreamForm, type StreamFormValues } from './StreamForm';
import type { Stream } from '@/types';
import { toast } from 'sonner';
export function StreamDataTable() {
  const streams = useStreamStore((state) => state.streams);
  const addStream = useStreamStore((state) => state.addStream);
  const updateStream = useStreamStore((state) => state.updateStream);
  const deleteStream = useStreamStore((state) => state.deleteStream);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = React.useState(false);
  const [selectedStream, setSelectedStream] = React.useState<Stream | null>(null);
  const handleEdit = (stream: Stream) => {
    setSelectedStream(stream);
    setIsFormOpen(true);
  };
  const handleDelete = (stream: Stream) => {
    setSelectedStream(stream);
    setIsDeleteAlertOpen(true);
  };
  const columns = React.useMemo(() => getColumns(handleEdit, handleDelete), []);
  const table = useReactTable({
    data: streams,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  const handleFormSubmit = (values: StreamFormValues) => {
    // The `selectedStream` state is preserved while the dialog is open.
    // It's only cleared after the dialog closes.
    if (selectedStream && selectedStream.id) {
      updateStream({ ...selectedStream, ...values });
      toast.success('Stream updated successfully.');
    } else {
      addStream(values);
      toast.success('Stream added successfully.');
    }
    setIsFormOpen(false);
  };
  const confirmDelete = () => {
    if (selectedStream) {
      deleteStream(selectedStream.id);
      toast.success('Stream deleted successfully.');
    }
    setIsDeleteAlertOpen(false);
    setSelectedStream(null);
  };
  // Reset selected stream when form dialog closes
  React.useEffect(() => {
    if (!isFormOpen) {
      setSelectedStream(null);
    }
  }, [isFormOpen]);
  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter streams by name..."
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <Button onClick={() => { setSelectedStream(null); setIsFormOpen(true); }} className="ml-auto">
          <PlusCircle className="mr-2 h-4 w-4" /> Add Stream
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </Button>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div>
      {/* Add/Edit Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>{selectedStream ? 'Edit Stream' : 'Add New Stream'}</DialogTitle>
            <DialogDescription>
              {selectedStream ? 'Update the details of your existing stream.' : 'Fill in the details to add a new video stream.'}
            </DialogDescription>
          </DialogHeader>
          <StreamForm
            stream={selectedStream}
            onSubmit={handleFormSubmit}
            onClose={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the stream "{selectedStream?.name}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}