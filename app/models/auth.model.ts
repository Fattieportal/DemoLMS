export interface User {
  id: number;
  username: string;
  email: string;
  display_name: string;
  avatar: string;
  registered: string;
  is_pro: boolean;
  roles: string[];
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
  token_type: "Bearer";
  expires_in: number;
}

export interface AuthResponse extends AuthTokens {
  user: User;
}

export interface LoginPayload {
  username: string; // API accepts username or email
  password: string;
}