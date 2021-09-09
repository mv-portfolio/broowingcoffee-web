import {Button, Icon, Separator, Text, View} from 'components';
import {accentColor} from 'constants/styles';
import {PrimaryDialog} from 'context';
import {useContext, useEffect} from 'react';
import {connect} from 'react-redux';
import {ASC_NAME} from 'utils/helper';
import styles from './.module.css';
import ProductList from './components/ProductList';
import ProductMain from './modals/Main';
import ProductAddons from './modals/Addons';
import {POP_PRODUCT, PUSH_PRODUCT, SET_INDEX_PRODUCTS} from 'modules/actions';

function Transaction({products, dispatch}) {
  const {onShow: onShowPrimaryDialog, onHide: onHidePrimaryDialog} =
    useContext(PrimaryDialog);

  const onClick = (actionType, value) => {
    //show dialog actions
    if (actionType === 'on-click-add-product-main') {
      onShowDialog({
        typeProduct: 'main',
        type: 'add',
        onAdd: value => onClick('on-click-added-product-main', value),
      });
      return;
    }
    if (actionType === 'on-click-edit-product-main') {
      onShowDialog({
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
      onShowDialog({
        typeProduct: 'addons',
        type: 'add',
        onAdd: value => onClick('on-click-added-product-addons', value),
      });
      return;
    }
    if (actionType === 'on-click-edit-product-addons') {
      onShowDialog({
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
      console.log('UPDATED', value);
      dispatch(SET_INDEX_PRODUCTS({mainId: value.name, payload: value}));

      console.log(products);
    }
    if (actionType === 'on-click-delete-product-main') {
      console.log('DELETE!', value);
      dispatch(POP_PRODUCT({mainId: value}));
    }
    if (actionType === 'on-click-added-product-addons') {
      dispatch(PUSH_PRODUCT({addonProduct: value}));
    }
    if (actionType === 'on-click-update-product-addons') {
      console.log('UPDATED', value);
      dispatch(SET_INDEX_PRODUCTS({addonId: value.name, payload: value}));

      console.log(products);
    }
    if (actionType === 'on-click-delete-product-addons') {
      console.log('DELETE!', value);
      dispatch(POP_PRODUCT({addonId: value}));
    }
  };

  const onShowDialog = ({typeProduct, type, productInfo, onAdd, onUpdate, onDelete}) => {
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

  return (
    <View style={styles.mainPane}>
      <View style={styles.topPane}>
        <View style={styles.headerPane}>
          <Text style={styles.label}>Product</Text>
          <View style={styles.actionPane}>
            <Button
              skin={styles.headerButtons}
              onPress={() => onClick('on-click-search-product-main')}>
              <Icon font='Feather' name='search' color={accentColor} size='1.75vh' />
            </Button>
            <Separator horizontal={0.25} />
            <Button
              skin={styles.headerButtons}
              onPress={() => onClick('on-click-add-product-main')}>
              <Icon font='Feather' name='plus' color={accentColor} size='2.5vh' />
            </Button>
          </View>
        </View>
        <Separator vertical={0.5} />
        <ProductList
          products={products.main.sort(ASC_NAME)}
          onEdit={product => onClick('on-click-edit-product-main', product)}
        />
      </View>
      <Separator vertical={2.5} />
      <View style={styles.bodyPane}>
        <View style={styles.headerPane}>
          <Text style={styles.label}>Addons</Text>
          <View style={styles.actionPane}>
            <Button
              skin={styles.headerButtons}
              onPress={() => onClick('on-click-search-product-addons')}>
              <Icon font='Feather' name='search' color={accentColor} size='1.75vh' />
            </Button>
            <Separator horizontal={0.25} />
            <Button
              skin={styles.headerButtons}
              onPress={() => onClick('on-click-add-product-addons')}>
              <Icon font='Feather' name='plus' color={accentColor} size='2.5vh' />
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
