import {useEffect, useState} from 'react';
import {View} from 'components';
import {hp} from 'utils/helper';
import styles from './.module.css';

export default function ToggleButton({status, size, onSelected}) {
  const [isOn, setIsOn] = useState(status);

  const onClick = () => {
    setIsOn(prev => {
      onSelected(!prev);
      return !prev;
    });
  };

  useEffect(() => {
    setIsOn(isOn);
  }, [isOn]);

  return (
    <View
      style={styles.mainPane}
      defaultStyle={{
        padding: window.innerHeight * (size / 800) || hp(0.5),
        alignItems: isOn ? 'flex-end' : 'flex-start',
        borderRadius: window.innerHeight * (size / 95),
        width: window.innerHeight * (size / 55) || hp(7),
        height: window.innerHeight * (size / 135) || hp(3),
      }}
      onClick={onClick}>
      <View
        style={styles.toggle}
        defaultStyle={{
          filter: !isOn && 'grayscale(100%)',
          borderRadius: window.innerHeight * (size / 95) || hp(3),
          width: window.innerHeight * (size / 100) || hp(4),
          height: window.innerHeight * (size / 100) || hp(3),
        }}
      />
    </View>
  );
}
