import {Button, Icon, Text, View} from 'components';
import {ACCENT_COLOR2} from 'constants/colors';
import {hp} from 'utils/helper';
import styles from './.module.css';

export default function Base({name, onDelete}) {
  return (
    <View style={styles.mainPane}>
      <Text style={styles.title}>{name}</Text>
      <Button skin={styles.buttonSkin} body={styles.buttonBody} onPress={onDelete}>
        <Icon font='AntDesign' name='delete' size={hp(2.25)} color={ACCENT_COLOR2} />
      </Button>
    </View>
  );
}
