import {View} from 'components';
import SearchHistory from 'pages/Dashboard/Reports/components/SearchHistory';
import styles from './.module.css';

export default function Search(props) {
  const {
    location: {state},
  } = props;

  if (state.path === 'report') {
    if (state.type === 'transaction') {
      return <SearchHistory type={state.type} />;
    }
    if (state.type === 'other') {
      return <SearchHistory type={state.type} />;
    }
  }

  return (
    <View style={styles.mainPane}>
      <View></View>
    </View>
  );
}
