import {
  NetworkErrorCodes,
  NetworkError,
  CustomError,
} from "../../classes/error";

const BACKEND_HOST = "http://192.168.1.19:3002";

function timeOut(
  request: (abortSignal: AbortSignal) => Promise<any>,
  timeout = 2000
): Promise<any> {
  const controller = new AbortController();

  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => {
      controller.abort();
      reject(new NetworkError(NetworkErrorCodes.TIMEOUT));
    }, timeout);
  });
  return Promise.race([request(controller.signal), timeoutPromise]);
}

export class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async apiOperation(
    endpoint: string,
    options?: RequestInit,
    method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
    body?: any
  ) {
    let url = this.baseUrl;
    url += endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
    try {
      const response = await timeOut((abortSignal) =>
        fetch(url, {
          ...options,
          method,
          headers: {
            "Content-Type": "application/json",
            ...options?.headers,
          },
          body: JSON.stringify(body),
          signal: abortSignal,
        })
      );

      if (!response.ok) {
        switch (response.status) {
          case 400: {
            throw new NetworkError(NetworkErrorCodes.BAD_REQUEST);
          }
          case 403: {
            throw new NetworkError(NetworkErrorCodes.UNAUTORIZED);
          }
          case 404: {
            throw new NetworkError(NetworkErrorCodes.NOT_FOUND);
          }
          default: {
            throw new NetworkError(NetworkErrorCodes.UNKNOWN);
          }
        }
      }
      return await response.json();
    } catch (e) {
      if (e instanceof CustomError) {
        throw e;
      }
      throw new NetworkError(NetworkErrorCodes.UNKNOWN);
    }
  }

  async get(endpoint: string, options?: RequestInit): Promise<any> {
    return await this.apiOperation(endpoint, options);
  }

  async post(endpoint: string, body: any, options?: RequestInit): Promise<any> {
    return await this.apiOperation(endpoint, options, "POST", body);
  }

  async delete(endpoint: string, options?: RequestInit): Promise<any> {
    return await this.apiOperation(endpoint, options, "DELETE");
  }

  async put(endpoint: string, body: any, options?: RequestInit): Promise<any> {
    return await this.apiOperation(endpoint, options, "PUT", body);
  }
}

const api_service = new ApiService(BACKEND_HOST);
export default api_service;
