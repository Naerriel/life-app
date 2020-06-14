function createSkills() {
  const Spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const skillsSheet = Spreadsheet.getSheetByName('Skills');

  const response = UrlFetchApp.fetch(
    'https://drive.google.com/file/d/1CfVTlI3nmf852SESrd1o7vIMV2NAxXix/view?usp=sharing');
  const binaryData = response.getContent();

  // Insert the image in cell A1.
  const blob = Utilities.newBlob(binaryData, 'image/png', 'MyImageName');
  sheet.insertImage(blob, 1, 1);
}
