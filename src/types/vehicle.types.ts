export interface VehicleMake {
  MakeId: number
  MakeName: string
  VehicleTypeId: number
  VehicleTypeName: string
}

export interface VehicleMakesResponse {
  Count: number
  Results: VehicleMake[]
  Message: string
}

export interface VehicleModel {
  Make_ID: number
  Make_Name: string
  Model_ID: number
  Model_Name: string
}

export interface VehicleModelsResponse {
  Count: number
  Message: string
  SearchCriteria: string
  Results: VehicleModel[]
}
