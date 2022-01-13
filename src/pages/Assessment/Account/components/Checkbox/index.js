import {Button, Icon, Separator, Text} from 'components';
import {ACCENT_COLOR, BACKGROUND_COLOR, DIRTY_WHITE, WHITE} from 'constants/colors';
import {hp} from 'utils/helper';

import styles from './.module.css';

export default function Checkbox({isDisabled, isCheck, text, onPress}) {
  const getStatus = status => {
    if (status) {
      return (
        <Icon font='Feather' name='check-square' size={hp(2.5)} color={ACCENT_COLOR} />
      );
    }
    return <Icon font='Feather' name='square' size={hp(2.5)} color={DIRTY_WHITE} />;
  };

  return (
    <Button
      skin={styles.mainPane}
      body={styles.bodyPane}
      disabled={!isDisabled}
      defaultStyle={{opacity: !isDisabled ? '0.5' : '1'}}
      onPress={onPress}>
      {getStatus(isCheck)}
      <Separator horizontal={1} />
      <Text style={styles.text}>{text}</Text>
    </Button>
  );
}
