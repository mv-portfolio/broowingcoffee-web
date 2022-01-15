import {Button, Separator, Text, View} from 'components';
import {hp} from 'utils/helper';
import styles from './.module.css';
import devs from './devs';

export default function ContactUs() {
  return (
    <View style={styles.mainPane}>
      <Text style={styles.title}>Contact us</Text>
      <Separator vertical={1} />
      {devs.map((dev, index) => (
        <View
          key={index}
          style={styles.component}
          defaultStyle={{marginBottom: index + 1 !== devs.length ? '2vh' : '0'}}>
          <Text style={styles.name}>{dev.name}</Text>
          <Separator vertical={0.1} />
          <Text style={styles.email}>{dev.email}</Text>
        </View>
      ))}
    </View>
  );
}
