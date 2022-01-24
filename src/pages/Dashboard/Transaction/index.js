import {useContext, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {View, Text, Separator, Button, Dropdown, Dialog} from 'components';
import {PrimaryDialog, SecondaryDialog, Toast} from 'context';
import {ACCENT_COLOR} from 'constants/colors';
import {getBasesName} from 'utils/helper';
import {
  CLEAR_ERROR,
  CLEAR_LOADING,
  CLEAR_PURCHASING_PRODUCTS,
  POP_PURCHASING_PRODUCT,
  PUSH_PURCHASING_PRODUCT,
  SET_INDEX_PURCHASING_PRODUCT,
} from 'ducks/actions';
import PurchasingListItem from './components/PurchasingListItem';
import ProductList from './components/ProductList';
import PrePurchase from './modals/PrePurchase';
import styles from './.module.css';

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

  const onClick = (actionType, value) => {
    if (actionType === 'on-click-add-product-dialog') {
      onShowPrimaryDialog(
        <PrePurchase
          type='add'
          product={value}
          onAdd={product => onClick('on-add-purchasing-product', product)}
          onCancel={onHidePrimaryDialog}
        />,
      );
    }
    if (actionType === 'on-click-edit-purchasing-product') {
      onShowPrimaryDialog(
        <PrePurchase
          type='edit'
          product={products.filter(product => product.name === value._id_product.name)[0]}
          purchasingProduct={value}
          onUpdate={product => onClick('on-update-purchasing-product', product)}
          onDelete={product => onClick('on-delete-purchasing-product', product)}
          onCancel={onHidePrimaryDialog}
        />,
      );
    }
    if (actionType === 'on-click-clear-all-purchasing-products') {
      if (!purchasingProducts.length) return;
      onShowPrimaryDialog(
        <Dialog
          title='CLEAR ALL'
          content='Do you want to clear all purchasing product?'
          positiveText='Y es'
          onClickPositive={() => {
            dispatch(CLEAR_PURCHASING_PRODUCTS());
            onHidePrimaryDialog();
          }}
          negativeText='No'
          onClickNegative={onHidePrimaryDialog}
        />,
      );
    }

    //CRUD
    if (actionType === 'on-add-purchasing-product') {
      onHidePrimaryDialog();
      if (value.numAvail > 1) {
        let temp_purchasingProducts = [];
        for (let num = 0; num < value.numAvail; num++) {
          temp_purchasingProducts.push({...value, id: num + 1});
        }
        dispatch(PUSH_PURCHASING_PRODUCT({purchasingProduct: temp_purchasingProducts}));
        return;
      }
      dispatch(PUSH_PURCHASING_PRODUCT({purchasingProduct: value}));
    }
    if (actionType === 'on-update-purchasing-product') {
      dispatch(SET_INDEX_PURCHASING_PRODUCT({purchasingProduct: value}));
      onHidePrimaryDialog();
    }
    if (actionType === 'on-delete-purchasing-product') {
      dispatch(POP_PURCHASING_PRODUCT({purchasingProduct: value}));
      onHidePrimaryDialog();
    }
  };

  const screenInitListener = () => {
    document.title = 'Broowing Coffee | Transaction';
  };
  const baseListener = () => {
    setType(getBasesName(bases)[0]);
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
  useEffect(screenInitListener, [purchasingProducts]);
  useEffect(baseListener, [bases]);
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
          onSelectProduct={product => onClick('on-click-add-product-dialog', product)}
        />
      </View>
      <Separator vertical={1} />
      <View style={styles.bodyPane}>
        <View style={styles.headerBodyPane}>
          <Text style={styles.title}>
            Invoice
            {purchasingProducts.length > 0
              ? ` (${purchasingProducts.length} item${
                  purchasingProducts.length > 1 ? 's' : ''
                })`
              : ''}
          </Text>
          <Button
            title='CLEAR ALL'
            titleStyle={styles.buttonClearText}
            skin={styles.buttonClearSkin}
            body={styles.buttonClearBody}
            onPress={() => onClick('on-click-clear-all-purchasing-products')}
          />
        </View>
        <Separator vertical={0.5} />
        <PurchasingListItem
          purchasingProducts={purchasingProducts}
          onEdit={purchasingProduct =>
            onClick('on-click-edit-purchasing-product', purchasingProduct)
          }
        />
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
