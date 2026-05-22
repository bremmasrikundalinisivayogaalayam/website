// ====== EDIT THESE TWO LINES ======
const SHEET_ID  = "PASTE_YOUR_SHEET_ID_HERE";
const FOLDER_ID = "182-MS3Cf6zi9uD4jQnO2btQsJKy1itZ-";
// ==================================

// Auto-fallback folder name if FOLDER_ID fails
const FALLBACK_FOLDER_NAME = "18 Siddhas Conference Receipts";


function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // ---- 1. Find or create the receipts folder ----
    let folder;
    try {
      folder = DriveApp.getFolderById(FOLDER_ID);
    } catch (folderErr) {
      const existing = DriveApp.getFoldersByName(FALLBACK_FOLDER_NAME);
      folder = existing.hasNext() ? existing.next() : DriveApp.createFolder(FALLBACK_FOLDER_NAME);
    }

    // ---- 2. Use the member ID from client, or generate server-side ----
    const memberId = data.memberId || generateMemberId(data.type === 'book_order' ? 'SSRM-ORD' : 'SSRM');

    // ---- 3. Save the receipt to Drive ----
    const decoded = Utilities.base64Decode(data.receiptData);
    const safeName = (data.name || "unknown").replace(/[^a-zA-Z0-9_\- ]/g, "");
    const filename = memberId + " - " + safeName + " - " + data.receiptName;
    const blob = Utilities.newBlob(decoded, data.receiptType, filename);
    const file = folder.createFile(blob);
    try {
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    } catch (shareErr) {
      Logger.log("Share warning: " + shareErr);
    }
    const receiptUrl = file.getUrl();

    // ---- 4. Pick the right sheet tab ----
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    let sheet;
    if (data.type === 'book_order') {
      sheet = spreadsheet.getSheetByName('Book Orders');
      if (!sheet) {
        sheet = spreadsheet.insertSheet('Book Orders');
        sheet.appendRow(['Timestamp', 'Order ID', 'Name', 'Contact', 'Email', 'Address', 'Amount', 'Order Details', 'Receipt Link', 'Language']);
      }
      sheet.appendRow([
        new Date(), memberId, data.name, data.contact, data.email,
        data.address, data.amount, data.orderDetails || '', receiptUrl, data.language
      ]);
    } else {
      sheet = spreadsheet.getSheetByName('Registrations') || spreadsheet.getSheets()[0];
      if (sheet.getLastRow() === 0) {
        sheet.appendRow(['Timestamp', 'Member ID', 'Name', 'Contact', 'Country', 'Email', 'Address', 'Amount', 'Receipt Link', 'Language']);
      }
      sheet.appendRow([
        new Date(), memberId, data.name, data.contact, data.country || '',
        data.email, data.address, data.amount, receiptUrl, data.language
      ]);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, memberId: memberId, receiptUrl: receiptUrl }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}


// Generate a member ID (format: SSRM-YYYYMMDD-XXXX)
function generateMemberId(prefix) {
  prefix = prefix || 'SSRM';
  const now = new Date();
  const date = Utilities.formatDate(now, Session.getScriptTimeZone() || 'Asia/Kuala_Lumpur', 'yyyyMMdd');
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let rand = '';
  for (let i = 0; i < 4; i++) rand += chars.charAt(Math.floor(Math.random() * chars.length));
  return prefix + '-' + date + '-' + rand;
}


function doGet() {
  return ContentService.createTextOutput("Bremma Sri Kundalini Sivayoga Aalayam — endpoint is live.");
}


// Run from Apps Script editor to test setup
function testSetup() {
  Logger.log("FOLDER_ID = [" + FOLDER_ID + "]");
  Logger.log("SHEET_ID  = [" + SHEET_ID + "]");
  try {
    Logger.log("✓ Folder OK: " + DriveApp.getFolderById(FOLDER_ID).getName());
  } catch (e) { Logger.log("✗ Folder failed: " + e); }
  try {
    Logger.log("✓ Sheet OK: " + SpreadsheetApp.openById(SHEET_ID).getName());
  } catch (e) { Logger.log("✗ Sheet failed: " + e); }
  Logger.log("Sample member ID: " + generateMemberId('SSRM'));
  Logger.log("Sample order ID:  " + generateMemberId('SSRM-ORD'));
}
