export interface DecodedToken {
  token_type: string;
  exp: number;
  iat: number;
  jti: string;
  user_id: number;
  username: string;
  first_name: string;
  last_name: string;
  role: string[];
}
