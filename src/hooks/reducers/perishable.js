import {isTypeof} from 'utils/checker';

export const perishableInitState = ({unit, current_unit, unit_type, expiry_date}) => ({
  unit: unit ? `${unit}` : '',
  current_unit: current_unit ? `${current_unit}` : '',
  unit_type: unit_type ? unit_type : '',
  expiry_date: expiry_date ? new Date(expiry_date) : new Date(),
});

export default function perishable(state = perishableInitState({}), action) {
  switch (action.type) {
    case 'set':
      return {
        unit: isTypeof('string', action.unit, state.unit),
        current_unit: isTypeof('string', action.current_unit, state.current_unit),
        unit_type: isTypeof('string', action.unit_type, state.unit_type),
        expiry_date: isTypeof('date', action.expiry_date, state.expiry_date),
      };

    default:
      return state;
  }
}
