const HEIGHT = window.innerHeight;
const WIDTH = window.innerWidth;

const hp = hp => (hp / 100) * HEIGHT;

const wp = wp => (wp / 100) * WIDTH;

const ASC_NAME = (a, b) => {
  const firstComparable = a.name.toLowerCase();
  const secondComparable = b.name.toLowerCase();
  if (firstComparable > secondComparable) return 1;
  if (firstComparable < secondComparable) return -1;
  return 0;
};

const sumOfPrice = (value = []) => {
  let totalPrice = 0;
  value.map(item => (totalPrice = totalPrice + item.price));
  return totalPrice;
};

const getProperties = obj => {
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
  const hasRedundantProps = (payload) => {
    const fields = Object.keys(payload);
    Object.values(payload).forEach((payload) => {
      if (typeof payload === "object" && payload !== null) {
        const payloadObjectFields = Object.keys(payload);
        fields.forEach((field) => {
          payloadObjectFields.forEach((payloadObjectField) => {
            if (field === payloadObjectField) {
              if (redundantFields.length === 0) {
                return redundantFields.push(field);
              }
              let isExist = false;
              redundantFields.forEach((redundantField) => {
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
  temp_keys.forEach((field) => {
    Object.keys(payload).forEach((payloadField, payloadFieldIdx) => {
      if (field === payloadField) {
        object[payloadField] = ObjectValues[payloadFieldIdx];
      }
      //2nd Level
      if (typeof ObjectValues[payloadFieldIdx] === "object") {
        const payloadObjectFields = ObjectValues[payloadFieldIdx];
        if (payloadObjectFields) {
          const payloadObjectValues = Object.values(payloadObjectFields);
          Object.keys(payloadObjectFields).forEach(
            (payloadObjectField, payloadObjectFieldIdx) => {
              if (field === payloadObjectField) {
                let isRedundantProp = false;
                propsRedundancies.forEach((redundancyProp) => {
                  if (redundancyProp === payloadObjectField) {
                    return (isRedundantProp = true);
                  }
                });
                if (!isRedundantProp) {
                  object[payloadObjectField] =
                    payloadObjectValues[payloadObjectFieldIdx];
                }
              }
            }
          );
        }
      }
    });
  });
  return object;
};
const arrayFind = (array = [], filter) => {
  if (!filter) return array;
  const filterProps = getProperties(filter);
  const find = array.filter(data => {
    let matches = [];
    let matchedNumber = 0;
    getProperties(data).forEach(({property, value}) => {
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
  const filterProps = getProperties(filter);
  temp_data = data.filter(item => {
    let matches = [];
    let matchedNumber = 0;
    getProperties(item).forEach(({property, value}) => {
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
  const {property: filterKey, value: filterValue} = getProperties(filter)[0];

  temp_data = data.map(item => {
    let keyValue = '';
    getProperties(item).forEach(({property, value}) => {
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
  hp,
  wp,
  getUsername,
  toName,
  getProperties,
  getSpecificProperty,
};
