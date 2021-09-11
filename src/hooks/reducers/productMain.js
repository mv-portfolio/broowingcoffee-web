import {isTextChange} from 'utils/checker';

export const productMainInitState = ({name, based, hot_price, cold_price}) => ({
  name: name ? `${name}` : '',
  based: based ? `${based}` : '',
  hot_price: hot_price ? `${hot_price}` : '',
  cold_price: cold_price ? `${cold_price}` : '',
});

export default function productMain(state = productMainInitState({}), action) {
  switch (action.type) {
    case 'set':
      return {
        name: isTextChange(action.name, state.name),
        based: isTextChange(action.based, state.based),
        hot_price: isTextChange(action.hot_price, state.hot_price),
        cold_price: isTextChange(action.cold_price, state.cold_price),
      };

    default:
      return state;
  }
}
