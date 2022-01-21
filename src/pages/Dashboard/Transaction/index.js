import {useContext, useEffect} from 'react';
import {connect} from 'react-redux';
import {View, Text, Separator, Button} from 'components';
import {PrimaryDialog, SecondaryDialog, Toast} from 'context';
import {CLEAR_ERROR, CLEAR_LOADING} from 'ducks/actions';
import ProductList from './components/ProductList';
import PurchasingListItem from './components/PurchasingListItem';
import Purchase from './modals/Purchase';
import styles from './.module.css';

function Transaction({
  dispatch,
  purchasingProducts,
  products: reduxProduct = {products: []},
  loading,
  error,
}) {
  const {onShow: onShowPrimaryDialog, onHide: onHidePrimaryDialog} =
    useContext(PrimaryDialog);
  const {onShow: onShowSecondaryDialog, onHide: onHideSecondaryDialog} =
    useContext(SecondaryDialog);
  const {onShow: onShowToast, onHide: onHideToast} = useContext(Toast);

  const onClick = (actionType, value) => {
    //INIT DIALOG
  };
  const showDialog = ({type, productInfo, onAdd, onUpdate, onDelete}) => {
    onShowPrimaryDialog(
      <Purchase
        type={type}
        initAddons={products.addons}
        productInfo={productInfo}
        onAdd={onAdd}
        onUpdate={onUpdate}
        onDelete={onDelete}
        onCancel={() => {
          onHidePrimaryDialog();
          onHideToast();
        }}
      />,
    );
  };

  const screenInitListener = () => {
    document.title = 'Broowing Coffee | Transaction';
  };
  const errorListener = () => {
    if (error.transaction && error.transaction !== 'jwt expired') {
      onHidePrimaryDialog();
      onShowToast(error.transaction, undefined, () => {
        dispatch(CLEAR_ERROR());
      });
    }
  };
  const dialogListener = () => {
    const {status, message} = loading;
    if (!status && message === 'transaction-success') {
      onHidePrimaryDialog();
      onHideSecondaryDialog();
      onShowToast('Transaction Complete', undefined, () => {
        dispatch(CLEAR_LOADING());
      });
    }
  };
  useEffect(screenInitListener, []);
  useEffect(errorListener, [error]);
  useEffect(dialogListener, [loading]);

  return (
    <View style={styles.mainPane}>
      <View style={styles.topPane}>
        <Text style={styles.title}>Coffee</Text>
        <Separator vertical={0.5} />
        <ProductList />
        <Separator vertical={1} />
        <Text style={styles.title}>Non-Coffee</Text>
        <Separator vertical={0.5} />
        <ProductList />
      </View>
      <Separator vertical={1} />
      <View style={styles.bodyPane}>
        <View style={styles.headerBodyPane}>
          <Text style={styles.title}>Invoice</Text>
          <Button
            title='CLEAR ALL'
            titleStyle={styles.buttonClearText}
            skin={styles.buttonClearSkin}
            body={styles.buttonClearBody}
            onPress={() => onClick('on-click-clear-purchasing-products')}
          />
        </View>
        <Separator vertical={0.5} />
        <PurchasingListItem />
      </View>
      <View style={styles.bottomPane}>
        <Button
          title='PURCHASE'
          titleStyle={styles.buttonText}
          skin={styles.button}
          onPress={() => onClick('on-click-purchase')}
        />
      </View>
    </View>
  );
}

const stateProps = ({user, products, purchasingProducts, error, loading}) => ({
  user,
  products,
  purchasingProducts,
  error,
  loading,
});

const dispatchProps = dispatch => ({
  dispatch: action => dispatch(action),
});

export default connect(stateProps, dispatchProps)(Transaction);
