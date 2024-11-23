export interface AppStore {
  user: User;
}

export interface User {
  _id: string;
  email: string;
  nombre: string;
  rol: string;
  token: string;
}
