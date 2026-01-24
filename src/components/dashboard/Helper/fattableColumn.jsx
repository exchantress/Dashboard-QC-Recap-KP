export const fatcolumns = [
    {
        accessorKey: 'fat',
        header: 'FAT',
        enableColumnFilter: true
    },
    {
        accessorKey: 'wo',
        header: 'Work Order',
        filterFn: (row, columnId, filterValue) => {
            const wo = row.getValue(columnId)

            if (filterValue === 'HAS_WO') {
                return typeof wo === 'string' && wo.startsWith('WP')
            }

            if (filterValue === 'NO_WO') {
                return wo === '-'
            }

            return true // ALL
        }
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
