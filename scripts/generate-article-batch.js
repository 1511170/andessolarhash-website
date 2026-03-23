#!/usr/bin/env node
/**
 * Script para generar archivos de artículos del blog
 * Uso: node generate-article-batch.js [numero-articulo]
 * Ejemplo: node generate-article-batch.js 1
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Definición de los 20 artículos
const articles = [
  {
    num: 1,
    slug: "iniciar-mineria-bitcoin-chile",
    title: "Cómo Iniciar en la Minería de Bitcoin en Chile: Guía Completa 2024",
    excerpt: "Aprende paso a paso cómo comenzar a minar Bitcoin en Chile. Guía completa con requisitos, equipos recomendados, costos y estrategias para principiantes.",
    category: "Guías",
    tags: ["guia", "principiantes", "chile", "mineria", "bitcoin"],
    keywords: ["iniciar minería bitcoin chile", "como minar bitcoin chile", "guía minería bitcoin"],
    images: ["iniciar-mineria-chile-hero.png", "iniciar-mineria-chile-paso-a-paso.png", "iniciar-mineria-chile-equipos.png"]
  },
  {
    num: 2,
    slug: "asic-vs-gpu-mineria",
    title: "ASIC vs GPU: ¿Qué es Mejor para Minar Bitcoin en 2024?",
    excerpt: "Comparativa completa entre ASIC y GPU para minería de criptomonedas. Descubre cuál tecnología ofrece mejor ROI y rentabilidad según tu caso.",
    category: "Tecnología",
    tags: ["asic", "gpu", "comparativa", "hardware", "rentabilidad"],
    keywords: ["asic vs gpu mineria", "que es mejor asic o gpu", "comparativa hardware mineria"],
    images: ["asic-vs-gpu-hero.png", "asic-vs-gpu-diagrama.png", "asic-vs-gpu-roi.png"]
  },
  {
    num: 3,
    slug: "dificultad-red-bitcoin",
    title: "Dificultad de Red Bitcoin: Cómo Afecta tus Ganancias de Minería",
    excerpt: "Entiende qué es la dificultad de red Bitcoin, cómo se calcula y su impacto directo en la rentabilidad de tu operación minera.",
    category: "Tecnología",
    tags: ["dificultad", "red", "bitcoin", "tecnologia", "rentabilidad"],
    keywords: ["dificultad red bitcoin", "como afecta dificultad mineria", "que es difficulty bitcoin"],
    images: ["dificultad-red-bitcoin-hero.png", "dificultad-red-historia.png", "dificultad-red-efecto.png"]
  },
  {
    num: 4,
    slug: "pool-mineria-bitcoin",
    title: "Pool de Minería Bitcoin: Guía para Elegir el Mejor 2024",
    excerpt: "Descubre cómo funcionan los pools de minería, comparativa de los mejores pools 2024 y cómo configurar tu minero para maximizar ganancias.",
    category: "Guías",
    tags: ["pool", "mineria", "bitcoin", "guia", "configuracion"],
    keywords: ["pool mineria bitcoin", "mejor pool mineria", "como elegir pool bitcoin"],
    images: ["pool-mineria-hero.png", "pool-mineria-comparacion.png", "pool-mineria-setup.png"]
  },
  {
    num: 5,
    slug: "hashrate-explicado",
    title: "Hashrate Explicado: Qué es, Cómo se Mide y Por Qué Importa",
    excerpt: "Todo sobre hashrate en minería de Bitcoin. Aprende qué es, cómo se mide, qué significan TH/s, PH/s, EH/s y cómo afecta tus ganancias.",
    category: "Educación",
    tags: ["hashrate", "educacion", "bitcoin", "mineria", "terminologia"],
    keywords: ["que es hashrate", "como se mide hashrate", "hashrate bitcoin significado"],
    images: ["hashrate-explicado-hero.png", "hashrate-medidas.png", "hashrate-eficiencia.png"]
  },
  {
    num: 6,
    slug: "antminer-s21-vs-s19",
    title: "Antminer S21 vs S19: Comparativa Completa y Cuál Comprar 2024",
    excerpt: "Análisis detallado de Antminer S21 vs S19. Comparativa de especificaciones, rentabilidad, eficiencia energética y recomendación de compra.",
    category: "Productos",
    tags: ["antminer", "s21", "s19", "comparativa", "bitmain"],
    keywords: ["antminer s21 vs s19", "comparativa s21 s19", "cual comprar antminer"],
    images: ["antminer-s21-vs-s19-hero.png", "antminer-especificaciones.png", "antminer-rendimiento.png"]
  },
  {
    num: 7,
    slug: "bitmain-antminer-historia",
    title: "Bitmain y Antminer: Historia, Evolución y Mejores Modelos",
    excerpt: "Conoce la historia de Bitmain, líder en ASICs para Bitcoin. Desde el S1 hasta el S21, evolución de la serie Antminer y modelos más rentables.",
    category: "Historia",
    tags: ["bitmain", "antminer", "historia", "asic", "evolucion"],
    keywords: ["bitmain antminer historia", "evolucion antminer", "mejores modelos antminer"],
    images: ["bitmain-historia-hero.png", "bitmain-modelos.png", "bitmain-fabrica.png"]
  },
  {
    num: 8,
    slug: "mantenimiento-asic",
    title: "Mantenimiento de ASICs: Guía Preventiva para Extender la Vida Útil",
    excerpt: "Aprende a mantener tus ASICs en óptimas condiciones. Guía de limpieza, diagnóstico y reparación preventiva para maximizar ROI.",
    category: "Guías",
    tags: ["mantenimiento", "asic", "reparacion", "preventivo", "guia"],
    keywords: ["mantenimiento asic", "limpieza minero bitcoin", "reparar antminer"],
    images: ["mantenimiento-asic-hero.png", "mantenimiento-checklist.png", "mantenimiento-herramientas.png"]
  },
  {
    num: 9,
    slug: "overclocking-mineros-bitcoin",
    title: "Overclocking en Mineros Bitcoin: Guía de Riesgos y Beneficios",
    excerpt: "Todo sobre overclocking de ASICs. Aumenta tu hashrate pero entiende los riesgos: temperatura, consumo, garantía y vida útil.",
    category: "Avanzado",
    tags: ["overclocking", "asic", "avanzado", "hashrate", "rendimiento"],
    keywords: ["overclocking bitcoin miner", "overclock antminer", "riesgos overclocking asic"],
    images: ["overclocking-hero.png", "overclocking-riesgos.png", "overclocking-beneficios.png"]
  },
  {
    num: 10,
    slug: "vida-util-asic",
    title: "¿Cuánto Dura un ASIC? Lifespan Real y Factores que Afectan Durabilidad",
    excerpt: "Descubre la vida útil real de un ASIC de Bitcoin. Factores que afectan durabilidad, depreciación y cuándo reemplazar tu equipo.",
    category: "Educación",
    tags: ["lifespan", "asic", "durabilidad", "depreciacion", "vida-util"],
    keywords: ["cuanto dura un asic", "vida util antminer", "depreciacion asic mineria"],
    images: ["lifespan-asic-hero.png", "lifespan-factores.png", "lifespan-depreciacion.png"]
  },
  {
    num: 11,
    slug: "hosting-mineria-bitcoin-chile",
    title: "Hosting de Minería Bitcoin en Chile: Todo lo que Debes Saber 2024",
    excerpt: "Guía completa de hosting para minería Bitcoin en Chile. Ventajas, costos, qué buscar y cómo elegir el mejor proveedor de hosting.",
    category: "Hosting",
    tags: ["hosting", "chile", "mineria", "colocation", "datacenter"],
    keywords: ["hosting mineria bitcoin chile", "colocation chile", "data center mineria"],
    images: ["hosting-chile-hero.png", "hosting-vs-casa.png", "hosting-beneficios.png"]
  },
  {
    num: 12,
    slug: "costo-electricidad-mineria-chile",
    title: "Costo de Electricidad para Minería: Chile vs Mundo [2024]",
    excerpt: "Análisis comparativo de tarifas eléctricas para minería Bitcoin. Chile vs otros países, mejores regiones y cómo calcular tus costos.",
    category: "Análisis",
    tags: ["electricidad", "costos", "chile", "comparativa", "tarifas"],
    keywords: ["costo electricidad mineria", "tarifa electrica chile mineria", "comparacion electricidad mineria"],
    images: ["costo-electricidad-hero.png", "costo-electricidad-chile.png", "costo-impacto-rentabilidad.png"]
  },
  {
    num: 13,
    slug: "seguridad-data-center-mineria",
    title: "Seguridad en Data Centers de Minería: Protocolos Esenciales",
    excerpt: "Protocolos de seguridad física y cibernética para instalaciones de minería Bitcoin. Protege tu inversión contra robos, hackeos y desastres.",
    category: "Seguridad",
    tags: ["seguridad", "datacenter", "proteccion", "fisica", "cibernetica"],
    keywords: ["seguridad data center mineria", "proteger granja mineria", "ciberseguridad bitcoin"],
    images: ["seguridad-datacenter-hero.png", "seguridad-protocolos.png", "seguridad-ciberseguridad.png"]
  },
  {
    num: 14,
    slug: "monitoreo-remoto-mineros",
    title: "Monitoreo Remoto de Mineros: Herramientas y Setup Completo",
    excerpt: "Configura monitoreo remoto para tus ASICs. Mejores apps, alertas, dashboards y cómo controlar tu granja desde cualquier lugar.",
    category: "Herramientas",
    tags: ["monitoreo", "remoto", "herramientas", "apps", "control"],
    keywords: ["monitoreo remoto mineros", "app monitoreo asic", "control remoto granja mineria"],
    images: ["monitoreo-remoto-hero.png", "monitoreo-dashboard.png", "monitoreo-alertas.png"]
  },
  {
    num: 15,
    slug: "migrar-minero-hosting",
    title: "Migrar tu Minero a Hosting: Checklist Completo sin Riesgos",
    excerpt: "Guía paso a paso para migrar tu ASIC a un centro de hosting. Preparación, empaque, envío, configuración y puesta en marcha segura.",
    category: "Guías",
    tags: ["migracion", "hosting", "envio", "setup", "guia"],
    keywords: ["migrar minero hosting", "enviar asic colocation", "cambiar a hosting mineria"],
    images: ["migrar-hosting-hero.png", "migrar-checklist.png", "migrar-empaque.png"]
  },
  {
    num: 16,
    slug: "roi-mineria-bitcoin-calculadora",
    title: "ROI en Minería Bitcoin: Calculadora y Proyecciones 2024-2025",
    excerpt: "Calcula el retorno de inversión de tu operación minera. Herramientas, proyecciones, factores que afectan ROI y escenarios post-halving.",
    category: "Inversión",
    tags: ["roi", "retorno", "inversion", "calculadora", "proyecciones"],
    keywords: ["roi mineria bitcoin", "calculadora rentabilidad mineria", "retorno inversion asic"],
    images: ["roi-mineria-hero.png", "roi-calculadora.png", "roi-proyecciones.png"]
  },
  {
    num: 17,
    slug: "impuestos-mineria-bitcoin-chile",
    title: "Impuestos en Minería de Criptomonedas Chile: Guía Tributaria 2024",
    excerpt: "Todo sobre obligaciones tributarias para mineros de Bitcoin en Chile. Declaración de renta, IVA, boletas y deducciones permitidas.",
    category: "Legal",
    tags: ["impuestos", "tributario", "legal", "chile", "sii"],
    keywords: ["impuestos mineria bitcoin chile", "tributacion mineria cripto", "como declarar mineria sii"],
    images: ["impuestos-chile-hero.png", "impuestos-guia.png", "impuestos-deducciones.png"]
  },
  {
    num: 18,
    slug: "mineria-bitcoin-negocio",
    title: "Minería Bitcoin como Negocio: Plan y Estrategia 2024",
    excerpt: "Convierte la minería de Bitcoin en un negocio rentable. Plan de negocios, escalabilidad, financiamiento y gestión operativa profesional.",
    category: "Negocios",
    tags: ["negocio", "emprendimiento", "plan", "escalabilidad", "gestion"],
    keywords: ["negocio mineria bitcoin", "emprender en mineria", "granja mineria empresa"],
    images: ["mineria-negocio-hero.png", "negocio-plan.png", "negocio-escalabilidad.png"]
  },
  {
    num: 19,
    slug: "diversificar-inversion-cripto",
    title: "Diversificar Inversión Crypto: Minería + Trading + Holding [Estrategia]",
    excerpt: "Estrategias para diversificar tu portafolio de criptomonedas. Combina minería, trading y holding para minimizar riesgos y maximizar retornos.",
    category: "Inversión",
    tags: ["diversificacion", "inversion", "estrategia", "portafolio", "riesgo"],
    keywords: ["diversificar inversion crypto", "portafolio criptomonedas", "estrategia inversion bitcoin"],
    images: ["diversificar-crypto-hero.png", "diversificar-estrategias.png", "diversificar-portafolio.png"]
  },
  {
    num: 20,
    slug: "futuro-mineria-bitcoin-2025",
    title: "Futuro de la Minería Bitcoin Post-Halving 2024-2025: Predicciones",
    excerpt: "Proyecciones y tendencias del sector minero Bitcoin. Tecnologías emergentes, regulaciones, sostenibilidad y oportunidades para 2025.",
    category: "Tendencias",
    tags: ["futuro", "tendencias", "predicciones", "2025", "post-halving"],
    keywords: ["futuro mineria bitcoin", "tendencias mineria 2025", "predicciones sector minero"],
    images: ["futuro-mineria-hero.png", "futuro-tendencias.png", "futuro-tecnologia.png"]
  }
];

function generateArticleContent(article) {
  const today = new Date().toISOString().split('T')[0];
  
  return `---
title: "${article.title}"
excerpt: "${article.excerpt}"
date: ${today}T08:00:00.000Z
modifiedDate: ${today}T08:00:00.000Z
author: "Andes Solar Hash"
category: "${article.category}"
tags: [${article.tags.map(t => `"${t}"`).join(', ')}]
image: "/images/blog/posts/${article.images[0]}"
imageAlt: "${article.title}"
ogImage: "/images/blog/posts/${article.images[0]}"
published: false
featured: false
readingTime: 8
canonical: "https://andessolarhash.com/blog/${article.slug}"
---

# ${article.title}

**${article.keywords[0]}** es uno de los temas más importantes para cualquier persona interesada en la minería de Bitcoin en Chile. En esta guía completa, te explicamos todo lo que necesitas saber para maximizar tus ganancias y operar de manera eficiente en 2024.

![${article.title}](/images/blog/posts/${article.images[0]})

## ¿Qué es ${article.keywords[0].charAt(0).toUpperCase() + article.keywords[0].slice(1)}?

Este artículo está en construcción. Contenido completo próximamente.

## Preguntas Frecuentes

### ¿Pregunta 1?
Respuesta en construcción...

### ¿Pregunta 2?
Respuesta en construcción...

## Conclusión

Resumen y conclusiones del artículo...

---

*Última actualización: ${today}*  
*Tiempo de lectura estimado: 8 minutos*
`;
}

function createArticle(articleNum) {
  const article = articles.find(a => a.num === parseInt(articleNum));
  
  if (!article) {
    console.error(`❌ Artículo #${articleNum} no encontrado`);
    console.log('Artículos disponibles:');
    articles.forEach(a => console.log(`  ${a.num}. ${a.title.substring(0, 50)}...`));
    process.exit(1);
  }

  const contentDir = path.join(__dirname, '..', 'src', 'content', 'blog');
  const filePath = path.join(contentDir, `${article.slug}.md`);

  // Verificar si ya existe
  if (fs.existsSync(filePath)) {
    console.log(`⚠️  El archivo ya existe: ${filePath}`);
    console.log('¿Deseas sobrescribirlo? (no implementado - elimina manualmente si es necesario)');
    process.exit(1);
  }

  const content = generateArticleContent(article);
  fs.writeFileSync(filePath, content);

  console.log(`✅ Artículo creado: ${filePath}`);
  console.log(`\n📄 Detalles:`);
  console.log(`   Título: ${article.title}`);
  console.log(`   Slug: ${article.slug}`);
  console.log(`   Categoría: ${article.category}`);
  console.log(`   Keywords: ${article.keywords.join(', ')}`);
  console.log(`\n🖼️  Imágenes requeridas:`);
  article.images.forEach(img => console.log(`   - ${img}`));
  console.log(`\n📝 Siguientes pasos:`);
  console.log(`   1. Generar las imágenes con: node generate-20-articles-images.js`);
  console.log(`   2. Copiar imágenes al proyecto`);
  console.log(`   3. Completar el contenido del artículo`);
  console.log(`   4. Cambiar published: false a true cuando esté listo`);
}

function listArticles() {
  console.log('\n📚 Lista de 20 Artículos Planificados\n');
  console.log('='.repeat(80));
  
  articles.forEach(a => {
    console.log(`\n${a.num}. ${a.title}`);
    console.log(`   Slug: ${a.slug}`);
    console.log(`   Categoría: ${a.category}`);
    console.log(`   Keywords: ${a.keywords.join(', ')}`);
  });
  
  console.log('\n' + '='.repeat(80));
  console.log(`\n💡 Uso: node generate-article-batch.js [número]`);
  console.log(`   Ejemplo: node generate-article-batch.js 1`);
}

// Main
const arg = process.argv[2];

if (!arg || arg === '--list' || arg === '-l') {
  listArticles();
} else if (arg === '--all') {
  console.log('Creando los 20 artículos...\n');
  articles.forEach(a => {
    try {
      createArticle(a.num);
      console.log('---');
    } catch (e) {
      console.error(`Error con artículo ${a.num}:`, e.message);
    }
  });
} else {
  createArticle(arg);
}
