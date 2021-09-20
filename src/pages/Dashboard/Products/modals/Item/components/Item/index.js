import {Icon, Text, View} from 'components';
import {accentColor} from 'constants/styles';
import styles from './.module.css';
export default function Item({item, isSelected, onClick}) {
  const {name} = item;
  return (
    <View
      style={styles.mainPane}
      role='button'
      onClick={onClick}>
      <Text style={styles.name}>{name}</Text>
      {isSelected && <Icon font='Feather' name='check' size='2vh' color={accentColor} />}
    </View>
  );
}
