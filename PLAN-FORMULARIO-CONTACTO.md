# 📧 Plan de Implementación: Formulario de Contacto Funcional

> Implementación de formulario de contacto usando Web3Forms para Andes Solar Hash

---

## 🎯 Objetivos

1. ✅ Formulario funcional en versión estática de Astro
2. ✅ Sin backend propio requerido
3. ✅ Fase Testing: emails a `c@kinto.co`
4. ✅ Fase Producción: emails a `soporte@andessolarhash.com`
5. ✅ Validación cliente + mensajes de éxito/error

---

## 📋 Fases de Implementación

### FASE 1: Instalación de Skill (5 min)

**Acción:** Instalar skill forms-web3forms

```bash
cd sites/andessolarhash
node scripts/skill-add.js forms-web3forms
```

**Verificación:**
- [ ] Skill instalada en `skills/community/forms-web3forms/`
- [ ] Componente ContactForm disponible

---

### FASE 2: Configuración Web3Forms (10 min)

#### Paso 2.1: Obtener API Key
1. Ir a https://web3forms.com/
2. Crear cuenta gratuita
3. Obtener Access Key
4. Guardar key para configuración

#### Paso 2.2: Configurar site.config.ts

**Archivo:** `sites/andessolarhash/config/site.config.ts`

```typescript
export default {
  // ... configuración existente ...
  
  site: {
    name: 'Andes Solar Hash',
    contactEmail: 'c@kinto.co', // FASE TESTING (cambiar después)
    // contactEmail: 'soporte@andessolarhash.com', // FASE PRODUCCIÓN
  },
  
  forms: {
    web3formsKey: 'TU-API-KEY-AQUI' // <-- CONFIGURAR
  }
};
```

**Configuración Temporal (Testing):**
```typescript
contactEmail: 'c@kinto.co'
```

**Configuración Final (Producción):**
```typescript
contactEmail: 'soporte@andessolarhash.com'
```

---

### FASE 3: Actualizar Página de Contacto (15 min)

**Archivo:** `sites/andessolarhash/src/pages/contacto/index.astro`

#### Cambios Requeridos:

1. **Importar componente:**
```astro
---
import Layout from '../../layouts/Layout.astro';
import { ContactForm } from '../../../skills/community/forms-web3forms';
---
```

2. **Reemplazar formulario estático:**

**ANTES (Formulario estático):**
```astro
<form class="space-y-6">
  <!-- Campos del formulario estático -->
</form>
```

**DESPUÉS (Formulario Web3Forms):**
```astro
<ContactForm 
  title="Envíanos un mensaje"
  subtitle="Te responderemos en menos de 24 horas"
  recipientEmail="c@kinto.co"  <!-- FASE TESTING -->
  submitLabel="Enviar mensaje"
  showPhone={true}
  showCompany={true}
  subject="Nuevo contacto desde AndesSolarHash.com"
/>
```

3. **Personalización de campos:**

El componente incluye:
- ✅ Nombre completo (requerido)
- ✅ Email (requerido)
- ✅ Teléfono (opcional, `showPhone={true}`)
- ✅ Empresa (opcional, `showCompany={true}`)
- ✅ Mensaje (requerido)
- ✅ Checkbox de privacidad (requerido)
- ✅ Botón de envío
- ✅ Mensajes de éxito/error

---

### FASE 4: Personalización Visual (10 min)

**Adaptar estilos al diseño de Andes Solar Hash:**

El componente usa clases Tailwind. Verificar que coincidan con el diseño:

| Clave | Valor Actual | Valor Andes Solar Hash |
|-------|-------------|----------------------|
| `primary` | Definida en config | `#FFB800` (amarillo) |
| `bg-white` | Fondo blanco | ✅ OK |
| `rounded-xl` | Bordes redondeados | ✅ OK |
| `shadow-xl` | Sombra | Ajustar si es necesario |

**Si es necesario modificar colores:**

Crear wrapper con estilos personalizados:
```astro
<div class="contact-form-wrapper">
  <ContactForm 
    title="Contáctanos"
    subtitle=""
    recipientEmail="c@kinto.co"
    submitLabel="Enviar mensaje"
  />
</div>

<style>
  .contact-form-wrapper :global(.bg-primary) {
    background-color: #FFB800;
  }
  .contact-form-wrapper :global(.text-primary) {
    color: #FFB800;
  }
</style>
```

---

### FASE 5: Testing (15 min)

#### 5.1 Build y Preview Local
```bash
cd sites/andessolarhash
npm run build
npm run preview
```

#### 5.2 Pruebas Funcionales
- [ ] Acceder a `/contacto`
- [ ] Verificar que aparezca banner "Modo Demo" si no hay API key
- [ ] Configurar API key de testing
- [ ] Enviar formulario de prueba
- [ ] Verificar llegada de email a `c@kinto.co`
- [ ] Verificar mensaje de éxito en pantalla
- [ ] Verificar validación de campos requeridos

