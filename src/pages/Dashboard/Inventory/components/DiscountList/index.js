import {useState} from 'react';
import {Separator, View} from 'components';
import Discount from '../Discount';
import styles from './.module.css';

export default function DiscountList({discounts = [], onEdit}) {
  return (
    <View style={styles.mainPane}>
      {discounts.map((discount, index) => (
        <View key={index}>
          <Discount discount={discount} onEdit={() => onEdit(discount)} />
          {index + 1 !== discounts.length ? <Separator vertical={0.5} /> : null}
        </View>
      ))}
    </View>
  );
}
