import {useEffect} from 'react';
import {View, Text, Separator} from 'components';
import {connect} from 'react-redux';
import styles from './.module.css';

function Transaction({user}) {
  const screenInitListener = () => {
    document.title = 'Broowing Coffee | Statistics';
  };
  useEffect(screenInitListener, []);
  return (
    <View style={styles.mainPane}>
      <View style={styles.bodyPane}>
        <Text style={styles.title}>STATISTICS</Text>
        <Separator vertical={0.5} />
        <Text style={styles.subtitle}>{`Welcome to Broowing Coffeee`}</Text>
      </View>
    </View>
  );
}

const stateProps = ({user}) => ({
  user,
});

const dispatchProps = dispatch => ({
  dispatch: action => dispatch(action),
});

export default connect(stateProps, dispatchProps)(Transaction);
