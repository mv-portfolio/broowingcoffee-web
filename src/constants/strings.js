//function obj
const ACTION_TYPE = type => ({
  //hooks action (obj)
  PEEK: `PEEK_${type}`,
  PUSH: `PUSH_${type}`,
  POP: `POP_${type}`,
  SET: `SET_${type}`,
  CLEAR: `CLEAR_${type}`,
  //hooksaction (array)
  SET_INDEX: `SET_INDEX_${type}`,
  //api action only
  AUTH: `${type}-AUTHENTICATION`,
});

const ASSESSMENT_INFORMATION = ({firstname, lastname}) => ({
  firstname: {
    text: firstname || '',
  },
  lastname: {
    text: lastname || '',
  },
});

const ASSESSMENT_ACCOUNT = ({
  username,
  email,
  currentPassword,
  newPassword,
  confirmNewPassword,
  privacyPolicy,
}) => ({
  username: {
    text: username || '',
  },
  email: {
    text: email || '',
  },
  privacyPolicy,
  currentPassword: {
    text: currentPassword || '',
  },
  newPassword: {
    text: newPassword || '',
    strength: 0,
  },
  confirmNewPassword: {
    text: confirmNewPassword || '',
    isMatched: false,
    isEncrypted: false,
  },
});

//plain object
const USER_FIELDS = {
  firstname: '',
  lastname: '',
  username: '',
  email: '',
  primary_auth_token: '',
  secondary_auth_token: '',
};

const ERROR_FIELDS = {
  name: '',
  message: '',
};

const SIGNIN_FIELDS = {
  username: {
    text: '',
  },
  password: {
    text: '',
    isEncrypted: false,
  },
};

const TWO_DAYS_BEFORE = {name: '2 days before', value: 1000 * 60 * 60 * 24 * 2};
const FIVE_DAYS_BEFORE = {name: '5 days before', value: 1000 * 60 * 60 * 24 * 5};
const TEN_DAYS_BEFORE = {name: '10 days before', value: 1000 * 60 * 60 * 24 * 10};
const FIFTEEN_DAYS_BEFORE = {name: '15 days before', value: 1000 * 60 * 60 * 24 * 15};

//actual days
const ONE_MONTH_BEFORE = {name: '1 month before', value: 1000 * 60 * 60 * 24 * 30};

const ITEM_PROPERTIES = [
  'name',
  'brand',
  'type',
  'quantity',
  'unit',
  'current_unit',
  'unit_type',
  'cost',
  'expiry_date',
  'expire_point',
];

export {
  //function
  ACTION_TYPE,
  ASSESSMENT_INFORMATION,
  ASSESSMENT_ACCOUNT,
  //plain obj
  USER_FIELDS,
  SIGNIN_FIELDS,
  ERROR_FIELDS,
  //days,
  TWO_DAYS_BEFORE,
  FIVE_DAYS_BEFORE,
  TEN_DAYS_BEFORE,
  FIFTEEN_DAYS_BEFORE,
  ONE_MONTH_BEFORE,
  //item
  ITEM_PROPERTIES,
};
