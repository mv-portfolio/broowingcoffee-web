import {useContext, useState} from 'react';
import {View, Separator, Text, TextInput, Button, Dropdown} from 'components';
import {CRITICAL_COLOR, MODERATE_COLOR} from 'constants/colors';
import {Toast} from 'context';
import {isInteger} from 'utils/checker';
import styles from './.module.css';
import {getExpirePoint} from 'utils/helper';

export default function ItemConfigure({
  itemType,
  perishableProperties = {},
  restockPoint = {},
  onSave,
  onCancel,
}) {
  const [state, setState] = useState({
    low: restockPoint.low[0] || '',
    mid: restockPoint.mid[1] || '',
    expire_point: getExpirePoint(null, perishableProperties.expire_point) || '',
  });
  const {onShow: onShowToast} = useContext(Toast);

  const onClean = state => {
    if (!state.low || !state.mid) {
      return {
        status: false,
        error: 'Please fill up all inputs',
      };
    }
    if (!(parseInt(state.low) > 0 && parseInt(state.mid) > parseInt(state.low))) {
      return {
        status: false,
        error: 'Please set restock point in right statement',
      };
    }
    if (itemType === 'perishable' && !state.expire_point) {
      return {
        status: false,
        error: 'Please set fill the expire point',
      };
    }
    return {
      status: true,
      payload: {
        ...state,
        expire_point: state.expire_point.value,
      },
    };
  };
  const onChange = (actionType, value) => {
    if (actionType === 'on-change-low-quantity' && isInteger(value)) {
      setState(prev => ({...prev, low: value}));
      return;
    }
    if (actionType === 'on-change-mid-quantity' && isInteger(value)) {
      setState(prev => ({...prev, mid: value}));
      return;
    }
  };
  const onClick = (actionType, value) => {
    if (actionType === 'on-click-save') {
      const isClean = onClean(state);
      if (!isClean.status) {
        onShowToast(isClean.error);
        return;
      }
      onSave(isClean.payload);
      onCancel();
      return;
    }
    if (actionType === 'on-select-expire-point') {
      setState(prev => ({...prev, expire_point: getExpirePoint(value, null)}));
      return;
    }
  };

  return (
    <View style={styles.mainPane}>
      <Text style={styles.title}>CONFIGURATION</Text>
      <Separator vertical={1.5} />
      <View style={styles.bodyPane}>
        <Text style={styles.titleContent}>Restock Point</Text>
        <Separator vertical={0.25} />
        <Text style={styles.titleField}>
          it highlights the "quantity" once the item met the range of specific status
        </Text>
        <Separator vertical={0.75} />
        <View style={styles.titlePane}>
          <Text style={styles.titleField}>Low</Text>
          <Separator horizontal={0.25} />
          <Text style={styles.titleField2} defaultStyle={{color: CRITICAL_COLOR}}>
            (Red status)
          </Text>
        </View>
        <Separator vertical={0.25} />
        <View style={styles.inputsPane}>
          <TextInput
            skin={styles.input}
            placeholder='based 0'
            value={0}
            disabled={true}
            defaultStyle={{boxShadow: 'none'}}
          />
          <Separator horizontal={0.75} />
          <Text style={styles.indicator}>to</Text>
          <Separator horizontal={0.75} />
          <TextInput
            skin={styles.input}
            placeholder='0'
            value={state.low}
            onChangeText={text => onChange('on-change-low-quantity', text)}
          />
        </View>
        <Separator vertical={1} />
        <View style={styles.titlePane}>
          <Text style={styles.titleField}>Mid</Text>
          <Separator horizontal={0.25} />
          <Text style={styles.titleField2} defaultStyle={{color: MODERATE_COLOR}}>
            (Yellow status)
          </Text>
        </View>
        <Separator vertical={0.25} />
        <View style={styles.inputsPane}>
          <TextInput
            skin={styles.input}
            placeholder='0'
            value={state.low}
            disabled={true}
            defaultStyle={{boxShadow: 'none'}}
          />
          <Separator horizontal={0.75} />
          <Text style={styles.indicator}>to</Text>
          <Separator horizontal={0.75} />
          <TextInput
            skin={styles.input}
            placeholder='0'
            value={state.mid}
            onChangeText={text => onChange('on-change-mid-quantity', text)}
          />
        </View>
        {itemType === 'perishable' && (
          <>
            <Separator vertical={1.5} />
            <Text style={styles.titleContent}>Expire Point</Text>
            <Separator vertical={0.25} />
            <Text style={styles.titleField}>
              when should to highlight the expiring item
            </Text>
            <Separator vertical={0.5} />
            <Dropdown
              items={[
                '2 days before',
                '5 days before',
                '10 days before',
                '15 days before',
                '1 month before',
              ]}
              selected={state.expire_point.name}
              onSelected={item => onClick('on-select-expire-point', item)}
              style={styles.dropdown}
            />
          </>
        )}
      </View>
      <Separator vertical={1.5} />
      <View style={styles.bottomPane}>
        <Button
          title='Save'
          skin={styles.button}
          onPress={() => onClick('on-click-save')}
        />
      </View>
    </View>
  );
}
