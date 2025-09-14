declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        name: string;
      };
    }
  }
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  total?: number;
  error?: string;
}

export interface PaginationQuery {
  page?: string;
  limit?: string;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface PaginationParams {
  page: number;
  limit: number;
  offset: number;
  sort?: string;
  order?: 'asc' | 'desc';
}
