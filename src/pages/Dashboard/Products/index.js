import {View, Text, Separator} from 'components';
import {useEffect} from 'react';
import {connect} from 'react-redux';
import styles from './.module.css';

function Transaction({user}) {
  useEffect(() => {}, []);
  return (
    <View style={styles.mainPane}>
      <View style={styles.bodyPane}>
        <Text style={styles.title}>PRODUCTS</Text>
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
