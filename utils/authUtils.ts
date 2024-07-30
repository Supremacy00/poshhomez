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

export const getUserId = (): string | undefined => {
  const token = getToken();
  if (!token) return undefined;

  try {
    const decoded = jwtDecode<CustomJwtPayload>(token);
    return decoded.id;
  } catch (error) {
    console.error("Error decoding token:", error);
    return undefined;
  }
};

export const getUserRole = (): string | undefined => {
  const token = getToken();
  if (!token) return undefined;

  try {
    const decoded = jwtDecode<CustomJwtPayload>(token);
    return decoded.role;
  } catch (error) {
    console.error("Error decoding token:", error);
    return undefined;
  }
};

export const isTokenExpired = (token: string): boolean => {
  if (token === null) {
    console.error("Token is null or undefined.");
    return true;
  }
  try {
    const decodedToken = jwtDecode(token) as JwtPayload;
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

export const isAuthenticated = (token: string) => {
  if (!token) {
    return null;
  }
  try {
    const decodedToken = jwtDecode(token);
    const expirationTime = (decodedToken as any).exp * 1000;

    if (Date.now() >= expirationTime) {
      removeToken();
      return null;
    }

    return true;
  } catch (error) {
    console.error(`Error verifying jwt token: ${error}`);
    removeToken();
    return null;
  }
};
