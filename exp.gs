const expReason = {
  TimeSpent: 'Time spent',
};

function nextCell(row, column, lastColumn) {
  if (column === lastColumn) {
    return [row + 2, 3];
  }
  return [row, column + 1];
}

const firstFreeColumn = {};

function addExpToSheet({ exp, skillName, sheet, reason, date }) {
  const paddingTop = 5;
  const skillPaddingTop = 1;
  const rowsPerSkill = 4;
  const skillPosition = skillsConsts[skillName].position * rowsPerSkill + paddingTop + skillPaddingTop;

  let freeColumn = firstFreeColumn[skillName];
  if (!freeColumn) {
    for (let i = 0; i < sheet[skillPosition].length; i++) {
      if (!sheet[skillPosition][i]) {
        freeColumn = i;
        break;
      }
    }
  }
  firstFreeColumn[skillName] = freeColumn + 1;

  sheet[skillPosition][freeColumn] = exp;
  sheet[skillPosition + 1][freeColumn] = date;
  sheet[skillPosition + 2][freeColumn] = reason;
}

function setValues({ expSheet, expSheetValues, maxRows, maxColumns }) {
  const columnsNeeded = expSheetValues.reduce((acc, val) => Math.max(acc, val.length), 0);
  let columnsToAdd = 0;
  if (columnsNeeded > maxColumns) {
    columnsToAdd = columnsNeeded - maxColumns + 10;
    expSheet.insertColumns(maxColumns, columnsToAdd);
  }
  const range = expSheet.getRange(1, 1, maxRows, maxColumns + columnsToAdd);

  expSheetValues.forEach(row => {
    while(row.length < maxColumns + columnsToAdd) {
      row.push('');
    }
  });
  range.setValues(expSheetValues);
}

function getDateFromCell({ row, column }) {
  const startingDate = '2020-06-12';
  let date = new Date(startingDate);

  const daysToAdd = Math.floor(row / 2) - 1;
  date = new Date(date.valueOf() + 1000 * 60 * 60 * 24 * daysToAdd);

  const halfHours = (column - 3);
  const hours = Math.floor(halfHours / 2);
  const minutes = (halfHours % 2) * 30;
  date.setHours(hours, minutes);
  return date.toLocaleString();
}

function mergeMatrices(smallerMatrix, biggerMatrix) {
  for (let row = 0; row < smallerMatrix.length; row++) {
    for (let col = 0; col < smallerMatrix[row].length; col++) {
      if (smallerMatrix[row][col]) {
        biggerMatrix[row][col] = smallerMatrix[row][col];
      }
    }
  }
}

function updateExp() {
  // Fetch data
  const Spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const expSheet = Spreadsheet.getSheetByName('Exp');
  const timeSheet = Spreadsheet.getSheetByName('Time');
  const timeSheetLastColumn = timeSheet.getLastColumn();
  const maxRows = expSheet.getMaxRows();
  const maxColumns = expSheet.getMaxColumns();
  const range = expSheet.getRange(1, 1, maxRows, maxColumns);
  const expSheetValues = range.getValues();
  const formulas = range.getFormulas();

  const lastSyncedCellRow = 0;
  const lastSyncedCellCol = 2;
  const timeSheetSignificantColumn = 3;


  let [row, column] = expSheetValues[lastSyncedCellRow][lastSyncedCellCol].split(',').map(val => parseInt(val, 10));
  const startingRow = row;

  const timeSheetValues = timeSheet.getRange(row, timeSheetSignificantColumn, row + 1, timeSheetLastColumn).getValues();

  column -= timeSheetSignificantColumn;
  row = 0;

  for (row, column; !!timeSheetValues[row][column]; [row, column] = nextCell(row, column, timeSheetLastColumn)) {
    const activityName = activityIdToName[timeSheetValues[row][column]];
    if (!activityName) {
      break;
    }
    activities[activityName].skillExp.forEach(skill => {
      addExpToSheet({
        exp: skill.multiplier,
        skillName: skill.name,
        sheet: expSheetValues,
        reason: expReason.TimeSpent,
        date: getDateFromCell({
          row: row + startingRow,
          column: column + timeSheetSignificantColumn - 1,
        }),
      });
    });
  }
  expSheetValues[lastSyncedCellRow][lastSyncedCellCol] = `${startingRow + row},${timeSheetSignificantColumn + column}`;
  mergeMatrices(formulas, expSheetValues);
  setValues({
    expSheet,
    expSheetValues,
    maxRows,
    maxColumns
  });
}
