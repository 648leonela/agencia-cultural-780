# Pendientes del sitio web Siete Ochenta

Lista de lo que falta por hacer o confirmar. Al completar un punto, márcalo con `[x]`.

## Datos que hay que confirmar o reemplazar

- [ ] **Teléfono de contacto.** En la sección Contacto del inicio (`index.html`) aparece
  "+1 (800) 456-7890 / +54 9 11 2345-6789", que parece un número de ejemplo de la plantilla.
  Reemplazarlo por el teléfono real de la Agencia.
- [ ] **Enlace de Facebook.** En el pie de página de las 5 páginas, los botones de Facebook
  llevan a Instagram (`https://www.instagram.com/acsieteochenta/`). Poner el enlace real de Facebook.
- [ ] **Descripción para Google del inicio.** La etiqueta `<meta name="description">` de
  `index.html` habla de "salud integral y bienestar", que no corresponde a la Agencia.
  Escribir una descripción sobre arte, cultura y comunidad.
- [ ] **Enlaces de Transparencia.** En el pie de página, "Estatutos", "Informes de gestión",
  "Estados financieros", "Política de salvaguarda", "Política PEAS" y "Tratamiento de datos
  personales" tienen `href="#"` y no llevan a ningún lado. Subir los documentos y enlazarlos.
- [ ] **Logos de aliados de Refugios Culturales.** `refugios-culturales.html` busca 8 logos en
  `img/aliados/` que no existen (la página los oculta, pero el navegador los pide igual).
  Subir los logos con esos nombres o quitar las imágenes del código.
- [ ] **Frases nuevas de "Nuestra historia".** Revisar y aprobar los textos emotivos que se
  agregaron: "Una historia escrita a muchas manos", el manifiesto ("Detrás de cada cifra…"),
  la frase sobre la foto ("Cada dibujo, cada canción…") y el agradecimiento final.

## Contenido por completar

- [ ] **Arte, Cultura y Protección en "Nuestra historia".** La página `nuestra-historia.html`
  solo cuenta Casa Tricolor y Refugios Culturales. Falta el texto de esta iniciativa.
- [ ] **Video para Arte, Cultura y Protección.** Las galerías de Casa Tricolor y Refugios tienen
  video de YouTube; la de Arte, Cultura y Protección todavía no.
- [ ] **Foto para la tarjeta de Casa Tricolor en el inicio.** Las tarjetas de los otros dos
  programas tienen foto; la de Casa Tricolor sigue con fondo azul e ícono.
- [ ] **Texto repetido en Casa Tricolor.** La etiqueta del encabezado ("Formación artística e
  integración comunitaria") y el subtítulo ("Infancias, formación artística e integración
  comunitaria") dicen casi lo mismo. Cambiar uno de los dos.

## Fotos con baja resolución

- [ ] **Encabezado de Refugios Culturales** (`img/refugios-baile-barrio.webp`): la foto original
  mide solo 556 px de ancho y se ve algo borrosa en pantallas grandes. Conseguir la foto en
  tamaño original.
- [ ] **Tarjeta de Arte, Cultura y Protección** (`img/proteccion-fotografia.webp`): la original
  mide 622 px. Funciona bien en la tarjeta, pero conviene tener una versión más grande.

## Revisiones después de publicar

- [ ] **Probar los videos de YouTube con el sitio publicado.** Al abrir las páginas con doble
  clic desde el computador, YouTube puede mostrar un error; publicado en internet debería
  reproducirse bien.
- [ ] **Medir la velocidad en un celular real** (por ejemplo con PageSpeed Insights) una vez
  publicado el sitio.
- [ ] **Cambiar la versión de estilos al hacer cambios grandes.** Las páginas cargan
  `css/style.css?v=2.1` y `js/main.js?v=2.1`. Al modificar esos archivos, subir el número
  (por ejemplo `v=2.2`) en las 5 páginas para que los visitantes no vean la versión guardada.

## Cómo están organizadas las imágenes

- `img/`: versiones para computador.
- `img/movil/`: versiones para celular (hasta 768 px de ancho), con la misma estructura de carpetas.
- `img/movil/portadas/`: fondos de encabezado recortados en vertical para celular.
- Al agregar una foto nueva, crear también su versión en `img/movil/` con el mismo nombre
  y envolverla en `<picture>` como las demás. Los fondos de encabezado se cambian en
  `css/style.css`, en el bloque "IMÁGENES PARA CELULAR".
- `img/logo.png` es el archivo original del logo; el sitio usa `img/logo.webp`.
