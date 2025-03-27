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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { api } from '@/lib/axios'
import toast from 'react-hot-toast'
import { PlusCircle } from 'lucide-react'

type JobData = Payment & {
  application_status?: string
}

export function Dashboard() {
  const [data, setData] = useState<Payment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isNovoJobModalOpen, setIsNovoJobModalOpen] = useState(false)
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false)
  const [currentText, setCurrentText] = useState('')
  const [currentField, setCurrentField] = useState<'description' | 'feedback'>(
    'description',
  )
  const [currentIndex, setCurrentIndex] = useState<number>(-1)
  const [jobToDelete, setJobToDelete] = useState<string | null>(null)

  const [novoJob, setNovoJob] = useState({
    companyName: '',
    status: 'applied',
    description: '',
    link: '',
    application_status: 'APPLIED',
  })

  async function fetchData() {
    try {
      const response = await api.get<JobData[]>('/jobs')

      const jobsData = Array.isArray(response.data)
        ? response.data
        : response.data.jobs || [response.data]

      const formattedData = jobsData.map((job: JobData) => ({
        id: job.id,
        companyName: job.companyName,
        status: job.application_status?.toLowerCase() || 'unknown',
        description: job.description || '',
        feedback: job.feedback || '',
        link: job.link || '',
        created_at: job.created_at ? new Date(job.created_at) : new Date(),
        updated_at: job.updated_at ? new Date(job.updated_at) : new Date(),
      }))

      setData(formattedData)
      setIsLoading(false)
    } catch (err) {
      console.error('Erro na busca:', err)
      setError(
        err instanceof Error ? err.message : 'Ocorreu um erro inesperado',
      )
      setIsLoading(false)
    }
  }

  const openModal = (field: 'description' | 'feedback', index: number) => {
    setCurrentField(field)
    setCurrentIndex(index)
    setCurrentText(data[index][field])
    setIsModalOpen(true)
  }

  const handleUpdateData = async (
    rowIndex: number,
    columnId: string,
    value: any,
  ) => {
    try {
      const jobToUpdate = data[rowIndex]

      const updatePayload = {
        ...jobToUpdate,
        [columnId]: value,
        application_status:
          columnId === 'status'
            ? value.toUpperCase()
            : jobToUpdate.status.toUpperCase(),
      }

      // Update API
      await api.put(`/jobs/${jobToUpdate.id}`, updatePayload)

      // Update local state
      setData((prev) =>
        prev.map((job, index) =>
          index === rowIndex
            ? {
                ...job,
                [columnId]: value,
                status: columnId === 'status' ? value : job.status,
                updated_at: new Date(),
              }
            : job,
        ),
      )

      toast.success('Job atualizado com sucesso!')
    } catch (error) {
      console.error('Erro de atualização:', error)
      toast.error('Erro ao atualizar job')
    }
  }

  const confirmDeleteJob = (jobId: string) => {
    setJobToDelete(jobId)
    setIsDeleteConfirmationOpen(true)
  }

  const handleDeleteJob = async () => {
    if (!jobToDelete) return

    try {
      console.log('Tentando excluir job:', jobToDelete)
      const response = await api.post(`/jobs/${jobToDelete}`)
      console.log('Resposta da exclusão:', response)

      // Remove job from local state
      setData((prev) => prev.filter((job) => job.id !== jobToDelete))

      toast.success('Job removido com sucesso!')

      // Close the confirmation dialog
      setIsDeleteConfirmationOpen(false)
      setJobToDelete(null)
    } catch (error) {
      console.error('Erro de exclusão completo:', error)
      console.error('Detalhes do erro:', error.response?.data)
      toast.error('Erro ao remover job')
    }
  }

  const handleCreateNewJob = async () => {
    try {
      // Prepare payload with all necessary fields
      const payload = {
        ...novoJob,
        application_status: novoJob.status.toUpperCase(),
      }

      const response = await api.post('/jobs', payload)

      // Update local state with new job
      setData((prev) => [
        ...prev,
        {
          ...response.data,
          created_at: new Date(),
          updated_at: new Date(),
          status: novoJob.status.toLowerCase(),
        },
      ])

      // Close modal and clear form
      setIsNovoJobModalOpen(false)
      setNovoJob({
        companyName: '',
        status: 'applied',
        description: '',
        link: '',
        application_status: 'APPLIED',
      })

      toast.success('Novo job adicionado com sucesso!')
    } catch (error) {
      console.error('Erro ao criar novo job:', error)
      toast.error('Erro ao criar novo job')
      console.log('Detalhes do erro:', error.response?.data)
    }
  }

  const handleModalSubmit = () => {
    if (currentIndex === -1) return
    handleUpdateData(currentIndex, currentField, currentText)
    setIsModalOpen(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <div className="container mx-auto py-10 w-full max-w-[90%]">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Career Manager</h1>
          <Button
            className="cursor-pointer"
            onClick={() => setIsNovoJobModalOpen(true)}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add new job
          </Button>
        </div>
        <DataTable
          columns={columns}
          data={data}
          updateData={handleUpdateData}
          openModal={openModal}
          deleteJob={confirmDeleteJob}
        />

        <Dialog
          open={isDeleteConfirmationOpen}
          onOpenChange={setIsDeleteConfirmationOpen}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm exclusion</DialogTitle>
              <DialogDescription>
                Are you sure want to delete this job? This action cannot be
                undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button className="cursor-pointer" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                className="cursor-pointer"
                variant="destructive"
                onClick={handleDeleteJob}
              >
                Yes, exclude
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Modal for editing description/feedback */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Editar{' '}
                {currentField === 'description' ? 'Descrição' : 'Feedback'}
              </DialogTitle>
              <DialogDescription>Faça suas alterações abaixo</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="text" className="text-right">
                  {currentField === 'description' ? 'Descrição' : 'Feedback'}
                </Label>
                <Input
                  id="text"
                  value={currentText}
                  onChange={(e) => setCurrentText(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit" onClick={handleModalSubmit}>
                Salvar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Modal for creating new job */}
        <Dialog open={isNovoJobModalOpen} onOpenChange={setIsNovoJobModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Novo Job</DialogTitle>
              <DialogDescription>
                Preencha os detalhes do novo job
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="companyName" className="text-right">
                  Name of company
                </Label>
                <Input
                  id="companyName"
                  value={novoJob.companyName}
                  onChange={(e) =>
                    setNovoJob((prev) => ({
                      ...prev,
                      companyName: e.target.value,
                    }))
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <select
                  id="status"
                  value={novoJob.status}
                  onChange={(e) =>
                    setNovoJob((prev) => ({
                      ...prev,
                      status: e.target.value,
                    }))
                  }
                  className="col-span-3 p-2 border rounded"
                >
                  <option value="applied">Applied</option>
                  <option value="interview">Interviewing</option>
                  <option value="offer">Offered</option>
                  <option value="rejected">Rejected</option>
                  <option value="accepted">Accepted</option>
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  id="description"
                  value={novoJob.description}
                  onChange={(e) =>
                    setNovoJob((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="link" className="text-right">
                  Link
                </Label>
                <Input
                  id="link"
                  value={novoJob.link}
                  onChange={(e) =>
                    setNovoJob((prev) => ({
                      ...prev,
                      link: e.target.value,
                    }))
                  }
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  className="cursor-pointer"
                  type="button"
                  variant="secondary"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                className="cursor-pointer"
                type="submit"
                onClick={handleCreateNewJob}
              >
                Add job
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default Dashboard
