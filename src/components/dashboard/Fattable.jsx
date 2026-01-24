import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { useState } from "react"
import { CiSearch } from "react-icons/ci"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from '@/components/ui/select'
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { fatcolumns } from "./Helper/fattableColumn";

export default function Fattable({ data = [] }) {

  const [sorting, setSorting] = useState([])
  const [rowSelection, setRowSelection] = useState({})
  const [columnFilters, setColumnFilters] = useState([])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  })

  const table = useReactTable({
    data,
    columns: fatcolumns,
    state: {
      sorting,
      rowSelection,
      pagination,
      columnFilters
    },
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel()
  })

  return (
    <div div className="col-span-3 w-full" >
      <div className="mb-4 flex flex-row items-center gap-4">
        <h1 className="whitespace-nowrap text-shadow-2xs">Search FAT</h1>
        <div className="relative w-80">
          <CiSearch className='absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground pointer-events-none'></CiSearch>
          <Input placeholder="Search..." className="pl-10" onChange={(e) => table.getColumn('fat')?.setFilterValue(e.target.value)
          }></Input>
        </div>
        <div className='w-full max-w-xs space-y-2'>
          <Select value={table.getColumn('status')?.getFilterValue() ?? ''}
            onValueChange={(value) =>
              table.getColumn('status')?.setFilterValue(
                value === 'ALL' ? '' : value
              )
            }>
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Filter Status' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                <SelectItem value='ALL'>Show All</SelectItem>
                <SelectItem value='Approved'>Approved</SelectItem>
                <SelectItem value='Rejected'>Rejected</SelectItem>
                <SelectItem value='Not Yet'>Not Yet</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className='w-full max-w-xs space-y-2'>
          <Select value={table.getColumn('wo')?.getFilterValue()}
            onValueChange={(value) =>
              table.getColumn('wo')?.setFilterValue(
                value === 'ALL' ? undefined : value
              )
            }>
            <SelectTrigger className="w-full max-w-xs">
              <SelectValue placeholder="Filter WO" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Work Order</SelectLabel>
                <SelectItem value="ALL">Show All</SelectItem>
                <SelectItem value="HAS_WO">Ada WO</SelectItem>
                <SelectItem value="NO_WO">Belum Ada WO</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="rounded-md border shadow-md">
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
                <TableCell colSpan={fatcolumns.length} className="h-24 text-center">
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