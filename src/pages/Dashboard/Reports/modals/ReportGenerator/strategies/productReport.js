import {ACCENT_COLOR, BACKGROUND_COLOR} from 'constants/colors';
import Formatter from 'utils/Formatter';
import {arrayFind, getPropsValues, onComputePurchasingProduct} from 'utils/helper';

const getDataSet = (data, footer = [], footer2 = []) => {
  //'FFF7A35B', 'FF282627'
  return [
    {
      columns: [
        {
          title: 'PRODUCT NAME',
          width: {wpx: 250},
          style: {
            font: {sz: '12', bold: true, family: 'consolas'},
            alignment: {wrapText: true, horizontal: 'center', vertical: 'top'},
            fill: {fgColor: {rgb: 'FFF7A35B'}},
          },
        },
        {
          title: 'NUMBER OF PURCHASED',
          width: {wpx: 250},
          style: {
            font: {sz: '12', bold: true},
            alignment: {wrapText: true, horizontal: 'center', vertical: 'top'},
            fill: {fgColor: {rgb: 'FFF7A35B'}},
          },
        },
        {
          title: 'SALES',
          width: {wpx: 250},
          style: {
            font: {sz: '12', bold: true},
            alignment: {wrapText: true, horizontal: 'center', vertical: 'top'},
            fill: {fgColor: {rgb: 'FFF7A35B'}},
          },
        },
      ],
      data: [
        ...data,
        [
          {
            value: '',
            style: {
              fill: {fgColor: {rgb: 'FF282627'}},
            },
          },
          {
            value: '',
            style: {
              fill: {fgColor: {rgb: 'FF282627'}},
            },
          },
          {
            value: '',
            style: {
              fill: {fgColor: {rgb: 'FF282627'}},
            },
          },
        ],
        [
          {
            value: '',
            style: {
              fill: {fgColor: {rgb: 'FF282627'}},
            },
          },
          {
            value: '',
            style: {
              fill: {fgColor: {rgb: 'FF282627'}},
            },
          },
          {
            value: '',
            style: {
              fill: {fgColor: {rgb: 'FF282627'}},
            },
          },
        ],
        footer,
        footer2,
      ],
    },
  ];
};

const manipulateData = (filter_date, transactions = []) => {
  let temp_data = [];

  transactions.forEach(({products}) => {
    products.forEach(product => {
      const isExist = arrayFind(temp_data, {
        name: Formatter.toName(product._id_product.name),
      });

      if (!isExist) {
        temp_data.push({
          name: Formatter.toName(product._id_product.name),
          nos_purchased: 1,
          sales: onComputePurchasingProduct(product),
        });
        return;
      }

      temp_data = temp_data.map(tempProduct => {
        if (tempProduct.name === Formatter.toName(product._id_product.name)) {
          return {
            ...tempProduct,
            nos_purchased: tempProduct.nos_purchased + 1,
            sales: onComputePurchasingProduct(product) + tempProduct.sales,
          };
        }
        return tempProduct;
      });
    });
  });
  return temp_data.sort(function (a, b) {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
  });
};

export default function productsReport(filter_date, data = []) {
  // [{}, {}, {}]
  let total_sales = 0;
  let total_nos_purchased = 0;
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
    total_nos_purchased += d.nos_purchased;
    //injesting styles
    let _d = getPropsValues(d).map(({property, value}) => {
      return {
        value,
        style: {
          numFmt: property === 'sales' ? '0.00' : '0',
          font: {sz: '11'},
          alignment: {wrapText: true, horizontal: 'center', vertical: 'center'},
          fill: {fgColor: {rgb: 'FF282627'}},
          font: {color: {rgb: 'FFFFFFFF'}},
        },
      };
    });
    return _d;
  });

  return getDataSet(_data, [
    {
      value: 'TOTALS',
      style: {
        font: {sz: '11', bold: true},
        alignment: {wrapText: true, horizontal: 'center', vertical: 'center'},
        fill: {fgColor: {rgb: 'FF282627'}},
        font: {color: {rgb: 'FFFFFFFF'}},
      },
    },
    {
      value: total_nos_purchased,
      style: {
        font: {sz: '11'},
        alignment: {wrapText: true, horizontal: 'center', vertical: 'center'},
        fill: {fgColor: {rgb: 'FF282627'}},
        font: {color: {rgb: 'FFFFFFFF'}},
      },
    },
    {
      value: total_sales,
      style: {
        numFmt: '0.00',
        font: {sz: '11'},
        alignment: {wrapText: true, horizontal: 'center', vertical: 'center'},
        fill: {fgColor: {rgb: 'FF282627'}},
        font: {color: {rgb: 'FFFFFFFF'}},
      },
    },
  ]);
}
