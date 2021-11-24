import {useState} from 'react';
import {View, Text, Separator} from 'components';
import {getPropsValues, hp, onCleanName, onCompute, onFormat} from 'utils/helper';
import * as Formatter from 'utils/Formatter';

import styles from './.module.css';
import {isObject} from 'utils/checker';

export default function PurchasedItem({data}) {
  const [isShow, setIsShow] = useState(false);

  const propsValue = getPropsValues(data).filter(data => !isObject(data.value));

  return (
    <View style={styles.mainPane} onClick={() => setIsShow(prev => !prev)}>
      <View style={styles.propertyPane} defaultStyle={{border: 'none'}}>
        <Text
          style={styles.propertyName}
          defaultStyle={{fontWeight: 'bold', fontSize: hp(1.75)}}>
          {Formatter.toName(data._id_product.name)}
        </Text>
        <Text style={styles.propertyValue}>{onCompute(data)}</Text>
      </View>
      {isShow && (
        <View style={styles.detailsPane}>
          <Separator vertical={0.5} />
          {propsValue.map(({property, value}, index) => (
            <View key={index}>
              <View style={styles.propertyPane}>
                <Text style={styles.propertyName}>{onCleanName(property)}</Text>
                <Text style={styles.propertyValue}>{onFormat(property, value)}</Text>
              </View>
              {index + 1 !== propsValue.length && <Separator vertical={0.15} />}
            </View>
          ))}
          {data.addons.length > 0 && (
            <>
              <Separator vertical={1} />
              <View style={styles.propertyPane}>
                <Text style={styles.propertyName}>{`Add-on${
                  data.addons.length > 1 ? 's' : ''
                }`}</Text>
              </View>
              {data.addons.map((addon, index) => (
                <View key={index}>
                  <Separator vertical={0.15} />
                  <View style={styles.propertyPane}>
                    <Text style={styles.propertyName}>{addon.name}</Text>
                    <Text style={styles.propertyValue}>
                      {Formatter.toMoney(addon.price)}
                    </Text>
                  </View>
                  {index + 1 !== propsValue.length && <Separator vertical={0.15} />}
                </View>
              ))}
            </>
          )}
        </View>
      )}
    </View>
  );
}
