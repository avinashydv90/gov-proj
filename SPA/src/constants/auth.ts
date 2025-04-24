import axios from "axios";

interface AuthResponse {
  token: string;
  userName: string;
}
const apiUrl = "https://localhost:7031/api/Auth";

export const loginAPI = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const response = await axios.post<AuthResponse>(`${apiUrl}/login`, {
      email,
      password,
    });
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

export const registerAPI = async (
  userName: string,
  email: string,
  role: string,
  password: string
): Promise<void> => {
  try {
    const response = await axios.post<void>(`${apiUrl}/register`, {
      userName,
      email,
      role,
      password,
    });
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

export const logout = (): void => {
  localStorage.removeItem("token");
  localStorage.removeItem("userName");
};
