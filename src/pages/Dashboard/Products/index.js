import {useContext, useEffect} from 'react';
import {connect} from 'react-redux';
import {Button, Icon, Separator, Text, View, SearchField, Dialog} from 'components';
import {ACCENT_COLOR} from 'constants/colors';
import {PrimaryDialog, SecondaryDialog, Toast} from 'context';
import {
  CLEAR_ERROR,
  POP_PRODUCT,
  PUSH_PRODUCT_REQ,
  SET_INDEX_PRODUCTS_REQ,
} from 'ducks/actions';
import ProductList from './components/ProductList';
import Product from './modals/Product';
import styles from './.module.css';
import Formatter from 'utils/Formatter';

function Transaction({products: {products}, dispatch, loading, error}) {
  const {onShow: onShowPrimaryDialog, onHide: onHidePrimaryDialog} =
    useContext(PrimaryDialog);
  const {onShow: onShowSecondaryDialog, onHide: onHideSecondaryDialog} =
    useContext(SecondaryDialog);
  const {onShow: onShowToast} = useContext(Toast);

  const onClick = (actionType, value) => {
    if (actionType === 'on-click-add-product-dialog') {
      onShowPrimaryDialog(
        <Product
          type='add'
          product={value}
          onAdd={product => onClick('on-click-add-product', product)}
          onCancel={onHidePrimaryDialog}
        />,
      );
      return;
    }
    if (actionType === 'on-click-edit-product-dialog') {
      onShowPrimaryDialog(
        <Product
          type='edit'
          product={value}
          onUpdate={product => onClick('on-click-update-product', product)}
          onDelete={product => onClick('on-click-delete-product', product)}
          onCancel={onHidePrimaryDialog}
        />,
      );
      return;
    }

    //CRUD
    if (actionType === 'on-click-add-product') {
      dispatch(PUSH_PRODUCT_REQ({product: value}));
      return;
    }
    if (actionType === 'on-click-update-product') {
      dispatch(SET_INDEX_PRODUCTS_REQ({product: value}));
    }
    if (actionType === 'on-click-delete-product') {
      onShowSecondaryDialog(
        <Dialog
          title='Delete'
          content={`do you want to delete ${Formatter.toName(value.name)}?`}
          positiveText='Yes'
          onClickPositive={() => dispatch(POP_PRODUCT({product: value}))}
          negativeText='No'
          onClickNegative={onHideSecondaryDialog}
        />,
      );
    }
  };

  const screenInitListener = () => {
    document.title = 'Broowing Coffee | Products';
  };
  const productListener = () => {};
  const successListener = () => {
    if (
      !loading.status &&
      (loading.message.includes('push-product-resolve') ||
        loading.message.includes('set-product-resolve') ||
        loading.message.includes('pop-product-resolve'))
    ) {
      onHidePrimaryDialog();
      onHideSecondaryDialog();
    }
  };
  const errorListener = () => {
    if (error.product) {
      onShowToast(error.product, null, () => {
        dispatch(CLEAR_ERROR());
      });
    }
  };
  useEffect(screenInitListener, []);
  useEffect(productListener, [products]);
  useEffect(successListener, [loading]);
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
        <ProductList
          products={products}
          onEdit={product => onClick('on-click-edit-product-dialog', product)}
        />
      </View>
      <View style={styles.bottomPane}></View>
    </View>
  );
}

const stateProps = ({products, loading, error}) => ({
  products,
  loading,
  error,
});

const dispatchProps = dispatch => ({
  dispatch: action => dispatch(action),
});

export default connect(stateProps, dispatchProps)(Transaction);
