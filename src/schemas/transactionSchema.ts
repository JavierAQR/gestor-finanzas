import { z } from "zod";

export const formSchema = z.object({
  type: z
    .string()
    .min(1, "El tipo es requerido.")
    .refine(
      (value) => value === "ingreso" || value === "egreso" || value === ""
    ),
  description: z.string().min(1, "La descripción es requerida."),
  amount: z
    .number({ invalid_type_error: "El monto es requerido." })
    .refine((value) => value > 0, {
      message: "El monto mínimo es 1.",
    }),
  category: z.string().min(1, "La categoría es requerida."),
  date: z.string().refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
    message: "La fecha es requerida.",
  }),
});

export type TformSchema = z.infer<typeof formSchema>;
