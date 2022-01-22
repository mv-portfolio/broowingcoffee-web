import {isTypeof} from 'utils/checker';

export const dialogItemInitState = ({
  name,
  brand,
  itemType,
  quantity,
  perishable_properties,
  restock_point,
  cost,
}) => ({
  name: name ? `${name}` : '',
  brand: brand ? brand : '',
  itemType: itemType ? itemType : 'non-perishable',
  quantity: quantity ? `${quantity}` : '',
  perishable_properties: perishable_properties ? perishable_properties : {},
  restock_point: restock_point ? restock_point : {low: [0], mid: [0, 0]},
  cost: cost ? `${cost}` : '',
});

export default function dialogItem(state = dialogItemInitState({}), action) {
  switch (action.type) {
    case 'set':
      return {
        name: isTypeof('string', action.name, state.name),
        brand: isTypeof('string', action.brand, state.brand),
        itemType: isTypeof('string', action.itemType, state.itemType),
        quantity: isTypeof('string', action.quantity, state.quantity),
        perishable_properties: isTypeof(
          'object',
          action.perishable_properties,
          state.perishable_properties,
        ),
        restock_point: isTypeof('object', action.restock_point, state.restock_point),
        cost: isTypeof('string', action.cost, state.cost),
      };

    default:
      return state;
  }
}
