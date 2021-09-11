import {Button, Separator, Text, View} from 'components';
import Formatter from 'utils/Formatter';
import styles from './.module.css';

export default function Dialog({
  type,
  title,
  content,
  positiveButtonStyle,
  positiveText,
  onPositive,
  negativeText,
  onNegative,
}) {
  return (
    <View style={styles.mainPane}>
      <View style={styles.topPane}>
        <Text style={styles.title}>{Formatter.toName(title)}</Text>
        <Text style={styles.content}>{content}</Text>
      </View>
      <View style={styles.bodyPane}>
        <Button
          title={positiveText || 'Okay'}
          titleStyle={styles.buttonText}
          defaultStyle={positiveButtonStyle}
          skin={styles.button}
          onPress={onPositive}
        />
        {type === 'conditional' && (
          <>
            <Separator horizontal={1} />
            <Button
              title={negativeText || 'Cancel'}
              titleStyle={styles.buttonText}
              skin={styles.button}
              onPress={onNegative}
            />
          </>
        )}
      </View>
    </View>
  );
}
