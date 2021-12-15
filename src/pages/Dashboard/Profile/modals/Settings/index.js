import {useEffect, useReducer} from 'react';
import {View, Text, ToggleButton, Button} from 'components';
import {BACKGROUND_COLOR4} from 'constants/colors';
import {settignsInitState, settings} from 'hooks';
import {pushLocalStorage} from 'storage';
import {getPropsValues} from 'utils/helper';
import styles from './.module.css';

export default function Settings({configs, onHide}) {
  const [state, setState] = useReducer(
    settings,
    settignsInitState({
      'always show details product': configs['always show details product'],
    }),
  );

  const onSelected = newState => {
    setState({type: 'set', ...newState});
  };

  return (
    <View style={styles.mainPane}>
      <View style={styles.topPane}>
        <Text style={styles.title}>Settings</Text>
      </View>
      <View style={styles.bodyPane}>
        {getPropsValues(state).map(({property, value}, index) => (
          <View
            key={index}
            style={styles.propertyPane}
            defaultStyle={{borderBottom: `solid 0.25vh ${BACKGROUND_COLOR4}`}}>
            <Text style={styles.property}>{property}</Text>
            <ToggleButton
              size={3}
              status={value}
              onSelected={status => onSelected({[property]: status})}
            />
          </View>
        ))}
      </View>
      <View style={styles.bottomPane}>
        <Button
          skin={styles.button}
          title='Save'
          onPress={() => {
            pushLocalStorage('cfg', state);
            onHide();
          }}
        />
      </View>
    </View>
  );
}
