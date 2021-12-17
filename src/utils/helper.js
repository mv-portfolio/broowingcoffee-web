import {isArray} from './checker';
import Formatter from './Formatter';

const HEIGHT = window.innerHeight;
const WIDTH = window.innerWidth;

const hp = hp => (hp / 100) * HEIGHT;
const wp = wp => (wp / 100) * WIDTH;

/* ----- own strategy ---- */
const ASC_NAME = (a, b) => {
  const firstComparable = a.name.toLowerCase();
  const secondComparable = b.name.toLowerCase();
  if (firstComparable > secondComparable) return 1;
  if (firstComparable < secondComparable) return -1;
  return 0;
};
const ASC_DATE = (a, b) => {
  const firstComparable = a.date_created;
  const secondComparable = b.date_created;
  if (firstComparable > secondComparable) return -1;
  if (firstComparable < secondComparable) return 1;
  return 0;
};
const sumOfPrice = (value = []) => {
  let totalPrice = 0;
  value.map(item => (totalPrice = totalPrice + item.price));
  return totalPrice;
};
const onCompute = purchasingProductInfo => {
  let finalPrice = 0;
  const {discount, price, addons} = purchasingProductInfo;
  const addonsTotalPrice = sumOfPrice(addons);
  finalPrice += addonsTotalPrice + price;
  if (discount) {
    finalPrice -= (discount / 100) * finalPrice;
  }
  return Formatter.toMoney(finalPrice);
};
const onComputeTransaction = transactionInfo => {
  const {products, discount} = transactionInfo;
  let totalPrice = 0;
  let totalDiscount = discount / 100;
  products.forEach(product => {
    totalPrice += parseInt(onCompute(product));
  });
  return Formatter.toMoney(totalPrice - totalDiscount * totalPrice);
};
const onCleanName = value => {
  if (value.includes('username')) {
    return 'created by';
  }
  return value.replace('_', ' ');
};
const onFormat = (property, value) => {
  if (property.includes('price') || property.includes('cost')) {
    return `${Formatter.toMoney(value)}`;
  }
  if (property.includes('date')) {
    return `${Formatter.getDateDifference(value)}`;
  }
  if (property.includes('discount')) {
    return `${value}%`;
  }
  if (property.includes('quantity')) {
    return `${value} pcs`;
  }
  return value;
};
const getPropertyChanges = (target, source) => {
  let tempObject = {
    name: target.name,
    consumables: {},
  };
  getPropsValues(target).forEach(targetObj => {
    getPropsValues(source).forEach(sourceObj => {
      if (
        (targetObj.property === sourceObj.property &&
          targetObj.value !== sourceObj.value &&
          !targetObj.property.includes('date')) ||
        (targetObj.property === 'cost' && sourceObj.property === 'cost')
      ) {
        if (isArray(sourceObj.value)) {
          sourceObj.value.forEach(src => {
            tempObject.consumables[src._id_item.name] = `${src.consumed}`;

            targetObj.value.forEach(trg => {
              const {consumed: trgConsumed} = trg;
              const {consumed: srcConsumed} = src;

              const isExist = sourceObj.value.filter(
                src => src._id_item.name === trg._id_item.name,
              )[0];
              if (!isExist) {
                tempObject.consumables[trg._id_item.name] = 'removed';
              }

              if (
                trg._id_item.name === src._id_item.name &&
                trgConsumed !== srcConsumed
              ) {
                tempObject.consumables[
                  src._id_item.name
                ] = `${trgConsumed} -> ${srcConsumed}`;
              } else if (
                trg._id_item.name === src._id_item.name &&
                trgConsumed === srcConsumed
              ) {
                delete tempObject.consumables[src._id_item.name];
              }
            });
          });

          return;
        }
        tempObject[targetObj.property] = [targetObj.value, sourceObj.value];
      }
    });
  });
  return tempObject;
};
const isConsumableChange = (prevArr = [], currentArr = []) => {
  let isChange = false;
  if (prevArr.length !== currentArr.length) {
    return true;
  }
  prevArr.forEach(prev => {
    currentArr.forEach(curr => {
      if (
        (prev._id_item.name === curr._id_item.name && prev.consumed !== curr.consumed) ||
        prev._id_item.name !== curr._id_item.name
      ) {
        isChange = true;
      }
    });
  });
  return isChange;
};
const getDateToNumber = (date, day) => {
  return new Date(date.getFullYear(), date.getMonth(), day).getTime();
};
const getDate = time => {
  const thisDate = new Date(time);
  return thisDate.getDate();
};
const manipulateData = (data, filteredDate = [], top3Products = []) => {
  let tempData = [];
  let partialData = [];
  let finalData = [];

  data
    .sort(function (a, b) {
      if (a.date_created > b.date_created) return 1;
      if (a.date_created < b.date_created) return -1;
      return -1;
    })
    .forEach((d, i) => {
      let tempObj = {};
      d.products.forEach(({_id_product}) => {
        if (_id_product) {
          const isPartialDatePropExist = arrayFind(getPropsValues(tempObj), {
            property: Formatter.toName(_id_product.name),
          });
          if (!isPartialDatePropExist) {
            tempObj[Formatter.toName(_id_product.name)] = 1;
            return;
          }
          tempObj[Formatter.toName(_id_product.name)] = isPartialDatePropExist.value += 1;
        }
      });
      partialData.push({date: getDate(d.date_created), ...tempObj});
    });

  partialData.forEach(partialD => {
    const isFinalDateExist = arrayFind(tempData, {date: partialD.date});
    if (!isFinalDateExist) {
      tempData.push({...partialD});
      return;
    }
    tempData = tempData.map((tempD, i) => {
      if (tempD.date === partialD.date) {
        let tempObj = {};
        const partialDProps = getPropsValues(partialD).filter(
          ({property}) => property !== 'date',
        );
        const tempDProps = getPropsValues(tempD).filter(
          ({property}) => property !== 'date',
        );
        partialDProps.forEach(({property, value}) => {
          const isPropsExist = arrayFind(tempDProps, {property});
          if (!isPropsExist) {
            tempObj[property] = value;
            return;
          }
          tempObj[property] = value + isPropsExist.value;
        });
        return {...tempD, ...tempObj};
      }
      return tempD;
    });
  });

  if (tempData.length) {
    const date = new Date(filteredDate[0], filteredDate[1] - 1);
    const numberOfDays = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

    for (let i = 0; i < numberOfDays; i++) {
      let tempObj = {};
      const isDateExist = arrayFind(tempData, {
        date: i + 1,
      });

      top3Products.forEach(({product}) => {
        tempObj[product] = 0;
      });

      if (!isDateExist) {
        finalData.push({date: i + 1, ...tempObj});
        continue;
      }
      finalData.push({...tempObj, ...isDateExist});
    }
  }
  return finalData;
};
const getTotalAmountPurchasedProducts = (transactions = []) => {
  let totalAmountPurchased = 0;
  transactions.forEach(
    transaction =>
      (totalAmountPurchased += parseFloat(onComputeTransaction(transaction))),
  );
  return Formatter.toMoney(totalAmountPurchased);
};
const getTotalAvailedProducts = transactions => {
  let totalNumberProducts = 0;
  const purchasedProducts = getPurchasedProducts(transactions);
  purchasedProducts.forEach(({availed}) => (totalNumberProducts += availed));
  return totalNumberProducts;
};
const getPurchasedProducts = data => {
  let tempData = [];
  data.forEach(data => {
    data.products.forEach(({_id_product}) => {
      if (_id_product) {
        const isPropExist = arrayFind(tempData, {
          product: Formatter.toName(_id_product.name),
        });

        if (!isPropExist) {
          tempData.push({
            product: Formatter.toName(_id_product.name),
            availed: 1,
          });
          return;
        }

        tempData = tempData.map(tempD => {
          if (tempD.product === Formatter.toName(_id_product.name)) {
            return {
              ...tempD,
              availed: (tempD.availed += 1),
            };
          }
          return tempD;
        });
      }
    });
  });
  return tempData.sort(function (a, b) {
    if (a.availed > b.availed) return -1;
    if (a.availed < b.availed) return 1;
    return 0;
  });
};
/* ----- end ---- */

