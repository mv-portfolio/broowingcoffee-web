import {useContext, useReducer} from 'react';
import {Button, Separator, Text, TextInput, View} from 'components';
import {restock, restockInitState} from 'hooks';
import Formatter from 'utils/Formatter';
import {isDouble, isInteger} from 'utils/checker';
import styles from './.module.css';
import {Toast} from 'context';

export default function Restock({productInfo, onRestock, onCancel}) {
  const {name, type} = productInfo;
  const {onShow: onShowToast} = useContext(Toast);

  const [state, setState] = useReducer(restock, restockInitState);

  const onChange = (component, value) => {
    if (component === 'on-change-quantity') {
      if (isInteger(value) || value.length === 0) {
        setState({
          type: 'set',
          quantity: value,
        });
      }
      return;
    }
    if (component === 'on-change-cost') {
      if (isDouble(value) || value.length === 0) {
        setState({
          type: 'set',
          cost: value,
        });
      }
    }
  };
  const onClick = component => {
    if (component === 'on-click-restock') {
      if (state.cost.length <= 0 || state.quantity.length <= 0) {
        onShowToast('Enter Missing Field');
        return;
      }
      const date_modified = new Date().getTime();
      onRestock({
        name,
        itemType: type,
        quantity: parseInt(state.quantity),
        cost: parseFloat(state.cost),
        date_modified,
      });
      onCancel();
    }
  };
  return (
    <View style={styles.mainPane}>
      <Text style={styles.title}>Restock {Formatter.toName(name)}</Text>
      <Separator vertical={1.5} />
      <View style={styles.bodyPane}>
        <Text style={styles.titleField}>Quantity</Text>
        <Separator vertical={0.25} />
        <TextInput
          skin={styles.input}
          placeholder='0'
          value={state.quantity}
          onChangeText={text => onChange('on-change-quantity', text)}
        />
        <Separator vertical={1} />
        <Text style={styles.titleField}>Cost</Text>
        <Separator vertical={0.25} />
        <TextInput
          skin={styles.input}
          placeholder='0.00'
          value={state.cost}
          onChangeText={text => onChange('on-change-cost', text)}
        />
      </View>
      <Separator vertical={2} />
      <View style={styles.bottomPane}>
        <Button
          skin={styles.button}
          title='Restock'
          onPress={() => onClick('on-click-restock')}
        />
        <Separator horizontal={1} />
        <Button skin={styles.button} title='Cancel' onPress={onCancel} />
      </View>
    </View>
  );
}
