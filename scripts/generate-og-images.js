#!/usr/bin/env node
/**
 * Genera imágenes OG (Open Graph) para redes sociales
 * Tamaño: 1200 x 630 px (ratio 1.91:1)
 */

import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { config } from "dotenv";

config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const OUTPUT_DIR = path.join(__dirname, "../public/images/og");

// Configuración de imágenes OG por página
const ogImages = [
  {
    filename: "og-home.webp",
    prompt: `Create a professional Open Graph image (1200x630) for Andes Solar Hash, a Bitcoin mining company in Chile.

Design requirements:
- Size: 1200 x 630 pixels (landscape)
- Background: Dark gradient (#0b0d1b to #1a2040)
- Central element: Golden stylized "S" logo with Bitcoin symbol inside
- Text: "ANDES SOLAR HASH" in large gold letters at top
- Subtitle: "Minería de Bitcoin en Chile" in white
- Visual elements: Subtle circuit patterns, mining equipment silhouettes
- Color palette: Gold (#f7ad1f), dark blue (#0b0d1b), white accents
- Style: Modern, tech, professional, crypto mining aesthetic
- Include subtle Bitcoin and blockchain visual motifs
- Clean, premium look suitable for business social media`
  },
  {
    filename: "og-products.webp",
    prompt: `Create a professional Open Graph image (1200x630) for Andes Solar Hash products page.

Design requirements:
- Size: 1200 x 630 pixels
- Background: Dark gradient with tech patterns
- Central element: Antminer S21 mining equipment render
- Text: "EQUIPOS ASIC" in large gold letters
- Subtitle: "Antminer S21 | Hosting | NFTs" in white
- Visual: Mining hardware, hashrate graphics, golden accents
- Color palette: Gold (#f7ad1f), dark blue (#0b0d1b), electric blue accents
- Style: Product showcase, high-tech, premium hardware
- Include power/efficiency visual indicators
- Professional product photography style`
  },
  {
    filename: "og-hosting.webp",
    prompt: `Create a professional Open Graph image (1200x630) for Bitcoin mining hosting service.

Design requirements:
- Size: 1200 x 630 pixels
- Background: Data center interior with blue ambient lighting
- Central element: Rows of mining rigs with glowing lights
- Text: "HOSTING MINERO" in large gold letters
- Subtitle: "Energía $0.088/kWh | Monitoreo 24/7" in white
- Visual: Server racks, cooling systems, Chile map outline
- Color palette: Industrial blue, gold highlights, dark grays
- Style: Industrial, professional data center aesthetic
- Include security and reliability visual cues
- Modern infrastructure photography style`
  },
  {
    filename: "og-nft.webp",
    prompt: `Create a professional Open Graph image (1200x630) for NFT mining investment.

Design requirements:
- Size: 1200 x 630 pixels
- Background: Gradient with blockchain visual patterns
- Central element: NFT cards with mining equipment imagery
- Text: "NFTs PRODUCTIVOS" in large gold letters
- Subtitle: "Fraccionamiento desde 1% | Hashrate real" in white
- Visual: Digital collectibles, Bitcoin symbols, Web3 elements
- Color palette: Purple/blue gradients, gold accents, neon highlights
- Style: Web3, digital art, futuristic, collectible cards
- Include hash rate and ROI visual indicators
- Modern NFT marketplace aesthetic`
  },
  {
    filename: "og-blog.webp",
    prompt: `Create a professional Open Graph image (1200x630) for Bitcoin mining blog.

Design requirements:
- Size: 1200 x 630 pixels
- Background: Abstract tech/news aesthetic
- Central element: Bitcoin symbol with educational elements
- Text: "BLOG & NOTICIAS" in large gold letters
- Subtitle: "Análisis de minería Bitcoin | Tendencias 2026" in white
- Visual: Charts, mining statistics, educational icons
- Color palette: Professional news style with gold accents
- Style: Editorial, informative, tech journalism
- Include data visualization elements
- Clean, readable, shareable design`
  },
  {
    filename: "og-contact.webp",
    prompt: `Create a professional Open Graph image (1200x630) for contact page.

Design requirements:
- Size: 1200 x 630 pixels
- Background: Dark gradient with subtle map of Chile
- Central element: Communication/support icons
- Text: "CONTÁCTANOS" in large gold letters
- Subtitle: "Soporte en Chile | Respuesta en 24h" in white
- Visual: Email, phone, location icons in gold
- Color palette: Gold (#f7ad1f), dark blue, white
- Style: Professional, welcoming, customer service
- Include Chile location emphasis
- Trust and reliability visual cues`
  }
];

async function generateImage(prompt, filename) {
  console.log(`\n🎨 Generando: ${filename}`);
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp-image-generation",
      contents: prompt,
      config: {
        responseModalities: ["TEXT", "IMAGE"],
      },
    });

    const parts = response.candidates?.[0]?.content?.parts;
    
    if (!parts) {
      console.error(`❌ No content received for ${filename}`);
      return false;
    }

    for (const part of parts) {
      if (part.inlineData) {
        if (!fs.existsSync(OUTPUT_DIR)) {
          fs.mkdirSync(OUTPUT_DIR, { recursive: true });
        }
        
        const outputPath = path.join(OUTPUT_DIR, filename);
        fs.writeFileSync(outputPath, Buffer.from(part.inlineData.data, "base64"));
        console.log(`✅ Guardada: ${filename}`);
        return true;
      }
    }
    
    console.error(`❌ No image data for ${filename}`);
    return false;
  } catch (error) {
    console.error(`❌ Error generando ${filename}:`, error.message);
    return false;
  }
}

async function main() {
  if (!process.env.GEMINI_API_KEY) {
    console.error("❌ ERROR: GEMINI_API_KEY no está configurada");
    process.exit(1);
  }

  console.log("🚀 Generando imágenes OG para Andes Solar Hash");
  console.log(`📁 Directorio: ${OUTPUT_DIR}`);
  console.log(`📊 Total: ${ogImages.length} imágenes\n`);

  let successCount = 0;
  
  for (let i = 0; i < ogImages.length; i++) {
    const { filename, prompt } = ogImages[i];
    console.log(`\n[${i + 1}/${ogImages.length}] ${filename}`);
    
    const success = await generateImage(prompt, filename);
    if (success) successCount++;
    
    // Esperar entre imágenes
    if (i < ogImages.length - 1) {
      console.log("⏳ Esperando 5 segundos...");
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }

  console.log("\n" + "=".repeat(60));
  console.log("📊 RESUMEN");
  console.log("=".repeat(60));
  console.log(`✅ Exitosas: ${successCount}/${ogImages.length}`);
  console.log(`📁 Ubicación: ${OUTPUT_DIR}`);
  console.log("\n🎉 Proceso completado!");
}

main();
