import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
  return (
    <Card className="border-none mx-auto min-w-[70%] ">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">CALL 360</CardTitle>
        <CardDescription>Ingresa el correo y contraseña de tu cuenta</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 ">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full" />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="user@example.com" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="password" />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Iniciar Sesión</Button>
      </CardFooter>
    </Card>
  );
}
