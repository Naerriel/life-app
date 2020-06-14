const expReason = {
  TimeSpent: 'Time spent',
};

function nextCell(row, column, lastColumn) {
  if (column === lastColumn) {
    return [row + 2, 3];
  }
  return [row, column + 1];
}

function getData() {
  const Spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const expSheet = Spreadsheet.getSheetByName('Exp');
  const timeSheet = Spreadsheet.getSheetByName('Time');

  const timeSheetLastColumn = timeSheet.getLastColumn();

  const maxRows = expSheet.getMaxRows();
  const maxColumns = expSheet.getMaxColumns();
  const range = expSheet.getRange(1, 1, maxRows, maxColumns);
  const expSheetValues = range.getValues();

  return {
    Spreadsheet,
    expSheet,
    timeSheet,
    timeSheetLastLastColumn,
    maxRows,
    maxColumns,
    range,
    expSheetValues,
  };
}

function updateExp() {
  const {
    Spreadsheet,
    expSheet,
    timeSheet,
    timeSheetLastLastColumn,
    maxRows,
    maxColumns,
    range,
    expSheetValues,
  } = getData();

  const lastSyncedCellRow = 0;
  const lastSyncedCellCol = 2;
  let [row, column] = expSheetValues[lastSyncedCellRow][lastSyncedCellCol].split(',').map(val => parseInt(val, 10));
  const startedRow = row;

  const timeSheetSignificantColumn = 3;
  const timeSheetValues = timeSheet.getRange(row, timeSheetSignificantColumn, row + 1, timeSheetLastColumn).getValues();

  column -= timeSheetSignificantColumn;
  row = 0;

  for (row, column; !!timeSheetValues[row][column]; [row, column] = nextCell(row, column, lastColumn)) {
    const activityName = activityIdToName[timeSheetValues[row][column]];
    if (!activityName) {
      break;
    }
    activities[activityName].skillExp.forEach(skill => {
      addExpToSheet(skill.multiplier, skill.name, expSheetValues, expReason.TimeSpent);
    });
  }
  expSheetValues[lastSyncedCellRow][lastSyncedCellCol] = `${startedRow + row},${timeSheetSignificantColumn + column}`;


}

function setValues(expSheet, expSheetValues) {
  const columnsNeeded = expSheetValues.reduce((acc, val) => Math.max(acc, val.length), 0);
  let columnsToAdd = 0;
  if (columnsNeeded > maxColumns) {
    columnsToAdd = columnsNeeded - maxColumns + 10;
    expSheet.insertColumns(maxColumns, columnsToAdd);
    range = expSheet.getRange(1, 1, maxRows, maxColumns + columnsToAdd);
  }

  expSheetValues.forEach(row => {
    while(row.length < maxColumns + columnsToAdd) {
      row.push('');
    }
  });
  range.setValues(expSheetValues);
}

const firstFreeColumn = {};

function addExpToSheet(exp, skillName, sheet, reason) {
  const paddingTop = 1;
  const skillPaddingTop = 1;
  const rowsPerSkill = 4;
  const skillPosition = skills[skillName].position * rowsPerSkill + paddingTop + skillPaddingTop;

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
  sheet[skillPosition + 1][freeColumn] = 'Today, yo';
  sheet[skillPosition + 2][freeColumn] = reason;
}
