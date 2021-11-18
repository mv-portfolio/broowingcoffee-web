import {useState} from 'react';
import {Separator, Text, View} from 'components';
import {ADDED_COLOR, UPDATED_COLOR, DELETED_COLOR, RESTOCK_COLOR} from 'constants/colors';
import Formatter from 'utils/Formatter';
import {getPropsValues, getSpecificProperty, onCleanName, onFormat} from 'utils/helper';
import styles from './.module.css';
import {isArray} from 'utils/checker';

export default function OtherItem({other}) {
  const history = getSpecificProperty(
    ['action', 'module', 'date_created', 'reference', 'username'],
    other,
  );

  const properties = getPropsValues(history)
    .filter(history => history.property !== 'reference')
    .filter(history => history.property !== 'action');

  const references = getPropsValues(history.reference)
    .filter(history => history.property !== 'name')
    .filter(history => history.property !== 'consumables');

  const [isDetailShow, setIsDetailShow] = useState(false);

  const onFixedReport = (action, module) => {
    const fixedMessageAction = action => {
      if (action === 'ADD') {
        return 'Added';
      }
      if (action === 'UPDATE') {
        return 'Updated';
      }
      if (action === 'DELETE') {
        return 'Deleted';
      }
      return Formatter.toName(action);
    };
    const fixedMessageModule = module => {
      if (module.includes('transactions')) {
        return 'Transaction';
      }
      if (module.includes('main')) {
        return 'Product';
      }
      if (module.includes('addon')) {
        return 'Add-on';
      }
      return Formatter.toName(module);
    };
    return `${fixedMessageAction(action)} ${fixedMessageModule(module)}`;
  };
  const onFixedProperty = (property, value) => {
    if (value.includes('addon')) {
      return 'add-on';
    }
    if (value.includes('main')) {
      return 'product';
    }
    return value;
  };

  const getColorPattern = value => {
    if (value === 'ADD') {
      return ADDED_COLOR;
    }
    if (value === 'UPDATE') {
      return UPDATED_COLOR;
    }
    if (value === 'DELETE') {
      return DELETED_COLOR;
    }
    if (value === 'RESTOCK') {
      return RESTOCK_COLOR;
    }
  };

  const onClick = action => {
    if (action === 'on-show-details') {
      setIsDetailShow(prev => !prev);
    }
  };

  return (
    <View style={styles.mainPane} onClick={() => onClick('on-show-details')}>
      {!isDetailShow ? (
        <View style={styles.headerPane}>
          <Text style={styles.title}>
            {onFixedReport(history.action, history.module)}
          </Text>
          <Text style={styles.text}>
            {Formatter.getDateDifference(history.date_created)}
          </Text>
        </View>
      ) : (
        <>
          <View style={styles.headerPane}>
            <Text style={styles.title}>{Formatter.toName(history.reference.name)}</Text>
            <Text
              style={styles.propertyValue}
              defaultStyle={{color: getColorPattern(history.action)}}>
              {history.action}
            </Text>
          </View>
          <Separator vertical={0.75} />
          <View style={styles.bodyPane}>
            {properties.map(({property, value}, index) => (
              <View key={index} style={styles.property}>
                <View style={styles.propertyPane}>
                  <Text style={styles.propertyName}>{onCleanName(property)}</Text>
                  <Text style={styles.propertyValue}>
                    {onFixedProperty(property, onFormat(property, value))}
                  </Text>
                </View>
                {index + 1 !== properties.length && <Separator vertical={0.2} />}
              </View>
            ))}
          </View>
          {(history.action === 'UPDATE' || history.action === 'RESTOCK') && (
            <>
              <Separator vertical={1} />
              <View style={styles.updatesPane}>
                <Text style={styles.updatesLabel}>Updates</Text>
                <Separator vertical={0.5} />
                {references.map(({property, value}, index) => (
                  <View key={index} style={styles.property}>
                    <View style={styles.propertyPane}>
                      <Text style={styles.propertyName}>{onCleanName(property)}</Text>
                      {property === 'cost' ? (
                        <Text style={styles.propertyValue}>{`${onFormat(
                          property,
                          value[1],
                        )}`}</Text>
                      ) : (
                        <Text style={styles.propertyValue}>{`${onFormat(
                          property,
                          value[0],
                        )} -> ${onFormat(property, value[1])}`}</Text>
                      )}
                    </View>
                    {index + 1 !== properties.length && <Separator vertical={0.2} />}
                  </View>
                ))}
              </View>
              {history.action === 'UPDATE' && (
                <>
                  <Separator vertical={0.75} />
                  <Text style={styles.propertyName}>consumables</Text>
                  <Separator vertical={0.25} />
                  {history.reference.consumables.map(({name, consumed}, index) => (
                    <View style={styles.property} key={index}>
                      <View style={styles.propertyPane}>
                        <Text style={styles.propertyName}>{name}</Text>
                        <Text
                          style={
                            styles.propertyValue
                          }>{`${consumed[0]} pcs -> ${consumed[1]} pcs`}</Text>
                      </View>
                      {index + 1 !== properties.length && <Separator vertical={0.2} />}
                    </View>
                  ))}
                </>
              )}
            </>
          )}
        </>
      )}
    </View>
  );
}
