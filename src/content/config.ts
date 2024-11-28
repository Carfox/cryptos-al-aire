import { z, defineCollection } from 'astro:content';

const metadataDefinition = () =>
  z
    .object({
      title: z.string().optional(),
      ignoreTitleTemplate: z.boolean().optional(),

      canonical: z.string().url().optional(),

      robots: z
        .object({
          index: z.boolean().optional(),
          follow: z.boolean().optional(),
        })
        .optional(),

      description: z.string().optional(),

      openGraph: z
        .object({
          url: z.string().optional(),
          siteName: z.string().optional(),
          images: z
            .array(
              z.object({
                url: z.string(),
                width: z.number().optional(),
                height: z.number().optional(),
              })
            )
            .optional(),
          locale: z.string().optional(),
          type: z.string().optional(),
        })
        .optional(),

      twitter: z
        .object({
          handle: z.string().optional(),
          site: z.string().optional(),
          cardType: z.string().optional(),
        })
        .optional(),
    })
    .optional();

const postCollection = defineCollection({
  schema: z.object({
    publishDate: z.date().optional(),
    updateDate: z.date().optional(),
    draft: z.boolean().optional(),

    title: z.string(),
    excerpt: z.string().optional(),
    image: z.string().optional(),

    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    author: z.string().optional(),

    metadata: metadataDefinition(),
  }),
});


// Define el esquema de la colección con Zod
const courseSchema = z.object({
  // Información básica del curso
  title: z.string(), // Título del curso
  description: z.string().optional(), // Breve descripción del curso
  image: z.string().optional(), // URL de la imagen del curso

  // Fechas y estado del curso
  publishDate: z.date().optional(), // Fecha de publicación del curso
  updateDate: z.date().optional(), // Fecha de última actualización
  draft: z.boolean().optional(), // Indica si el curso está en borrador

  // Categorías y etiquetas
  category: z.string().optional(), // Categoría principal (ej.: "Trading", "Blockchain")
  tags: z.array(z.string()).optional(), // Etiquetas adicionales relacionadas al curso

  price: z.number(), // Precio del curso
  level: z.enum(["Básico", "Intermedio", "Avanzado"]), // Nivel del curso
  duration: z.string().optional(), // Duración estimada del curso (ej.: "3 horas", "6 semanas")
  lessons: z.array(
    z.object({
      title: z.string(), // Título de la lección
      content: z.string().optional(), // Contenido descriptivo de la lección
    })
  ).optional(), // Lecciones incluidas en el curso

  author: z.string().optional(), // Nombre del autor o instructor
  authorBio: z.string().optional(), // Breve descripción del autor

  metadata: z.object({
    seoTitle: z.string().optional(), // Título SEO
    seoDescription: z.string().optional(), // Descripción para SEO
  }).optional(),
});

// Ahora infiere el tipo del esquema
export type CourseCollectionType = z.infer<typeof courseSchema>;

// Exporta la colección utilizando el esquema
export const courseCollection = defineCollection({
  schema: courseSchema,
});

export const collections = {
  post: postCollection,
};
