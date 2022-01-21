import {Button, Icon, Separator, Text, View} from 'components';
import {ACCENT_COLOR2} from 'constants/colors';
import Formatter from 'utils/Formatter';
import {getAbbreviationUnit} from 'utils/helper';
import styles from './.module.css';

export default function Item({
  item: {
    consume,
    _id_item: {name, type, perishable_properties},
  },
  onRemove,
}) {
  return (
    <View style={styles.mainPane}>
      <View style={styles.leftPane}>
        <Text style={styles.name}>{Formatter.toName(name)}</Text>
        <Separator horizontal={0.5} />
        <Text style={styles.consume}>
          {consume}{' '}
          {type === 'perishable'
            ? `${getAbbreviationUnit(perishable_properties.unit_type)}`
            : 'quantity'}
        </Text>
      </View>
      <Button skin={styles.buttonDelete} onPress={onRemove}>
        <Icon font='AntDesign' name='delete' size='2vh' color={ACCENT_COLOR2} />
      </Button>
    </View>
  );
}
