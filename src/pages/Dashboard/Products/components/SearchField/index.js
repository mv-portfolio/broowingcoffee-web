import {Button, Icon, Separator, TextInput, View} from 'components';
import {accentColor} from 'constants/styles';

import styles from './.module.css';

export default function SearchField({skin, placeholder, value, onChangeText, onSearch}) {
  return (
    <View style={styles.mainPane}>
      <input
        className={styles.input}
        placeholder='Search'
        value={value}
        onChange={({target: {value}}) => onChangeText(value)}
      />
      <Separator horizontal='0.5' />

      <View style={styles.icon}>
        <Icon font='Feather' name='search' color={accentColor} size='2vh' />
      </View>
    </View>
  );
}
