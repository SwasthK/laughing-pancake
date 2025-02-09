export class ApiResponse {
  success: boolean;
  message: string;
  data: any;

  constructor(message: string, data: any = null) {
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
