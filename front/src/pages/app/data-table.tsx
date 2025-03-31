import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  RowData,
  useReactTable,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

// Define custom meta type with the functions you need
interface CustomTableMeta {
  updateData: (rowIndex: number, columnId: string, value: any) => void
  openModal: (field: 'description' | 'feedback', index: number) => void
  deleteJob: (jobId: string) => void
}

// Extend the TableMeta type
declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> extends CustomTableMeta {}
}

interface DataTableProps<TData extends RowData, TValue> {
  columns: ColumnDef<TData, TValue>[] // Definição das colunas
  data: TData[] // Dados da tabela
  updateData: (rowIndex: number, columnId: string, value: any) => void
  openModal: (field: 'description' | 'feedback', index: number) => void
  deleteJob: (jobId: string) => void
}

export function DataTable<TData extends RowData, TValue>({
  columns,
  data,
  updateData,
  openModal,
  deleteJob,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable<TData>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData,
      openModal,
      deleteJob,
    },
  })

  return (
    <div className="w-full">
      <Table className="w-full table-fixed">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="whitespace-nowrap overflow-hidden text-ellipsis"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() ? 'selected' : undefined}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="whitespace-nowrap overflow-hidden text-ellipsis"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
                <TableCell></TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length + 1}
                className="h-24 text-center"
              >
                Nenhum resultado encontrado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
