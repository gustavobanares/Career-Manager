import { ColumnDef } from '@tanstack/react-table'
import * as React from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Trash2 } from 'lucide-react'

// Tipo dos dados
export type Payment = {
  id: string
  status: 'applied' | 'interviewing' | 'offered' | 'rejected' | 'accepted'
  companyName: string
  description: string
  feedback: string
  link: string
  created_at: Date
  updated_at: Date
}

// Função para truncar texto
const truncateText = (text: string, maxLength: number = 50) => {
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text
}

// Mapeamento de cores para status
const statusColorMap = {
  applied: 'blue',
  interviewing: 'yellow',
  offered: 'green',
  rejected: 'red',
  accepted: 'purple',
}

// Definição das colunas da tabela
export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'companyName',
    header: 'Company',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row, table }) => {
      const statusOptions = [
        'applied',
        'interviewing',
        'offered',
        'rejected',
        'accepted',
      ]

      const handleStatusChange = (newStatus: string) => {
        table.options.meta?.updateData?.(row.index, 'status', newStatus)
      }

      return (
        <Select value={row.original.status} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue>
              <Badge
                variant="outline"
                color={statusColorMap[row.original.status]}
              >
                {row.original.status.charAt(0).toUpperCase() +
                  row.original.status.slice(1)}
              </Badge>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Status</SelectLabel>
              {statusOptions.map((status) => (
                <SelectItem key={status} value={status}>
                  <Badge
                    variant="outline"
                    color={
                      statusColorMap[status as keyof typeof statusColorMap]
                    }
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </Badge>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )
    },
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row, table }) => (
      <div
        className="cursor-pointer text-blue-500 overflow-hidden text-ellipsis whitespace-nowrap max-w-[200px]"
        onClick={() =>
          table.options.meta?.openModal?.('description', row.index)
        }
      >
        {truncateText(row.original.description)}
      </div>
    ),
  },
  {
    accessorKey: 'feedback',
    header: 'Feedback',
    cell: ({ row, table }) => (
      <div
        className="cursor-pointer text-blue-500 overflow-hidden text-ellipsis whitespace-nowrap max-w-[200px]"
        onClick={() => table.options.meta?.openModal?.('feedback', row.index)}
      >
        {truncateText(row.original.feedback || 'Sem feedback')}
      </div>
    ),
  },
  {
    accessorKey: 'link',
    header: 'Link',
    cell: ({ row }) => (
      <a
        href={row.original.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline truncate block max-w-[200px]"
      >
        {truncateText(row.original.link, 30)}
      </a>
    ),
  },
  {
    accessorKey: 'created_at',
    header: 'Created at',
    cell: ({ row }) => {
      const date = new Date(row.original.created_at)
      return date.toLocaleDateString('pt-BR')
    },
  },

  {
    accessorKey: 'updated_at',
    header: 'Updated at',
    cell: ({ row }) => {
      const date = new Date(row.original.updated_at)
      return date.toLocaleDateString('pt-BR')
    },
  },

  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row, table }) => {
      const handleDelete = () => {
        // Instead of window.confirm, use the deleteJob method directly
        // to trigger the modal in the parent component
        table.options.meta?.deleteJob?.(row.original.id)
      }

      return (
        <button
          onClick={handleDelete}
          className="text-red-500 hover:text-red-700 transition-colors"
        >
          <Trash2 className="h-5 w-5 cursor-pointer" />
        </button>
      )
    },
  },
]
