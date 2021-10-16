import {useContext, useState} from 'react';
import {isInteger} from 'utils/checker';
import {Button, Separator, Text, TextInput, View} from 'components';
import {Toast} from 'context';
import styles from './.module.css';
import List from './components/List';

export default function Item({items = [], onAdd, onCancel}) {
  const {onShow: onShowToast} = useContext(Toast);

  const [consume, setConsume] = useState('');
  const [item, setItem] = useState({});

  const onClick = (actionType, value) => {
    if (actionType === 'on-click-add-consumables') {
      if (consume.length === 0 || !item.name) {
        onShowToast('Please Select and Enter the fields');
        return;
      }
      onAdd({
        _id_item: {...item},
        consumed: parseInt(consume),
      });
      return;
    }
  };

  return (
    <View style={styles.mainPane}>
      <View style={styles.topPane}>
        <List items={items} onSelect={selected => setItem(selected)} />
      </View>
      <View style={styles.bodyPane}>
        <Text style={styles.label}>Consume</Text>
        <Separator vertical={0.5} />
        <TextInput
          placeholder='0'
          skin={styles.input}
          value={consume}
          onChangeText={text => setConsume(isInteger(text) ? text : '')}
        />
      </View>
      <View style={styles.bottomPane}>
        <Button
          title='Add'
          titleStyle={styles.buttonText}
          skin={styles.button}
          onPress={() => onClick('on-click-add-consumables')}
        />
        <Separator horizontal={1} />
        <Button
          title='Cancel'
          titleStyle={styles.buttonText}
          skin={styles.button}
          onPress={onCancel}
        />
      </View>
    </View>
  );
}
