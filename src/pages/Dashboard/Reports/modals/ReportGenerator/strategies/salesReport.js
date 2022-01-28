import {transactionInitState} from 'ducks/reducers/transactions';
import Formatter from 'utils/Formatter';
import {arrayFind, getPropsValues, onComputePurchasingProducts} from 'utils/helper';

const getDataSet = (data, footer = []) => {
  return [
    {
      columns: [
        {
          title: 'DATE',
          width: {wpx: 250},
          style: {
            font: {sz: '12', bold: true, family: 'consolas'},
            alignment: {wrapText: true, horizontal: 'center', vertical: 'top'},
          },
        },
        {
          title: 'NUMBER OF SALES',
          width: {wpx: 250},
          style: {
            font: {sz: '12', bold: true},
            alignment: {wrapText: true, horizontal: 'center', vertical: 'top'},
          },
        },
        {
          title: 'SALES',
          width: {wpx: 250},
          style: {
            font: {sz: '12', bold: true},
            alignment: {wrapText: true, horizontal: 'center', vertical: 'top'},
          },
        },
      ],
      data: [...data, [], [], footer],
    },
  ];
};

const manipulateData = (filter_date, transactions = []) => {
  let temp_data = [];
  let temp_transactions = [];

  temp_transactions = transactions.filter(txn => {
    const time = new Date(txn.date_created).getTime();
    if (time >= filter_date.min.getTime() && time < filter_date.max.getTime()) {
      return txn;
    }
  });

  temp_transactions.forEach(transaction => {
    const date = new Date(transaction.date_created);
    const _date = `${Formatter.monthTerm(
      date.getMonth(),
    )} ${date.getDate()}, ${date.getFullYear()}`;
    const isExist = arrayFind(temp_data, {date: _date});

    if (!isExist) {
      temp_data.push({
        date: _date,
        nos_sales: 1,
        sales: onComputePurchasingProducts(transaction.products),
      });
      return;
    }
    temp_data = temp_data.map(data => {
      if (isExist.date === data.date) {
        return {
          ...data,
          nos_sales: data.nos_sales + 1,
          sales: onComputePurchasingProducts(transaction.products) + data.sales,
        };
      }
      return data;
    });
  });
  return temp_data.sort(function (a, b) {
    if (new Date(a.date).getTime() < new Date(b.date).getTime()) return 1;
    if (new Date(a.date).getTime() > new Date(b.date).getTime()) return -1;
    return 0;
  });
};

export default function salesReport(filter_date, data = []) {
  // [{}, {}, {}]
  let total_sales = 0;
  let transactions = [];

  data.forEach(d => {
    if (d.module === 'transactions') {
      transactions.push(d.reference);
    }
  });

  let _data = manipulateData(filter_date, transactions);

  _data = _data.map(d => {
    //{} {} {}
    total_sales += d.sales;
    //injesting styles
    let _d = getPropsValues(d).map(({property, value}) => {
      return {
        value,
        style: {
          numFmt: property === 'nos_sales' ? '0' : '0.00',
          font: {sz: '11'},
          alignment: {wrapText: true, horizontal: 'center', vertical: 'center'},
        },
      };
    });
    return _d;
  });

  return getDataSet(_data, [
    {
      value: 'TOTAL SALES',
      style: {
        font: {sz: '11', bold: true},
        alignment: {wrapText: true, horizontal: 'center', vertical: 'center'},
      },
    },
    {value: ''},
    {
      value: total_sales,
      style: {
        numFmt: '0.00',
        font: {sz: '11'},
        alignment: {wrapText: true, horizontal: 'center', vertical: 'center'},
      },
    },
  ]);
}
