export class ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;

  constructor(message: string, data: T) {
    this.success = true;
    this.message = message;
    this.data = data;
  }
}

export class ApiError {
  success: boolean;
  error: string;
  details: any;

  constructor(error: string, details: any = null) {
    this.success = false;
    this.error = error;
    this.details = details;
  }
}
