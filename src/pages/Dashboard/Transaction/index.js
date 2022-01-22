import {useContext, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {View, Text, Separator, Button, Dropdown} from 'components';
import {PrimaryDialog, SecondaryDialog, Toast} from 'context';
import {CLEAR_ERROR, CLEAR_LOADING} from 'ducks/actions';
import ProductList from './components/ProductList';
import PurchasingListItem from './components/PurchasingListItem';
import Purchase from './modals/Purchase';
import styles from './.module.css';
import {ACCENT_COLOR} from 'constants/colors';
import {getBasesName} from 'utils/helper';

function Transaction({
  dispatch,
  purchasingProducts,
  products: {products},
  productBase: {bases},
  loading,
  error,
}) {
  const {onShow: onShowPrimaryDialog, onHide: onHidePrimaryDialog} =
    useContext(PrimaryDialog);
  const {onShow: onShowSecondaryDialog, onHide: onHideSecondaryDialog} =
    useContext(SecondaryDialog);
  const {onShow: onShowToast, onHide: onHideToast} = useContext(Toast);
  const [type, setType] = useState('');

  const onClick = (actionType, value) => {};
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
        <View style={styles.headerTopPane}>
          <Text style={styles.title}>Products</Text>
          <Dropdown
            style={styles.dropdownBased}
            textStyle={styles.dropdownBasedText}
            placeholderStyle={styles.dropdownBasedPlaceholder}
            listStyle={styles.dropdownBasedList}
            placeholder='Types...'
            accentColor={ACCENT_COLOR}
            items={getBasesName(bases)}
            selected={type || getBasesName(bases)[0]}
            onSelected={selected => setType(selected)}
          />
        </View>
        <ProductList
          products={products.filter(product => product.based === `${type}`.toLowerCase())}
          onSelectProduct={product => console.log(product)}
        />
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

const stateProps = ({
  user,
  products,
  productBase,
  purchasingProducts,
  error,
  loading,
}) => ({
  user,
  products,
  productBase,
  purchasingProducts,
  error,
  loading,
});

const dispatchProps = dispatch => ({
  dispatch: action => dispatch(action),
});

export default connect(stateProps, dispatchProps)(Transaction);
