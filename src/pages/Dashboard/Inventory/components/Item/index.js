import {Button, Icon, Separator, Text, View} from 'components';
import {ACCENT_COLOR} from 'constants/colors';
import {isObject} from 'utils/checker';
import Formatter from 'utils/Formatter';
import {
  getRestockPointStatus,
  getPropsValues,
  getSpecificProperty,
  onCleanName,
  onFormat,
  getExpirePointStatus,
} from 'utils/helper';

import styles from './.module.css';

export default function Item({item, isOpen, onPress, onEdit, onRestock}) {
  const {name, restock_point = {}, perishable_properties = {}} = item;

  const upperPart = getPropsValues(
    getSpecificProperty(['brand', 'type', 'date_modified', 'expiry_date'], item),
  ).filter(({property, value}) => value.length !== 0);
  const lowerPart = getPropsValues(
    getSpecificProperty(['quantity', 'current_unit', 'unit_type', 'cost'], item),
  );

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
        <View style={styles.contentPane}>
          <Separator vertical={0.5} />
          {upperPart.map(({property, value}, index) => {
            if (property === 'expiry_date') {
              return (
                <View
                  key={index}
                  style={styles.propertyPane}
                  defaultStyle={{
                    marginBottom: index + 1 !== lowerPart.length ? '0.25vh' : '0',
                  }}>
                  <Text style={styles.propertyName}>{onCleanName(property)}</Text>
                  <Text
                    style={styles.propertyValue}
                    defaultStyle={{
                      color: getExpirePointStatus(
                        value,
                        perishable_properties.expire_point,
                      ),
                    }}>
                    {onFormat(property, value)}
                  </Text>
                </View>
              );
            }
            return (
              <View
                key={index}
                style={styles.propertyPane}
                defaultStyle={{
                  marginBottom: index + 1 !== upperPart.length ? '0.25vh' : '0',
                }}>
                <Text style={styles.propertyName}>{onCleanName(property)}</Text>
                <Text style={styles.propertyValue}>{onFormat(property, value)}</Text>
              </View>
            );
          })}
          <Separator vertical={0.75} />
          {lowerPart.map(({property, value}, index) => {
            if (property === 'quantity') {
              return (
                <View
                  key={index}
                  style={styles.propertyPane}
                  defaultStyle={{
                    marginBottom: index + 1 !== lowerPart.length ? '0.25vh' : '0',
                  }}>
                  <Text style={styles.propertyName}>{onCleanName(property)}</Text>
                  <Text
                    style={styles.propertyValue}
                    defaultStyle={{
                      color: getRestockPointStatus(
                        value,
                        restock_point.low[0],
                        restock_point.mid[1],
                      ),
                    }}>
                    {onFormat(property, value)}
                  </Text>
                </View>
              );
            }
            return (
              <View
                key={index}
                style={styles.propertyPane}
                defaultStyle={{
                  marginBottom: index + 1 !== lowerPart.length ? '0.25vh' : '0',
                }}>
                <Text style={styles.propertyName}>{onCleanName(property)}</Text>
                <Text style={styles.propertyValue}>{onFormat(property, value)}</Text>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
}
