'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { vehicleService } from '@/services/vehicle.service'
import { START_YEAR } from '@/constants/vehicle.constants'
import ErrorBoundary from '@/components/error-boundary/error-boundary.component'
import Loader from '@/components/loader/loader.component'
import { VehicleMake } from '@/types/vehicle.types'

export default function FilterPage() {
  const [vehicleMakes, setVehicleMakes] = useState<VehicleMake[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedMake, setSelectedMake] = useState<number | ''>('')
  const [selectedYear, setSelectedYear] = useState<number | ''>('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const makes = await vehicleService.getVehicleMakes()
        setVehicleMakes(makes.Results)
      } catch (error) {
        console.error('Failed to fetch vehicle makes:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  const currentYear = new Date().getFullYear()
  const years = Array.from(
    { length: currentYear - START_YEAR + 1 },
    (_, i) => START_YEAR + i
  )

  if (isLoading) {
    return <Loader />
  }

  return (
    <ErrorBoundary fallback="Failed to load filter options. Please try again.">
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h1 className="text-3xl font-bold mb-6">Filter Vehicles</h1>

        <select
          className="mb-4 p-2 border rounded w-64"
          value={selectedMake}
          onChange={(e) => setSelectedMake(Number(e.target.value))}
        >
          <option value="">Select Vehicle Make</option>
          {vehicleMakes.map((make) => (
            <option key={make.MakeId} value={make.MakeId}>
              {make.MakeName}
            </option>
          ))}
        </select>

        <select
          className="mb-4 p-2 border rounded w-64"
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
        >
          <option value="">Select Model Year</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <Link
          href={`/result/${selectedMake}/${selectedYear}`}
          className={`px-4 py-2 text-white rounded ${
            selectedMake && selectedYear
              ? 'bg-blue-500 hover:bg-blue-700'
              : 'bg-gray-400 pointer-events-none'
          }`}
        >
          Next
        </Link>
      </main>
    </ErrorBoundary>
  )
}
