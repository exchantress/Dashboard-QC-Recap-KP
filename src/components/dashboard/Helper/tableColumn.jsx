import { Checkbox } from '@/components/ui/checkbox';

export const columns = [
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
        header: 'Work Order',
        enableColumnFilter: true
    },
    {
        accessorKey: 'fat',
        header: 'FAT'
    },
    {
        accessorKey: 'status',
        header: 'Status',
        filterFn: 'equalsString',
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
            </span>
        )
    }
]