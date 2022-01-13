import {Separator, Text, View} from 'components';
import {useEffect, useState} from 'react';

import Checkbox from '../../components/Checkbox';
import styles from './.module.css';

export default function TermsAndConditions({isChecked, onReadPrivacyPolicy}) {
  const [isRead, setRead] = useState(false);
  const [isCheck, setIsCheck] = useState(isChecked || false);

  useEffect(() => {
    onReadPrivacyPolicy(isCheck);
  }, [isCheck]);

  return (
    <View style={styles.mainPane}>
      <View style={styles.topPane}>
        <Text style={styles.title}>Privacy Policy</Text>
      </View>
      <View
        style={styles.bodyPane}
        onScroll={e => {
          const bottom =
            e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
          if (bottom) {
            setRead(true);
          }
        }}>
        <Text style={styles.contents}>
          Welcome to Broowing Coffee, this Privacy Policy tells you how the Data
          Controller and Procesor protect the Information and data within the application
          function, strategy and services we provide.
        </Text>
        <Separator vertical={0.5} />
        <Text style={styles.contents}>
          Our Data Controller are careful to keep all data away from the intruders and
          attackers that might happen during the runtime of the application.
        </Text>
        <Separator vertical={0.5} />
        <Text style={styles.contents}>
          The Team and Developers provide a secured data processor that strictly process
          all the data transition happening for each request of the user.
        </Text>
        <Separator vertical={2} />
        <Text style={styles.subtitle}>Use of Personal Information</Text>
        <Separator vertical={0.5} />
        <Text style={styles.contents}>
          The Team and Developers DO NOT SHARE any related information of user EXCEPT the
          name of the one who create a transaction.
        </Text>
        <Separator vertical={0.5} />
        <Text style={styles.contents}>
          We use the personal information for referencing and for contact of the user just
          incase there will have a maintenance or changes.
        </Text>
        <Separator vertical={2} />
        <Text style={styles.subtitle}>How We Protect The Data</Text>
        <Separator vertical={0.5} />
        <Text style={styles.contents}>
          Our SERVER / API has a multiple guard before initialy access the data of the
          entire application, we used multiple security features to give more protection
          to any request of data
        </Text>
        <Separator vertical={0.5} />
        <Text style={styles.contents}>
          These services are provided by Student Developers in STI Cubao College
        </Text>
        <Separator vertical={1} />
      </View>
      <View style={styles.bottomPane}>
        <Checkbox
          isCheck={isCheck}
          isDisabled={isChecked || isRead}
          text='I READ ALREADY'
          onPress={() => setIsCheck(prev => !prev)}
        />
      </View>
    </View>
  );
}
