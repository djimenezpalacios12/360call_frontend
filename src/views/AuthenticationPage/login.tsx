import { useState } from "react";
import { z } from "zod";
import { AxiosError, AxiosResponse } from "axios";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formSchema } from "../../schemas/login.schemas";
import { useLoginForm } from "@/hooks/useLogin.hooks";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Eye, EyeOff, Loader } from "lucide-react";

export default function Login() {
  const [load, setLoad] = useState(false);
  const [type, setType] = useState<React.HTMLInputTypeAttribute>("password");

  // 1. Create schema
  // 2. Define form
  const form = useLoginForm();
  // 3. Submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // authentication(values)
    //   .then((res) => {
    //     return res;
    //   })
    //   .then(async (res) => {
    //     configureClient(res.data.token);
    //     const metadata: AxiosResponse<Metadata> = await metadataUser();
    //     dispatch(
    //       setAuth({
    //         auth: true,
    //         email: metadata.data.email,
    //         nombre: metadata.data.nombre,
    //         empresa: metadata.data.empresa,
    //         rutStorage: metadata.data.rut_storage_base,
    //         rol: metadata.data.rol,
    //         token: res.data.token,
    //       })
    //     );
    //     navigation("/chat");
    //   })
    //   .catch((error: AxiosError<ErrorResponseData>) => {
    //     console.log("Error en la Autenticación:", error);
    //     toast.error("Error en la Autenticación", {
    //       description: error.response?.data.data.err || error.message || "Error desconocido",
    //       className: "toast-styles",
    //       action: {
    //         label: "Cerrar",
    //         onClick: () => {},
    //       },
    //     });
    //   });
  }

  return (
    <Card className="border-none mx-auto min-w-[90%] md:min-w-[60%]">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">360 Call</CardTitle>
        <CardDescription>Ingresa el correo y contraseña de tu cuenta</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 ">
          <CardContent className="grid gap-4">
            <div className="grid gap-2 text-left">
              <FormField
                control={form.control}
                name="email"
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
              {load && <Loader className="mr-2 h-4 w-4 animate-spin" />}
              Iniciar Sesión
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
