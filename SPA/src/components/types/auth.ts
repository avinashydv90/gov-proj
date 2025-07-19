export interface AuthResponse {
    token: string;
    userName: string;
}

export interface LoginRequest {
    email: string;
    password: string;
    role: string;
}

export interface RegisterRequest {
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    password: string;
}