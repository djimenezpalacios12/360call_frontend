import { z } from "zod";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/schemas/login.schemas";

export const useLoginForm = () => {
  // 2. Define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      contraseña: "",
    },
  });

  return form;
};
