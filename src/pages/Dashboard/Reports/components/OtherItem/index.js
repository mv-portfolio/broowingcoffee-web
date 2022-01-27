import {useState} from 'react';
import {Separator, Text, View} from 'components';
import {ADDED_COLOR, UPDATED_COLOR, DELETED_COLOR, RESTOCK_COLOR} from 'constants/colors';
import Formatter from 'utils/Formatter';
import {getPropsValues, getSpecificProperty, onCleanName, onFormat} from 'utils/helper';
import styles from './.module.css';
import {isArray, isInteger, isObject, isString} from 'utils/checker';

export default function OtherItem({other}) {
  const history = getSpecificProperty(
    ['action', 'module', 'date_created', 'reference'],
    other,
  );

  const upperProperties = getPropsValues(history)
    .filter(history => history.property !== 'reference')
    .filter(history => history.property !== 'action');

  const lowerProperties = getPropsValues(history.reference)
    .filter(history => history.property !== 'name')
    .filter(history => history.property !== 'made_by');

  const [isDetailShow, setIsDetailShow] = useState(false);

  const onFixedMessage = action => {
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
          <Text style={styles.title}>{`${Formatter.toName(
            history.reference.name,
          )} (${onFixedMessage(history.action)})`}</Text>
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
          <Separator vertical={0.5} />
          <View style={styles.bodyPane}>
            {upperProperties.map(({property, value}, index) => (
              <View
                key={index}
                style={styles.propertyPane}
                defaultStyle={{
                  marginBottom: index + 1 !== upperProperties.length ? '0.4vh' : '0',
                }}>
                <Text style={styles.propertyName}>{onCleanName(property)}</Text>
                <Text style={styles.propertyValue}>
                  {onFixedProperty(property, onFormat(property, value))}
                </Text>
              </View>
            ))}
            <Separator vertical={0.3} />
            <View style={styles.propertyPane}>
              <Text style={styles.propertyName}>made by</Text>
              <Text style={styles.propertyValue}>
                {Formatter.toName(history.reference.made_by)}
              </Text>
            </View>
          </View>
          {history.action !== 'ADD' && history.action !== 'DELETE' && (
            <>
              <Separator vertical={1} />
              <View style={styles.updatesPane}>
                <Text style={styles.updatesLabel}>Updates</Text>
                <Separator vertical={0.35} />
                {lowerProperties.map(({property, value}, index) => (
                  <View
                    key={index}
                    style={styles.propertyPane}
                    defaultStyle={{
                      marginBottom: index + 1 !== lowerProperties.length ? '0.4vh' : '0',
                    }}>
                    <Text style={styles.propertyName}>{onCleanName(property)}</Text>
                    {isString(value) ? (
                      <Text style={styles.propertyValue}>{value}</Text>
                    ) : isArray(value) ? (
                      <Text style={styles.propertyValue}>{`${onFormat(
                        property,
                        value[0],
                      )} -> ${onFormat(property, value[1])}`}</Text>
                    ) : (
                      <Text style={styles.propertyValue}>{`${onFormat(
                        property,
                        value[1],
                      )}`}</Text>
                    )}
                  </View>
                ))}
              </View>
            </>
          )}
        </>
      )}
    </View>
  );
}
