import { VehicleModelsResponse } from '@/types/vehicle.types'
import { vehicleService } from '@/services/vehicle.service'
import { START_YEAR } from '@/constants/vehicle.constants'
import { randomUUID } from 'crypto'
import Link from 'next/link'

export async function generateStaticParams(): Promise<
  { makeId: string; year: string }[]
> {
  try {
    const vehicleMakes = (await vehicleService.getVehicleMakes()).Results
    const currentYear = new Date().getFullYear()
    const years = Array.from(
      { length: currentYear - START_YEAR + 1 },
      (_, i) => START_YEAR + i
    )

    return vehicleMakes.flatMap((make) =>
      years.map((year) => ({
        makeId: make.MakeId.toString(),
        year: year.toString(),
      }))
    )
  } catch (error) {
    console.error('Error in generateStaticParams:', error)
    return []
  }
}

interface ResultPageProps {
  params: Promise<{
    makeId: string
    year: string
  }>
}

export default async function ResultPage({ params }: ResultPageProps) {
  const resolvedParams = await params
  const { makeId, year } = resolvedParams

  const data: VehicleModelsResponse = await vehicleService.getVehicleModels(
    makeId,
    year
  )

  if (!data || !data.Results || data.Results.length === 0) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">No Results Found</h1>
        <p className="text-lg">
          No vehicle models were found for the selected manufacturer and year.
        </p>
        <Link
          href="/"
          className="mt-6 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-medium rounded shadow transition duration-300"
        >
          Back to Home
        </Link>
      </main>
    )
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Vehicle Models for {data.Results[0].Make_Name} ({year})
      </h1>
      <ul className="list-disc space-y-2 max-w-md">
        {data.Results.map((model) => (
          <li key={`${model.Model_ID}-${randomUUID()}`} className="text-lg">
            {model.Model_Name}
          </li>
        ))}
      </ul>
      <Link
        href="/"
        className="mt-6 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-medium rounded shadow transition duration-300"
      >
        Back to Home
      </Link>
    </main>
  )
}
