import {View, Text, Separator} from 'components';
import {accentColor} from 'constants/styles';
import {connect} from 'react-redux';
import Icon from 'react-web-vector-icons';
import styles from './.module.css';
function PageError({error}) {
  const getIcon = (type, name) => {
    return <Icon font={type} name={name} size='50px' color={accentColor} />;
  };
  const errorHandler = error => {
    if (error.name === 'Network Error') {
      return {
        title: 'Connection Error',
        subtitle: 'Please check your internet connection.',
        icon: getIcon('Feather', 'wifi-off'),
      };
    } else if (error.name === 'Server Maintenance') {
      return {
        title: error.name,
        subtitle: error.message,
        icon: getIcon('AntDesign', 'tool'),
      };
    } else if (error.name === 'Page Not Found') {
      return {
        title: error.name,
        subtitle: error.message,
        icon: getIcon('AntDesign', 'disconnect'),
      };
    }

    return {
      title: 'OPPSSS!',
      subtitle: 'Something went wrong, Please try again later',
      icon: getIcon('x'),
    };
  };

  return (
    <View style={styles.mainPane}>
      <View style={styles.bodyPane}>
        {errorHandler(error).icon}
        <Separator vertical={15} />
        <Text style={styles.title}>{errorHandler(error).title}</Text>
        <Separator vertical={5} />
        <Text style={styles.subtitle}>{errorHandler(error).subtitle}</Text>
      </View>
    </View>
  );
}

const stateProps = ({error}) => ({
  error,
});
export default connect(stateProps)(PageError);
