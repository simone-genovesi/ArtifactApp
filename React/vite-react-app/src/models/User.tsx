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