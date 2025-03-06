import { jwtDecode } from "jwt-decode";

const ACCESS_TOKEN_KEY = "accessToken";

interface DecodedToken {
  role: string;
  exp: number;
}

export const getUserRole = (): string | null => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (token) {
    try {
      const decodedToken: DecodedToken = jwtDecode(token);
      return decodedToken.role;
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  }
  return null;
};

export const isTokenExpired = (): boolean => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (token) {
    try {
      const decodedToken: DecodedToken = jwtDecode(token);
      return decodedToken.exp * 1000 < Date.now();
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  }
  return true;
};
