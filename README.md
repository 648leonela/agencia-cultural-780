# Siete Ochenta · Agencia Cultural 7-80

Sitio web de la **Corporación Agencia Cultural 7-80**, organización que impulsa procesos de
arte, cultura y comunicación comunitaria con niñas, niños, adolescentes, jóvenes, familias y
comunidades de Barranquilla y su área metropolitana.

Es un sitio estático: HTML, CSS y JavaScript, sin dependencias ni proceso de compilación.

## Páginas

| Archivo | Contenido |
|---|---|
| `index.html` | Inicio: presentación, Quiénes somos, Lo que hacemos, Programas, Participación, Testimonios y Contacto |
| `nuestra-historia.html` | Historia de las iniciativas Casa Tricolor y Refugios Culturales |
| `casa-tricolor.html` | Programa Casa Tricolor: Escuelita Comunitaria de Arte y Cultura |
| `refugios-culturales.html` | Programa Refugios Culturales |
| `arte-cultura-proteccion.html` | Programa Arte, Cultura y Protección: por una niñez y juventud libre de violencia |

Las tres páginas de programas incluyen una **Galería de Fotos** con enlace al álbum completo
en Flickr. Casa Tricolor y Refugios Culturales tienen además un video de YouTube que se carga
solo cuando la persona le da clic.

## Estructura del proyecto

```
├── index.html, nuestra-historia.html, ...   Páginas del sitio
├── css/style.css                            Todos los estilos
├── js/main.js                               Menú, contadores, formulario, videos, etc.
├── img/                                     Imágenes para computador
│   ├── galeria/                             Fotos de las galerías de cada programa
│   └── movil/                               Versiones para celular (ver abajo)
├── google-apps-script/                      Script que guarda los mensajes del formulario
├── PENDIENTES.md                            Lista de tareas por hacer
└── README.md
```

## Ver el sitio en el computador

Abre `index.html` con doble clic en el navegador.

Los videos de YouTube pueden mostrar un error al abrir las páginas así. Para probarlos,
usa un servidor local, por ejemplo la extensión **Live Server** de Visual Studio Code
(clic derecho en `index.html` > *Open with Live Server*). En el sitio publicado se
reproducen normalmente.

## Imágenes: versión para computador y para celular

Para que el sitio cargue rápido en el celular, cada foto tiene dos versiones en formato WebP:

- `img/...`: versión para computador, reducida al tamaño en que se muestra.
- `img/movil/...`: versión más liviana para celular, con el mismo nombre y la misma
  estructura de carpetas.
- `img/movil/portadas/`: fondos de los encabezados recortados en vertical para celular.

En pantallas de **768 px o menos** el navegador descarga solo la versión de celular.

**Al agregar una foto nueva:**

1. Guarda la versión para computador en `img/` (máximo unos 1000 px de ancho para fotos de
   galería y 1600 px para fondos de encabezado).
2. Guarda la versión para celular en `img/movil/`, con la misma ruta y nombre (unos 600 px de ancho).
3. En el HTML, envuélvela en `<picture>` como las demás:

   ```html
   <picture>
     <source media="(max-width: 768px)" srcset="img/movil/galeria/ejemplo.webp" type="image/webp" />
     <img src="img/galeria/ejemplo.webp" alt="Descripción de la foto" loading="lazy" />
   </picture>
   ```

4. Si es un fondo de encabezado, agrégalo en `css/style.css` y también en el bloque
   **"IMÁGENES PARA CELULAR"** con su versión de `img/movil/portadas/`.

`img/logo.png` es el archivo original del logo; el sitio usa `img/logo.webp`.

## Formulario de contacto

Los mensajes del formulario se guardan en una hoja de Google Sheets mediante Google Apps Script.
La URL ya está configurada en `js/main.js` (`GOOGLE_SHEET_URL`). Para crear o cambiar la hoja,
sigue la guía de [google-apps-script/LEEME.md](google-apps-script/LEEME.md).

## Al modificar estilos o JavaScript

Las páginas cargan `css/style.css?v=2.1` y `js/main.js?v=2.1`. Después de cambios importantes,
sube el número de versión (por ejemplo a `v=2.2`) en las 5 páginas, para que los navegadores
de los visitantes no sigan usando la copia anterior.

## Pendientes

Lo que falta por hacer o confirmar (datos de contacto, enlaces, textos y fotos) está en
[PENDIENTES.md](PENDIENTES.md).
