import {useContext, useEffect, useState} from 'react';
import {Button, Dialog, Icon, Separator, Text, View, SearchField} from 'components';
import {accentColor, accentColor2} from 'constants/styles';
import {PrimaryDialog, Toast} from 'context';
import useHook, {productsInitState, products as productsReducer} from 'hooks';
import {connect} from 'react-redux';
import {ASC_NAME} from 'utils/helper';
import styles from './.module.css';
import ProductList from './components/ProductList';
import ProductMain from './modals/Main';
import ProductAddons from './modals/Addons';
import {
  POP_PRODUCT,
  CLEAR_ERROR,
  PUSH_PRODUCT,
  SET_INDEX_PRODUCTS,
} from 'modules/actions';
import Formatter from 'utils/Formatter';

function Transaction({
  products: reduxProducts = {main: [], addons: []},
  inventory: {items: inventoryitems},
  purchasingProducts,
  dispatch,
  error,
}) {
  const {onShow: onShowPrimaryDialog, onHide: onHidePrimaryDialog} =
    useContext(PrimaryDialog);
  const {onShow: onShowToast} = useContext(Toast);

  const [products, setProducts] = useState(reduxProducts || {main: [], addons: []});
  const [state, setState] = useHook(productsInitState, productsReducer);

  const onClick = (actionType, value) => {
    //show dialog actions
    if (actionType === 'on-click-add-product-main') {
      onShowProductDialog({
        typeProduct: 'main',
        type: 'add',
        onAdd: value => onClick('on-click-added-product-main', value),
      });
      return;
    }
    if (actionType === 'on-click-edit-product-main') {
      onShowProductDialog({
        typeProduct: 'main',
        type: 'edit',
        productInfo: value,
        onUpdate: value => onClick('on-click-update-product-main', value),
        onDelete: value => onClick('on-click-delete-product-main', value),
      });
      return;
    }
    if (actionType === 'on-click-search-product-main') {
      return;
    }
    if (actionType === 'on-click-add-product-addons') {
      onShowProductDialog({
        typeProduct: 'addons',
        type: 'add',
        onAdd: value => onClick('on-click-added-product-addons', value),
      });
      return;
    }
    if (actionType === 'on-click-edit-product-addons') {
      onShowProductDialog({
        typeProduct: 'addons',
        type: 'edit',
        productInfo: value,
        onUpdate: value => onClick('on-click-update-product-addons', value),
        onDelete: value => onClick('on-click-delete-product-addons', value),
      });
      return;
    }
    if (actionType === 'on-click-search-product-addons') {
      return;
    }
    //CRUD actions
    if (actionType === 'on-click-added-product-main') {
      dispatch(PUSH_PRODUCT({mainProduct: value}));
      return;
    }
    if (actionType === 'on-click-update-product-main') {
      dispatch(SET_INDEX_PRODUCTS({mainId: value.name, payload: value}));
      return;
    }
    if (actionType === 'on-click-delete-product-main') {
      let warnMessage = `you want to delete ${Formatter.toName(value)}?`;
      if (purchasingProducts.length !== 0) {
        warnMessage = `Invoice is not empty, once you performed this action, all current purchasing product(s) will clear, do you want to proceed?`;
      }
      onShowConditionalDeleteDialog({
        title: 'Product',
        content: warnMessage,
        value: {type: 'main', filter: value},
      });
      return;
    }
    if (actionType === 'on-click-added-product-addons') {
      dispatch(PUSH_PRODUCT({addonProduct: value}));
      return;
    }
    if (actionType === 'on-click-update-product-addons') {
      dispatch(SET_INDEX_PRODUCTS({addonId: value.name, payload: value}));
      return;
    }
    if (actionType === 'on-click-delete-product-addons') {
      let warnMessage = `you want to delete ${Formatter.toName(value)}?`;
      if (purchasingProducts.length !== 0) {
        warnMessage = `Invoice is not empty, once you performed this action, all current purchasing product(s) will clear, do you want to proceed?`;
      }
      onShowConditionalDeleteDialog({
        title: 'Addons',
        content: warnMessage,
        value: {type: 'add-ons', filter: value},
      });
      return;
    }
    //DIALOG
    if (actionType === 'on-click-delete-dialog-positive') {
      const {type, filter} = value;
      if (type === 'add-ons') {
        dispatch(POP_PRODUCT({addonId: filter}));
      }
      if (type === 'main') {
        dispatch(POP_PRODUCT({mainId: filter}));
      }
      onHidePrimaryDialog();
      return;
    }
  };
  const onChange = (actionType, value) => {
    if (actionType === 'on-change-search-product-main') {
      setState({type: 'set', main: value});
      onSearch('main', value);
      return;
    }
    if (actionType === 'on-change-search-product-addon') {
      setState({type: 'set', addon: value});
      onSearch('addons', value);
      return;
    }
  };
  const onSearch = (type, value) => {
    let filtered = [];
    let currentProducts = type === 'main' ? reduxProducts.main : reduxProducts.addons;

    if (value.length !== 0) {
      filtered = currentProducts.filter(product => product.name.includes(value));
      if (type === 'main') {
        setProducts(prev => ({...prev, main: filtered}));
        return;
      }
      setProducts(prev => ({...prev, addons: filtered}));
      return;
    }
    setProducts(reduxProducts);
  };

  const onShowProductDialog = ({
    type,
    typeProduct,
    productInfo,
    onAdd,
    onAddConsumables,
    onDeleteConsumables,
    onUpdate,
    onDelete,
  }) => {
    if (typeProduct === 'main') {
      onShowPrimaryDialog(
        <ProductMain
          type={type}
          productInfo={productInfo}
          inventory={inventoryitems}
          onAdd={onAdd}
          onAddConsumables={onAddConsumables}
          onDeleteConsumables={onDeleteConsumables}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onCancel={onHidePrimaryDialog}
        />,
      );
      return;
    }
    onShowPrimaryDialog(
      <ProductAddons
        type={type}
        productInfo={productInfo}
        onAdd={onAdd}
        onUpdate={onUpdate}
        onDelete={onDelete}
        onCancel={onHidePrimaryDialog}
      />,
    );
  };
  const onShowConditionalDeleteDialog = ({title, content, value}) => {
    onShowPrimaryDialog(
      <Dialog
        title={title}
        content={content}
        positiveText='Delete'
        positiveButtonStyle={{backgroundColor: accentColor2}}
        onClickPositive={() => onClick('on-click-delete-dialog-positive', value)}
        negativeText='No'
        onClickNegative={onHidePrimaryDialog}
      />,
    );
  };

  const initListener = () => {
    setProducts(reduxProducts);
  };
  const errorListener = () => {
    if (error.product) {
      onShowToast(error.product, undefined, () => {
        dispatch(CLEAR_ERROR());
      });
    }
  };
  useEffect(initListener, [reduxProducts]);
  useEffect(errorListener, [error]);

  return (
    <View style={styles.mainPane}>
      <View style={styles.topPane}>
        <View style={styles.headerPane}>
          <Text style={styles.label}>Main</Text>
          <View style={styles.actionPane}>
            <SearchField
              value={state.main}
              onChangeText={text => onChange('on-change-search-product-main', text)}
            />
            <Separator horizontal={0.4} />
            <Button
              skin={styles.headerButtons}
              onPress={() => onClick('on-click-add-product-main')}>
              <Icon font='Feather' name='plus' color={accentColor} size='3vh' />
            </Button>
          </View>
        </View>
        <Separator vertical={0.5} />
        <ProductList
          style={styles.productList}
          products={products.main.sort(ASC_NAME)}
          onEdit={product => onClick('on-click-edit-product-main', product)}
        />
      </View>
      <Separator vertical={1} />
      <View style={styles.bodyPane}>
        <View style={styles.headerPane}>
          <Text style={styles.label}>Addons</Text>
          <View style={styles.actionPane}>
            <SearchField
              value={state.addon}
              onChangeText={text => onChange('on-change-search-product-addon', text)}
            />
            <Separator horizontal={0.4} />
            <Button
              skin={styles.headerButtons}
              onPress={() => onClick('on-click-add-product-addons')}>
              <Icon font='Feather' name='plus' color={accentColor} size='3vh' />
            </Button>
          </View>
        </View>
        <Separator vertical={0.5} />
        <ProductList
          products={products.addons.sort(ASC_NAME)}
          onEdit={product => onClick('on-click-edit-product-addons', product)}
        />
      </View>
      <Separator vertical={1.5} />
    </View>
  );
}

const stateProps = ({user, products, inventory, purchasingProducts, error}) => ({
  user,
  products,
  inventory,
  purchasingProducts,
  error,
});

const dispatchProps = dispatch => ({
  dispatch: action => dispatch(action),
});

export default connect(stateProps, dispatchProps)(Transaction);
