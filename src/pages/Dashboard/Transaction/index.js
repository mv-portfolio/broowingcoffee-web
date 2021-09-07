import {View, Text, Separator, Button} from 'components';
import {useContext, useState} from 'react';
import {connect} from 'react-redux';

import {PrimaryDialog} from 'context';
import ProductList from './components/ProductList';
import PurchasingListItem from './components/PurchasingListItem';
import Purchase from './modals/Purchase';
import styles from './.module.css';

function Transaction({products, user}) {
  const {onShow, onHide} = useContext(PrimaryDialog);
  const [purchasingProducts, setPurchasingProducts] = useState([]);

  const getNumExisting = productName => {
    let num = 0;
    purchasingProducts.map(purchasingProduct => {
      if (productName === purchasingProduct.name) {
        num += 1;
      }
    });
    return num ? ` (${num + 1})` : '';
  };

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
      setPurchasingProducts(prev => [...prev, value]);
      return;
    }
    if (actionType === 'on-click-update-purchasing-product') {
      setPurchasingProducts(prev => {
        let temp_purchasingProducts = [];
        prev.map(purchasingProduct => {
          if (purchasingProduct.id === value.id) {
            temp_purchasingProducts.push(value);
            return;
          }
          temp_purchasingProducts.push(purchasingProduct);
        });
        return temp_purchasingProducts;
      });
      return;
    }
    if (actionType === 'on-click-delete-purchasing-product') {
      setPurchasingProducts(prev =>
        prev.filter(purchasingProduct => purchasingProduct.id !== value),
      );
      return;
    }
  };

  const showDialog = ({type, productInfo, onAdd, onUpdate, onDelete}) => {
    onShow(
      <Purchase
        type={type}
        addons={products.addons}
        productInfo={productInfo}
        onAdd={onAdd}
        onUpdate={onUpdate}
        onDelete={onDelete}
        onCancel={onHide}
      />,
    );
  };
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
        <Text style={styles.title}>Invoice</Text>
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
        <Button title='PURCHASE' titleStyle={styles.buttonText} skin={styles.button} />
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
