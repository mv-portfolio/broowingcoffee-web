import {Button, Icon, Separator, Text, View} from 'components';
import {ACCENT_COLOR} from 'constants/colors';
import {useState} from 'react';
import {isArray} from 'utils/checker';
import Formatter from 'utils/Formatter';
import {
  hp,
  getSpecificProperty,
  onCleanName,
  onFormat,
  onComputePurchasingProducts,
  getPropsValues,
} from 'utils/helper';
import styles from './.module.css';

export default function TransactionItem({transaction, onViewTransaction}) {
  const reference = getSpecificProperty(
    ['_id', '_id_discount', 'receipt_to', 'products', 'date_created'],
    transaction.reference,
  );

  const lowerProperties = getPropsValues(reference)
    .filter(ref => ref.property !== '_id')
    .filter(ref => ref.value !== '');

  const [isDetailsShow, setIsDetailsShow] = useState(false);

  const onClick = action => {
    if (action === 'on-show-details') {
      setIsDetailsShow(prev => !prev);
      return;
    }
  };

  return (
    <View style={styles.mainPane} onClick={() => onClick('on-show-details')}>
      {!isDetailsShow ? (
        <View style={styles.headerPane}>
          <Text style={styles.title}>{reference._id}</Text>
          <Text style={styles.text}>
            {Formatter.getDateDifference(reference.date_created)}
          </Text>
        </View>
      ) : (
        <>
          <View style={styles.headerPane}>
            <Text style={styles.title}>{reference._id}</Text>
            <Button
              skin={styles.buttonView}
              onPress={e => {
                e.stopPropagation();
                onViewTransaction();
              }}>
              <Icon font='Feather' name='eye' size={hp(2)} color={ACCENT_COLOR} />
            </Button>
          </View>
          <Separator vertical={0.5} />
          <View style={styles.bodyPane}>
            {lowerProperties.map(
              ({property, value}, index) =>
                !isArray(value) && (
                  <View
                    key={index}
                    style={styles.propertyPane}
                    defaultStyle={{
                      marginBottom: index + 1 !== lowerProperties.length ? '0.6vh' : '0',
                    }}>
                    <Text style={styles.propertyName}>
                      {onCleanName(property, 'transactions')}
                    </Text>
                    <Text style={styles.propertyValue}>
                      {onFormat(property, value, 'transactions')}
                    </Text>
                  </View>
                ),
            )}
            <Separator vertical={0.3} />
            <View style={styles.propertyPane}>
              <Text style={styles.propertyName}>purchased</Text>
              <Text style={styles.propertyValue}>
                {`${reference.products.length} ${Formatter.toPluralName(
                  reference.products.length,
                  'product',
                )}`}
              </Text>
            </View>
            <Separator vertical={0.4} />
            <View style={styles.propertyPane}>
              <Text style={styles.propertyName}>total price</Text>
              <Text style={styles.propertyValue}>
                {Formatter.toMoney(onComputePurchasingProducts(reference.products))}
              </Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
}
