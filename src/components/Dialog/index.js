import {Button, Separator, Text, View} from 'components';
import {connect} from 'react-redux';
import Formatter from 'utils/Formatter';
import styles from './.module.css';

function Dialog({
  title,
  content,
  positiveButtonStyle,
  positiveText,
  onClickPositive,
  negativeText,
  onClickNegative,
  neutralText,
  onClickNeutral,
  loading,
}) {
  return (
    <View style={styles.mainPane}>
      <View style={styles.topPane}>
        <Text style={styles.title}>{Formatter.toName(title)}</Text>
        <Separator vertical={0.5} />
        <Text style={styles.content}>{content}</Text>
      </View>
      <View style={styles.bodyPane}>
        <Button
          title={positiveText || 'Okay'}
          titleStyle={styles.buttonText}
          isLoading={loading.status}
          defaultStyle={positiveButtonStyle}
          skin={styles.button}
          onPress={onClickPositive}
        />
        {negativeText && (
          <>
            <Separator horizontal={0.5} />
            <Button
              title={negativeText || 'Cancel'}
              titleStyle={styles.buttonText}
              disabled={loading.status}
              skin={styles.button}
              onPress={onClickNegative}
            />
          </>
        )}
        {neutralText && (
          <>
            <Separator horizontal={0.5} />
            <Button
              title={neutralText}
              titleStyle={styles.buttonText}
              disabled={loading.status}
              skin={styles.button}
              onPress={onClickNeutral}
            />
          </>
        )}
      </View>
    </View>
  );
}

const stateProps = ({loading}) => ({
  loading,
});
const dispatchProps = dispatch => ({
  dispatch: action => dispatch(action),
});
export default connect(stateProps, dispatchProps)(Dialog);
