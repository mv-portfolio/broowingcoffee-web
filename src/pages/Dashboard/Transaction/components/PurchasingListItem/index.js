import {Separator, View} from 'components';
import {useState} from 'react';
import {arrayFind} from 'utils/checker';
import {ASC_NAME} from 'utils/helper';
import {peekLocalStorage} from 'storage';
import PurchasingItem from '../PurchasingItem';

import styles from './.module.css';

export default function PurchasingListItem({
  isEditable,
  purchasingProducts = [],
  onEditSelectedPurchasingProduct,
}) {
  const [focus, setFocus] = useState({
    index: NaN,
    isShow: false,
  });

  let temp_purchasingProducts = [];

  const onSelect = index => {
    setFocus(prev => {
      let isShow = prev.isShow;
      if (prev.index !== index) {
        isShow = true;
      } else {
        isShow = !prev.isShow;
      }
      return {index, isShow};
    });
  };
  const getSuffixName = (temp_purchasingProducts = [], filter) => {
    let redundancy = 0;
    temp_purchasingProducts.forEach(temp_purchasingProduct => {
      if (temp_purchasingProduct.name === filter) {
        redundancy = temp_purchasingProduct.redundancy;
      }
    });
    return redundancy ? ` (${redundancy + 1})` : '';
  };

  return (
    <View style={styles.mainPane}>
      {purchasingProducts.sort(ASC_NAME).map((purchasingProduct, index) => {
        const isExisting = arrayFind(
          temp_purchasingProducts,
          temp_purchasingProduct =>
            temp_purchasingProduct.name === purchasingProduct.name,
        );
        if (!isExisting) {
          temp_purchasingProducts.push({
            name: purchasingProduct.name,
            redundancy: 0,
          });
        } else {
          temp_purchasingProducts = temp_purchasingProducts.map(
            temp_purchasingProduct => {
              if (temp_purchasingProduct.name === purchasingProduct.name) {
                temp_purchasingProduct.redundancy += 1;
                return temp_purchasingProduct;
              }
              return temp_purchasingProduct;
            },
          );
        }
        return (
          <View key={index}>
            <PurchasingItem
              isEditable={isEditable}
              suffixName={getSuffixName(temp_purchasingProducts, purchasingProduct.name)}
              isOpen={
                (focus.index === index && focus.isShow) ||
                peekLocalStorage('cfg')['always show details product']
              }
              purchasingProduct={purchasingProduct}
              onClick={() => onSelect(index)}
              onEdit={() => onEditSelectedPurchasingProduct(purchasingProduct)}
            />
            {index + 1 !== purchasingProducts.length ? (
              <Separator vertical={0.5} />
            ) : null}
          </View>
        );
      })}
    </View>
  );
}
