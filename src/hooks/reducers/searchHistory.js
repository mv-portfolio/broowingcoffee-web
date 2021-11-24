import {isTypeof} from 'utils/checker';

export const searchHistoryInitState = ({
  search = '',
  filter = [],
  date,
  startDate = new Date(),
  endDate = new Date(),
}) => ({
  search,
  filter,
  date,
  startDate,
  endDate,
});

export default function searchHistory(state = searchHistoryInitState({}), action) {
  switch (action.type) {
    case 'set':
      return {
        search: isTypeof('string', action.search, state.search),
        date: isTypeof('date', action.date, state.date),
        startDate: isTypeof('date', action.startDate, state.startDate),
        endDate: isTypeof('date', action.endDate, state.endDate),
        filter: isTypeof('array', action.filter, state.filter),
      };
  }
}
