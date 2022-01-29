import Formatter from 'utils/Formatter';
import {arrayFind, getPropsValues} from 'utils/helper';

const getDataSet = (data, footer = [], footer2 = []) => {
  //'FFF7A35B', 'FF282627'
  return [
    {
      columns: [
        {
          title: 'ITEM NAME',
          width: {wpx: 250},
          style: {
            font: {sz: '12', bold: true, family: 'consolas'},
            alignment: {wrapText: true, horizontal: 'center', vertical: 'top'},
            fill: {fgColor: {rgb: 'FFF7A35B'}},
          },
        },
        {
          title: 'NUMBER OF RESTOCK',
          width: {wpx: 250},
          style: {
            font: {sz: '12', bold: true},
            alignment: {wrapText: true, horizontal: 'center', vertical: 'top'},
            fill: {fgColor: {rgb: 'FFF7A35B'}},
          },
        },
        {
          title: 'COST',
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

const manipulateData = (filter_date, restocks = []) => {
  let temp_data = [];

  restocks.forEach(item => {
    const isExist = arrayFind(temp_data, {name: Formatter.toName(item.name)});

    if (!isExist) {
      temp_data.push({
        name: Formatter.toName(item.name),
        nos_restock: 1,
        cost: item.cost[1],
      });
      return;
    }

    temp_data = temp_data.map(data => {
      if (data.name === Formatter.toName(item.name)) {
        return {
          ...data,
          nos_restock: data.nos_restock + 1,
          cost: data.cost + item.cost[1],
        };
      }
      return data;
    });
  });

  return temp_data.sort(function (a, b) {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
  });
};

export default function restockReport(filter_date, data = []) {
  let total_cost = 0;
  let restocks = [];

  data.forEach(d => {
    if (d.action === 'RESTOCK') {
      restocks.push(d.reference);
    }
  });

  let _data = manipulateData(filter_date, restocks);

  _data = _data.map(d => {
    //{} {} {}
    total_cost += d.cost;
    //injesting styles
    let _d = getPropsValues(d).map(({property, value}) => {
      return {
        value,
        style: {
          numFmt: property === 'cost' ? '0.00' : '0',
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
      value: 'TOTAL COST',
      style: {
        font: {sz: '11', bold: true},
        alignment: {wrapText: true, horizontal: 'center', vertical: 'center'},
        fill: {fgColor: {rgb: 'FF282627'}},
        font: {color: {rgb: 'FFFFFFFF'}},
      },
    },
    {
      value: '',
      style: {
        font: {sz: '11'},
        alignment: {wrapText: true, horizontal: 'center', vertical: 'center'},
        fill: {fgColor: {rgb: 'FF282627'}},
        font: {color: {rgb: 'FFFFFFFF'}},
      },
    },
    {
      value: total_cost,
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
