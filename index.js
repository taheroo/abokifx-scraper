const request = require('request');
const getFromBetween = require('./getFromBetween');

async function scrapDailyMovement(url) {
  return new Promise((resolve, reject) => {
    request.get(url, async function (error, response, body) {
      if (error) reject(error);
      // console.log('response', body);
      var datesData = await getFromBetween.get(
        body,
        `<tr class="table-line">`,
        '</tr>'
      );
      for (let element of datesData) {
        var date = await getFromBetween.get(
          element,
          `<td class="table-col datalist">`,
          '</td>'
        );
        var currency = await getFromBetween.get(
          element,
          `<td class="table-col">`,
          '</td>'
        );
        console.log('date', date[0]);
        var currencyTable = ['USD', 'GBP', 'EUR'];
        var index = 0;
        for (let curr of currency) {
          console.log('Currency (', currencyTable[index], ')', curr);
          index++;
        }
      }
    });
  });
}

scrapDailyMovement('https://www.abokifx.com/ratetypes/?rates=movement');
