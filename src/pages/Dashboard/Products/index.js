import {useContext, useEffect} from 'react';
import {connect} from 'react-redux';
import {Button, Icon, Separator, Text, View, SearchField} from 'components';
import {ACCENT_COLOR} from 'constants/colors';
import {PrimaryDialog, Toast} from 'context';
import {CLEAR_ERROR} from 'ducks/actions';
import ProductList from './components/ProductList';
import Product from './modals/Product';
import styles from './.module.css';

function Transaction({products: reduxProducts = {products: []}, dispatch, error}) {
  const {onShow: onShowPrimaryDialog, onHide: onHidePrimaryDialog} =
    useContext(PrimaryDialog);
  const {onShow: onShowToast} = useContext(Toast);

  const onClick = (actionType, value) => {
    if (actionType === 'on-click-add-product-dialog') {
      onShowPrimaryDialog(
        <Product type='add' product={value} onCancel={onHidePrimaryDialog} />,
      );
    }
  };

  const screenInitListener = () => {
    document.title = 'Broowing Coffee | Products';
  };
  const productListener = () => {};
  const errorListener = () => {
    if (error.product) {
      onShowToast(error.product, null, () => {
        dispatch(CLEAR_ERROR());
      });
    }
  };
  useEffect(screenInitListener, [reduxProducts]);
  useEffect(productListener, [reduxProducts]);
  useEffect(errorListener, [error]);

  return (
    <View style={styles.mainPane}>
      <View style={styles.bodyPane}>
        <View style={styles.headerPane}>
          <Text style={styles.label}></Text>
          <View style={styles.actionPane}>
            <SearchField />
            <Separator horizontal={0.4} />
            <Button
              skin={styles.headerButtons}
              onPress={() => onClick('on-click-add-product-dialog')}>
              <Icon font='Feather' name='plus' color={ACCENT_COLOR} size='3vh' />
            </Button>
          </View>
        </View>
        <Separator vertical={0.25} />
        <ProductList />
      </View>
      <View style={styles.bottomPane}></View>
    </View>
  );
}

const stateProps = ({user, products, inventory, purchasingProducts, error}) => ({
  user,
  products,
  error,
});

const dispatchProps = dispatch => ({
  dispatch: action => dispatch(action),
});

export default connect(stateProps, dispatchProps)(Transaction);
