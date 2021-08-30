import {View, Text, Separator, Button} from 'components';
import {useEffect} from 'react';
import {connect} from 'react-redux';

import ProductList from './components/ProductList';
import styles from './.module.css';
import PurchasingListItem from './components/PurchasingListItem';

function Transaction({user}) {
  useEffect(() => {}, []);
  return (
    <View style={styles.mainPane}>
      <View style={styles.topPane}>
        <Text style={styles.title}>Coffee</Text>
        <Separator vertical={0.5} />
        <ProductList />
        <Separator vertical={1.5} />
        <Text style={styles.title}>Non-Coffee</Text>
        <Separator vertical={0.5} />
        <ProductList />
      </View>
      <Separator vertical={1.5} />
      <View style={styles.bodyPane}>
        <Text style={styles.title}>Invoice</Text>
        <Separator vertical={0.5} />
        <PurchasingListItem />
      </View>
      <View style={styles.bottomPane}>
        <Button title='PURCHASE' titleStyle={styles.buttonText} skin={styles.button} />
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
