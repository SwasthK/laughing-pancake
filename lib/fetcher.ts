import { ApiError, ApiResponse } from "./response";
import axios, { AxiosError } from "axios";

export class FetchError extends Error {
  info?: any;
  statusCode?: number | null;
  constructor(error: string = "An error occurred while fetching the data.") {
    super(error);
  }
}

export type FetchResponse<T = any> = {
  data: T;
  statusCode: number;
  message: string;
};

export const fetcher = async <T>(url: string): Promise<FetchResponse<T>> => {
  try {
    const response = await axios.get<ApiResponse<T>>(url);
    const data = response.data;

    return {
      data: data.data,
      message: data.message,
      statusCode: response.status,
    };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiError>;
      const data = axiosError.response?.data;

      if (
        data &&
        typeof data === "object" &&
        "error" in data &&
        "details" in data
      ) {
        const fetchError = new FetchError(data.error);
        fetchError.info = data.details;
        fetchError.statusCode = axiosError.response?.status;
        throw fetchError;
      }

      const fetchError = new FetchError(axiosError.message);
      fetchError.info = axiosError;
      fetchError.statusCode = axiosError.response?.status;
      throw fetchError;
    }

    throw new FetchError();
  }
};
