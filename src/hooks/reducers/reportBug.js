import {isTypeof} from 'utils/checker';

export const reportBugInitState = {
  title: '',
  issue: '',
};

export default function reportBug(state = reportBugInitState, action) {
  switch (action.type) {
    case 'set':
      return {
        title: isTypeof('string', action.title, state.title),
        issue: isTypeof('string', action.issue, state.issue),
      };
  }
}
