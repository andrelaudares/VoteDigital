
import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  phone: z.string().optional(),
  notifications: z.object({
    email: z.boolean(),
    sms: z.boolean(),
  }),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

export const defaultProfileValues: ProfileFormValues = {
  name: "João Silva",
  email: "joao.silva@example.com",
  phone: "(11) 98765-4321",
  notifications: {
    email: true,
    sms: false,
  },
};
