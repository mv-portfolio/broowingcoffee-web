import {useEffect, useReducer, useRef} from 'react';
import {Button, Icon, Separator, Text, View} from 'components';
import dropdown, {dropdownInitState} from './reducer';
import styles from './.module.css';

export default function Dropdown({
  items = [],
  style,
  listStyle,
  placeholderStyle,
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
  const listRef = useRef();

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

  const stylesListener = () => {
    const getPropertyValue = (ref, prop) => {
      return getComputedStyle(ref).getPropertyValue(prop);
    };
    if (mainPaneRef.current) {
      const parentWidth = getPropertyValue(mainPaneRef.current, 'width');
      setState({
        type: 'set',
        styles: {
          width: `calc(${parentWidth} - 2vh)`,
        },
      });
    }
  };
  useEffect(stylesListener, [mainPaneRef.current, state.isDropdownListShow]);

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
            <span className={`${styles.placeholder}  ${placeholderStyle}`}>
              {placeholder || 'Select...'}
            </span>
          )}
        </Text>
        {!hideIcon && (
          <>
            <Separator horizontal={2} />
            <View defaultStyle={{flexDirection: 'row', alignItems: 'center'}}>
              {getIcon(state.isDropdownListShow)}
              <Separator horizontal={0.75} />
            </View>
          </>
        )}
      </button>
      {state.isDropdownListShow && unSelectedItems.length !== 0 && (
        <View
          ref={listRef}
          style={`${styles.pickerList} ${listStyle}`}
          defaultStyle={{...state.styles}}>
          {unSelectedItems.map((type, index) => (
            <Button
              key={index}
              title={type}
              skin={styles.pickerItem}
              defaultStyle={{
                color: accentColor ? accentColor : '#000',
                marginBottom: index + 1 !== unSelectedItems.length ? '0.5' : '0',
                borderBottom:
                  index + 1 !== unSelectedItems.length
                    ? '0.15vh solid rgba(0, 0, 0, 0.25)'
                    : '0',
              }}
              onClick={() => onClick('on-select', type)}
            />
          ))}
        </View>
      )}
    </View>
  );
}
