export interface ApiResponse<T> {
  status: number;
  message: string;
  meta?: { total: number; page: number; limit?: number; pages: number };
  data: T;
}
