import {useState} from 'react';
import {Button, Icon, Separator, Text, View} from 'components';
import styles from './.module.css';
import {backgroundColor} from 'constants/styles';
import {ICON_SIZE} from 'constants/sizes';
export default function Picker({items = [], selected, onSelected}) {
  const [state, setState] = useState({
    isShow: false,
    value: selected || '',
  });

  const onClick = (actionType, value) => {
    if (actionType === 'on-click') {
      setState(prev => ({...prev, isShow: !prev.isShow}));
      return;
    }
    if (actionType === 'on-select') {
      onSelected(value);
      setState({
        isShow: false,
        value: value,
      });
      return;
    }
  };

  return (
    <View>
      <Button onPress={() => onClick('on-click')}>
        <View style={styles.mainPane}>
          <Text style={styles.title}>{state.value || 'Select...'}</Text>
          <Icon
            font='AntDesign'
            name='caretdown'
            color={backgroundColor}
            size={ICON_SIZE}
          />
        </View>
      </Button>
      {state.isShow && (
        <View style={styles.pickerList}>
          {items
            .filter(type => type !== state.value)
            .map((type, index) => (
              <View key={index}>
                <Button
                  title={type}
                  titleStyle={styles.pickerItemTitle}
                  skin={styles.pickerItemSkin}
                  body={styles.pickerItemBody}
                  onPress={() => onClick('on-select', type)}
                />
                {index + 1 !== items.filter(type => type !== state.value).length ? (
                  <Separator vertical={0.25} />
                ) : null}
              </View>
            ))}
        </View>
      )}
    </View>
  );
}
