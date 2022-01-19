import {View, Text, Icon, Button} from 'components';
import {ACCENT_COLOR} from 'constants/colors';
import Formatter from 'utils/Formatter';
import styles from './.module.css';

export default function Discount({discount, onEdit}) {
  const {name, value} = discount;
  return (
    <View style={styles.mainPane}>
      <View style={styles.headerPane}>
        <Text style={styles.title}>{`${Formatter.toName(name)} (${value}% discount)`}</Text>
        <Button skin={styles.buttonSkin} body={styles.buttonBody} onPress={onEdit}>
          <Icon font='Feather' name='edit' size='2vh' color={ACCENT_COLOR} />
        </Button>
      </View>
    </View>
  );
}
