import {Button, Icon, Separator, Text, View} from 'components';
import {ACCENT_COLOR} from 'constants/colors';
import {isArray} from 'utils/checker';
import Formatter from 'utils/Formatter';
import {getPropsValues, onCleanName, onFormat} from 'utils/helper';

import styles from './.module.css';

export default function ProductItem({product, onEdit}) {
  const {name, based} = product;

  return (
    <View style={styles.mainPane} role='button'>
      <Text style={styles.title}>{`${Formatter.toName(name)} (${based})`}</Text>
      <Button
        skin={styles.buttonEdit}
        onPress={evt => {
          evt.stopPropagation();
          onEdit();
        }}>
        <Icon font='Feather' name='edit' size='2.25vh' color={ACCENT_COLOR} />
      </Button>
    </View>
  );
}
