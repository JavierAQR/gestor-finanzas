import { z } from "zod";

export const budgetSchema = z.object({
  category: z.string().min(1, "La categoría es requerida."),
  budget: z
    .number({ invalid_type_error: "El presupuesto es requerido." })
    .refine((value) => value > 0, {
      message: "El monto mínimo es 1.",
    }),
});

export type TbudgetSchema = z.infer<typeof budgetSchema>;
