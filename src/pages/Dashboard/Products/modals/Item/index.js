import {useContext, useState} from 'react';
import {isInteger} from 'utils/checker';
import {Button, Separator, Text, TextInput, View} from 'components';
import {Toast} from 'context';
import styles from './.module.css';
import List from './components/List';
import {connect} from 'react-redux';

function Item({inventory: {items}, onAdd, onCancel}) {
  const {onShow: onShowToast} = useContext(Toast);

  const [consume, setConsume] = useState('');
  const [item, setItem] = useState({});

  const onClick = actionType => {
    if (actionType === 'on-click-add-consumables') {
      if (consume.length === 0 || !item.name) {
        onShowToast('Please Select and Enter the fields');
        return;
      }
      onAdd({
        _id_item: {
          _id: item._id,
          name: item.name,
          type: item.type,
          perishable_properties: item.perishable_properties,
        },
        consumed: parseInt(consume),
      });
      onCancel();
      return;
    }
  };

  return (
    <View style={styles.mainPane}>
      <View style={styles.bodyPane}>
        <List items={items} onSelect={selected => setItem(selected)} />
        <Separator vertical={1} />
        {item.name && (
          <>
            <Text style={styles.label}>
              {`Numbers of ${
                item.type === 'perishable'
                  ? `Unit (${item.perishable_properties.unit_type})`
                  : 'Quantity'
              }`}
            </Text>
            <Separator vertical={0.5} />
            <TextInput
              placeholder='0'
              skin={styles.input}
              value={consume}
              onChangeText={text => setConsume(isInteger(text) ? text : '')}
            />
            <Separator vertical={1} />
          </>
        )}
      </View>
      <Separator vertical={1} />
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

const stateProps = ({inventory}) => ({
  inventory,
});
const dispatchProps = dispatch => ({
  dispatch: action => dispatch(action),
});
export default connect(stateProps, dispatchProps)(Item);