const getPropsValues = obj => {
  let temp_data = [];
  Object.keys(obj).forEach((objKey, objKeyIdx) => {
    Object.values(obj).forEach((objVal, objValIdx) => {
      if (objKeyIdx === objValIdx) {
        temp_data.push({
          property: objKey,
          value: objVal,
        });
      }
    });
  });
  return temp_data;
};
const getSpecificProperty = (keys, payload) => {
  let redundantFields = [];
  let temp_keys = keys;
  let object = {};
  const hasRedundantProps = payload => {
    const fields = Object.keys(payload);
    Object.values(payload).forEach(payload => {
      if (typeof payload === 'object' && payload !== null) {
        const payloadObjectFields = Object.keys(payload);
        fields.forEach(field => {
          payloadObjectFields.forEach(payloadObjectField => {
            if (field === payloadObjectField) {
              if (redundantFields.length === 0) {
                return redundantFields.push(field);
              }
              let isExist = false;
              redundantFields.forEach(redundantField => {
                if (redundantField === payloadObjectField) {
                  isExist = true;
                }
              });
              if (!isExist) {
                return redundantFields.push(field);
              }
              return;
            }
          });
        });
      }
    });
    return redundantFields;
  };
  const ObjectValues = Object.values(payload);
  const propsRedundancies = hasRedundantProps(payload);
  if (!Array.isArray(temp_keys)) {
    temp_keys = Object.keys(temp_keys);
  }
  temp_keys.forEach(field => {
    Object.keys(payload).forEach((payloadField, payloadFieldIdx) => {
      if (field === payloadField) {
        object[payloadField] = ObjectValues[payloadFieldIdx];
      }
      //2nd Level
      if (typeof ObjectValues[payloadFieldIdx] === 'object') {
        const payloadObjectFields = ObjectValues[payloadFieldIdx];
        if (payloadObjectFields) {
          const payloadObjectValues = Object.values(payloadObjectFields);
          Object.keys(payloadObjectFields).forEach(
            (payloadObjectField, payloadObjectFieldIdx) => {
              if (field === payloadObjectField) {
                let isRedundantProp = false;
                propsRedundancies.forEach(redundancyProp => {
                  if (redundancyProp === payloadObjectField) {
                    return (isRedundantProp = true);
                  }
                });
                if (!isRedundantProp) {
                  object[payloadObjectField] = payloadObjectValues[payloadObjectFieldIdx];
                }
              }
            },
          );
        }
      }
    });
  });
  return object;
};
const arrayFind = (array = [], filter) => {
  if (!filter) return array;
  const filterProps = getPropsValues(filter);
  const find = array.filter(data => {
    let matches = [];
    let matchedNumber = 0;
    getPropsValues(data).forEach(({property, value}) => {
      filterProps.forEach(({property: property2, value: value2}) => {
        matches.push(property === property2 && value === value2);
      });
    });
    matches.forEach(match => {
      if (match) matchedNumber += 1;
    });
    if (matchedNumber === filterProps.length) {
      return data;
    }
  });
  return find.length <= 1 ? find[0] : find;
};
const arrayFilter = (data = [], filter) => {
  let temp_data = [];
  const filterProps = getPropsValues(filter);
  temp_data = data.filter(item => {
    let matches = [];
    let matchedNumber = 0;
    getPropsValues(item).forEach(({property, value}) => {
      filterProps.forEach(({property: property2, value: value2}) => {
        matches.push(property === property2 && value === value2);
      });
    });
    matches.forEach(match => {
      if (match) matchedNumber += 1;
    });
    if (matchedNumber !== filterProps.length) {
      return data;
    }
  });
  return temp_data;
};
const arrayUpdate = (data = [], filter, payload = {}) => {
  let temp_data = [];
  const {property: filterKey, value: filterValue} = getPropsValues(filter)[0];

  temp_data = data.map(item => {
    let keyValue = '';
    getPropsValues(item).forEach(({property, value}) => {
      if (property === filterKey) {
        keyValue = value;
      }
    });
    if (keyValue === filterValue) {
      return {
        ...item,
        ...payload,
      };
    }
    return item;
  });
  return temp_data;
};
const getUsername = text => {
  let lastIndex = text.indexOf('@');
  return text.substring(0, lastIndex);
};
const toName = val => {
  return val.substring(0, 1).toUpperCase() + val.substring(1).toLowerCase();
};

export {
  HEIGHT,
  WIDTH,
  arrayFind,
  arrayFilter,
  arrayUpdate,
  sumOfPrice,
  ASC_NAME,
  ASC_DATE,
  hp,
  wp,
  getUsername,
  toName,
  onCompute,
  onComputeTransaction,
  onCleanName,
  onFormat,
  getPropsValues,
  getPropertyChanges,
  getSpecificProperty,
  getDateToNumber,
  isConsumableChange,
  manipulateData,
  getTotalAmountPurchasedProducts,
  getTotalAvailedProducts,
};
