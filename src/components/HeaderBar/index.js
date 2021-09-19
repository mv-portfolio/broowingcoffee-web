import menuList from './menuList';
import styles from './.module.css';

import {Button, Separator, Text, View, Icon} from 'components';
import {replace} from 'connected-react-router';
import {connect} from 'react-redux';
import {WHITE} from 'constants/styles';

function HeaderBar({
  //Redux Props
  dispatch,
  //HeaderBar Props
  title,
  showMenu,
  onSwitchRoute,
  prefixComponent,
}) {
  const onPress = (component, value) => {
    if (component === 'on-navigate') {
      dispatch(replace(`/${value === 'Transaction' ? '' : value.toLowerCase()}`));
      onSwitchRoute(value);
    } else if (component === 'on-navigate-profile') {
      dispatch(replace(`/profile`));
      onSwitchRoute('Profile');
    }
  };

  return (
    <>
      <View style={styles.mainPane}>
        <View style={styles.leftPane}>
          {prefixComponent && (
            <>
              {prefixComponent}
              <Separator horizontal={1} />
            </>
          )}
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.rightPane}>
          <Button
            skin={styles.profileIcon}
            onPress={() => onPress('on-navigate-profile')}>
            <Icon font='Feather' name='user' size='4.25vh' color={WHITE} />
          </Button>
        </View>
      </View>
      {showMenu && (
        <View style={styles.menuListPane}>
          {menuList
            .filter(prevState => prevState.title !== title)
            .map(({title, icon}, index) => {
              return (
                <Button
                  key={index}
                  prefixComponent={<Icon {...icon} />}
                  title={title}
                  titleStyle={styles.buttonText}
                  skin={styles.button}
                  onPress={() => onPress('on-navigate', title)}
                />
              );
            })}
        </View>
      )}
    </>
  );
}

const stateProps = ({user}) => ({user});

const dispatchProps = dispatch => ({
  dispatch: action => dispatch(action),
});

export default connect(stateProps, dispatchProps)(HeaderBar);
