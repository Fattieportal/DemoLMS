import axios from "axios";
import { AUTH_KEY, BASE_URL } from "~/constant";
import type {
  RegisterPayload,
  RegisterResponse,
} from "~/models/register.model";
import type { AuthUser } from "~/models/user.model";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  data: {
    jwt: string;
  };
}

export interface ValidateTokenResponse {
  success: boolean;
  data: AuthUser;
}

export const authService = {
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    const response = await axios.post<LoginResponse>(
      `${BASE_URL}/jwt/v1/auth`,
      payload,
    );
    return response.data;
  },

  validateToken: async (token: string): Promise<ValidateTokenResponse> => {
    const response = await axios.get<ValidateTokenResponse>(
      `${BASE_URL}/jwt/v1/auth/validate`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  },

  register: async (
    email: string,
    password: string,
    display_name: string,
  ): Promise<RegisterResponse> => {
    const payload: RegisterPayload = {
      email,
      password,
      display_name,
      AUTH_KEY,
    };

    const response = await axios.post<RegisterResponse>(
      `${BASE_URL}/jwt/v1/users`,
      payload,
    );
    return response.data;
  },
};
