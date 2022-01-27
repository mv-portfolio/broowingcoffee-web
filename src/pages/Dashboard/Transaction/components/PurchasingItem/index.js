import {Button, View, Text, Separator, Icon} from 'components';
import {ICON_SIZE} from 'constants/sizes';
import {ACCENT_COLOR} from 'constants/colors';
import {isArray, isObject} from 'utils/checker';
import Formatter from 'utils/Formatter';
import {
  getPropsValues,
  onFormat,
  onCompute,
  hp,
  getSpecificProperty,
  onCleanName,
  onComputePurchasingProduct,
} from 'utils/helper';

import styles from './.module.css';
import {useState} from 'react';

export default function PurchasingItem({
  suffixName,
  purchasingProduct,
  isOpen,
  onEdit,
  editable,
}) {
  const {
    _id_product: {name},
    _id_discount: {name: discountName, value: discountValue},
    price,
  } = purchasingProduct;

  const [isShow, setShow] = useState(false);

  const properties = getPropsValues(
    getSpecificProperty(['product_type', 'size', 'price'], purchasingProduct),
  );

  return (
    <View style={styles.mainPane} role='button' onClick={() => setShow(prev => !prev)}>
      <View style={styles.headerPane}>
        <Text style={styles.title}>{`${Formatter.toName(name)} ${
          suffixName <= 1 ? '' : `(${suffixName})`
        }`}</Text>
        {(isOpen || isShow) && editable && (
          <Button
            skin={styles.buttonEdit}
            onPress={e => {
              e.stopPropagation();
              onEdit();
            }}>
            <Icon font='Feather' name='edit' size={hp(2.25)} color={ACCENT_COLOR} />
          </Button>
        )}
      </View>
      <View style={styles.bodyPane}>
        {(isOpen || isShow) && (
          <>
            <Separator vertical={0.75} />
            {properties.map(({property, value}, index) => {
              return (
                <View
                  key={index}
                  style={styles.propertyPane}
                  defaultStyle={{
                    marginBottom: index + 1 !== properties.length ? '0.3vh' : '0',
                  }}>
                  <Text style={styles.propertyName}>{onCleanName(property)}</Text>
                  <Text style={styles.propertyValue}>{onFormat(property, value)}</Text>
                </View>
              );
            })}
            <Separator vertical={0.3} />
            <View style={styles.propertyPane}>
              <Text style={styles.propertyName}>discount</Text>
              <Text style={styles.propertyValue}>
                {discountName && discountValue
                  ? `${discountName} (${discountValue}%)`
                  : 'none'}
              </Text>
            </View>
            <Separator vertical={0.3} />
            <View style={styles.propertyPane}>
              <Text style={styles.propertyName}>discount price</Text>
              <Text style={styles.propertyValue}>
                {discountName && discountValue
                  ? Formatter.toMoney((discountValue / 100) * price)
                  : '0.00'}
              </Text>
            </View>
            <Separator vertical={0.3} />
            <View style={styles.propertyPane}>
              <Text style={styles.propertyName}>total price</Text>
              <Text style={styles.propertyValue}>
                {Formatter.toMoney(onComputePurchasingProduct(purchasingProduct))}
              </Text>
            </View>
          </>
        )}
      </View>
    </View>
  );
}
