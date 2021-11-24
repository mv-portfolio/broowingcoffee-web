import {useEffect, useReducer, useRef} from 'react';
import {Button, Icon, Separator, Text, View} from 'components';
import styles from './.module.css';
import dropdown, {dropdownInitState} from './reducer';

export default function Dropdown({
  items = [],
  style,
  textStyle,
  placeholder,
  hideIcon = false,
  ACCENT_COLOR,
  selected,
  onSelected,
}) {
  const mainPaneRef = useRef();
  const [state, setState] = useReducer(dropdown, dropdownInitState({value: selected}));

  const unSelectedItems = items.filter(type => type !== (selected || state.value));

  const onClick = (actionType, value) => {
    if (actionType === 'on-show-picker-list') {
      setState({type: 'set', isDropdownListShow: !state.isDropdownListShow});
      return;
    }
    if (actionType === 'on-select') {
      onSelected(value);
      setState({type: 'set', isDropdownListShow: false, value: value});
      return;
    }
  };
  const getIcon = isShow => {
    if (isShow) {
      return (
        <Icon
          font='AntDesign'
          name='caretup'
          color={ACCENT_COLOR ? ACCENT_COLOR : '#000'}
          size='2vh'
        />
      );
    }
    return (
      <Icon
        font='AntDesign'
        name='caretdown'
        color={ACCENT_COLOR ? ACCENT_COLOR : '#000'}
        size='2vh'
      />
    );
  };

  useEffect(() => {
    if (mainPaneRef.current) {
      const getPropertyValue = prop => {
        return getComputedStyle(mainPaneRef.current).getPropertyValue(prop);
      };
      const getPxValue = property => {
        return parseInt(property.substring(0, property.length - 2)) + 14;
      };
      const widthParent = getPropertyValue('width');
      setTimeout(() => {
        setState({
          type: 'set',
          styles: {
            width: `${getPxValue(widthParent)}px`,
          },
        });
      }, 100);
    }
  }, [mainPaneRef.current]);

  return (
    <View>
      <View
        ref={mainPaneRef}
        style={`${styles.mainPane} ${style}`}
        onClick={() => onClick('on-show-picker-list')}>
        <Text style={`${styles.title} ${textStyle}`}>
          {selected || state.value || (
            <span className={styles.placeholder}>{placeholder || 'Select...'}</span>
          )}
        </Text>
        {!hideIcon && (
          <View defaultStyle={{flexDirection: 'row', alignItems: 'center'}}>
            {getIcon(state.isDropdownListShow)}
            <Separator horizontal={0.75} />
          </View>
        )}
      </View>
      {state.isDropdownListShow && unSelectedItems.length !== 0 && (
        <View style={styles.pickerList} defaultStyle={{...state.styles}}>
          {unSelectedItems.map((type, index) => (
            <View key={index}>
              <Button
                title={type}
                skin={styles.pickerItem}
                defaultStyle={{color: ACCENT_COLOR ? 'ACCENT_COLOR' : '#000'}}
                onClick={() => onClick('on-select', type)}
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
