import { defineCollection, z } from 'astro:content';

/**
 * Configuración de colecciones de contenido
 * Define el schema para cada tipo de contenido editable
 * Optimizado para SEO y E-E-A-T
 */

// Colección: Blog
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    // Campos básicos
    title: z.string().max(70, "El título debe tener máximo 70 caracteres para SEO"),
    excerpt: z.string().max(160, "El excerpt debe tener máximo 160 caracteres para SEO"),
    date: z.date(),
    modifiedDate: z.date().optional(),
    author: z.string().default("Andes Solar Hash"),
    
    // Categorización
    category: z.string(),
    tags: z.array(z.string()).max(10, "Máximo 10 tags recomendados").optional(),
    
    // Imágenes
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    ogImage: z.string().optional(),
    
    // SEO Avanzado
    canonical: z.string().url().optional(),
    metaTitle: z.string().max(60).optional(), // Título específico para SERP
    metaDescription: z.string().max(160).optional(), // Description específica para SERP
    
    // Configuración
    published: z.boolean().default(true),
    featured: z.boolean().default(false),
    readingTime: z.number().min(1).max(60).optional(),
    
    // Schema.org específico
    articleSection: z.string().optional(), // Sección del artículo
    wordCount: z.number().optional(),
    
    // Citas y referencias (para AI citations)
    primarySources: z.array(z.object({
      name: z.string(),
      url: z.string().url(),
      description: z.string().optional()
    })).optional(),
    
    // E-E-A-T signals
    expertiseLevel: z.enum(["principiante", "intermedio", "avanzado"]).default("intermedio"),
    reviewedBy: z.string().optional(), // Experto que revisó el contenido
    reviewDate: z.date().optional(),
    
    // Engagement
    enableComments: z.boolean().default(false),
    relatedPosts: z.array(z.string()).optional(), // Slugs de posts relacionados
  }),
});

// Colección: Testimonios (se activa con skill testimonials)
const testimonials = defineCollection({
  type: 'data',
  schema: z.object({
    author: z.string(),
    company: z.string().optional(),
    quote: z.string(),
    image: z.string().optional(),
    rating: z.number().min(1).max(5).default(5),
    date: z.string().optional(),
    published: z.boolean().default(true),
    verified: z.boolean().default(false), // Cliente verificado
    source: z.enum(["google", "trustpilot", "direct", "other"]).default("direct"),
  }),
});

// Colección: Páginas (para contenido editable vía CMS)
const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    published: z.boolean().default(true),
    lastModified: z.date().optional(),
    
    // SEO
    canonical: z.string().url().optional(),
    ogImage: z.string().optional(),
    noIndex: z.boolean().default(false), // Para páginas legales si es necesario
  }),
});

// Colección: Servicios
const services = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    shortDescription: z.string(),
    description: z.string().optional(),
    icon: z.string().optional(),
    order: z.number().default(0),
    published: z.boolean().default(true),
    
    // SEO específico
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    ogImage: z.string().optional(),
    
    // Categorización
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    
    // Precios (si aplica)
    price: z.string().optional(),
    priceCurrency: z.string().default("USD"),
    
    // Relaciones
    relatedProducts: z.array(z.string()).optional(),
    relatedPosts: z.array(z.string()).optional(),
  }),
});

// Colección: Equipo
const team = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    position: z.string(),
    bio: z.string(),
    image: z.string().optional(),
    linkedin: z.string().optional(),
    email: z.string().optional(),
    order: z.number().default(0),
    published: z.boolean().default(true),
    
    // E-E-A-T
    credentials: z.array(z.string()).optional(), // Certificaciones
    expertise: z.array(z.string()).optional(), // Áreas de especialización
  }),
});

// Colección: Productos (ASICs)
const products = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    model: z.string(),
    manufacturer: z.string().default("Bitmain"),
    
    // Especificaciones técnicas
    hashrate: z.string(), // Ej: "270 TH/s"
    powerConsumption: z.string(), // Ej: "3645W"
    efficiency: z.string(), // Ej: "13.5 J/TH"
    algorithm: z.string().default("SHA-256"),
    
    // Precio
    price: z.number(),
    priceCurrency: z.string().default("USD"),
    availability: z.enum(["in_stock", "out_of_stock", "pre_order"]).default("in_stock"),
    
    // Descripciones
    shortDescription: z.string(),
    description: z.string(),
    
    // Imágenes
    images: z.array(z.string()).optional(),
    mainImage: z.string(),
    
    // SEO
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    
    // Relaciones
    relatedProducts: z.array(z.string()).optional(),
    
    // Configuración
    featured: z.boolean().default(false),
    published: z.boolean().default(true),
    order: z.number().default(0),
  }),
});

// Colección: FAQs (para schema markup)
const faqs = defineCollection({
  type: 'data',
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    category: z.string().optional(),
    order: z.number().default(0),
    published: z.boolean().default(true),
  }),
});

export const collections = {
  blog,
  testimonials,
  pages,
  services,
  team,
  products,
  faqs,
};
