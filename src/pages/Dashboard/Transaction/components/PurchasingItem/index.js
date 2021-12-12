import {Button, View, Text, Separator, Icon} from 'components';
import {ICON_SIZE} from 'constants/sizes';
import {ACCENT_COLOR} from 'constants/colors';
import {isArray} from 'utils/checker';
import Formatter from 'utils/Formatter';
import {getPropsValues, onFormat, onCompute} from 'utils/helper';

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
              <Icon font='Feather' name='edit' size={ICON_SIZE} color={ACCENT_COLOR} />
            </Button>
          )
        ) : (
          <Text style={styles.price}>{onCompute(purchasingProduct)}</Text>
        )}
      </View>
      {isOpen && (
        <>
          <Separator vertical={0.5} />
          {content
            .filter(prop => prop.property !== 'addons')
            .map(({property, value}, index) => (
              <View key={index} style={styles.contentPane}>
                <View style={styles.propertyPane}>
                  <Text style={styles.propertyName}>{property}</Text>
                  <Text style={styles.propertyValue}>{onFormat(property, value)}</Text>
                </View>
                {index + 1 !== content.length ? <Separator vertical={0.15} /> : null}
              </View>
            ))}
          {purchasingProduct.addons.length > 0 && (
            <>
              <Separator vertical={0.5} />
              <View style={styles.propertyPane}>
                <Text style={styles.propertyName}>Add-ons</Text>
              </View>
              <Separator vertical={0.15} />
              {purchasingProduct.addons.map((addon, index) => (
                <View key={index}>
                  <View key={index} style={styles.propertyPane}>
                    <Text style={styles.propertyName}>{addon.name}</Text>
                    <Text style={styles.propertyValue}>
                      {Formatter.toMoney(addon.price)}
                    </Text>
                  </View>
                  {index + 1 !== purchasingProduct.addons.length && (
                    <Separator vertical={0.15} />
                  )}
                </View>
              ))}
            </>
          )}
        </>
      )}
    </View>
  );
}
