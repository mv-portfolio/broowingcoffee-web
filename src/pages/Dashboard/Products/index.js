import {useContext, useEffect} from 'react';
import {connect} from 'react-redux';
import {Button, Icon, Separator, Text, View, SearchField, Dialog} from 'components';
import {ACCENT_COLOR} from 'constants/colors';
import {PrimaryDialog, SecondaryDialog, Toast} from 'context';
import {
  CLEAR_ERROR,
  POP_PRODUCT,
  POP_PRODUCT_BASE,
  PUSH_PRODUCT_BASE_REQ,
  PUSH_PRODUCT_REQ,
} from 'ducks/actions';
import ProductList from './components/ProductList';
import Product from './modals/Product';
import styles from './.module.css';
import Formatter from 'utils/Formatter';
import BasedList from './components/BaseList';
import Base from './modals/Base';

function Transaction({
  products: {products},
  productBase: {bases},
  dispatch,
  loading,
  error,
}) {
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
    if (actionType === 'on-click-add-based') {
      onShowPrimaryDialog(<Base onAdd={item => onClick('on-click-add-base', item)} />, {
        disabledTouchOutside: false,
      });
      return;
    }

    //CRUD
    if (actionType === 'on-click-add-product') {
      dispatch(PUSH_PRODUCT_REQ({product: value}));
      return;
    }
    if (actionType === 'on-click-update-product') {
      console.log('--->', value);
      // dispatch(SET_INDEX_PRODUCTS_REQ({product: value}));
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
    if (actionType === 'on-click-add-base') {
      dispatch(PUSH_PRODUCT_BASE_REQ({base: value}));
      return;
    }
    if (actionType === 'on-click-delete-base') {
      onShowPrimaryDialog(
        <Dialog
          title='Delete'
          content={`are you sure you want to delete ${value.name}`}
          positiveText='Yes'
          onClickPositive={() => dispatch(POP_PRODUCT_BASE({base: value}))}
          negativeText='No'
          onClickNegative={onHidePrimaryDialog}
        />,
      );
      return;
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
        loading.message.includes('pop-product-resolve') ||
        loading.message.includes('push-product-base-resolve') ||
        loading.message.includes('pop-product-base-resolve'))
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
          <Text style={styles.title}>Products</Text>
          <View style={styles.rightPane}>
            <SearchField placeholder='name' onChangeText={text => console.log(text)} />
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
        <Separator vertical={1} />
        <View style={styles.headerPane}>
          <Text style={styles.title}>Product Base</Text>
          <View style={styles.rightPane}>
            <SearchField placeholder='name' />
            <Button
              skin={styles.headerButtons}
              onPress={() => onClick('on-click-add-based')}>
              <Icon font='Feather' name='plus' color={ACCENT_COLOR} size='3vh' />
            </Button>
          </View>
        </View>
        <Separator vertical={0.25} />
        <BasedList
          items={bases}
          onDelete={item => onClick('on-click-delete-base', item)}
        />
      </View>
      <View style={styles.bottomPane}></View>
    </View>
  );
}

const stateProps = ({products, productBase, loading, error}) => ({
  products,
  productBase,
  loading,
  error,
});

const dispatchProps = dispatch => ({
  dispatch: action => dispatch(action),
});

export default connect(stateProps, dispatchProps)(Transaction);
