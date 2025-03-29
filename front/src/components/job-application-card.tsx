import { GoChevronRight } from 'react-icons/go'

export function JobApplicationCard({
  enterpriseName,
  description,
}: {
  enterpriseName: string
  description: string
}) {
  return (
    <div className="flex flex-row border rounded-xl p-3 justify-between gap-3">
      <div className="flex flex-col gap-2">
        <h1>{enterpriseName}</h1>
        <p className="text-xs">{description}</p>
      </div>

      <div className="flex flex-col justify-between">
        <GoChevronRight size={20} className="w-full" color="#8974bb" />
        <button className="text-sm text-[#8974bb]">View</button>
      </div>
    </div>
  )
}
