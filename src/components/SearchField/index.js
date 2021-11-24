import {Icon, Separator, View} from 'components';
import {ACCENT_COLOR} from 'constants/colors';

import styles from './.module.css';

export default function SearchField({skin, placeholder, value, onChangeText}) {
  return (
    <View style={styles.mainPane}>
      <input
        className={styles.input}
        placeholder={`Search${placeholder ? ` ${placeholder}` : ''}`}
        value={value}
        onChange={({target: {value: text}}) => onChangeText(text)}
      />
      <Separator horizontal='0.5' />

      <View style={styles.icon}>
        <Icon font='Feather' name='search' color={ACCENT_COLOR} size='2vh' />
      </View>
    </View>
  );
}
