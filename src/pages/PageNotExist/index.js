import {View, Text, Separator} from 'components';
import {accentColor} from 'constants/styles';
import Icon from 'react-web-vector-icons';
import styles from './.module.css';

export default function PageNotExist() {
  return (
    <View style={styles.mainPane}>
      <View style={styles.bodyPane}>
        <Icon font='Feather' name='alert-triangle' size='50px' color={accentColor} />
        <Separator vertical={15} />
        <Text style={styles.title}>This Page Does Not Exist!</Text>
        <Separator vertical={5} />
        <Text style={styles.subtitle}>The link provided is invalid or mismatched.</Text>
      </View>
    </View>
  );
}
