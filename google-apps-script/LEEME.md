# Conectar el formulario de contacto a Google Sheets

Cada mensaje enviado desde la web se guarda como una fila nueva en una hoja de cálculo.
La hoja se puede descargar como Excel en cualquier momento (**Archivo > Descargar > Microsoft Excel (.xlsx)**).

## 1. Crear la hoja
1. Entra a <https://sheets.google.com> con la cuenta de la Agencia y crea una hoja en blanco.
2. Ponle un nombre, por ejemplo **"Contactos Web Siete Ochenta"**.

## 2. Pegar el script
1. En la hoja: **Extensiones > Apps Script**.
2. Borra lo que aparece y pega todo el contenido de `Codigo.gs`.
3. Guarda (icono de disquete).

## 3. Publicarlo como aplicación web
1. Botón **Implementar > Nueva implementación**.
2. En el engranaje elige el tipo **Aplicación web**.
3. Configura:
   - **Ejecutar como:** Yo
   - **Quién tiene acceso:** Cualquier persona
4. **Implementar** y autoriza los permisos (si aparece "Google no ha verificado esta app": *Configuración avanzada > Ir a … (no seguro)*; es tu propio script).
5. Copia la **URL de la aplicación web** (termina en `/exec`).

## 4. Pegar la URL en la web
En `js/main.js`, reemplaza:

```js
const GOOGLE_SHEET_URL = 'PEGA_AQUI_LA_URL_DE_TU_APPS_SCRIPT';
```

por la URL copiada. Envía un mensaje de prueba desde la web: debe aparecer una fila en la pestaña **Contactos**.

## Si cambias el script después
Usa **Implementar > Gestionar implementaciones > Editar (lápiz) > Versión: Nueva versión**. Así la URL sigue siendo la misma.

## Opcional: aviso por correo
Para recibir un email con cada mensaje, agrega dentro de `doPost`, después de `sheet.appendRow(...)`:

```js
MailApp.sendEmail('contacto@acsieteochenta.com', 'Nuevo mensaje web: ' + p.motivo,
  p.nombre + ' (' + p.correo + ')\n\n' + p.mensaje);
```
