import {View, Text, Separator} from 'components';
import {accentColor} from 'constants/styles';
import {connect} from 'react-redux';
import Icon from 'react-web-vector-icons';
import styles from './.module.css';

function PageNotExist({dispatch}) {
  return (
    <View style={styles.mainPane}>
      <View style={styles.bodyPane}>
        <Icon
          font='AntDesign'
          name='disconnect'
          size='50px'
          color={accentColor}
        />
        <Separator vertical={15} />
        <Text style={styles.title}>Page Not Found</Text>
        <Separator vertical={5} />
        <Text style={styles.subtitle}>
          The link you provide is broken, Please be sure the link is correct
        </Text>
      </View>
    </View>
  );
}

const dispatchProps = dispatch => ({
  dispatch: action => dispatch(action),
});

export default connect(null, dispatchProps)(PageNotExist);
