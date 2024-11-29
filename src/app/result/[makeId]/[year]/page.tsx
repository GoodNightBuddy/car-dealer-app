import { VehicleModelsResponse } from '@/types/vehicle.types'
import { vehicleService } from '@/services/vehicle.service'
import { START_YEAR } from '@/constants/vehicle.constants'
import { randomUUID } from 'crypto'

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

    const maxMakes = parseInt(process.env.MAX_MAKES || '10', 10)
    const maxYears = parseInt(process.env.MAX_YEARS || '5', 10)
    const fetchAll = process.env.FETCH_ALL_PAGES === 'true'

    const limitedMakes = fetchAll
      ? vehicleMakes
      : vehicleMakes.slice(0, maxMakes)
    const limitedYears = fetchAll ? years : years.slice(-maxYears)

    return limitedMakes.flatMap((make) =>
      limitedYears.map((year) => ({
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
          No vehicle models were found for the selected make and year.
        </p>
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
    </main>
  )
}
