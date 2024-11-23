export interface SigninBody {
  correo: string;
  contraseña: string;
}

export interface TokenPayload {
  _id: string;
  correo: string;
  rol: string;
  nombre: string;
  id_usuario: string;
  iat: number;
  exp: number;
}
