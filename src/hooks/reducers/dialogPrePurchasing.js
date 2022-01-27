import {isTypeof} from 'utils/checker';

export const dialogPrePurchasingInitState = {
  receiptTo: '',
  cash: '',
  change: '0',
};

export default function dialogPrePurchasing(
  state = dialogPrePurchasingInitState,
  action,
) {
  switch (action.type) {
    case 'set':
      return {
        receiptTo: isTypeof('string', action.receiptTo, state.receiptTo),
        cash: isTypeof('string', action.cash, state.cash),
        change: isTypeof('string', action.change, state.change),
      };

    default:
      return state;
  }
}
