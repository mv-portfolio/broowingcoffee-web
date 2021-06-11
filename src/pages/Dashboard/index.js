import {View, Text, Separator} from 'components';
import {accentColor} from 'constants/styles';
import Icon from 'react-web-vector-icons';
import styles from './.module.css';

export default function PageNotExist() {
  return (
    <View style={styles.mainPane}>
      <View style={styles.bodyPane}>
        <Text style={styles.title}>Dashboard</Text>
        <Separator vertical={5} />
        <Text style={styles.subtitle}>Welcome to Broowing Coffeee</Text>
      </View>
    </View>
  );
}
