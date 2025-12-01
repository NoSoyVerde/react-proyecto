import { z } from "zod";

export const productValidator = z.object({
  title: z.string().min(3, "El título debe tener al menos 3 caracteres"),
  description: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres"),
  price: z.number().min(0, "El precio debe ser un número positivo"),
  slug: z
    .string()
    .min(3, "El slug debe tener al menos 3 caracteres")
    .regex(
      /^[a-z0-9-]+$/,
      "El slug solo puede contener letras minúsculas, números y guiones"
    ),
  imageUrl: z.string().url("La URL de la imagen debe ser una URL válida"),
  category: z.string().min(3, "La categoría debe tener al menos 3 caracteres"),
  brand: z.string().min(2, "La marca debe tener al menos 2 caracteres"),
  rating: z.number().min(0).max(5, "La calificación debe estar entre 0 y 5"),
  numReviews: z
    .number()
    .min(0, "El número de reseñas debe ser un número positivo"),
  stock: z.number().min(0, "El stock debe ser un número positivo"),
  isFeatured: z.boolean(),
  banner: z
    .string()
    .url("La URL del banner debe ser una URL válida")
    .nullable(),
});

export type ProductInput = z.infer<typeof productValidator>;
