import {useState} from 'react';
import {Separator, View} from 'components';
import {peekLocalStorage} from 'storage';
import Item from '../Item';
import styles from './.module.css';

export default function ItemList({items = [], onEdit, onRestock}) {
  return (
    <View style={styles.mainPane}>
      {items.map((item, index) => (
        <View key={index}>
          <Item
            onEdit={() => onEdit(item)}
            onRestock={() => onRestock(item)}
            item={item}
            isOpen={peekLocalStorage('cfg')['always show details product']}
          />
          {index + 1 !== items.length ? <Separator vertical={0.5} /> : null}
        </View>
      ))}
    </View>
  );
}
