import {View, Text, Separator} from 'components';
import {useEffect} from 'react';
import {connect} from 'react-redux';
import Formatter from 'utils/Formatter';
import styles from './.module.css';

function Dashboard({user, dispatch}) {
  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <View style={styles.mainPane}>
      <View style={styles.bodyPane}>
        <Text style={styles.title}>{`${Formatter.toName(`${user.firstname} ${user.lastname}`)}`}</Text>
        <Separator vertical={5} />
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

export default connect(stateProps, dispatchProps)(Dashboard);
