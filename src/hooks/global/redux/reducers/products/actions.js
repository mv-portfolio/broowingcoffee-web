import {ACTION} from 'constants/string';

const PEEK_PRODUCT = () => ({
  type: ACTION.PEEK,
});

const PUSH_PRODUCT = product => ({
  type: ACTION.PUSH,
  product: product,
});

const POP_PRODUCT = () => ({
  type: ACTION.POP,
});

export {PEEK_PRODUCT, PUSH_PRODUCT, POP_PRODUCT};
