'use strict';
let appData = {
  mission: 50000,
  budgetMonth: 10000,
  period: 3,
  getTargetMonth: function () {
    appData.period = appData.mission / appData.budgetMonth;
    return appData.period;
  },
};
appData.getTargetMonth();
console.log(appData.budgetMonth);
console.log(appData.mission);
console.log(appData.mission * appData.budgetMonth);
console.log(appData.period);
console.log(appData);
