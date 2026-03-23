# 📧 Implementación Formulario de Contacto - Web3Forms

> Formulario de contacto funcional implementado con Web3Forms para Andes Solar Hash

---

## ✅ Estado Actual

**Fase:** Testing (Configurado para `c@kinto.co`)

---

## 📋 Archivos Modificados

```
sites/andessolarhash/
├── config/
│   └── site.config.ts              # ➕ Añadida configuración forms.web3formsKey
└── src/
    └── pages/
        └── contacto/
            └── index.astro         # 📝 Formulario actualizado con manejo JS
```

---

## 🔧 Configuración Actual

### Email Destino (Testing)
```typescript
// config/site.config.ts
site: {
  contactEmail: 'c@kinto.co',  // ← Fase Testing
}
```

### Web3Forms API Key
```typescript
// config/site.config.ts
forms: {
  web3formsKey: ''  // ← Dejar vacío para modo demo, o añadir API key real
}
```

---

## 🚀 Pasos para Activar Formulario Funcional

### Paso 1: Obtener API Key de Web3Forms

1. Ir a https://web3forms.com/
2. Crear cuenta gratuita (solo necesitas un email)
3. Verificar email
4. Copiar tu **Access Key**

### Paso 2: Configurar API Key

Editar `sites/andessolarhash/config/site.config.ts`:

```typescript
forms: {
  web3formsKey: 'TU-API-KEY-AQUI'  // ← Pegar key aquí
}
```

### Paso 3: Testing (Ya Configurado)

El formulario está configurado para enviar a: **c@kinto.co**

```typescript
site: {
  contactEmail: 'c@kinto.co'
}
```

### Paso 4: Verificar Funcionamiento

```bash
cd sites/andessolarhash
npm run build
npm run preview
```

1. Abrir http://localhost:4321/contacto
2. Llenar y enviar formulario de prueba
3. Verificar llegada de email a c@kinto.co

---

## 🔄 Cambio a Producción

Cuando quieras cambiar el email destino a producción:

### 1. Actualizar Email en Config

```typescript
// config/site.config.ts
site: {
  contactEmail: 'soporte@andessolarhash.com',  // ← Cambiar a producción
}
```

### 2. Verificar Dominio en Web3Forms

En el dashboard de Web3Forms:
1. Añadir dominio: `andessolarhash.com`
2. Verificar propiedad (si es requerido)

### 3. Rebuild y Deploy

```bash
npm run build
# Deploy a producción
```

---

## 📊 Características del Formulario

### Campos Incluidos
| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| Nombre | text | ✅ | Nombre completo |
| Email | email | ✅ | Email de contacto |
| Teléfono | tel | ❌ | Teléfono opcional |
| Asunto | select | ✅ | Tipo de consulta |
| Mensaje | textarea | ✅ | Mensaje detallado |
| Privacidad | checkbox | ✅ | Aceptación política |

### Tipos de Asunto Disponibles
- Consulta general
- Ventas
- Hosting
- Soporte técnico

### Seguridad
- ✅ Honeypot anti-bots (campo oculto)
- ✅ Validación HTML5
- ✅ Validación JavaScript
- ✅ HTTPS obligatorio

---

## 📧 Contenido del Email Enviado

El email incluye:
- Nombre del remitente
- Email de contacto
- Teléfono (si se proporcionó)
- Asunto seleccionado
- Mensaje completo
- Fecha/hora de envío

---

## 🎨 Estados del Formulario

### Modo Demo (Sin API Key)
- Muestra banner amarillo de advertencia
- Simula envío exitoso
- No envía emails reales
- Para desarrollo y pruebas visuales

### Modo Activo (Con API Key)
- Envía emails reales vía Web3Forms
- Muestra mensaje de éxito/erro
- Resetea formulario después de envío

---

## 🆘 Troubleshooting

### "Modo Demo" sigue apareciendo
**Causa:** API key no configurada o inválida
```typescript
// Verificar que la key tenga más de 10 caracteres
web3formsKey: '12345678901'  // Mínimo 10 chars
```

### Emails no llegan
**Checklist:**
1. ¿API key es correcta? (Verificar en dashboard Web3Forms)
2. ¿Email destino está bien escrito?
3. ¿Dominio está autorizado en Web3Forms? (para producción)
4. ¿Emails están en carpeta spam?

### Error al enviar
**Causas:**
- Problema de red
- CORS bloqueado
- Web3Forms API caída

**Solución:** Intentar nuevamente o contactar soporte Web3Forms.

---

## 📈 Límites y Consideraciones

### Plan Gratuito Web3Forms
- 1,000 envíos/mes
- Sin branding
- Soporte básico

### Si se excede el límite
- Considerar plan Pro ($5/mes)
- O implementar backend propio

---

## 🔒 Seguridad

- API key nunca se expone al cliente (solo se usa en build)
- Formulario usa HTTPS
- Validación en múltiples capas
- Protección contra bots

---

## ✨ Personalización Futura

### Cambiar Campos
Editar archivo: `src/pages/contacto/index.astro`

### Cambiar Estilos
Los estilos están en la sección `<style>` del mismo archivo.

### Añadir Nuevos Asuntos
```astro
<select id="subject_type" name="subject_type" required class="form-select">
  <option value="" disabled selected>Selecciona un asunto</option>
  <option value="Consulta general">Consulta general</option>
  <option value="Ventas">Ventas</option>
  <option value="Hosting">Hosting</option>
  <option value="Soporte técnico">Soporte técnico</option>
  <!-- Añadir más opciones aquí -->
  <option value="Nuevo asunto">Nuevo asunto</option>
</select>
```

---

## ✅ Checklist de Activación

- [ ] Crear cuenta en Web3Forms
- [ ] Obtener API Key
- [ ] Configurar API Key en `site.config.ts`
- [ ] Verificar modo demo desaparece
- [ ] Enviar formulario de prueba
- [ ] Verificar email llega a c@kinto.co
- [ ] (Opcional) Cambiar a soporte@andessolarhash.com
- [ ] (Opcional) Configurar dominio en Web3Forms
- [ ] Build de producción
- [ ] Deploy

---

## 📞 Soporte

- Web3Forms: https://web3forms.com/
- Documentación: https://docs.web3forms.com/

---

*Implementado: Marzo 2026*
*Versión: 1.0.0*
