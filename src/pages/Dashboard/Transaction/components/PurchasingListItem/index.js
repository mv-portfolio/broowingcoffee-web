import {useState} from 'react';
import {View} from 'components';
import PurchasingItem from '../PurchasingItem';

import styles from './.module.css';
import {arrayUpdate, getPropsValues} from 'utils/helper';
import {peekLocalStorage} from 'storage';

export default function PurchasingListItem({
  purchasingProducts = [],
  editable,
  onEdit,
  style,
}) {
  let count = 0;
  let prevName = '';

  const sortedNamePurchasingProduct = purchasingProducts.sort(function (a, b) {
    if (a._id_product.name > b._id_product.name) return 1;
    if (a._id_product.name < b._id_product.name) return -1;
    return 0;
  });
  const getSuffixName = (purchasingProduct, index) => {
    if (index === 0) {
      prevName = sortedNamePurchasingProduct[0]._id_product.name;
    }
    if (prevName === purchasingProduct._id_product.name) {
      count += 1;
    } else {
      prevName = purchasingProduct._id_product.name;
      count = 1;
    }
    return count;
  };

  return (
    <View style={`${styles.mainPane} ${style}`}>
      {sortedNamePurchasingProduct.map((purchasingProduct, index) => (
        <View
          key={index}
          defaultStyle={{
            marginBottom: index + 1 !== sortedNamePurchasingProduct.length ? '1vh' : 0,
          }}>
          <PurchasingItem
            purchasingProduct={purchasingProduct}
            suffixName={getSuffixName(purchasingProduct, index)}
            editable={editable}
            isOpen={peekLocalStorage('cfg')['always show details product']}
            onEdit={() => onEdit(purchasingProduct)}
          />
        </View>
      ))}
    </View>
  );
}
