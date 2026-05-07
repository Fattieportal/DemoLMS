// WordPress DB user shape (from JWT plugin validate response)
export interface UserModel {
  ID: string;
  user_login: string;
  user_nicename: string;
  user_email: string;
  user_url: string;
  user_registered: string;
  user_activation_key: string;
  user_status: string;
  display_name: string;
}

export interface JwtPayload {
  iat: number;
  exp: number;
  id: string;
}

export interface JwtHeader {
  typ: string;
  alg: string;
}

export interface JwtToken {
  token: string;
  header: JwtHeader;
  payload: JwtPayload;
  expire_in: number;
}

export interface AuthUser {
  user: UserModel;
  roles: string[];
  jwt: JwtToken[];
}

// WordPress REST API user shape (from /wp/v2/users/me)
export interface WPUser {
  id: number;           // numeric — used for API calls (e.g. /users/{id}/course-progress)
  name: string;         // display name
  slug: string;
  url: string;
  description: string;
  link: string;
  avatar_urls: {
    "24": string;
    "48": string;
    "96": string;
  };
  is_super_admin: boolean;
}

// Full app user — WPUser enriched with mocked fields
export interface AppUser extends WPUser {
  streak: number;   // mocked
  points: number;   // mocked
}