import {View, Text, Icon, Separator} from 'components';
import {ACCENT_COLOR} from 'constants/colors';
import {connect} from 'react-redux';
import styles from './.module.css';

function PageError({error}) {
  const getIcon = (type, name) => {
    return <Icon font={type} name={name} size='7.5vh' color={ACCENT_COLOR} />;
  };
  const errorHandler = error => {
    if (error.auth) {
      return {
        title: 'Session Expired',
        subtitle: 'Please refresh the page and Sign-in again',
        icon: getIcon('Feather', 'clock'),
      };
    }
    if (error.server) {
      return {
        title: 'Server Maintenance',
        subtitle:
          'Sorry for inconvenient, we temporarily down the server and we will be back as soon as possible',
        icon: getIcon('AntDesign', 'tool'),
      };
    }
    return {
      title: 'Page Not Found',
      subtitle: 'The link you provide is broken, Please be sure the link is correct',
      icon: getIcon('AntDesign', 'disconnect'),
    };
  };

  return (
    <View style={styles.mainPane}>
      <View style={styles.bodyPane}>
        {errorHandler(error).icon}
        <Separator vertical={1} />
        <Text style={styles.title}>{errorHandler(error).title}</Text>
        <Separator vertical={0.5} />
        <Text style={styles.subtitle}>{errorHandler(error).subtitle}</Text>
      </View>
    </View>
  );
}

const stateProps = ({error}) => ({
  error,
});
export default connect(stateProps)(PageError);
