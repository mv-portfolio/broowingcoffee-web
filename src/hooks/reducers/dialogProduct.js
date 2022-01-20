import {isTypeof} from 'utils/checker';

export const dialogProductInitState = ({name, based, size, product_type, consumed}) => ({
  name: name ? name : '',
  based: based ? based : '',
  size: size ? size : '',
  product_type: product_type ? product_type : '',
  consumed: consumed
    ? consumed
    : [
        {
          size: 'small',
          product_type: 'hot',
          price: '',
          inventory: [],
        },
        {
          size: 'medium',
          product_type: 'hot',
          price: '',
          inventory: [],
        },
        {
          size: 'large',
          product_type: 'hot',
          price: '',
          inventory: [],
        },

        {
          size: 'small',
          product_type: 'cold',
          price: '',
          inventory: [],
        },
        {
          size: 'medium',
          product_type: 'cold',
          price: '',
          inventory: [],
        },
        {
          size: 'large',
          product_type: 'cold',
          price: '',
          inventory: [],
        },
      ],
});

export default function dialogProduct(state = dialogProductInitState({}), action) {
  switch (action.type) {
    case 'set':
      return {
        name: isTypeof('string', action.name, state.name),
        based: isTypeof('string', action.based, state.based),
        size: isTypeof('string', action.size, state.size),
        product_type: isTypeof('string', action.product_type, state.product_type),
        consumed: isTypeof('array', action.consumed, state.consumed),
      };

    default:
      return state;
  }
}
