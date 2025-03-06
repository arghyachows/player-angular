export interface LoginResponse {
    access_token: string;
}

export interface SignupRequest {
    email: string;
    username: string;
    password: string;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface User {
    id: number;
    email: string;
    username: string;
    is_active: boolean;
    created_at: string;
}

export interface Player {
    id: number;
    name: string;
    position: string;
    team: string;
    age: number;
    jersey_number: number;
    created_at: string;
    updated_at: string | null;
} 