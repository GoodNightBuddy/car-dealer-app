import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

export class HttpService {
  private baseUrl: string
  private fetchingService: AxiosInstance

  constructor(baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL) {
    this.baseUrl = baseUrl || ''
    this.fetchingService = axios.create({
      baseURL: this.baseUrl,
    })
  }

  protected async get<TResponse>(
    url: string,
    config: AxiosRequestConfig = {}
  ): Promise<TResponse> {
    const response: AxiosResponse<TResponse> = await this.fetchingService.get(
      url,
      config
    )
    return response.data
  }

  protected async post<TData, TResponse>(
    url: string,
    data: TData,
    config: AxiosRequestConfig = {}
  ): Promise<TResponse> {
    const response: AxiosResponse<TResponse> = await this.fetchingService.post(
      url,
      data,
      config
    )
    return response.data
  }

  protected async put<TData, TResponse>(
    url: string,
    data: TData,
    config: AxiosRequestConfig = {}
  ): Promise<TResponse> {
    const response: AxiosResponse<TResponse> = await this.fetchingService.put(
      url,
      data,
      config
    )
    return response.data
  }

  protected async delete<TResponse>(
    url: string,
    config: AxiosRequestConfig = {}
  ): Promise<TResponse> {
    const response: AxiosResponse<TResponse> =
      await this.fetchingService.delete(url, config)
    return response.data
  }
}
