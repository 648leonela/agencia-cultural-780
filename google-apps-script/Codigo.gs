/**
 * Recibe los mensajes del formulario de contacto de la web Siete Ochenta
 * y los guarda como filas en la hoja "Contactos" de este Google Sheets.
 *
 * Se pega en: Extensiones > Apps Script (desde la hoja de cálculo).
 */

const SHEET_NAME = 'Contactos';
const HEADERS = ['Fecha', 'Nombre', 'Correo', 'Organización', 'Motivo', 'Mensaje'];
const MAX_LENGTH = 5000;

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000); // evita que dos envíos simultáneos se pisen

  try {
    const p = (e && e.parameter) || {};

    // Campo trampa: si viene lleno, es un bot. Respondemos "ok" sin guardar.
    if (p.website) return json({ result: 'success' });

    if (!p.nombre || !p.correo || !p.mensaje) {
      return json({ result: 'error', error: 'Faltan campos obligatorios' });
    }

    const sheet = getSheet();
    sheet.appendRow([
      new Date(),
      clean(p.nombre),
      clean(p.correo),
      clean(p.organizacion),
      clean(p.motivo),
      clean(p.mensaje)
    ]);

    return json({ result: 'success' });
  } catch (err) {
    return json({ result: 'error', error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

/** Recorta el texto y evita que se interprete como fórmula (=, +, -, @). */
function clean(value) {
  let text = String(value || '').trim().slice(0, MAX_LENGTH);
  if (/^[=+\-@]/.test(text)) text = "'" + text;
  return text;
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
