import {useContext, useEffect} from 'react';
import {connect} from 'react-redux';
import {View, Text, Separator, Button} from 'components';
import {PrimaryDialog, Toast} from 'context';
import {
  CLEAR_ERROR,
  CLEAR_PURCHASING_PRODUCTS,
  POP_PURCHASING_PRODUCT,
  PUSH_PURCHASING_PRODUCT,
  PUSH_TRANSACTIONS,
  SET_INDEX_PURCHASING_PRODUCT,
} from 'modules/actions';
import Details from './modals/Details';
import ProductList from './components/ProductList';
import PurchasingListItem from './components/PurchasingListItem';
import Purchase from './modals/Purchase';
import styles from './.module.css';

function Transaction({purchasingProducts, products, error, dispatch}) {
  const {onShow: onShowPrimaryDialog, onHide: onHidePrimaryDialog} =
    useContext(PrimaryDialog);
  const {onShow: onShowToast, onHide: onHideToast} = useContext(Toast);

  const onClick = (actionType, value) => {
    //INIT DIALOG
    if (actionType === 'on-click-add-purchasing-product') {
      showDialog({
        type: 'add',
        productInfo: value,
        onAdd: productInfo => onClick('on-click-added-purchasing-product', productInfo),
      });
      return;
    }
    if (actionType === 'on-click-edit-purchasing-product') {
      showDialog({
        type: 'edit',
        productInfo: value,
        onUpdate: productInfo =>
          onClick('on-click-update-purchasing-product', productInfo),
        onDelete: id => onClick('on-click-delete-purchasing-product', id),
      });
      return;
    }
    //CRUD DIALOG
    if (actionType === 'on-click-added-purchasing-product') {
      dispatch(PUSH_PURCHASING_PRODUCT({purchasingProduct: value}));
      return;
    }
    if (actionType === 'on-click-update-purchasing-product') {
      dispatch(SET_INDEX_PURCHASING_PRODUCT({purchasingProduct: value}));
      return;
    }
    if (actionType === 'on-click-delete-purchasing-product') {
      dispatch(POP_PURCHASING_PRODUCT({purchasingProductId: value}));
      return;
    }
    if (actionType === 'on-click-clear-purchasing-products') {
      dispatch(CLEAR_PURCHASING_PRODUCTS());
    }
    if (actionType === 'on-click-purchase') {
      if (purchasingProducts.length) {
        onShowPrimaryDialog(
          <Details
            purchasingProducts={purchasingProducts}
            onEditSelectedPurchasingProduct={productInfo =>
              onClick('on-click-edit-purchasing-product', productInfo)
            }
            onPurchase={products => onClick('on-click-purchased', products)}
            onCancel={onHidePrimaryDialog}
          />,
        );
        return;
      }
    }
    if (actionType === 'on-click-purchased') {
      console.log(value);
      dispatch(PUSH_TRANSACTIONS({transaction: {...value}}));
      onHidePrimaryDialog();
    }
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

  const errorListener = () => {
    if (error.transaction) {
      onShowToast(error.transaction, undefined, () => {
        dispatch(CLEAR_ERROR());
      });
    }
  };
  useEffect(errorListener, [error]);

  return (
    <View style={styles.mainPane}>
      <View style={styles.topPane}>
        <Text style={styles.title}>Coffee</Text>
        <Separator vertical={0.5} />
        <ProductList
          products={products.main.filter(mainProd => mainProd.based === 'coffee')}
          onSelectProduct={productInfo =>
            onClick('on-click-add-purchasing-product', productInfo)
          }
        />
        <Separator vertical={1.5} />
        <Text style={styles.title}>Non-Coffee</Text>
        <Separator vertical={0.5} />
        <ProductList
          products={products.main.filter(mainProd => mainProd.based !== 'coffee')}
          onSelectProduct={productInfo =>
            onClick('on-click-add-purchasing-product', productInfo)
          }
        />
      </View>
      <Separator vertical={1.5} />
      <View style={styles.bodyPane}>
        <View style={styles.headerBodyPane}>
          <Text style={styles.title}>Invoice</Text>
          <Button
            title='CLEAR'
            titleStyle={styles.buttonClearText}
            skin={styles.buttonClear}
            onPress={() => onClick('on-click-clear-purchasing-products')}
          />
        </View>
        <Separator vertical={0.5} />
        <PurchasingListItem
          purchasingProducts={purchasingProducts}
          onEditSelectedPurchasingProduct={productInfo =>
            onClick('on-click-edit-purchasing-product', productInfo)
          }
        />
      </View>
      <Separator vertical={2} />
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

const stateProps = ({user, products, purchasingProducts, error}) => ({
  user,
  products,
  purchasingProducts,
  error,
});

const dispatchProps = dispatch => ({
  dispatch: action => dispatch(action),
});

export default connect(stateProps, dispatchProps)(Transaction);
