import {Button, View} from 'components';
import styles from './.module.css';

export default function PrimaryDialog({visible, children, onTouchOutside}) {
  return (
    <>
      {visible && (
        <View style={styles.mainPane}>
          <Button skin={styles.touchOutside} onPress={onTouchOutside} />
          {children}
        </View>
      )}
    </>
  );
}
