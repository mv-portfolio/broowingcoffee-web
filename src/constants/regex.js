const NAME_REGEX = /^[a-zA-Z ]*$/;
const NUMBER_REGEX = /^[0-9]*$/;
const SMALL_CHAR_REGEX = /(?=.*[a-z])/;
const CAPITAL_CHAR_REGEX = /(?=.*[A-Z])/;
const NUMS_REGEX = /(?=.*[0-9])/;
const SYMBOLS_REGEX = /(?=.*[!@#$%^&*()_=+-/])/;
const MONEY_REGEX = /^\$?\d+(,\d{3})*(\.\d*)?$/;
const USERNAME_REGEX = /^[a-zA-Z0-9]*$/;

export {
  NAME_REGEX,
  NUMBER_REGEX,
  SMALL_CHAR_REGEX,
  CAPITAL_CHAR_REGEX,
  NUMS_REGEX,
  SYMBOLS_REGEX,
  MONEY_REGEX,
  USERNAME_REGEX,
};
