# 📋 Plan Completo: Image Optimizer + SEO AI Citations

## 🎯 Objetivo
Optimizar el sitio Andes Solar Hash para:
1. **Performance**: Reducir tamaño de imágenes 40-60% con WebP
2. **SEO**: Implementar Schema.org completo + AI Citations para LLMs
3. **Social**: Imágenes OG optimizadas para WhatsApp/Facebook/Twitter

---

## 🖼️ FASE 1: Image Optimizer

### 1.1 Análisis inicial (dry-run)
```bash
npm run images:optimize:dry
```

### 1.2 Conversión WebP
- Calidad: 82 (default)
- Formatos: JPG, JPEG, PNG
- Directorio: public/

### 1.3 Actualizar referencias
- Buscar en: src/**/*.astro
- Reemplazar: .jpg/.png → .webp

---

## 🔍 FASE 2: SEO AI Citations

### 2.1 Componentes a implementar
- `SEOHead.astro` - Meta tags completos
- `SchemaOrg.astro` - Structured data JSON-LD

### 2.2 Schemas por página

| Página | Schemas |
|--------|---------|
| Home | Organization, WebSite, LocalBusiness |
| Productos | Organization, Service, SoftwareApplication |
| Hosting | Organization, Service, FinancialService |
| NFT | Organization, Service, Product |
| Blog | Organization, BlogPosting, BreadcrumbList |
| Contacto | Organization, ContactPage |

### 2.3 Datos LocalBusiness (Andes Solar Hash)
```json
{
  "@type": "LocalBusiness",
  "name": "Andes Solar Hash",
  "description": "Minería de Bitcoin en Chile con soporte local",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Manquehue Norte 151, Oficina 1205",
    "addressLocality": "Las Condes",
    "addressRegion": "Santiago",
    "addressCountry": "CL"
  },
  "email": "soporte@andessolarhash.com",
  "priceRange": "$$$"
}
```

### 2.4 Imágenes OG necesarias (1200×630)
- `/images/og/og-home.png` - Homepage
- `/images/og/og-products.png` - Productos
- `/images/og/og-hosting.png` - Hosting
- `/images/og/og-nft.png` - NFT
- `/images/og/og-blog.png` - Blog
- `/images/og/og-contact.png` - Contacto

---

## 📊 Métricas esperadas

### Image Optimizer
- Reducción de peso: 40-60%
- Formatos: WebP para todos los navegadores modernos
- Fallback: JPG/PNG originales (opcional)

### SEO AI Citations
- Schema.org válido en todas las páginas
- Meta tags OG completos
- AI Citations para LLMs (ChatGPT, Claude, etc.)

---

## 🚀 Ejecución

Paso 1: Image Optimizer (dry-run)
Paso 2: Conversión WebP
Paso 3: Actualizar referencias
Paso 4: Configurar SEOHead en Layout
Paso 5: Implementar SchemaOrg por página
Paso 6: Generar imágenes OG
Paso 7: Build y deploy
