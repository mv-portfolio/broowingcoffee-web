import {Button, Separator, Text, TextInput, View} from 'components';
import {ACCENT_COLOR, ACCENT_COLOR_DISABLED} from 'constants/colors';
import {Toast} from 'context';
import {CLEAR_LOADING} from 'ducks/actions';
import useHook, {
  productAddonsInitState,
  productAddons as productAddonsReducer,
} from 'hooks';
import {useContext, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {isName, isDouble} from 'utils/checker';
import Formatter from 'utils/Formatter';
import styles from './.module.css';

function Addons({
  loading,
  dispatch,
  type,
  productInfo = {},
  onAdd,
  onUpdate,
  onDelete,
  onCancel,
}) {
  const {name, price} = productInfo;

  const {onShow: onShowToast} = useContext(Toast);

  const [state, setState] = useHook(
    productAddonsInitState({
      name,
      price,
    }),
    productAddonsReducer,
  );
  const [isChange, setIsChange] = useState(false);

  const onClick = (actionType, value) => {
    if (actionType === 'on-click-add') {
      const product = onClean(state);
      if (!product.isClean) {
        onShowToast('Please fill up all the inputs');
        return;
      }
      onAdd(product.info);
      return;
    }
    if (actionType === 'on-click-update') {
      const product = onClean(state);
      if (!product.isClean) {
        onShowToast('Please fill up all the inputs');
        return;
      }
      onUpdate(product.info);
      return;
    }
    if (actionType === 'on-click-delete') {
      onDelete(value);
      return;
    }
    if (actionType === 'on-click-cancel') {
      onCancel();
      return;
    }
  };
  const onChange = (actionType, value) => {
    if (actionType === 'on-change-product-name') {
      if (isName(value) || value.length === 0) {
        setState({type: 'set', name: value});
      }
      return;
    }
    if (actionType === 'on-change-price') {
      if (isDouble(value) || value.length === 0) {
        setState({type: 'set', price: value});
      }
      return;
    }
  };
  const onClean = state => {
    if (state.name.length === 0) {
      return {isClean: false};
    }
    if (state.price.length === 0) {
      return {isClean: false};
    }

    let info = state;
    info.date_modified = new Date().getTime();
    info.price = parseFloat(state.price);

    return {
      isClean: true,
      info,
    };
  };

  const changeListener = () => {
    if (name !== state.name || (price ? String(price) : '') !== state.price) {
      setIsChange(true);
      return;
    }
    setIsChange(false);
  };
  const requestListener = () => {
    if (!loading.status && loading.message === 'done') {
      onCancel();
      dispatch(CLEAR_LOADING());
    }
  };
  useEffect(changeListener, [name, price, state]);
  useEffect(requestListener, [loading]);
  return (
    <View style={styles.mainPane}>
      <Text style={styles.title}>{`${Formatter.toName(type)} Addons`}</Text>
      <Separator vertical={1.5} />
      <View style={styles.bodyPane}>
        <Text style={styles.titleField}>Product</Text>
        <Separator vertical={0.25} />
        <TextInput
          skin={styles.input}
          placeholder='Name'
          value={state.name}
          disabled={type !== 'add'}
          defaultStyle={{
            boxShadow:
              type === 'add' ? '0.25vh 0.25vh 0.25vh rgba(0, 0, 0, 0.25)' : 'none',
          }}
          onChangeText={text => onChange('on-change-product-name', text)}
        />
        <Separator vertical={1} />
        <Text style={styles.titleField}>Price</Text>
        <Separator vertical={0.25} />
        <TextInput
          skin={styles.input}
          placeholder='0.00'
          value={state.price}
          onChangeText={text => onChange('on-change-price', text)}
        />
      </View>
      <Separator vertical={2} />
      <View style={styles.bottomPane}>
        {type === 'add' && (
          <Button
            title='Add'
            skin={styles.button}
            isLoading={loading.status}
            onPress={() => onClick('on-click-add')}
          />
        )}
        {type !== 'add' && (
          <>
            <Button
              title='Update'
              skin={styles.button}
              isLoading={loading.status}
              disabled={!isChange}
              defaultStyle={{
                BACKGROUND_COLOR2: isChange ? ACCENT_COLOR : ACCENT_COLOR_DISABLED,
              }}
              onPress={() => onClick('on-click-update')}
            />
            <Separator horizontal={1} />
            <Button
              title='Delete'
              skin={styles.buttonDelete}
              disabled={loading.status}
              onPress={() => onClick('on-click-delete', productInfo.name)}
            />
          </>
        )}
        <Separator horizontal={1} />
        <Button
          title='Cancel'
          skin={styles.button}
          disabled={loading.status}
          onPress={() => onClick('on-click-cancel')}
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
export default connect(stateProps, dispatchProps)(Addons);
