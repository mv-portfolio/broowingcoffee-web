export const initStateMenu = {
  isShow: false,
  title: 'Transaction',
};
export default function login(state = initStateMenu, action) {
  switch (action.type) {
    case 'set-show':
      return {
        ...state,
        isShow: action.isShow,
      };

    case 'set-title':
      return {
        ...state,
        title: action.title,
      };

    case 'set':
      return {
        title: action.title,
        isShow: action.isShow,
      };

    default:
      return state;
  }
}
