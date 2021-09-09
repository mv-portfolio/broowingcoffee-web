import View from 'components/View';
import styles from './.module.css';
import Button from 'components/Button';
import Separator from 'components/Separator';
import * as Progress from 'components/Progress';

import Icon from 'react-web-vector-icons';
import {accentColor} from 'constants/styles';
import {useRef} from 'react';
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
  const ref = useRef();

  const isEncryptText = status => {
    if (status) {
      return <Icon name='eye-off' font='Feather' color={accentColor} size={ICON_SIZE} />;
    } else {
      return <Icon name='eye' font='Feather' color={accentColor} size={ICON_SIZE} />;
    }
  };

  return (
    <View style={`${styles.skin} ${skin}`} defaultStyle={defaultStyle}>
      {prefixIcon && (
        <>
          {prefixIcon}
          <Separator horizontal={1} />
        </>
      )}
      <input
        ref={ref}
        type={isTextEncrypt ? 'password' : null}
        placeholder={placeholder}
        value={value}
        onChange={event => onChangeText(event.target.value)}
        className={`${styles.body} ${body}`}
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
