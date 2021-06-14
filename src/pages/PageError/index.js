import {View, Text, Separator} from 'components';
import {accentColor} from 'constants/styles';
import Icon from 'react-web-vector-icons';
import styles from './.module.css';

export default function PageError({title}) {
  const errorHandler = title => {
    if (title === 'Network Error') {
      return {
        title: 'Connection Error',
        subtitle: 'Please check your internet connection.',
      };
    } else if (title === 'OPPSSS!') {
      return {
        title: 'OPPSSS!',
        subtitle: 'Something went wrong, Please try again later',
      };
    }
  };

  return (
    <View style={styles.mainPane}>
      <View style={styles.bodyPane}>
        <Icon
          font='Feather'
          name='alert-triangle'
          size='50px'
          color={accentColor}
        />
        <Separator vertical={15} />
        <Text style={styles.title}>{errorHandler(title).title}</Text>
        <Separator vertical={5} />
        <Text style={styles.subtitle}>{errorHandler(title).subtitle}</Text>
      </View>
    </View>
  );
}
