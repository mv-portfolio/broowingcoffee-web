import {NAME_REGEX, NUMBER_REGEX} from 'constants/regex';
import ObjectCleaner from './ObjectCleaner';

const isString = value => {
  return typeof value === 'string';
};

const hasLength = value => {
  return value.length !== 0;
};

const isDefined = value => {
  return typeof value !== 'undefined';
};

const isNumber = value => {
  return typeof value === 'number';
};

const isOnlyNumber = value => {
  return NUMBER_REGEX.test(value);
};

const isOnlyAlphabet = value => {
  return NAME_REGEX.test(value);
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

const isArray = value => {
  return Array.isArray(value);
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

const arrayFind = (data = [], callback) => {
  return data.filter(callback).length !== 0;
};

const arrayFilter = (data = [], filter) => {
  let temp_data = [];
  const {property: filterKey, value: filterValue} =
    ObjectCleaner.getProperties(filter)[0];

  temp_data = data.filter(item => {
    let keyValue = '';
    ObjectCleaner.getProperties(item).forEach(({property, value}) => {
      if (property === filterKey) {
        keyValue = value;
        return;
      }
    });
    if (keyValue !== filterValue) {
      return item;
    }
    return null;
  });
  return temp_data;
};

const arrayUpdate = (data = [], filter, payload = {}) => {
  let temp_data = [];
  const {property: filterKey, value: filterValue} =
    ObjectCleaner.getProperties(filter)[0];

  temp_data = data.map(item => {
    let keyValue = '';
    ObjectCleaner.getProperties(item).forEach(({property, value}) => {
      if (property === filterKey) {
        keyValue = value;
      }
    });
    if (keyValue === filterValue) {
      return {
        ...item,
        ...payload
      };
    }
    return item;
  });
  return temp_data;
};

export {
  isString,
  hasLength,
  isDefined,
  isNumber,
  isOnlyNumber,
  isOnlyAlphabet,
  isBoolean,
  isTextChange,
  isTextEncrypt,
  isTextBoolean,
  isTextMatched,
  isTextNumber,
  isComponent,
  isJsonString,
  isArray,
  isObject,
  arrayFind,
  arrayFilter,
  arrayUpdate,
};
