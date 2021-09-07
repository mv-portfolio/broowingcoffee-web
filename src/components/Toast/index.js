import {Text, View} from 'components';
import styles from './.module.css';
export default function Toast({message, isVisible}) {
  return (
    <>
      {isVisible && (
        <View style={styles.mainPane}>
          <Text style={styles.message}>{message}</Text>
        </View>
      )}
    </>
  );
}
