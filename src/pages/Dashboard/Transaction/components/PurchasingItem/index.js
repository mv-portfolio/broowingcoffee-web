import {Button, View, Text, Separator, Icon} from 'components';
import {ICON_SIZE} from 'constants/sizes';
import {accentColor} from 'constants/styles';
import {isArray} from 'utils/checker';
import Formatter from 'utils/Formatter';
import {getPropsValues, onFormat, sumOfPrice} from 'utils/helper';

import styles from './.module.css';

export default function PurchasingItem({
  isEditable = true,
  suffixName,
  purchasingProduct,
  onClick,
  onEdit,
  isOpen,
}) {
  const {name} = purchasingProduct;

  const content = getPropsValues(purchasingProduct)
    .filter(obj => obj.property !== '_id')
    .filter(obj => obj.property !== 'id')
    .filter(obj => obj.property !== 'name')
    .filter(obj => obj.property !== 'hot_price')
    .filter(obj => obj.property !== 'cold_price');

  const onCompute = purchasingProductInfo => {
    let finalPrice = 0;
    const {discount, price, addons} = purchasingProductInfo;
    const addonsTotalPrice = sumOfPrice(addons);
    finalPrice += addonsTotalPrice + price;
    if (discount) {
      finalPrice -= (discount / 100) * finalPrice;
    }
    return Formatter.toMoney(finalPrice);
  };

  return (
    <View style={styles.mainPane} role='button' onClick={onClick}>
      <View style={styles.headerPane}>
        <Text style={styles.title}>{`${Formatter.toName(name)}${suffixName}`}</Text>
        {isOpen ? (
          !isEditable ? (
            <></>
          ) : (
            <Button
              skin={styles.buttonEdit}
              onPress={evt => {
                evt.stopPropagation();
                onEdit();
              }}>
              <Icon font='Feather' name='edit' size={ICON_SIZE} color={accentColor} />
            </Button>
          )
        ) : (
          <Text style={styles.price}>{onCompute(purchasingProduct)}</Text>
        )}
      </View>
      {isOpen && (
        <>
          <Separator vertical={0.5} />
          <View style={styles.content}>
            {content.map(({property, value}, index) => (
              <View key={index} style={styles.contentPane}>
                {isArray(value) ? (
                  value.length <= 0 ? null : (
                    <View style={styles.addonsContent}>
                      <Separator vertical={0.4} />
                      <Text style={styles.propertyName}>
                        {Formatter.toName(property)}
                      </Text>
                      <Separator vertical={0.2} />
                      {value.map(({name, price}, index) => (
                        <View style={styles.addons} key={index}>
                          <View style={styles.addonsPane}>
                            <Text style={styles.addonsName}>{name}</Text>
                            <Text style={styles.addonsValue}>
                              {Formatter.toMoney(price)}
                            </Text>
                          </View>
                          {index + 1 !== value.length ? (
                            <Separator vertical={0.2} />
                          ) : null}
                        </View>
                      ))}
                    </View>
                  )
                ) : (
                  <View style={styles.propertyPane}>
                    <Text style={styles.propertyName}>{property}</Text>
                    <Text style={styles.propertyValue}>{onFormat(property, value)}</Text>
                  </View>
                )}
                {index + 1 !== content.length ? <Separator vertical={0.2} /> : null}
              </View>
            ))}
          </View>
        </>
      )}
    </View>
  );
}
