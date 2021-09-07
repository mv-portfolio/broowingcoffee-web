module.exports = {
  NAME_REGEX: /^[a-zA-Z ]*$/,
  NUMBER_REGEX: /^[0-9]*$/,
  SMALL_CHAR_REGEX: /(?=.*[a-z])/,
  CAPITAL_CHAR_REGEX: /(?=.*[A-Z])/,
  NUMS_REGEX: /(?=.*[0-9])/,
  SYMBOLS_REGEX: /(?=.*[!@#$%^&*()_=+-/])/,
  MONEY_REGEX: /^\$?\d+(,\d{3})*(\.\d*)?$/,
  USERNAME_REGEX: /^[a-zA-Z0-9]*$/,
};