#### 5.3 Verificar Contenido del Email
El email debe contener:
- Nombre del remitente
- Email de contacto
- Teléfono (si se proporcionó)
- Empresa (si se proporcionó)
- Mensaje completo
- Fecha/hora de envío

---

### FASE 6: Switch a Producción (5 min)

Una vez validado el testing:

1. **Actualizar email destino:**
```typescript
// config/site.config.ts
contactEmail: 'soporte@andessolarhash.com'
```

2. **Actualizar página de contacto:**
```astro
<ContactForm 
  recipientEmail="soporte@andessolarhash.com"
  ...
/>
```

3. **Verificar dominio en Web3Forms:**
- Configurar dominio autorizado: `andessolarhash.com`
- Verificar en dashboard de Web3Forms

4. **Rebuild y deploy:**
```bash
npm run build
# Deploy a producción
```

---

## 📁 Archivos a Modificar

```
sites/andessolarhash/
├── config/
│   └── site.config.ts          # ➕ Añadir forms.web3formsKey
├── src/
│   └── pages/
│       └── contacto/
│           └── index.astro     # 📝 Reemplazar formulario
└── skills/
    └── community/
        └── forms-web3forms/    # ➕ Skill instalada
```

---

## 🔧 Especificaciones Técnicas

### Web3Forms API
- **Endpoint:** `https://api.web3forms.com/submit`
- **Método:** POST
- **Content-Type:** multipart/form-data
- **Rate Limit:** 1000 envíos/mes (plan gratis)

### Campos del Formulario
| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `access_key` | hidden | ✅ | API Key Web3Forms |
| `subject` | hidden | ✅ | Asunto del email |
| `from_name` | hidden | ✅ | Email destino |
| `name` | text | ✅ | Nombre completo |
| `email` | email | ✅ | Email del remitente |
| `phone` | tel | ❌ | Teléfono |
| `company` | text | ❌ | Empresa |
| `message` | textarea | ✅ | Mensaje |
| `privacy` | checkbox | ✅ | Aceptación política |
| `botcheck` | checkbox | ❌ | Honeypot anti-spam |

### Seguridad
- ✅ Validación cliente (HTML5 + JS)
- ✅ Honeypot field anti-bots
- ✅ HTTPS obligatorio
- ✅ Sin exposición de API key en frontend (va en config)

---

## 📧 Flujo de Email

```
Usuario envía formulario
       ↓
Web3Forms API recibe datos
       ↓
Procesa y formatea email
       ↓
Envía a destinatario configurado
       ↓
[c@kinto.co] ← Testing
[soporte@andessolarhash.com] ← Producción
```

---

## ✅ Checklist de Implementación

### Pre-Implementación
- [ ] Tener cuenta Web3Forms creada
- [ ] Tener API Key de Web3Forms
- [ ] Skill forms-web3forms instalada

### Implementación
- [ ] Configurar site.config.ts con API key
- [ ] Actualizar página contacto/index.astro
- [ ] Personalizar estilos si es necesario
- [ ] Build local exitoso

### Testing
- [ ] Formulario visualmente correcto
- [ ] Validaciones funcionan
- [ ] Email llega a c@kinto.co
- [ ] Contenido del email es correcto
- [ ] Mensajes de éxito/error funcionan

### Producción
- [ ] Cambiar email a soporte@andessolarhash.com
- [ ] Configurar dominio en Web3Forms
- [ ] Build de producción
- [ ] Deploy
- [ ] Test final en producción

---

## 🆘 Troubleshooting

### Problema: "Modo Demo" aparece siempre
**Causa:** API key no configurada
**Solución:** Verificar `forms.web3formsKey` en site.config.ts

### Problema: Emails no llegan
**Causas posibles:**
1. API key incorrecta
2. Email destino en spam
3. Dominio no autorizado en Web3Forms

**Soluciones:**
1. Verificar key en dashboard de Web3Forms
2. Revisar carpeta spam
3. Añadir dominio en configuración Web3Forms

### Problema: Error al enviar
**Causa:** Problema de CORS o red
**Solución:** Verificar que sitio esté en HTTPS

---

## 📊 Métricas a Monitorear

- Tasa de envío exitoso
- Tiempo promedio de respuesta
- Tasa de conversión (visitas → contactos)
- Emails en spam vs inbox

---

## 📝 Notas

- Web3Forms plan gratis: 1000 envíos/mes
- No requiere backend propio
- Funciona 100% en sitios estáticos
- Emails enviados desde servidores de Web3Forms
- API key debe mantenerse privada

---

*Plan creado: Marzo 2026*
*Skill: forms-web3forms v1.0.0*
