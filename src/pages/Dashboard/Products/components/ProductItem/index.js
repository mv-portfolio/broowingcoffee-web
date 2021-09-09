import {Button, Icon, Separator, Text, View} from 'components';
import {accentColor} from 'constants/styles';
import Formatter from 'utils/Formatter';
import ObjectCleaner from 'utils/ObjectCleaner';

import styles from './.module.css';

export default function ProductItem({product, isOpen, onPress, onEdit}) {
  const {name} = product;

  const contents = ObjectCleaner.getProperties(product)
    .filter(obj => obj.property !== '_id')
    .filter(obj => obj.property !== 'name')
    .filter(obj => obj.value !== null)
    .filter(obj => obj.property !== '__v');

  const onFormat = (property, value) => {
    if (property.includes('price')) {
      return `₱${Formatter.toMoney(value)}`;
    }
    if (property.includes('date')) {
      return `${Formatter.getDateDifference(value)}`;
    }
    return value;
  };

  return (
    <View style={styles.mainPane} role='button' onClick={onPress}>
      <View style={styles.headerPane}>
        <Text style={styles.title}>{Formatter.toName(name)}</Text>
        {isOpen && (
          <Button
            skin={styles.buttonEdit}
            onPress={evt => {
              evt.stopPropagation();
              onEdit();
            }}>
            <Icon font='Feather' name='edit' size='2vh' color={accentColor} />
          </Button>
        )}
      </View>
      {isOpen && (
        <>
          <Separator vertical={0.25} />
          <View style={styles.content}>
            {contents.map(({property, value}, index) => (
              <View key={index} style={styles.contentPane}>
                <View style={styles.propertyPane}>
                  <Text style={styles.propertyName}>{property}</Text>
                  <Text style={styles.propertyValue}>{onFormat(property, value)}</Text>
                </View>
                {index + 1 !== contents.length ? <Separator vertical={0.25} /> : null}
              </View>
            ))}
          </View>
        </>
      )}
    </View>
  );
}
