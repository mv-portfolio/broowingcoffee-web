import {useContext, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Button, Icon, Separator, Text, View, SearchField, Dialog} from 'components';
import {ACCENT_COLOR, ACCENT_COLOR2} from 'constants/colors';
import {PrimaryDialog, SecondaryDialog, Toast} from 'context';
import {
  CLEAR_ERROR,
  CLEAR_PURCHASING_PRODUCTS,
  POP_PRODUCT,
  POP_PRODUCT_BASE,
  PUSH_PRODUCT_BASE_REQ,
  PUSH_PRODUCT_REQ,
  SET_INDEX_PRODUCTS_REQ,
} from 'ducks/actions';
import ProductList from './components/ProductList';
import Product from './modals/Product';
import styles from './.module.css';
import Formatter from 'utils/Formatter';
import BasedList from './components/BaseList';
import Base from './modals/Base';
import {ASC_NAME} from 'utils/helper';

function Transaction({
  purchasingProducts,
  products: {products: reduxProducts},
  productBase: {bases: reduxProductBases},
  dispatch,
  loading,
  error,
}) {
  const {onShow: onShowPrimaryDialog, onHide: onHidePrimaryDialog} =
    useContext(PrimaryDialog);
  const {onShow: onShowSecondaryDialog, onHide: onHideSecondaryDialog} =
    useContext(SecondaryDialog);
  const {onShow: onShowToast} = useContext(Toast);

  const [products, setProducts] = useState(reduxProducts || []);
  const [productBases, setProductBases] = useState(reduxProductBases || []);

  const [searchProducts, setSearchProducts] = useState('');
  const [searchProductBase, setSearchProductBase] = useState('');

  const onShowConditionalDialog = ({
    title,
    content,
    positiveText,
    onClickPositive,
    positiveButtonStyle,
  }) => {
    onShowSecondaryDialog(
      <Dialog
        title={title}
        content={content}
        positiveButtonStyle={positiveButtonStyle}
        positiveText={positiveText || 'Yes'}
        onClickPositive={onClickPositive}
        negativeText='No'
        onClickNegative={onHideSecondaryDialog}
      />,
    );
  };

  const onSearch = (array, setArray, value) => {
    let filtered = [];
    if (value.length !== 0) {
      filtered = array.filter(item => item.name.includes(value));
      setArray(filtered);
      return;
    }
    setArray(array);
  };
  const onChange = (actionType, value) => {
    if (actionType === 'on-change-search-products') {
      setSearchProducts(value);
      onSearch(reduxProducts, setProducts, value);
      return;
    }
    if (actionType === 'on-change-search-product-base') {
      setSearchProductBase(value);
      onSearch(reduxProductBases, setProductBases, value);
      return;
    }
  };
  const showPreventClearPurchasing = ({
    onClickPostive,
    positiveText,
    positiveButtonStyle,
  }) => {
    onShowSecondaryDialog(
      <Dialog
        title='Clear Invoice'
        content='Invoice has selected products, once you perform this action we will clear the invoice. Do you want to proceed?'
        positiveText={positiveText || 'Yes'}
        onClickPositive={onClickPostive}
        negativeText={'No'}
        positiveButtonStyle={positiveButtonStyle}
        onClickNegative={onHideSecondaryDialog}
      />,
    );
  };
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
      onShowConditionalDialog({
        title: `Add Product`,
        content: `Make sure all inputs and perishable properties are double checked. Do you want to proceed?`,
        onClickPositive: () => dispatch(PUSH_PRODUCT_REQ({product: value})),
      });
      return;
    }
    if (actionType === 'on-click-update-product') {
      if (purchasingProducts.length) {
        showPreventClearPurchasing({
          onClickPostive: () => {
            dispatch(CLEAR_PURCHASING_PRODUCTS());
            dispatch(SET_INDEX_PRODUCTS_REQ({product: value}));
          },
        });
        return;
      }
      onShowConditionalDialog({
        title: `Update Product`,
        content: `Make sure all inputs and perishable properties are double checked. Do you want to proceed?`,
        onClickPositive: () => dispatch(SET_INDEX_PRODUCTS_REQ({product: value})),
      });
    }
    if (actionType === 'on-click-delete-product') {
      if (purchasingProducts.length) {
        showPreventClearPurchasing({
          onClickPostive: () => {
            dispatch(CLEAR_PURCHASING_PRODUCTS());
            dispatch(POP_PRODUCT({product: value}));
          },
        });
        return;
      }
      onShowConditionalDialog({
        title: 'Delete',
        content: `Do you want to delete ${Formatter.toName(value.name)}?`,
        onClickPositive: () => dispatch(POP_PRODUCT({product: value})),
        positiveButtonStyle: {backgroundColor: ACCENT_COLOR2},
      });
    }
    if (actionType === 'on-click-add-base') {
      dispatch(PUSH_PRODUCT_BASE_REQ({base: value}));
      return;
    }
    if (actionType === 'on-click-delete-base') {
      onShowPrimaryDialog(
        <Dialog
          title='Delete'
          content={`Are you sure you want to delete ${value.name}`}
          positiveText='Yes'
          onClickPositive={() => onClick('on-click-yes-dialog-delete-base', value)}
          negativeText='No'
          onClickNegative={onHidePrimaryDialog}
        />,
      );
      return;
    }

    //dialogx
    if (actionType === 'on-click-yes-dialog-delete-base') {
      if (purchasingProducts.length) {
        showPreventClearPurchasing({
          onClickPostive: () => {
            dispatch(CLEAR_PURCHASING_PRODUCTS());
            dispatch(POP_PRODUCT_BASE({base: value}));
          },
        });
        return;
      }
      dispatch(POP_PRODUCT_BASE({base: value}));
    }
  };

  const screenInitListener = () => {
    document.title = 'Broowing Coffee | Products';
  };
  const productListener = () => {
    setProducts(reduxProducts);
  };
  const productBaseListener = () => {
    setProductBases(reduxProductBases);
  };
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
  useEffect(productListener, [reduxProducts]);
  useEffect(productBaseListener, [reduxProductBases]);
  useEffect(successListener, [loading]);
  useEffect(errorListener, [error]);

  return (
    <View style={styles.mainPane}>
      <View style={styles.bodyPane}>
        <View style={styles.headerPane}>
          <Text style={styles.title}>Products</Text>
          <View style={styles.rightPane}>
            <SearchField
              placeholder='name'
              value={searchProducts}
              onChangeText={text => onChange('on-change-search-products', text)}
            />
            <Button
              skin={styles.headerButtons}
              onPress={() => onClick('on-click-add-product-dialog')}>
              <Icon font='Feather' name='plus' color={ACCENT_COLOR} size='2.5vh' />
            </Button>
          </View>
        </View>
        <Separator vertical={0.25} />
        <ProductList
          products={products.sort(ASC_NAME)}
          onEdit={product => onClick('on-click-edit-product-dialog', product)}
        />
        <Separator vertical={1} />
        <View style={styles.headerPane}>
          <Text style={styles.title}>Product Base</Text>
          <View style={styles.rightPane}>
            <SearchField
              placeholder='name'
              value={searchProductBase}
              onChangeText={text => onChange('on-change-search-product-base', text)}
            />
            <Button
              skin={styles.headerButtons}
              onPress={() => onClick('on-click-add-based')}>
              <Icon font='Feather' name='plus' color={ACCENT_COLOR} size='2.5vh' />
            </Button>
          </View>
        </View>
        <Separator vertical={0.25} />
        <BasedList
          items={productBases}
          onDelete={item => onClick('on-click-delete-base', item)}
        />
      </View>
      <View style={styles.bottomPane}></View>
    </View>
  );
}

const stateProps = ({purchasingProducts, products, productBase, loading, error}) => ({
  purchasingProducts,
  products,
  productBase,
  loading,
  error,
});

const dispatchProps = dispatch => ({
  dispatch: action => dispatch(action),
});

export default connect(stateProps, dispatchProps)(Transaction);
