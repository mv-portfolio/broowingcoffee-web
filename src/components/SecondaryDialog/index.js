import {Button, View} from 'components';
import styles from './.module.css';

export default function SecondaryDialog({
  visible,
  children,
  disabledTouchOutside,
  onTouchOutside,
}) {
  return (
    <>
      {visible && (
        <View style={styles.mainPane}>
          <Button
            skin={styles.touchOutside}
            disabled={disabledTouchOutside}
            onPress={onTouchOutside}
          />
          {children}
        </View>
      )}
    </>
  );
}
