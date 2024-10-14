import { z } from "zod";

const regexEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

// 1. Create schema
export const formSchema = z.object({
  email: z.string().regex(regexEmail, {
    message: "Ingresar un correo válido",
  }),
  contraseña: z.string().min(1, {
    message: "Ingresar una contraseña",
  }),
});
