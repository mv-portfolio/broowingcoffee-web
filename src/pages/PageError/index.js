import {View, Text, Icon, Separator} from 'components';
import {accentColor} from 'constants/styles';
import {connect} from 'react-redux';
import styles from './.module.css';
function PageError({error}) {
  const getIcon = (type, name) => {
    return <Icon font={type} name={name} size='7.5vh' color={accentColor} />;
  };
  const errorHandler = error => {
    let errorName = '';
    Object.values(error).map(error => (error ? (errorName = error) : null));
    if (errorName === 'Network Error' || errorName === 'timeout of 5000ms exceeded') {
      return {
        title: 'Server Maintenance',
        subtitle:
          'Sorry for inconvenient, we temporarily down the server and we will be back soon',
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
