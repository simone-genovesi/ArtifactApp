export interface User {
    _id: string
    firstname: string
    lastname: string
    email: string
    password: string
    role: string
    created: Created
  }
  
export interface Created {
    $date: string
  }

export interface LoginDTO {
    email: string;
    password: string;
  }

export interface RegisterDTO {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
  }

export interface Token {
    token: string
  }

// Definisci il tipo per il contesto di autenticazione
export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (loginData: LoginDTO) => Promise<void>;
  register: (registerData: RegisterDTO) => Promise<User>;
  getUserData: () => Promise<User | null>;
  logout: () => void;
  isAuthenticated: () => boolean;
  getCurrentUser: () => User | null;
  getUserById: (userId: string) => Promise<User>;
}