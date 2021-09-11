import {Button, Dialog, Icon, Separator, Text, View} from 'components';
import {accentColor, accentColor2} from 'constants/styles';
import {PrimaryDialog} from 'context';
import {useContext, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {ASC_NAME} from 'utils/helper';
import styles from './.module.css';
import ProductList from './components/ProductList';
import ProductMain from './modals/Main';
import ProductAddons from './modals/Addons';
import {POP_PRODUCT, PUSH_PRODUCT, SET_INDEX_PRODUCTS} from 'modules/actions';
import Formatter from 'utils/Formatter';
import SearchField from './components/SearchField';
import useHook, {productsInitState, products as productsReducer} from 'hooks';

function Transaction({products: reduxProducts = {main: [], addons: []}, dispatch}) {
  const {onShow: onShowPrimaryDialog, onHide: onHidePrimaryDialog} =
    useContext(PrimaryDialog);

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
    }
    if (actionType === 'on-click-update-product-main') {
      dispatch(SET_INDEX_PRODUCTS({mainId: value.name, payload: value}));
    }
    if (actionType === 'on-click-delete-product-main') {
      onShowConditionalDeleteDialog({
        title: 'Product',
        content: `you want to delete ${Formatter.toName(value)}?`,
        value: {type: 'main', filter: value},
      });
    }
    if (actionType === 'on-click-added-product-addons') {
      dispatch(PUSH_PRODUCT({addonProduct: value}));
    }
    if (actionType === 'on-click-update-product-addons') {
      dispatch(SET_INDEX_PRODUCTS({addonId: value.name, payload: value}));
    }
    if (actionType === 'on-click-delete-product-addons') {
      onShowConditionalDeleteDialog({
        title: 'Addons',
        content: `you want to delete ${Formatter.toName(value)}?`,
        value: {type: 'add-ons', filter: value},
      });
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
    onUpdate,
    onDelete,
  }) => {
    if (typeProduct === 'main') {
      onShowPrimaryDialog(
        <ProductMain
          type={type}
          productInfo={productInfo}
          onAdd={onAdd}
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
        type='conditional'
        title={title}
        content={content}
        positiveText='Delete'
        positiveButtonStyle={{backgroundColor: accentColor2}}
        onPositive={() => onClick('on-click-delete-dialog-positive', value)}
        negativeText='No'
        onNegative={onHidePrimaryDialog}
      />,
    );
  };

  const initListener = () => {
    setProducts(reduxProducts);
  };
  useEffect(initListener, [reduxProducts]);

  return (
    <View style={styles.mainPane}>
      <View style={styles.topPane}>
        <View style={styles.headerPane}>
          <Text style={styles.label}>Product</Text>
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
          products={products.main.sort(ASC_NAME)}
          onEdit={product => onClick('on-click-edit-product-main', product)}
        />
      </View>
      <Separator vertical={3} />
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
    </View>
  );
}

const stateProps = ({user, products}) => ({
  user,
  products,
});

const dispatchProps = dispatch => ({
  dispatch: action => dispatch(action),
});

export default connect(stateProps, dispatchProps)(Transaction);
