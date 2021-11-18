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
const getObjectChanges = (target, source) => {
  let tempObject = {
    name: target.name,
  };
  getPropsValues(target).map(object => {
    getPropsValues(source).map(object2 => {
      if (
        (object.property === object2.property &&
          object.value !== object2.value &&
          !object.property.includes('date')) ||
        (object.property === 'cost' && object2.property === 'cost')
      ) {
        if (isArray(object2.value)) {
          let consumables = [];
          object.value.map(value => {
            object2.value.map(value2 => {
              if (
                value._id_item._id === value2._id_item._id &&
                value.consumed !== value2.consumed
              ) {
                consumables.push({
                  name: value._id_item.name,
                  consumed: [value.consumed, value2.consumed],
                });
              }
            });
          });
          tempObject[object.property] = consumables;
          return;
        }
        tempObject[object.property] = [object.value, object2.value];
      }
    });
  });
  return tempObject;
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
  onCleanName,
  onFormat,
  getPropsValues,
  getObjectChanges,
  getSpecificProperty,
};
