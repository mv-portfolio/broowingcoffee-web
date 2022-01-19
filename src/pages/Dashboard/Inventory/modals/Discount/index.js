import {useContext, useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Toast} from 'context';
import {Button, Separator, Text, TextInput, View} from 'components';
import {isInteger, isName} from 'utils/checker';
import styles from './.module.css';
import {ACCENT_COLOR, ACCENT_COLOR_DISABLED} from 'constants/colors';

function Restock({
  type,
  discount = {},
  loading,
  dispatch,
  onAdd,
  onUpdate,
  onDelete,
  onCancel,
}) {
  const {_id, name, value} = discount;
  const [state, setState] = useState({
    _id: _id || '',
    name: name || '',
    value: value || '',
  });
  const [isChange, setIsChange] = useState(false);
  const {onShow: onShowToast} = useContext(Toast);

  const onClean = state => {
    if (!state.name || !state.value) {
      return {
        status: false,
      };
    }
    return {
      payload: {
        ...state,
        value: parseInt(state.value),
      },
      status: true,
    };
  };
  const onChange = (actionType, value) => {
    if (actionType === 'on-change-name' && isName(value)) {
      setState(prev => ({...prev, name: value}));
      return;
    }
    if (actionType === 'on-change-value' && isInteger(value)) {
      setState(prev => ({...prev, value}));
      return;
    }
  };
  const onClick = actionType => {
    if (actionType === 'on-click-add') {
      const isClean = onClean(state);
      if (!isClean.status) {
        onShowToast('Please fill up all the inputs');
        return;
      }
      onAdd(isClean.payload);
      return;
    }
    if (actionType === 'on-click-update') {
      const isClean = onClean(state);
      if (!isClean.status) {
        onShowToast('Please fill up all the inputs');
        return;
      }
      onUpdate({...isClean.payload, _id: discount._id});
      return;
    }
    if (actionType === 'on-click-delete') {
      onDelete(discount);
      return;
    }
  };

  const changeListener = () => {
    if (state.name !== name || parseInt(state.value) !== value) {
      setIsChange(true);
      return;
    }
    setIsChange(false);
  };
  useEffect(changeListener, [state]);

  return (
    <View style={styles.mainPane}>
      <Text style={styles.title}>Discount</Text>
      <Separator vertical={1.5} />
      <View style={styles.bodyPane}>
        <Text style={styles.titleField}>Name</Text>
        <Separator vertical={0.25} />
        <TextInput
          skin={styles.input}
          placeholder='specify discount name'
          disabled={type !== 'add'}
          defaultStyle={{
            boxShadow:
              type === 'add' ? '0.25vh 0.25vh 0.25vh rgba(0, 0, 0, 0.25)' : 'none',
          }}
          value={state.name}
          onChangeText={text => onChange('on-change-name', text)}
        />
        <Separator vertical={1} />
        <Text style={styles.titleField}>Value (%)</Text>
        <Separator vertical={0.25} />
        <TextInput
          skin={styles.input}
          placeholder='0'
          value={state.value}
          onChangeText={text => onChange('on-change-value', text)}
        />
      </View>
      <Separator vertical={2} />
      <View style={styles.bottomPane}>
        {type === 'add' && (
          <Button
            skin={styles.button}
            title='Add'
            isLoading={loading.status}
            onPress={() => onClick('on-click-add')}
          />
        )}
        {type !== 'add' && (
          <>
            <Button
              skin={styles.button}
              isLoading={loading.status}
              title='Update'
              disabled={!isChange}
              defaultStyle={{
                backgroundColor: isChange ? ACCENT_COLOR : ACCENT_COLOR_DISABLED,
              }}
              onPress={() => onClick('on-click-update')}
            />
            <Separator horizontal={1} />
            <Button
              skin={styles.buttonDelete}
              title='Delete'
              disabled={loading.status}
              onPress={() => onClick('on-click-delete')}
            />
          </>
        )}
        <Separator horizontal={1} />
        <Button
          skin={styles.button}
          title='Cancel'
          disabled={loading.status}
          onPress={onCancel}
        />
      </View>
    </View>
  );
}

const stateProps = ({loading}) => ({
  loading,
});
const dispatchProps = dispatch => ({
  dispatch: action => dispatch(action),
});
export default connect(stateProps, dispatchProps)(Restock);
