import {Button, Icon, Separator, Text, View} from 'components';
import {accentColor} from 'constants/styles';
import {useState} from 'react';
import {isArray} from 'utils/checker';
import Formatter from 'utils/Formatter';
import {
  getPropsValues,
  getSpecificProperty,
  hp,
  onCleanName,
  onFormat,
} from 'utils/helper';
import styles from './.module.css';

export default function TransactionItem({transaction}) {
  const reference = getSpecificProperty(
    ['_id', 'discount', 'receiptTo', 'products', 'date_created'],
    transaction.reference,
  );

  const properties = getPropsValues(reference)
    .filter(ref => ref.property !== '_id')
    .filter(ref => ref.value !== null);

  const [isDetailsShow, setIsDetailsShow] = useState(false);

  const onClick = action => {
    if (action === 'on-show-details') {
      setIsDetailsShow(prev => !prev);
      return;
    }
    if (action === 'on-view-details') {
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
                onClick('on-view-details');
              }}>
              <Icon font='Feather' name='eye' size={hp(2.5)} color={accentColor} />
            </Button>
          </View>
          <Separator vertical={0.75} />
          <View style={styles.bodyPane}>
            {properties.map(({property, value}, index) => (
              <View key={index} style={styles.property}>
                {!isArray(value) && (
                  <View style={styles.propertyPane}>
                    <Text style={styles.propertyName}>{onCleanName(property)}</Text>
                    <Text style={styles.propertyValue}>{onFormat(property, value)}</Text>
                  </View>
                )}
                {index + 1 !== properties.length && <Separator vertical={0.2} />}
              </View>
            ))}
            <Separator vertical={0.2} />
            <View style={styles.propertyPane}>
              <Text style={styles.propertyName}>purchased</Text>
              <Text style={styles.propertyValue}>
                {`${reference.products.length} ${Formatter.toPluralName(
                  reference.products.length,
                  'product',
                )}`}
              </Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
}
