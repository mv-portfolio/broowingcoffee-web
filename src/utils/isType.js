const isType = (expectedType, value, elseVal) => {
  return typeof value === expectedType ? value : elseVal;
};

export default isType;
