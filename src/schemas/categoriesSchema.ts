import { z } from "zod";

export const categoriesSchema = z.object({
  name: z.string().min(1, "El nombre es requerido."),
  type: z
    .string()
    .min(1, "El tipo es requerido.")
    .refine(
      (value) => value === "ingreso" || value === "egreso" || value === ""
    ),
});

export type TcategoriesSchema = z.infer<typeof categoriesSchema>;
