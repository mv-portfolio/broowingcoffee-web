import {useEffect, useReducer, useRef} from 'react';
import {Button, Icon, Separator, Text, View} from 'components';
import dropdown, {dropdownInitState} from './reducer';
import styles from './.module.css';

export default function Dropdown({
  items = [],
  style,
  defaultStyle,
  textStyle,
  textDefaultStyle,
  disabled,
  placeholder,
  hideIcon = false,
  accentColor,
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
          color={accentColor ? accentColor : '#000'}
          size='2vh'
        />
      );
    }
    return (
      <Icon
        font='AntDesign'
        name='caretdown'
        color={accentColor ? accentColor : '#000'}
        size='2vh'
      />
    );
  };

  useEffect(() => {
    if (mainPaneRef.current) {
      const getPropertyValue = prop => {
        return getComputedStyle(mainPaneRef.current).getPropertyValue(prop);
      };
      const widthParent = getPropertyValue('width');
      setTimeout(() => {
        setState({
          type: 'set',
          styles: {
            width: `calc(${widthParent} - 2vh)`,
          },
        });
      }, 100);
    }
  }, [mainPaneRef.current]);

  return (
    <View>
      <button
        ref={mainPaneRef}
        className={`${styles.mainPane} ${style}`}
        style={defaultStyle}
        disabled={disabled}
        onClick={() => onClick('on-show-picker-list')}>
        <Text style={`${styles.title} ${textStyle}`} defaultStyle={textDefaultStyle}>
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
      </button>
      {state.isDropdownListShow && unSelectedItems.length !== 0 && (
        <View style={styles.pickerList} defaultStyle={{...state.styles}}>
          {unSelectedItems.map((type, index) => (
            <View key={index}>
              <Button
                title={type}
                skin={styles.pickerItem}
                defaultStyle={{color: accentColor ? accentColor : '#000'}}
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
