import View from 'components/View';
import styles from './.module.css';
import Button from 'components/Button';
import Separator from 'components/Separator';
import * as Progress from 'components/Progress';

import Icon from 'react-web-vector-icons';
import {ACCENT_COLOR} from 'constants/colors';
import {useEffect, useRef, useState} from 'react';
import {ICON_SIZE} from 'constants/sizes';

export default function TextInput({
  defaultStyle,
  skin,
  body,
  value,
  onChangeText,
  isTextEncrypt,
  onEncryptText,
  indicatorProgress,
  indicatorColor,
  indicatorSize,
  indicatorThickness,
  placeholder,
  prefixIcon,
  ...props
}) {
  const mainPaneRef = useRef();

  const [inputStyle, setInputStyle] = useState();

  const isEncryptText = status => {
    if (status) {
      return <Icon name='eye-off' font='Feather' color={ACCENT_COLOR} size={ICON_SIZE} />;
    } else {
      return <Icon name='eye' font='Feather' color={ACCENT_COLOR} size={ICON_SIZE} />;
    }
  };

  // useEffect(() => {
  //   const getPropertyValue = (ref, prop) => {
  //     return getComputedStyle(ref).getPropertyValue(prop);
  //   };
  //   if (mainPaneRef.current) {
  //     const parentWidth = getPropertyValue(mainPaneRef.current, 'width');
  //     const parentPaddingRight = getPropertyValue(mainPaneRef.current, 'padding-right');
  //     setInputStyle({
  //       width: `2vh`,
  //     });
  //   console.log(parentWidth)
  //   }
  // }, [mainPaneRef.current]);

  return (
    <View ref={mainPaneRef} style={`${styles.skin} ${skin}`} defaultStyle={defaultStyle}>
      {prefixIcon && (
        <>
          {prefixIcon}
          <Separator horizontal={1} />
        </>
      )}
      <input
        type={isTextEncrypt ? 'password' : null}
        placeholder={placeholder}
        value={value}
        onChange={event => onChangeText(event.target.value)}
        className={`${styles.body} ${body}`}
        style={inputStyle}
        {...props}
      />
      <View style={styles.suffixPane}>
        {String(placeholder).toLowerCase().includes('password') &&
          typeof indicatorProgress === 'undefined' && (
            <Button skin={styles.buttonEncryptText} onPress={onEncryptText}>
              {isEncryptText(isTextEncrypt)}
            </Button>
          )}
        {typeof indicatorProgress !== 'undefined' && (
          <View style={styles.buttonEncryptText}>
            <Progress.Circle
              color={indicatorColor}
              thickness={indicatorThickness}
              size={indicatorSize}
              progress={indicatorProgress}
            />
          </View>
        )}
      </View>
    </View>
  );
}
