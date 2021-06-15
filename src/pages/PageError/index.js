import {View, Text, Separator} from 'components';
import {accentColor} from 'constants/styles';
import Icon from 'react-web-vector-icons';
import styles from './.module.css';

export default function PageError({title}) {
  const getIcon = name => {
    return <Icon font='Feather' name={name} size='50px' color={accentColor} />;
  };
  const errorHandler = title => {
    if (title === 'Network Error') {
      return {
        title: 'Connection Error',
        subtitle: 'Please check your internet connection.',
        icon: getIcon('x-circle'),
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
        {errorHandler(title).icon}
        <Separator vertical={15} />
        <Text style={styles.title}>{errorHandler(title).title}</Text>
        <Separator vertical={5} />
        <Text style={styles.subtitle}>{errorHandler(title).subtitle}</Text>
      </View>
    </View>
  );
}
