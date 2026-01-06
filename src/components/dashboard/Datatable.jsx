import data from '@/assets/dummy.json';
import { useState } from 'react';
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Input } from '@/components/ui/input';
import { CiSearch } from "react-icons/ci";
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';


const columns = [
  {
    id: 'select',
    header: null,
    cell: ({ row, table }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => {
          if (value) {
            table.resetRowSelection()
            row.toggleSelected(true)
          } else {
            row.toggleSelected(false)
          }
        }}
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'wo',
    header: 'Work Order'
  },
  {
    accessorKey: 'fat',
    header: 'FAT'
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <span
        className={
          row.getValue('status') === 'Approved'
            ? 'text-green-500 font-medium'
            : row.getValue('status') === 'Rejected'
              ? 'text-red-500 font-medium'
              : 'text-yellow-500 font-medium'
        }
      >
        {row.getValue('status')}
      </span >
    )
  }
]


export default function Datatable() {
  const [sorting, setSorting] = useState([])
  const [rowSelection, setRowSelection] = useState({})
  const navigate = useNavigate()
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  })

  const handleDirectQC = () => {
    navigate('/qc');
  }

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      rowSelection,
      pagination
    },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel()
  })
  return (
    <div className="col-span-2 w-full">
      <div className="mb-4 flex flex-row items-center gap-4">
        <h1 className="whitespace-nowrap text-shadow-2xs">Search WO</h1>
        <div className="relative w-80">
          <CiSearch className='absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground pointer-events-none'></CiSearch>
          <Input placeholder="Search..." className="pl-10"></Input>
        </div>
        <Button disabled={Object.keys(rowSelection).length === 0} onClick={handleDirectQC} className="disabled:opacity-30 shadow-md ml-auto w-40">
          Rekap QC
        </Button>
      </div>
      <div className=" rounded-md border shadow-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id} className="bg-muted">
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No data
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="mt-4 flex">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                <p>Previous</p>
              </Button>
            </PaginationItem>
            <PaginationItem>
              <span className="text-sm">
                {table.getState().pagination.pageIndex + 1} of{' '}
                {table.getPageCount()}
              </span>
            </PaginationItem>
            <PaginationItem>
              <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                <p>Next</p>
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}