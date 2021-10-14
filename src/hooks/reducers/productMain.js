import {arrayFind, isTypeof} from 'utils/checker';

export const productMainInitState = ({
  name,
  based,
  hot_price,
  cold_price,
  consumables,
}) => ({
  name: name ? `${name}` : '',
  based: based ? `${based}` : '',
  hot_price: hot_price ? `${hot_price}` : '',
  cold_price: cold_price ? `${cold_price}` : '',
  consumables: [...consumables],
});

export default function productMain(state = productMainInitState({}), action) {
  switch (action.type) {
    case 'set':
      return {
        name: isTypeof('string', action.name, state.name),
        based: isTypeof('string', action.based, state.based),
        hot_price: isTypeof('string', action.hot_price, state.hot_price),
        cold_price: isTypeof('string', action.cold_price, state.cold_price),
        consumables: isTypeof('array', action.consumables, state.consumables),
      };

    case 'push-consumable':
      const isExist = arrayFind(
        state.consumables,
        consumable => consumable._id_item.name === action.consumable._id_item.name,
      );
      if (isExist) {
        const newConsumables = state.consumables.map(consumable => {
          if (consumable._id_item.name === action.consumable._id_item.name) {
            return action.consumable;
          }
          return consumable;
        });

        return {
          ...state,
          consumables: newConsumables,
        };
      }

      return {
        ...state,
        consumables: [...state.consumables, action.consumable],
      };

    case 'pop-consumable':
      const newConsumables = state.consumables.filter(
        consumble => consumble._id_item.name !== action.consumableName,
      );

      return {
        ...state,
        consumables: newConsumables,
      };

    default:
      return state;
  }
}
