/**
 * Wedding RSVP backend — Google Apps Script Web App.
 *
 * Receives the RSVP form submissions from the static site and appends one
 * row per answer to the bound Google Sheet.
 *
 * Deployment instructions: see README.md next to this file.
 */

/** Name of the sheet (tab) receiving the answers. Created automatically. */
var SHEET_NAME = 'RSVP';

/** Optional: e-mail address notified on every new answer. Leave empty to disable. */
var NOTIFICATION_EMAIL = '';

/** Column headers, written once when the sheet is empty. */
var HEADERS = [
  'Horodatage',
  'Nom',
  'E-mail',
  'Téléphone',
  'Présence',
  'Nombre de personnes',
  'Régime / allergies',
  'Message',
];

/**
 * Health check, useful to confirm the Web App is reachable from a browser.
 */
function doGet() {
  return buildJsonResponse({ status: 'ok', message: 'RSVP endpoint ready' });
}

/**
 * Main entry point: stores one RSVP answer.
 */
function doPost(request) {
  try {
    var payload = parsePayload(request);

    // Honeypot: real guests never fill this hidden field, bots usually do.
    // Answer with a success so the bot does not retry, but store nothing.
    if (payload.website) {
      return buildJsonResponse({ status: 'ok' });
    }

    var fullName = trimToString(payload.fullName);
    var attending = trimToString(payload.attending);

    if (!fullName || (attending !== 'oui' && attending !== 'non')) {
      return buildJsonResponse({ status: 'error', message: 'Champs obligatoires manquants' });
    }

    var row = [
      new Date(),
      fullName,
      trimToString(payload.email),
      trimToString(payload.phone),
      attending === 'oui' ? 'Présent(e)' : 'Absent(e)',
      attending === 'oui' ? toGuestCount(payload.guestCount) : 0,
      trimToString(payload.dietary),
      trimToString(payload.message),
    ];

    appendRow(row);
    sendNotification(row);

    return buildJsonResponse({ status: 'ok' });
  } catch (error) {
    console.error(error);
    return buildJsonResponse({ status: 'error', message: String(error) });
  }
}

/**
 * Appends a row while holding a script lock, so two simultaneous
 * submissions can never overwrite each other.
 */
function appendRow(row) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var sheet = getSheet();
    sheet.appendRow(row);
  } finally {
    lock.releaseLock();
  }
}

function getSheet() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }

  return sheet;
}

/**
 * Accepts both a JSON body (sent as text/plain to avoid a CORS preflight)
 * and a classic form-encoded body.
 */
function parsePayload(request) {
  if (request && request.postData && request.postData.contents) {
    try {
      return JSON.parse(request.postData.contents);
    } catch (error) {
      // Not JSON: fall through to the form parameters below.
    }
  }

  return (request && request.parameter) || {};
}

function sendNotification(row) {
  if (!NOTIFICATION_EMAIL) return;

  var body =
    'Nouvelle réponse au mariage :\n\n' +
    'Nom : ' + row[1] + '\n' +
    'E-mail : ' + row[2] + '\n' +
    'Téléphone : ' + row[3] + '\n' +
    'Présence : ' + row[4] + '\n' +
    'Nombre de personnes : ' + row[5] + '\n' +
    'Régime / allergies : ' + row[6] + '\n' +
    'Message : ' + row[7] + '\n';

  MailApp.sendEmail(NOTIFICATION_EMAIL, 'RSVP — ' + row[1], body);
}

function toGuestCount(value) {
  var count = parseInt(value, 10);
  if (isNaN(count) || count < 1) return 1;
  return Math.min(count, 20);
}

function trimToString(value) {
  if (value === null || value === undefined) return '';
  return String(value).trim().slice(0, 2000);
}

function buildJsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
