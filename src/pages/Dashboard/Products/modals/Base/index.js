import {Button, Separator, Text, TextInput, View} from 'components';
import {Toast} from 'context';
import {useContext, useState} from 'react';
import {connect} from 'react-redux';
import {isName} from 'utils/checker';
import styles from './.module.css';

function Base({loading, dispatch, onAdd}) {
  const {onShow: onShowToast} = useContext(Toast);
  const [name, setName] = useState('');

  const onClean = state => {
    if (!state.name) {
      return {
        status: false,
        error: 'Please fill the inputs',
      };
    }
    return {
      status: true,
      payload: state,
    };
  };

  const onClickAdd = () => {
    const isClean = onClean({name});
    if (!isClean.status) {
      onShowToast(isClean.error);
      return;
    }
    onAdd(isClean.payload);
  };

  return (
    <View style={styles.mainPane}>
      <Text style={styles.title}>Add Base</Text>
      <Separator vertical={1} />
      <View style={styles.bodyPane}>
        <Text style={styles.label}>Base</Text>
        <Separator vertical={0.25} />
        <TextInput
          skin={styles.input}
          placeholder='Name'
          value={name}
          onChangeText={text => {
            if (isName(text) || text.includes('-')) {
              setName(text);
            }
          }}
        />
      </View>
      <Separator vertical={2} />
      <View style={styles.bottomPane}>
        <Button
          isLoading={loading.status}
          title='Add'
          skin={styles.buttonAdd}
          onPress={() => onClickAdd()}
        />
      </View>
    </View>
  );
}

const stateProps = ({loading}) => ({
  loading,
});
const dispatchProps = dispatch => ({dispatch: action => dispatch(action)});
export default connect(stateProps, dispatchProps)(Base);
