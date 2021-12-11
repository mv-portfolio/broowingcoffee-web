import {Button, Icon, Separator, Text, View} from 'components';
import {ACCENT_COLOR} from 'constants/colors';
import {isArray} from 'utils/checker';
import Formatter from 'utils/Formatter';
import {getPropsValues, onCleanName, onFormat} from 'utils/helper';

import styles from './.module.css';

export default function ProductItem({product, isOpen, onPress, onEdit}) {
  const {name} = product;

  const contents = getPropsValues(product)
    .filter(obj => obj.property !== '_id')
    .filter(obj => obj.property !== 'name')
    .filter(obj => obj.value !== null)
    .filter(obj => obj.property !== '__v');

  const getUnit = value => {
    if (value > 1) {
      return 'pcs';
    }
    return 'pc';
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
            <Icon font='Feather' name='edit' size='2vh' color={ACCENT_COLOR} />
          </Button>
        )}
      </View>
      {isOpen && (
        <>
          <Separator vertical={0.25} />
          <View style={styles.content}>
            {contents.map(({property, value}, index) => (
              <View key={index} style={styles.contentPane}>
                {isArray(value) ? (
                  <>
                    <Separator vertical={1} />
                    <View style={styles.consumablesPane}>
                      <Text style={styles.consumableTitle}>
                        {Formatter.toName(property)}
                      </Text>
                      <Separator vertical={0.25} />
                      {value.map(({_id_item, consumed}, index) => (
                        <View style={styles.propertyPane} key={index}>
                          <Text style={styles.propertyName}>
                            {onCleanName(_id_item.name)}
                          </Text>
                          <Text style={styles.propertyValue}>
                            {consumed} {getUnit(consumed)}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </>
                ) : (
                  <>
                    <View style={styles.propertyPane}>
                      <Text style={styles.propertyName}>{onCleanName(property)}</Text>
                      <Text style={styles.propertyValue}>
                        {onFormat(property, value)}
                      </Text>
                    </View>
                    {index + 1 !== contents.length ? <Separator vertical={0.15} /> : null}
                  </>
                )}
              </View>
            ))}
          </View>
        </>
      )}
    </View>
  );
}
