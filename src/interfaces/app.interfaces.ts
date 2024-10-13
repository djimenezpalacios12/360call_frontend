export interface AppStore {
  user: User;
}

export interface User {
  email: string;
  nombre: string;
  empresa: string;
  rol: string;
  token: string;
}
