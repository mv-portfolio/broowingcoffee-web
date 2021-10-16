import {Button, Separator, Text, View} from 'components';
import Formatter from 'utils/Formatter';
import styles from './.module.css';

export default function Dialog({
  title,
  content,
  positiveButtonStyle,
  positiveText,
  onClickPositive,
  negativeText,
  onClickNegative,
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
          onPress={onClickPositive}
        />
        {negativeText && (
          <>
            <Separator horizontal={1} />
            <Button
              title={negativeText || 'Cancel'}
              titleStyle={styles.buttonText}
              skin={styles.button}
              onPress={onClickNegative}
            />
          </>
        )}
      </View>
    </View>
  );
}
