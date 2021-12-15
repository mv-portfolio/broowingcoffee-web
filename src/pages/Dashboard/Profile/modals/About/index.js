import {Button, Separator, Text, View} from 'components';
import {hp} from 'utils/helper';
import styles from './.module.css';

export default function About({onHide}) {
  return (
    <View style={styles.mainPane}>
      <Text style={styles.title}>About</Text>
      <Separator vertical={0.5} />
      <View style={styles.bodyPane}>
        <Text style={styles.content}>
          The goal of the system is to minimize the time and effort in managing the
          records and business reports. It also aims to provide a secured service that is
          accessible through web with a dedicated cloud database solely for their
          business.
        </Text>
        <Separator vertical={1} />
        <Text style={styles.content}>
          Broowing Coffee is a small business coffee pop-up both offering hot and iced
          coffee made from freshly brewed coffee beans from our local farmers in Benguet
          and Ifugao.
        </Text>
        <Separator vertical={3} />
        <Text style={styles.contentTitle}>Developed and Designed by</Text>
        <Separator vertical={0.25} />
        <Text style={styles.content} defaultStyle={{fontSize: hp(1.9)}}>
          Marvin Petate
        </Text>
        <Separator vertical={1} />
        <Text style={styles.contentTitle}>Conceptualized by</Text>
        <Separator vertical={0.25} />
        <Text style={styles.content} defaultStyle={{fontSize: hp(1.9)}}>
          Marvin Petate
        </Text>
        <Text style={styles.content} defaultStyle={{fontSize: hp(1.9)}}>
          Melberte Abesamis
        </Text>
        <Text style={styles.content} defaultStyle={{fontSize: hp(1.9)}}>
          John Brian Capate
        </Text>
        <Text style={styles.content} defaultStyle={{fontSize: hp(1.9)}}>
          Hanz Alvarez
        </Text>
      </View>
    </View>
  );
}
