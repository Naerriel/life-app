function getActivityRules(timeSheet) {
  const ruleRanges = timeSheet.getRange(`C2:AX${timeSheet.getLastRow()}`);

  const rules = [];
  Object.keys(activities).forEach(activity => {
    const { color, id } = activities[activity];
    const rule = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied(`=EQ(C2, ${id})`)
    .setBackground(color)
    .setFontColor(color)
    .setRanges([ruleRanges])
    .build();
    rules.push(rule);
  });
  return rules;
}

function getLegendRules(timeSheet) {
  const ruleRanges = timeSheet.getRange(`A2:B${timeSheet.getLastRow()}`);

  const cells = ['A1', 'A2', 'B1', 'B2'];
  const days = ['Sunday', 'Saturday'];
  let dayFormula = '';
  ['A1', 'A2', 'B1', 'B2'].forEach(cell => {
    days.forEach(day => {
      dayFormula = `${dayFormula} EXACT(${cell}, "${day}"),`;
    });
  });

  const weekendRule = SpreadsheetApp.newConditionalFormatRule()
  .whenFormulaSatisfied(`=OR(${dayFormula})`)
  .setBackground('#d9ead3')
  .setRanges([ruleRanges])
  .build();

  const weekdayRule = SpreadsheetApp.newConditionalFormatRule()
  .whenFormulaSatisfied(`=NOT(OR(${dayFormula}))`)
  .setBackground('#fff2cc')
  .setRanges([ruleRanges])
  .build();

  return [weekendRule, weekdayRule];
}

function setTimeSheetColors() {
  const timeSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Time');
  const rules = [...getLegendRules(timeSheet), ...getActivityRules(timeSheet)];
  timeSheet.setConditionalFormatRules(rules);
}
