import styles from './.module.css';

import {View, CircleSnail} from 'components';
import {accentColor} from 'constants/styles';

export default function Loading() {
  return (
    <View style={styles.mainPane}>
      <CircleSnail color={accentColor} size={50} thickness={5} />
    </View>
  );
}
