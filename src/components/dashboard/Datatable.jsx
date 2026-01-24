import { useEffect, useState } from 'react';
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Input } from '@/components/ui/input';
import { CiSearch } from "react-icons/ci";
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '../ui/spinner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from '@/components/ui/select'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { fetchFatList } from '@/utils/Services/Yohan/getallFat';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { columns } from './Helper/tableColumn';
import { tambahWo } from '@/utils/Services/Yohan/putTambahwo';

export default function Datatable({ data = [], isLoading }) {
  const [sorting, setSorting] = useState([])
  const [rowSelection, setRowSelection] = useState({})
  const navigate = useNavigate()
  const [columnFilters, setColumnFilters] = useState([])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  })

  const table = useReactTable({
    data,
    columns,
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

  const handleDirectQC = () => {
    const selectedRows = table.getSelectedRowModel().rows;
    if (selectedRows.length > 0) {
      const woId = selectedRows[0].original.wo;
      console.log("Navigating to WO:", woId);
      navigate(`/qc/${encodeURIComponent(woId)}`);
    } else {
      console.log("No row selected");
    }
  }

  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
    }, 500)
    return () => clearTimeout(timer)
  }, [search])

  const { data: idFat = [] } = useQuery({
    queryKey: ['listFat', debouncedSearch],
    queryFn: () => fetchFatList(10, debouncedSearch)
  })
  const [selectedValues, setSelectedValues] = useState([])
  const [woName, setWoName] = useState('')
  const [openPopover, setOpenPopover] = useState(false)
  const [isOpenDialog, setIsOpenDialog] = useState(false)

  const toggleSelection = (value) => {
    setSelectedValues(prev =>
      prev.includes(value)
        ? prev.filter(v => v !== value)
        : [...prev, value]
    )
  }

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: tambahWo,
    onSuccess: (data) => {
      // a. Tampilkan notifikasi sukses (console dulu, atau pakai toast library)
      console.log("Sukses:", data.message)
      alert("Berhasil menambahkan WO!")

      // b. Reset Form
      setWoName("")
      setSelectedValues([])

      setIsOpenDialog(false)
      queryClient.invalidateQueries({ queryKey: ['listFat'] })
      queryClient.invalidateQueries({ queryKey: ['summary'] })
      queryClient.invalidateQueries({ queryKey: ['wo'] })
      queryClient.invalidateQueries({ queryKey: ['fat'] })
    },
    onError: (error) => {
      alert("Gagal: " + error.message)
    }
  })

  const handleSubmit = () => {
    const payload = {
      wo_id: woName,
      fat_id: selectedValues
    }
    mutation.mutate(payload)
  }

  if (isLoading) {
    return <div className="col-span-2 w-full">
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
            <Spinner />
          </TableBody>
        </Table>
      </div>
    </div>
  }

  return (
    <div className="col-span-2 w-full">
      <div className="mb-4 flex flex-row items-center gap-4">
        <h1 className="whitespace-nowrap text-shadow-2xs">Search WO</h1>
        <div className="relative w-80">
          <CiSearch className='absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground pointer-events-none'></CiSearch>
          <Input placeholder="Search..." className="pl-10" onChange={(e) => table.getColumn('wo')?.setFilterValue(e.target.value)
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
        <div className="max-w-xs space-y-2">
          <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
            <DialogTrigger asChild>
              <Button className="bg-neutral-800">Add Work Orders</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="border-b-4 px-6 py-4 font-bold text-xl text-neutral-700">Tambah Work Order</DialogTitle>
              </DialogHeader>
              <div className="space-y-2">
                <label className="text-sm font-medium">Nama WO</label>
                <Input placeholder="WP..." value={woName} onChange={(e) => setWoName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Pilih FAT</label>
                <Popover open={openPopover} onOpenChange={setOpenPopover}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full h-auto min-h-10 justify-start text-left flex flex-wrap gap-2 py-3">
                      {selectedValues.length > 0
                        ? selectedValues.map(val => (
                          <span key={val} className="rounded bg-muted px-2 py-0.5 text-xs">
                            {val}
                          </span>
                        ))
                        : 'Pilih FAT'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 w-72">
                    <Command >
                      <CommandInput placeholder="Cari FAT..." value={search} onValueChange={setSearch} />
                      <CommandList>
                        <CommandEmpty>Tidak ditemukan</CommandEmpty>
                        <CommandGroup>
                          {idFat.map(item => (
                            <CommandItem key={item} value={item} onSelect={() => toggleSelection(item)}>
                              <span>{item}</span>
                              {selectedValues.includes(item) && (
                                <IoCheckmarkCircleOutline className="ml-auto h-4 w-4" />
                              )}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button onClick={handleSubmit} disabled={!woName || selectedValues.length === 0}>
                  {mutation.isPending ? "Menyimpan..." : "Submit"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <Button disabled={Object.keys(rowSelection).length === 0} onClick={handleDirectQC} className="disabled:opacity-30 shadow-md ml-auto w-40">
          Rekap QC
        </Button>
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