const isString = value => {
  return typeof value === 'string';
};

const isDefined = value => {
  return typeof value !== 'undefined';
};

const isNumber = value => {
  return typeof value === 'number';
};

const isBoolean = value => {
  return typeof value === 'boolean';
};

const isTextChange = (value1, value2) => {
  return typeof value1 === 'string' ? value1 : value2;
};
const isTextEncrypt = (value1, value2) => {
  return typeof value1 === 'boolean' ? value1 : value2;
};
const isTextBoolean = (value1, value2) => {
  return typeof value1 === 'boolean' ? value1 : value2;
};
const isTextNumber = (value1, value2) => {
  return typeof value1 === 'number' ? value1 : value2;
};

const isTextMatched = (value1, value2) => {
  return value1 === value2;
};
const isComponent = (component, component2) => {
  return typeof component === 'object' ? component : component2;
};

const isObject = value => {
  return typeof value === 'object';
};

const isJsonString = value => {
  try {
    const isObject = value.slice(0, 1) === '{' && value.slice(value.length - 1) === '}';
    if (typeof value === 'string' && isObject) {
      JSON.parse(value);
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
  return true;
};

const isExistInArray = (data = [], callBack) => {
  return data.filter(callBack).length !== 0;
};

export {
  isString,
  isDefined,
  isNumber,
  isBoolean,
  isTextChange,
  isTextEncrypt,
  isTextBoolean,
  isTextMatched,
  isTextNumber,
  isComponent,
  isJsonString,
  isObject,
  isExistInArray,
};
