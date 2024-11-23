import { useState } from "react";
import { z } from "zod";
import { AxiosError, AxiosResponse } from "axios";
import { Eye, EyeOff, Headset, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { formSchema } from "../../schemas/login.schemas";
import { useLoginForm } from "@/hooks/useLogin.hooks";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { metadataUser, signIn } from "@/api/auth.api";
import { configureClient } from "@/api/index.api";
import { ErrorResponseData } from "@/interfaces/Axios.interfaces";
import { TokenPayload } from "@/interfaces/auth.interfaces";
import { useAppDispatch } from "@/store/hooks";
import { setAuth } from "@/store/ducks/app";
import "./styles.css";

export default function Login() {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();

  const [load, setLoad] = useState(false);
  const [type, setType] = useState<React.HTMLInputTypeAttribute>("password");

  // 1. Create schema
  // 2. Define form
  const form = useLoginForm();
  // 3. Submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoad(true);
    signIn(values)
      .then((res) => {
        return res;
      })
      .then(async (res) => {
        configureClient(res.data.token);
        const metadata: AxiosResponse<TokenPayload> = await metadataUser();
        dispatch(
          setAuth({
            _id: metadata.data.id_usuario,
            email: metadata.data.correo,
            nombre: metadata.data.nombre,
            rol: metadata.data.rol,
            token: res.data.token,
          })
        );
        setLoad(false);
        navigation("/upload-files");
      })
      .catch((error: AxiosError<ErrorResponseData>) => {
        setLoad(false);
        console.log("Error en la Autenticación:", error);
        toast.error("Error en la Autenticación", {
          description: error.response?.data.data.err || error.message || "Error desconocido",
          className: "toast-styles",
          action: {
            label: "Cerrar",
            onClick: () => {},
          },
        });
      });
  }

  return (
    <Card className="border-none shadow-none mx-auto min-w-[70%] md:min-w-[50%] bg-transparent">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 flex align items-center justify-center">
            <Headset className="mr-2" />
            360 Call App
          </h2>
        </CardTitle>
        <CardDescription>Ingresa el correo y contraseña de tu cuenta</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 ">
          <CardContent className="grid gap-4">
            <div className="grid gap-2 text-left">
              <FormField
                control={form.control}
                name="correo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo</FormLabel>
                    <FormControl>
                      <Input placeholder="usuario@correo.cl" {...field} disabled={load} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2 text-left">
              <FormField
                control={form.control}
                name="contraseña"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <div className="flex">
                      <FormControl>
                        <Input type={type} placeholder="******" {...field} disabled={load} />
                      </FormControl>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="ml-2"
                        disabled={load}
                        onClick={() => setType(type === "password" ? "text" : "password")}
                      >
                        {type === "password" ? (
                          <Eye size={18} className="active:scale-90 duration-75" />
                        ) : (
                          <EyeOff size={18} className="active:scale-90 duration-75" />
                        )}
                      </Button>
                    </div>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>

          <CardFooter className="grid gap-5">
            <Button className="w-full" type="submit" disabled={load}>
              {load && <Loader2 className="animate-spin" />}
              Iniciar Sesión
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
