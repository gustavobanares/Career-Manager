'use client'

import { useState, useEffect } from 'react'
import { Payment, columns } from './columns'
import { DataTable } from './data-table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

function Dashboard() {
  const [data, setData] = useState<Payment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentText, setCurrentText] = useState('')
  const [currentField, setCurrentField] = useState<'description' | 'feedback'>(
    'description',
  )
  const [currentIndex, setCurrentIndex] = useState<number>(-1)

  useEffect(() => {
    async function fetchData() {
      try {
        // Mock data for development/testing
        const mockData: Payment[] = [
          {
            id: '1',
            status: 'interviewing',
            companyName: 'Itáu',
            description: 'Teste técnico',
            feedback: 'O recrutador gostou do meu portfólio',
            link: 'https://www.itau.com.br/',
            created_at: new Date('2024-03-25T10:30:00Z'),
            updated_at: new Date('2024-03-26T15:45:00Z'),
          },
          {
            id: '2',
            status: 'applied',
            companyName: 'Bradesco',
            description: 'Vamos ver se tenho um retorno',
            feedback: 'Vaga muito boa',
            link: 'https://banco.bradesco/naocorrentista/index.shtm',
            created_at: new Date('2024-03-20T08:15:00Z'),
            updated_at: new Date('2024-03-22T11:00:00Z'),
          },
          {
            id: '3',
            status: 'offered',
            companyName: 'Nubank',
            description: 'Estou analisando se é viável aceitar',
            feedback: 'Passei tranquilo no teste técnico',
            link: 'https://www.nubank.com.br/',
            created_at: new Date('2024-03-18T14:00:00Z'),
            updated_at: new Date('2024-03-21T09:30:00Z'),
          },
        ]

        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        setData(mockData)
        setIsLoading(false)
      } catch (err) {
        console.error('Fetch error:', err)
        setError(
          err instanceof Error ? err.message : 'An unexpected error occurred',
        )
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleUpdateData = (rowIndex: number, columnId: string, value: any) => {
    setData((prev) =>
      prev.map((row, index) =>
        index === rowIndex
          ? { ...row, [columnId]: value, updated_at: new Date() }
          : row,
      ),
    )
  }

  const openModal = (field: 'description' | 'feedback', index: number) => {
    setCurrentField(field)
    setCurrentIndex(index)
    setCurrentText(data[index][field])
    setIsModalOpen(true)
  }

  const handleModalSubmit = () => {
    if (currentIndex === -1) return
    handleUpdateData(currentIndex, currentField, currentText)
    setIsModalOpen(false)
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-10 flex justify-center items-center">
        <div className="animate-pulse flex items-center space-x-4">
          <div className="rounded-full bg-gray-300 h-12 w-12"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-4 bg-gray-300 rounded col-span-2"></div>
                <div className="h-4 bg-gray-300 rounded col-span-1"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-10 flex justify-center items-center">
        <div
          className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
          <button
            onClick={() => window.location.reload()}
            className="ml-4 mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-300"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <div className="container mx-auto py-10 w-full max-w-[90%]">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Job Application Tracker
        </h1>
        <DataTable
          columns={columns}
          data={data}
          updateData={handleUpdateData}
          openModal={openModal}
        />

        {/* Modal for editing description or feedback */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit {currentField}</DialogTitle>
              <DialogDescription>
                You can edit the {currentField} here.
              </DialogDescription>
            </DialogHeader>
            <textarea
              value={currentText}
              onChange={(e) => setCurrentText(e.target.value)}
              className="w-full h-32 p-2 border border-gray-300 rounded"
            />
            <DialogFooter>
              <Button onClick={handleModalSubmit}>Save</Button>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default Dashboard
