import {Button, Icon, Separator, Text, View} from 'components';
import {ACCENT_COLOR} from 'constants/colors';
import * as Formatter from 'utils/Formatter';
import {getPropsValues, onCleanName, onFormat} from 'utils/helper';

import styles from './.module.css';

export default function Item({product, isOpen, onPress, onEdit, onRestock}) {
  const {name} = product;

  const contents = getPropsValues(product)
    .filter(obj => obj.property !== '_id')
    .filter(obj => obj.property !== 'name')
    .filter(obj => obj.property !== '__v')
    .filter(obj => obj.value !== null);

  return (
    <View style={styles.mainPane} role='button' onClick={onPress}>
      <View style={styles.headerPane}>
        <Text style={styles.title}>{Formatter.toName(name)}</Text>
        {isOpen && (
          <View style={styles.headerRightPane}>
            <Button
              skin={styles.buttonEdit}
              onPress={evt => {
                evt.stopPropagation();
                onEdit();
              }}>
              <Icon font='Feather' name='edit' size='2vh' color={ACCENT_COLOR} />
            </Button>
            <Button
              skin={styles.buttonEdit}
              onPress={evt => {
                evt.stopPropagation();
                onRestock();
              }}>
              <Icon font='Feather' name='repeat' size='2.15vh' color={ACCENT_COLOR} />
            </Button>
          </View>
        )}
      </View>
      {isOpen && (
        <>
          <Separator vertical={0.75} />
          <View style={styles.content}>
            {contents.map(({property, value}, index) => (
              <View key={index} style={styles.contentPane}>
                <View style={styles.propertyPane}>
                  <Text style={styles.propertyName}>{onCleanName(property)}</Text>
                  <Text style={styles.propertyValue}>{onFormat(property, value)}</Text>
                </View>
                {index + 1 !== contents.length ? <Separator vertical={0.15} /> : null}
              </View>
            ))}
          </View>
        </>
      )}
    </View>
  );
}
