import type { UserModel } from "./user.model";

export interface RegisterPayload {
  email: string;
  password: string;
  display_name: string;
  AUTH_KEY: string;
}

export interface RegisterResponse {
  success: boolean;
  id?: string;
  message?: string;
  user?: UserModel;
  roles?: string[];
  data?: {
    message: string;
    errorCode: number;
  };
}