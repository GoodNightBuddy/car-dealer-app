import {
  VehicleMakesResponse,
  VehicleModelsResponse,
} from '@/types/vehicle.types'
import axios from 'axios'

export class VehicleService {
  private api = axios.create({
    baseURL: 'https://vpic.nhtsa.dot.gov/api',
  })

  async getVehicleMakes(): Promise<VehicleMakesResponse> {
    try {
      const response = await this.api.get(
        '/vehicles/GetMakesForVehicleType/car?format=json'
      )
      return response.data
    } catch (error) {
      this.handleError(error)
    }
  }

  async getVehicleModels(
    makeId: string,
    year: string
  ): Promise<VehicleModelsResponse> {
    try {
      const response = await this.api.get(
        `/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
      )
      return response.data
    } catch (error) {
      this.handleError(error)
    }
  }

  private handleError(error: unknown): never {
    if (axios.isAxiosError(error) && error.response) {
      console.error('API Error:', error.response.data)
      throw new Error(error.response.data.message || 'API Error occurred')
    } else if (error instanceof Error) {
      console.error('Error:', error.message)
      throw new Error(error.message)
    } else {
      console.error('Unexpected error:', error)
      throw new Error('An unexpected error occurred')
    }
  }
}

export const vehicleService = new VehicleService()
