# 📧 Netlify Forms - Guía de Configuración

> Formulario de contacto configurado para funcionar con Netlify Forms

---

## ✅ Estado Actual

El formulario está **listo para funcionar** con Netlify Forms. Solo necesitas habilitar la detección de formularios en el panel de Netlify.

---

## 🚀 Pasos para Activar (Después del Deploy)

### 1. Deploy el Sitio en Netlify

Asegúrate de que el sitio esté deployado y accesible en tu dominio de Netlify.

### 2. Habilitar Detección de Formularios

1. Ve al panel de administración de Netlify: https://app.netlify.com/
2. Selecciona tu sitio
3. Ve a la pestaña **"Forms"** (o **"Formularios"**)
4. Haz clic en **"Enable form detection"** (Habilitar detección de formularios)
5. Redeploy el sitio si es necesario

### 3. Verificar Funcionamiento

1. Ve a la página `/contacto`
2. Llena y envía el formulario de prueba
3. Revisa que el mensaje llegue al panel de Forms en Netlify

---

## 📋 Configuración del Formulario

### HTML Generado (Automático)

```html
<form 
  name="contacto" 
  method="POST" 
  action="/gracias/"
  data-netlify="true"
  netlify-honeypot="bot-field"
>
  <input type="hidden" name="form-name" value="contacto" />
  
  <!-- Honeypot anti-spam -->
  <p class="hidden" style="display: none;">
    <label>No llenes este campo si eres humano: <input name="bot-field" /></label>
  </p>
  
  <!-- Campos del formulario -->
  <input type="text" name="name" required />
  <input type="email" name="email" required />
  <input type="tel" name="phone" />
  <select name="asunto" required>
    <option value="Consulta general">Consulta general</option>
    <option value="Ventas">Ventas</option>
    <option value="Hosting">Hosting</option>
    <option value="Soporte técnico">Soporte técnico</option>
  </select>
  <textarea name="message" required></textarea>
  <input type="checkbox" name="privacy" required />
  
  <button type="submit">Enviar Mensaje</button>
</form>
```

---

## 🎯 Características Implementadas

### ✅ Funcionalidades

| Característica | Estado | Descripción |
|----------------|--------|-------------|
| `data-netlify="true"` | ✅ | Atributo para detección automática |
| `netlify-honeypot` | ✅ | Protección anti-spam con honeypot |
| `form-name` | ✅ | Nombre único del formulario: "contacto" |
| AJAX Submission | ✅ | Envío asíncrono con mensaje de éxito |
| Success Page | ✅ | Redirección a `/gracias/` |
| Validación | ✅ | Validación HTML5 y JavaScript |

### 📧 Campos del Formulario

| Campo | Tipo | Requerido | Enviado a Netlify como |
|-------|------|-----------|----------------------|
| Nombre | text | ✅ | `name` |
| Email | email | ✅ | `email` |
| Teléfono | tel | ❌ | `phone` |
| Asunto | select | ✅ | `asunto` |
| Mensaje | textarea | ✅ | `message` |
| Privacidad | checkbox | ✅ | `privacy` |
| Honeypot | hidden | ❌ | `bot-field` |

---

## 📊 Panel de Netlify Forms

### Acceder a los Envíos

1. Ve a https://app.netlify.com/
2. Selecciona tu sitio
3. Ve a **"Forms"** en el menú lateral
4. Haz clic en el formulario **"contacto"**
5. Verás todos los envíos con:
   - Fecha y hora
   - Datos del remitente
   - Contenido del mensaje

### Configurar Notificaciones por Email

1. En el panel de Forms, haz clic en **"Add notification"**
2. Selecciona **"Email notification"**
3. Configura:
   - **Email to**: `soporte@andessolarhash.com`
   - **From**: `noreply@netlify.com` (o custom domain)
   - **Subject**: `Nuevo mensaje desde AndesSolarHash.com`

### Exportar Datos

Puedes exportar todos los envíos como:
- CSV
- JSON

---

## 🛡️ Seguridad

### Honeypot Anti-Spam

El formulario incluye un campo oculto (`bot-field`) que los humanos no ven pero los bots suelen llenar. Netlify filtra automáticamente estos envíos como spam.

### Validación

- **HTML5**: Campos `required`, `type="email"`, etc.
- **JavaScript**: Validación antes del envío AJAX
- **Netlify**: Verificación de honeypot y rate limiting

---

## 🔧 Personalización

### Cambiar Email de Notificaciones

1. Ve a **Site settings > Forms > Form notifications**
2. Edita o añade notificaciones de email
3. Cambia el destinatario

### Añadir reCAPTCHA (Opcional)

Si necesitas más protección contra spam:

1. Ve a **Site settings > Forms > Spam filters**
2. Habilita **reCAPTCHA 2**
3. Añade las claves de Google reCAPTCHA

### Webhooks (Avanzado)

Para integraciones con Slack, CRM, etc.:

1. Ve a **Forms > Notifications > Add notification**
2. Selecciona **Outgoing webhook**
3. Configura la URL de destino

---

## 🆘 Troubleshooting

### Formulario no aparece en el panel

**Causa**: Netlify no detectó el formulario

**Solución**:
1. Verifica que `data-netlify="true"` esté en el HTML
2. Asegúrate de que el formulario esté en el HTML estático (no renderizado solo con JS)
3. Redeploy el sitio
4. Verifica en el panel de Forms que esté habilitada la detección

### Emails no llegan

**Checklist**:
1. ¿La notificación está configurada en el panel?
2. ¿El email destino está correcto?
3. ¿Los emails están en la carpeta de spam?
4. ¿El dominio tiene SPF/DKIM configurado?

### Error al enviar

1. Abre las herramientas de desarrollador (F12)
2. Ve a la pestaña "Network"
3. Intenta enviar el formulario
4. Verifica la respuesta del servidor

---

## 📈 Límites del Plan

| Característica | Límite |
|----------------|--------|
| Envíos/mes | 100 (Starter) / Ilimitado (Pro) |
| Tamaño máximo | 8MB por envío |
| Archivos adjuntos | Sí (hasta 8MB) |
| Retención de datos | Ilimitada |

---

## 🔗 Enlaces Útiles

- **Documentación Netlify Forms**: https://docs.netlify.com/manage/forms/
- **Panel de Netlify**: https://app.netlify.com/
- **Spam Filters**: https://docs.netlify.com/manage/forms/spam-filters/
- **Form Notifications**: https://docs.netlify.com/manage/forms/notifications/

---

## ✅ Checklist Post-Deploy

- [ ] Sitio deployado en Netlify
- [ ] Detección de formularios habilitada
- [ ] Formulario aparece en el panel de Forms
- [ ] Envío de prueba exitoso
- [ ] Notificaciones por email configuradas
- [ ] Email `soporte@andessolarhash.com` recibe notificaciones
- [ ] Página `/gracias/` funciona correctamente

---

**¡Listo! Una vez completes estos pasos, el formulario estará completamente funcional.** 🎉
