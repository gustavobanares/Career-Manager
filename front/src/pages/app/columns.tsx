'use client'

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

// Definição das colunas da tabela
export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'companyName',
    header: 'Company Name',
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
        // Use the table's updateData method passed from meta
        table.options.meta?.updateData?.(row.index, 'status', newStatus)
      }

      return (
        <Select value={row.original.status} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Status</SelectLabel>
              {statusOptions.map((status) => (
                <SelectItem key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
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
        {truncateText(row.original.feedback)}
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
        className="text-blue-500 hover:underline"
      >
        {row.original.link}
      </a>
    ),
  },
  {
    accessorKey: 'created_at',
    header: 'Created',
    cell: ({ row }) => {
      const date = new Date(row.original.created_at)
      return date.toLocaleDateString('pt-BR') // Formato DD/MM/YYYY
    },
  },
  {
    accessorKey: 'updated_at',
    header: 'Updated',
    cell: ({ row }) => {
      const date = new Date(row.original.updated_at)
      return date.toLocaleDateString('pt-BR')
    },
  },
]
