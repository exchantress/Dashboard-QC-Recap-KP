import { Pie, PieChart } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { RiErrorWarningLine } from "react-icons/ri";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { Progress } from "@/components/ui/progress"
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import data from '@/assets/dummy.json'
import { useState } from 'react'


const chartData = [
  { status: "DONE", qc: 500, fill: "var(--color-DONE)" },
  { status: "REJECT", qc: 125, fill: "var(--color-REJECT)" },
  { status: "NOTYET", qc: 300, fill: "var(--color-NOTYET)" },
]

const chartConfig = {
  qc: {
    label: "Status",
  },
  DONE: {
    label: "DONE",
    color: "var(--chart-2)",
  },
  REJECT: {
    label: "REJECT",
    color: "var(--chart-1)",
  },
  NOTYET: {
    label: "NOT YET",
    color: "var(--chart-3)",
  },
}

const columns = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
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

export default function App() {
  const [sorting, setSorting] = useState([])
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      rowSelection
    },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel()
  })

  return (
    <div className="p-10">
      <div className="grid grid-cols-3 gap-7 ">
        <Card className="flex flex-col h-full w-full border-2 border-red-600 gap-0 bg-transparent shadow-md">
          <CardHeader>
            <div className="flex flex-row justify-between">
              <CardTitle className='text-xl pr-3'>Jumlah FAT yang belum ada Work Order untuk Maintenance</CardTitle>
              <div className="w-12 h-12 bg-red-200 rounded-sm">
                <RiErrorWarningLine className="w-12 h-12"></RiErrorWarningLine>
              </div>
            </div>
          </CardHeader>
          <CardContent className="mt-auto">
            <h1 className="text-6xl font-bold pt-10 pb-2 text-red-600">300</h1>
          </CardContent>
          <CardContent className='text-neutral-600/75 dark:text-neutral-400/75'>
            <h1 className="text-lg">Pending PM Assignment</h1>
          </CardContent>
        </Card>

        <Card className="mt-auto flex-col w-full gap-0 bg-transparent shadow-md justify-self-center">
          <CardHeader>
            <CardTitle className="text-xl">WO QC Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-row pt-8">
              <div className="flex-col">
                <div className="w-12 h-12 bg-green-100 rounded-sm items-center flex justify-center">
                  <FaRegCheckCircle className="w-8 h-8 text-green-400"></FaRegCheckCircle>
                </div>
                <h1 className="text-4xl pt-2 font-bold text-green-400">333</h1>
                <h1 className="text-neutral-600/75 dark:text-neutral-400/75">QC Done</h1>
              </div>
              <div className="ml-15 h-30 border" />
              <div className="flex-col pl-15">
                <div className="w-12 h-12 bg-yellow-100 rounded-sm items-center flex justify-center">
                  <IoMdTime className="w-9 h-9 text-yellow-400"></IoMdTime>
                </div>
                <h1 className="text-4xl pt-2 font-bold text-yellow-400">120</h1>
                <h1 className="text-neutral-600/75 dark:text-neutral-400/75">Pending QC</h1>
              </div>
            </div>
          </CardContent>
          <CardContent>
            <div className="mt-3 flex flex-row gap-4 items-center">
              <Progress value={33} />
              <h1 className="text-neutral-600/75 dark:text-neutral-400/75">33% QC Completed</h1>
            </div>
          </CardContent>
        </Card>

        <div className="row-span-2 max-w-md">
          <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
              <CardTitle>Statistik Status WO</CardTitle>
              <CardDescription>January - Desember 2025</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
              <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-96">
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="qc"
                    nameKey="status"
                    innerRadius={60}
                  />
                  <ChartLegend
                    content={<ChartLegendContent nameKey="status" />}
                    className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
                  />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
          <div className="col-start-3 pt-10 items-center justify-center flex">
            <Button className='shadow-md w-md h-10'>Add Work Order (New WO) </Button>
          </div>
        </div>

        <div className="col-span-2 w-full rounded-md border shadow-md">
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
      </div>
    </div>
  )
}
