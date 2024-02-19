export class ApiResponse<T> {
  statusCode!: number;
  message!: string;
  data!: T;
}

export class ApiResponseCount<T> {
  statusCode!: number;
  message!: string;
  count!: number;
  data!: T;
}

export interface Adapter<T> {
  adapt(item: T): T;
}
