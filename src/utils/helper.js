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

export {HEIGHT, WIDTH, arrayFind, arrayFilter, arrayUpdate,  sumOfPrice, ASC_NAME, hp, wp};
