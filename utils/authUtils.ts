import { jwtDecode, JwtPayload } from "jwt-decode";

interface CustomJwtPayload extends JwtPayload {
  id?: string;
  role?: string;
}

export const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const getUserId = (): string | null => {
  const token = getToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode<CustomJwtPayload>(token);
    return decoded.id || null;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export const getUserRole = (): string | null => {
  const token = getToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode<CustomJwtPayload>(token);
    return decoded.role || null;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export const isTokenExpired = (token: string): boolean => {
  try {
    const decodedToken = jwtDecode<JwtPayload>(token);
    if (decodedToken.exp === undefined) {
      console.error("Token does not have an expiry time.");
      return true;
    }
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true;
  }
};

export const isAuthenticated = (): boolean | null => {
  const token = getToken();
  if (!token) return null;

  try {
    if (isTokenExpired(token)) {
      removeToken();
      return null;
    }
    return true;
  } catch (error) {
    console.error("Error verifying jwt token:", error);
    removeToken();
    return null;
  }
};
