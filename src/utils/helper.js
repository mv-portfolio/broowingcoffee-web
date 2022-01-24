import {CRITICAL_COLOR, GOOD_COLOR, MODERATE_COLOR} from 'constants/colors';
import {
  FIFTEEN_DAYS_BEFORE,
  FIVE_DAYS_BEFORE,
  ONE_MONTH_BEFORE,
  TEN_DAYS_BEFORE,
  TWO_DAYS_BEFORE,
} from 'constants/strings';
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
  if (value.includes('email')) {
    return 'made by';
  }
  if (value.includes('issuedBy')) {
    return 'issued by';
  }
  if (value.includes('receiptTo')) {
    return 'receipt to';
  }
  if (value.includes('cost')) {
    return 'cost per item';
  }
  return value.replace('_', ' ');
};
const onFormat = (property, value) => {
  if (property.includes('price') || property.includes('cost')) {
    return `${Formatter.toMoney(value)}`;
  }
  if (property.includes('date')) {
    if (property.includes('expiry')) {
      return `${Formatter.toLocaleString(value)}`;
    }
    return `${Formatter.getDateDifference(value)}`;
  }
  if (property.includes('discount')) {
    return `${value}%`;
  }
  if (property.includes('brand')) {
    return `${Formatter.toName(value)}`;
  }
  if (property.includes('quantity')) {
    return `${value}`;
  }
  return value;
};
const getDateToNumber = (date, day) => {
  return new Date(date.getFullYear(), date.getMonth(), day).getTime();
};
const getDate = time => {
  const thisDate = new Date(time);
  return thisDate.getDate();
};
const getRestockPointStatus = (value, low, mid) => {
  if (value <= low) {
    return CRITICAL_COLOR;
  }
  if (value > low && value <= mid) {
    return MODERATE_COLOR;
  }
  return GOOD_COLOR;
};
const getExpirePoint = (name, value) => {
  let val = 0;
  const expirePoints = [
    TWO_DAYS_BEFORE,
    FIVE_DAYS_BEFORE,
    TEN_DAYS_BEFORE,
    FIFTEEN_DAYS_BEFORE,
    ONE_MONTH_BEFORE,
  ];
  expirePoints.forEach(expirePoint => {
    if (expirePoint.name === name || expirePoint.value === value) {
      val = expirePoint;
    }
  });
  return val;
};
const getExpirePointStatus = (expiry_date, expire_point) => {
  const currentDate = new Date().getTime();
  const criticalStatus = currentDate + expire_point * 0.5;
  const midStatus = currentDate + expire_point;

  if (criticalStatus > expiry_date) {
    return CRITICAL_COLOR;
  }
  if (midStatus > expiry_date) {
    return MODERATE_COLOR;
  }
  return GOOD_COLOR;
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
            tempObject.consumables[src._id_item.name] = `+ ${src.consumed}`;

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
const getProductConsumed = (size, product_type, consumed = []) => {
  let tempPayload = {};
  consumed.forEach((consume, index) => {
    if (consume.size === size && consume.product_type === product_type) {
      tempPayload = consume;
    }
  });
  return tempPayload;
};
const setProductConsumed = (value, size, product_type, consumed = []) => {
  return consumed.map((consume, index) => {
    if (consume.size === size && consume.product_type === product_type) {
      return {
        ...consume,
        ...value,
      };
    }
    return consume;
  });
};
const setInventoryProduct = (inventory = [], value) => {
  if (!inventory.length) {
    return [value];
  }
  const itemExist = inventory.filter(
    item => item._id_item.name === value._id_item.name,
  )[0];
  if (!itemExist) {
    return [...inventory, value];
  }
  return inventory.map((item, index) => {
    if (value._id_item.name === item._id_item.name) {
      return value;
    }
    return item;
  });
};
const popInventoryProduct = (inventory = [], value) => {
  return inventory.filter(item => item._id_item.name !== value._id_item.name);
};
const getAbbreviationUnit = value => {
  // if (value === 'milligram') {
  //   return 'mg';
  // }
  // if (value === 'gram') {
  //   return 'g';
  // }
  // if (value === 'milliliter') {
  //   return 'ml';
  // }
  // if (value === 'liter') {
  //   return 'l';
  // }
  return value;
};
const hasMissingProperty = (consumed = []) => {
  let error = {status: false, error: ''};
  let notEmpty = false;
  consumed.forEach(consume => {
    if (consume.price || consume.inventory.length) {
      notEmpty = true;
    }
  });
  if (!notEmpty) return {status: true, error: 'Combination Property must not empty'};

  consumed.forEach(consume => {
    if (error.status) return;
    if (!consume.price && !consume.inventory.length) return;
    if (consume.price && consume.inventory.length) return;
    if (!consume.price) {
      error = {
        status: true,
        error: `Combination ${Formatter.toName(consume.size)} and ${Formatter.toName(
          consume.product_type,
        )} has missing property price`,
      };
      return;
    }
    error = {
      status: true,
      error: `Combination ${Formatter.toName(consume.size)} and ${Formatter.toName(
        consume.product_type,
      )} has an empty consumables`,
    };
  });
  return error;
};
const isConsumedChange = (prevConsumed = [], presConsumed = []) => {
  let isChange = false;
  prevConsumed.forEach(prev => {
    if (isChange) return;
    presConsumed.forEach(pres => {
      if (prev.size === pres.size && prev.product_type === pres.product_type) {
        if (prev.price !== parseFloat(pres.price ? pres.price : '0'))
          return (isChange = true);
        if (prev.inventory.length !== pres.inventory.length) return (isChange = true);
        prev.inventory.forEach(prevItem => {
          const item = pres.inventory.filter(
            item => item._id_item.name === prevItem._id_item.name,
          )[0];
          if (!item) return (isChange = true);
          if (item.consume !== prevItem.consume) return (isChange = true);
        });
      }
    });
  });
  return isChange;
};
const getItemDifferences = (prev, pres) => {
  let temp_obj = {};
  getPropsValues(prev).forEach(({property: prevProp, value: prevVal}) => {
    getPropsValues(pres).forEach(({property: presProp, value: presVal}) => {
      if (prevProp === presProp && prevVal !== presVal) {
        temp_obj[prevProp] = [prevVal, presVal];
      }
    });
  });

  if (
    prev.type !== pres.type &&
    !(temp_obj.type[0] === 'perishable' && temp_obj.type[1] === 'non-perishable')
  ) {
    getPropsValues(pres).forEach(({property: presProp, value: presVal}) => {
      let isExist = {status: false, obj: [presProp, presVal]};
      getPropsValues(temp_obj).forEach(({property: tempObjProp, value: tempObjVal}) => {
        if (presProp === tempObjProp) {
          isExist = {status: true};
        }
      });
      if (!isExist.status) {
        temp_obj[isExist.obj[0]] = isExist.obj[1];
      }
    });

    getPropsValues(prev).forEach(({property: prevProp, value: prevVal}) => {
      getPropsValues(temp_obj).forEach(({property: tempObjProp, value: tempObjVal}) => {
        if (prevProp === tempObjProp && prevVal === tempObjVal) {
          delete temp_obj[prevProp];
        }
      });
    });
  }
  return {
    name: prev.name,
    ...temp_obj,
  };
};
const getProductDifferences = (prev, pres) => {
  let temp_obj = {};
  let isChange = false;
  getPropsValues(prev).forEach(({property: prevProp, value: prevVal}) => {
    getPropsValues(pres).forEach(({property: presProp, value: presVal}) => {
      if (prevProp === presProp && isArray(prevVal) && isArray(presVal)) {
        prevVal.forEach(prevV => {
          if (isChange) return;
          presVal.forEach(presV => {
            if (isChange) return;
            if (
              prevV.size === presV.size &&
              prevV.product_type === presV.product_type &&
              prevV.price !== presV.price
            ) {
              return (isChange = true);
            }
            if (
              prevV.size === presV.size &&
              prevV.product_type === presV.product_type &&
              prevV.inventory.length !== presV.inventory.length
            ) {
              return (isChange = true);
            }

            prevV.inventory.forEach(prevItem => {
              if (isChange) return;
              presV.inventory.forEach(presItem => {
                if (isChange) return;
                if (
                  prevItem._id_item.name === presItem._id_item.name &&
                  prevItem.consume !== presItem.consume
                ) {
                  return (isChange = true);
                }
              });
            });
          });
        });

        if (isChange) {
          temp_obj.remarks = 'Product Combinations was changed';
        }
        return;
      }
      if (prevProp === presProp && prevVal !== presVal) {
        temp_obj[prevProp] = [prevVal, presVal];
      }
    });
  });
  return {
    ...temp_obj,
    name: prev.name,
  };
};
const getBasesName = (bases = []) => {
  let temp_bases = [];
  bases.forEach(base => temp_bases.push(base.name));
  return temp_bases.sort(function (a, b) {
    if (a > b) return 1;
    if (a < b) return -1;
    return 0;
  });
};
const getDiscounts = (discounts = []) => {
  let temp_discounts = ['none'];
  discounts.forEach(discount => {
    temp_discounts.push(`${discount.name} (${discount.value}%)`);
  });
  return temp_discounts;
};
const getDiscountObj = (discounts = [], value) => {
  let temp_discount_obj = {};
  discounts.forEach(discount => {
    if (value.includes(discount.name)) {
      temp_discount_obj = discount;
    }
  });
  return temp_discount_obj;
};
const getProductPrice = (product, product_type, size) => {
  const temp_product = getProductConsumed(size, product_type, product.consumed);
  return temp_product.price ? `${temp_product.price}` : '';
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
  toName,
  onCompute,
  onComputeTransaction,
  onCleanName,
  onFormat,
  isConsumedChange,
  getProductConsumed,
  setProductConsumed,
  setInventoryProduct,
  popInventoryProduct,
  getAbbreviationUnit,
  hasMissingProperty,
  getUsername,
  getRestockPointStatus,
  getExpirePoint,
  getExpirePointStatus,
  getPropsValues,
  getPropertyChanges,
  getItemDifferences,
  getProductDifferences,
  getBasesName,
  getSpecificProperty,
  getDateToNumber,
  manipulateData,
  getTotalAmountPurchasedProducts,
  getTotalAvailedProducts,
  getDiscounts,
  getDiscountObj,
  getProductPrice,
};
