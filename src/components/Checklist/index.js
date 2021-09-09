import {useState} from 'react';
import {Button, Icon, Text, View} from 'components';
import {WHITE} from 'constants/styles';
import {ASC_NAME, hp} from 'utils/helper';
import {arrayFind} from 'utils/checker';
import styles from './.module.css';

export default function Checklist({
  items = [],
  currentSelectedItems = [],
  onSelectedItems,
}) {
  const [state, setState] = useState({
    selectedItems: currentSelectedItems,
  });

  const isChecked = filter => {
    const isExist = arrayFind(state.selectedItems, item => item.name === filter);
    if (isExist) {
      return <Icon font='Feather' name='check-square' size='2vh' color={WHITE} />;
    }
    return <Icon font='Feather' name='square' size='2vh' color={WHITE} />;
  };

  const onClick = (actionType, value) => {
    if (actionType === 'on-select') {
      const isExist = arrayFind(
        state.selectedItems,
        selectedItem => selectedItem.name === value.name,
      );
      let temp_selectedItems = state.selectedItems || [];
      if (!isExist) {
        temp_selectedItems.push(value);
      } else {
        temp_selectedItems = temp_selectedItems.filter(
          temp_selecteditem => temp_selecteditem.name !== value.name,
        );
      }
      onSelectedItems(temp_selectedItems);
      setState(prev => ({
        ...prev,
        selectedItems: temp_selectedItems,
      }));
    }
  };

  return (
    <View style={styles.mainPane}>
      {items.sort(ASC_NAME).map((addon, index) => (
        <Button
          key={index}
          skin={styles.itemSkin}
          body={styles.itemBody}
          onPress={() => onClick('on-select', addon)}>
          <View style={styles.leftPane}>
            {isChecked(addon.name)}
            <Text style={styles.itemText}>{addon.name}</Text>
          </View>
          <Text style={styles.suffixText}>₱{addon.price}</Text>
        </Button>
      ))}
    </View>
  );
}
